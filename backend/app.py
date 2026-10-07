import os
import base64
import json
import secrets
from datetime import datetime, timezone, timedelta

import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired

app = Flask(__name__)

# ============================================================
# CONFIGURACIÓN
# ============================================================

FRONTEND_ORIGINS = os.getenv("FRONTEND_ORIGINS", "*")

if FRONTEND_ORIGINS == "*":
    CORS(app)
else:
    CORS(
        app,
        origins=[
            origin.strip() for origin in FRONTEND_ORIGINS.split(",") if origin.strip()
        ],
        supports_credentials=False,
    )


EDITOR_USER = os.getenv("EDITOR_USER")
EDITOR_PASSWORD = os.getenv("EDITOR_PASSWORD")
SECRET_KEY = os.getenv("EDITOR_SECRET_KEY")

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_OWNER = os.getenv("GITHUB_OWNER")
GITHUB_REPO = os.getenv("GITHUB_REPO")
GITHUB_BRANCH = os.getenv("GITHUB_BRANCH", "master")

# Ruta de los JSON dentro del repositorio
PRODUCTOS_PATH = os.getenv("PRODUCTOS_PATH", "assets/productos.json")

PRECIOS_PATH = os.getenv("PRECIOS_PATH", "assets/precios.json")

DESCRIPCIONES_PATH = os.getenv("DESCRIPCIONES_PATH", "assets/descripciones.json")

TOKEN_MAX_AGE = int(os.getenv("TOKEN_MAX_AGE", "28800"))  # 8 horas


if not EDITOR_USER:
    raise RuntimeError("Falta la variable EDITOR_USER")

if not EDITOR_PASSWORD:
    raise RuntimeError("Falta la variable EDITOR_PASSWORD")

if not SECRET_KEY:
    raise RuntimeError("Falta la variable EDITOR_SECRET_KEY")

if not GITHUB_TOKEN:
    raise RuntimeError("Falta la variable GITHUB_TOKEN")

if not GITHUB_OWNER:
    raise RuntimeError("Falta la variable GITHUB_OWNER")

if not GITHUB_REPO:
    raise RuntimeError("Falta la variable GITHUB_REPO")


serializer = URLSafeTimedSerializer(SECRET_KEY, salt="rapido-y-sabroso-editor")


# ============================================================
# UTILIDADES
# ============================================================


def github_url(path):
    """
    URL de la API de GitHub para un archivo.
    """
    return (
        f"https://api.github.com/repos/" f"{GITHUB_OWNER}/{GITHUB_REPO}/contents/{path}"
    )


def github_headers():
    return {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
    }


def leer_json_github(path):
    """
    Lee un JSON directamente desde la API de GitHub.
    Devuelve:
        datos, sha
    """

    response = requests.get(
        github_url(path),
        headers=github_headers(),
        params={"ref": GITHUB_BRANCH},
        timeout=20,
    )

    if response.status_code != 200:
        raise RuntimeError(
            f"GitHub no pudo leer {path}: " f"{response.status_code} - {response.text}"
        )

    data = response.json()

    contenido = base64.b64decode(data["content"]).decode("utf-8")

    return json.loads(contenido), data["sha"]


def guardar_json_github(path, datos, sha, mensaje):
    """
    Actualiza un JSON mediante GitHub Contents API.
    """

    contenido = json.dumps(datos, ensure_ascii=False, indent=4) + "\n"

    contenido_base64 = base64.b64encode(contenido.encode("utf-8")).decode("utf-8")

    payload = {
        "message": mensaje,
        "content": contenido_base64,
        "sha": sha,
        "branch": GITHUB_BRANCH,
    }

    response = requests.put(
        github_url(path), headers=github_headers(), json=payload, timeout=20
    )

    if response.status_code not in (200, 201):
        raise RuntimeError(
            f"GitHub no pudo guardar {path}: "
            f"{response.status_code} - {response.text}"
        )

    return response.json()


def guardar_archivo_github(path, contenido, mensaje):
    """
    Crea o reemplaza un archivo binario mediante GitHub Contents API.

    contenido:
        bytes del archivo.
    """

    contenido_base64 = base64.b64encode(contenido).decode("utf-8")

    # Primero comprobamos si el archivo ya existe
    response_get = requests.get(
        github_url(path),
        headers=github_headers(),
        params={"ref": GITHUB_BRANCH},
        timeout=20,
    )

    sha = None

    if response_get.status_code == 200:
        sha = response_get.json().get("sha")

    elif response_get.status_code != 404:
        raise RuntimeError(
            f"GitHub no pudo comprobar {path}: "
            f"{response_get.status_code} - "
            f"{response_get.text}"
        )

    payload = {"message": mensaje, "content": contenido_base64, "branch": GITHUB_BRANCH}

    if sha:
        payload["sha"] = sha

    response = requests.put(
        github_url(path), headers=github_headers(), json=payload, timeout=30
    )

    if response.status_code not in (200, 201):
        raise RuntimeError(
            f"GitHub no pudo guardar {path}: "
            f"{response.status_code} - "
            f"{response.text}"
        )

    return response.json()


def crear_token(usuario):
    """
    Genera un token firmado que no contiene la contraseña.
    """

    return serializer.dumps(
        {"usuario": usuario, "iat": datetime.now(timezone.utc).isoformat()}
    )


def verificar_token(token):
    """
    Verifica firma y vencimiento del token.
    """

    try:
        datos = serializer.loads(token, max_age=TOKEN_MAX_AGE)

        if datos.get("usuario") != EDITOR_USER:
            return None

        return datos

    except (BadSignature, SignatureExpired):
        return None


def obtener_token_request():
    """
    Busca el Bearer token del header Authorization.
    """

    authorization = request.headers.get("Authorization", "")

    if not authorization.startswith("Bearer "):
        return None

    return authorization[7:].strip()


def requiere_auth():
    """
    Decorador manual sencillo.
    """

    token = obtener_token_request()

    if not token:
        return None, (jsonify({"error": "Falta el token de autenticación"}), 401)

    datos = verificar_token(token)

    if not datos:
        return None, (jsonify({"error": "Token inválido o vencido"}), 401)

    return datos, None


# ============================================================
# HEALTH
# ============================================================


@app.get("/")
def index():
    return jsonify(
        {"ok": True, "servicio": "Editor Rápido y Sabroso", "estado": "online"}
    )


@app.get("/health")
def health():
    return jsonify({"ok": True, "estado": "online", "servicio": "editor-productos"})


# ============================================================
# LOGIN
# ============================================================


@app.post("/api/editor/login")
def login():

    data = request.get_json(silent=True) or {}

    usuario = str(data.get("usuario", "")).strip()

    password = str(data.get("password", ""))

    if not secrets.compare_digest(usuario, EDITOR_USER):

        return jsonify({"error": "Usuario o contraseña incorrectos"}), 401

    if not secrets.compare_digest(password, EDITOR_PASSWORD):

        return jsonify({"error": "Usuario o contraseña incorrectos"}), 401

    token = crear_token(usuario)

    return jsonify({"ok": True, "token": token, "expires_in": TOKEN_MAX_AGE})


# ============================================================
# OBTENER PRODUCTOS
# ============================================================


@app.get("/api/editor/productos")
def obtener_productos():

    _, error = requiere_auth()

    if error:
        return error

    try:

        productos, _ = leer_json_github(PRODUCTOS_PATH)

        precios, _ = leer_json_github(PRECIOS_PATH)

        descripciones, _ = leer_json_github(DESCRIPCIONES_PATH)

        return jsonify(
            {
                "ok": True,
                "productos": productos.get("productos", []),
                "precios": precios.get("precios", {}),
                "descripciones": descripciones.get("descripciones", {}),
            }
        )

    except Exception as error:

        app.logger.exception("Error obteniendo productos")

        return jsonify({"error": str(error)}), 500


# ============================================================
# ACTUALIZAR PRODUCTO
# ============================================================


@app.put("/api/editor/productos/<producto_id>")
def actualizar_producto(producto_id):

    _, error = requiere_auth()

    if error:
        return error

    data = request.get_json(silent=True) or {}

    titulo = str(data.get("titulo", "")).strip()

    precio = str(data.get("precio", "")).strip()

    descripcion = str(data.get("descripcion", "")).strip()

    if not titulo:
        return jsonify({"error": "El título es obligatorio"}), 400

    if not precio:
        return jsonify({"error": "El precio es obligatorio"}), 400

    # Solo permitimos números en el precio.
    precio_normalizado = (
        precio.replace("$", "").replace(".", "").replace(",", "").strip()
    )

    if not precio_normalizado.isdigit():
        return jsonify({"error": "El precio debe contener solamente números"}), 400

    try:

        # ----------------------------------------------------
        # 1. Leer los tres JSON
        # ----------------------------------------------------

        productos_data, productos_sha = leer_json_github(PRODUCTOS_PATH)

        precios_data, precios_sha = leer_json_github(PRECIOS_PATH)

        descripciones_data, descripciones_sha = leer_json_github(DESCRIPCIONES_PATH)

        productos = productos_data.get("productos", [])

        precios = precios_data.get("precios", {})

        descripciones = descripciones_data.get("descripciones", {})

        # ----------------------------------------------------
        # 2. Buscar producto
        # ----------------------------------------------------

        producto_encontrado = None

        for producto in productos:

            if str(producto.get("id", "")).lower() == producto_id.lower():

                producto_encontrado = producto
                break

        if producto_encontrado is None:

            return jsonify({"error": "Producto no encontrado"}), 404

        # ----------------------------------------------------
        # 3. Determinar IDs relacionados
        # ----------------------------------------------------

        id_producto = str(producto_encontrado.get("id", producto_id))

        clave = id_producto.lower()

        precio_id = producto_encontrado.get("precio_id")

        if precio_id:
            clave_precio = str(precio_id)
        else:
            clave_precio = clave

        # ----------------------------------------------------
        # 4. Actualizar productos.json
        # ----------------------------------------------------

        producto_encontrado["titulo"] = titulo

        # Solo actualizar descripción acá si el producto
        # actualmente posee una descripción propia.
        if "descripcion" in producto_encontrado:
            producto_encontrado["descripcion"] = descripcion

        # ----------------------------------------------------
        # 5. Actualizar precios.json
        # ----------------------------------------------------

        precios[clave_precio] = precio_normalizado

        # ----------------------------------------------------
        # 6. Actualizar descripciones.json
        # ----------------------------------------------------

        descripciones[clave] = descripcion

        # ----------------------------------------------------
        # 7. Guardar productos.json
        # ----------------------------------------------------

        guardar_json_github(
            PRODUCTOS_PATH,
            {"productos": productos},
            productos_sha,
            f"Editar producto: {id_producto}",
        )

        # ----------------------------------------------------
        # 8. Guardar precios.json
        # ----------------------------------------------------

        guardar_json_github(
            PRECIOS_PATH,
            {"precios": precios},
            precios_sha,
            f"Actualizar precio: {id_producto}",
        )

        # ----------------------------------------------------
        # 9. Guardar descripciones.json
        # ----------------------------------------------------

        guardar_json_github(
            DESCRIPCIONES_PATH,
            {"descripciones": descripciones},
            descripciones_sha,
            f"Actualizar descripción: {id_producto}",
        )

        return jsonify(
            {
                "ok": True,
                "mensaje": "Producto actualizado correctamente",
                "producto": {
                    "id": id_producto,
                    "titulo": titulo,
                    "precio": precio_normalizado,
                    "descripcion": descripcion,
                },
            }
        )

    except Exception as error:

        app.logger.exception("Error actualizando producto")

        return jsonify({"error": str(error)}), 500


# ============================================================
# AGREGAR PRODUCTO
# ============================================================


@app.post("/api/editor/productos")
def agregar_producto():

    # --------------------------------------------------------
    # 1. Comprobar autenticación
    # --------------------------------------------------------

    _, error = requiere_auth()

    if error:
        return error

    # --------------------------------------------------------
    # 2. Obtener datos
    # --------------------------------------------------------

    producto_id = str(request.form.get("id", "")).strip()

    titulo = str(request.form.get("titulo", "")).strip()

    tipo = str(request.form.get("tipo", "")).strip()

    carpeta = str(request.form.get("carpeta", "")).strip()

    precio = str(request.form.get("precio", "")).strip()

    descripcion = str(request.form.get("descripcion", "")).strip()

    activo = str(request.form.get("activo", "true")).lower() == "true"

    # --------------------------------------------------------
    # 3. Validaciones
    # --------------------------------------------------------

    if not producto_id:

        return jsonify({"error": "El ID del producto es obligatorio"}), 400

    if not titulo:

        return jsonify({"error": "El título es obligatorio"}), 400

    if not tipo:

        return jsonify({"error": "El tipo es obligatorio"}), 400

    if not precio:

        return jsonify({"error": "El precio es obligatorio"}), 400

    # --------------------------------------------------------
    # 4. Normalizar precio
    # --------------------------------------------------------

    precio_normalizado = (
        precio.replace("$", "").replace(".", "").replace(",", "").strip()
    )

    if not precio_normalizado.isdigit():

        return jsonify({"error": "El precio debe contener solamente números"}), 400

    try:

        # ----------------------------------------------------
        # 5. Leer los tres JSON
        # ----------------------------------------------------

        productos_data, productos_sha = leer_json_github(PRODUCTOS_PATH)

        precios_data, precios_sha = leer_json_github(PRECIOS_PATH)

        descripciones_data, descripciones_sha = leer_json_github(DESCRIPCIONES_PATH)

        productos = productos_data.get("productos", [])

        precios = precios_data.get("precios", {})

        descripciones = descripciones_data.get("descripciones", {})

        # ----------------------------------------------------
        # 6. Comprobar que no exista el ID
        # ----------------------------------------------------

        for producto in productos:

            id_existente = str(producto.get("id", "")).strip().lower()

            if id_existente == producto_id.lower():

                return (
                    jsonify(
                        {
                            "error": (
                                f"Ya existe un producto con el ID " f"'{producto_id}'"
                            )
                        }
                    ),
                    409,
                )

        # ----------------------------------------------------
        # 7. Comprobar que no exista el precio
        # ----------------------------------------------------

        if producto_id.lower() in precios:

            return (
                jsonify({"error": (f"Ya existe un precio para " f"'{producto_id}'")}),
                409,
            )

        # ----------------------------------------------------
        # 8. Determinar carpeta
        # ----------------------------------------------------

        if not carpeta:

            carpeta = producto_id

        # ----------------------------------------------------
        # 9. Imagen
        # ----------------------------------------------------

        archivo_imagen = request.files.get("imagen")

        imagenes = []

        if archivo_imagen:

            nombre_imagen = (archivo_imagen.filename or "").strip()

            if nombre_imagen:

                # Evitar rutas enviadas desde el navegador
                nombre_imagen = os.path.basename(nombre_imagen)

                extension = os.path.splitext(nombre_imagen)[1].lower()

                extensiones_permitidas = {".jpg", ".jpeg", ".png", ".webp", ".gif"}

                if extension not in extensiones_permitidas:

                    return jsonify({"error": ("Formato de imagen no permitido")}), 400

                # --------------------------------------------
                # Ruta de la imagen en GitHub
                # --------------------------------------------

                ruta_imagen = f"Imagenes/" f"{carpeta}/" f"{nombre_imagen}"

                contenido_imagen = archivo_imagen.read()

                guardar_archivo_github(
                    ruta_imagen, contenido_imagen, f"Agregar imagen: {producto_id}"
                )

                imagenes.append(nombre_imagen)

        # ----------------------------------------------------
        # 10. Crear producto
        # ----------------------------------------------------

        nuevo_producto = {
            "id": producto_id,
            "titulo": titulo,
            "tipo": tipo,
            "carpeta": carpeta,
            "imagenes": imagenes,
        }

        # ----------------------------------------------------
        # 11. Agregar a productos.json
        # ----------------------------------------------------

        productos.append(nuevo_producto)

        # ----------------------------------------------------
        # 12. Agregar a precios.json
        # ----------------------------------------------------

        precios[producto_id.lower()] = precio_normalizado

        # ----------------------------------------------------
        # 13. Agregar a descripciones.json
        # ----------------------------------------------------

        descripciones[producto_id.lower()] = descripcion

        # ----------------------------------------------------
        # 14. Guardar productos.json
        # ----------------------------------------------------

        guardar_json_github(
            PRODUCTOS_PATH,
            {"productos": productos},
            productos_sha,
            f"Agregar producto: {producto_id}",
        )

        # ----------------------------------------------------
        # 15. Guardar precios.json
        # ----------------------------------------------------

        guardar_json_github(
            PRECIOS_PATH,
            {"precios": precios},
            precios_sha,
            f"Agregar precio: {producto_id}",
        )

        # ----------------------------------------------------
        # 16. Guardar descripciones.json
        # ----------------------------------------------------

        guardar_json_github(
            DESCRIPCIONES_PATH,
            {"descripciones": descripciones},
            descripciones_sha,
            f"Agregar descripción: {producto_id}",
        )

        # ----------------------------------------------------
        # 17. Respuesta
        # ----------------------------------------------------

        return (
            jsonify(
                {
                    "ok": True,
                    "mensaje": ("Producto agregado correctamente"),
                    "producto": {
                        "id": producto_id,
                        "titulo": titulo,
                        "tipo": tipo,
                        "carpeta": carpeta,
                        "imagenes": imagenes,
                        "precio": precio_normalizado,
                        "descripcion": descripcion,
                        "activo": activo,
                    },
                }
            ),
            201,
        )

    except Exception as error:

        app.logger.exception("Error agregando producto")

        return jsonify({"error": str(error)}), 500


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":

    port = int(os.getenv("PORT", "5000"))

    app.run(host="0.0.0.0", port=port, debug=False)
