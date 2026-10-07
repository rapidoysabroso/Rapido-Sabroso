"use strict";

const API_BASE = window.API_BASE || "https://rapido-sabroso.onrender.com";

const TOKEN_STORAGE_KEY = "editor_token";

/* =========================
   ELEMENTOS
========================= */

const formProducto = document.getElementById("formProducto");

const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const categoria = document.getElementById("categoria");
const imagen = document.getElementById("imagen");
const activo = document.getElementById("activo");

const previewImagen = document.getElementById("previewImagen");
const previewVacio = document.getElementById("previewVacio");

const nombreImagen = document.getElementById("nombreImagen");
const btnEliminarImagen = document.getElementById("btnEliminarImagen");

const btnCancelar = document.getElementById("btnCancelar");
const btnVolver = document.getElementById("btnVolver");

const modalMensaje = document.getElementById("modalMensaje");
const modalTitulo = document.getElementById("modalTitulo");
const modalTexto = document.getElementById("modalTexto");
const btnCerrarModal = document.getElementById("btnCerrarModal");
const plataforma = navigator.userAgent;
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const todosss = document.querySelectorAll(
  "div:not(.menu-container), header p, .menu-section",
);
let tiene = "";
//removemos la clase active
todosss.forEach((element) => {
  //le añadimos el evento "onClick"  a cada elemento
  if (plataforma.includes("Win")) {
    element.addEventListener("click", () => {
      tiene = menu.classList.value;
      if (tiene === "menu active") {
        //console.log(tiene);
        menu.classList.remove("active");
      } else {
        //console.log('no');
      }
    });
  }
});

//si es windows definimos la funcion click
if (plataforma.includes("Win")) {
  //document.addEventListener('DOMContentLoaded', () => {
  menuToggle.addEventListener("click", () => {
    tiene = menu.classList.value;
    if (tiene === "menu active") {
      menu.classList.remove("active");
    } else {
      menu.classList.add("active");
    }
  });
  //});
} else if (plataforma.includes("Android")) {
  menu.classList.add("active");
  menuToggle.addEventListener("click", () => {
    tiene = menu.classList.value;
    if (tiene === "menu active") {
      menu.classList.remove("active");
    } else {
      menu.classList.add("active");
    }
  });
}

/* =========================
   ID TEMPORAL
========================= */

// function generarId() {
//   return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
// }

/* ============================================================
   TOKEN
============================================================ */

function obtenerToken() {
  /*
   * Primero buscamos la clave que usa el editor.
   */

  let token = localStorage.getItem(TOKEN_STORAGE_KEY);

  /*
   * Fallback por si el login actual utiliza simplemente
   * "token".
   */

  if (!token) {
    token = localStorage.getItem("token");
  }

  return token;
}

/* ============================================================
   GENERAR ID
============================================================ */

function generarId(texto) {
  return texto

    .normalize("NFD")

    .replace(/[\u0300-\u036f]/g, "")

    .toLowerCase()

    .trim()

    .replace(/[^a-z0-9]+/g, "-")

    .replace(/^-+|-+$/g, "");
}

/* =========================
   IMAGEN
========================= */

imagen.addEventListener("change", function () {
  const archivo = this.files[0];

  if (!archivo) {
    limpiarImagen();
    return;
  }

  if (!archivo.type.startsWith("image/")) {
    alert("El archivo seleccionado no es una imagen.");

    limpiarImagen();

    return;
  }

  nombreImagen.textContent = archivo.name;

  const url = URL.createObjectURL(archivo);

  previewImagen.src = url;

  previewImagen.style.display = "block";

  previewVacio.style.display = "none";

  btnEliminarImagen.hidden = false;
});

/* =========================
   ELIMINAR IMAGEN
========================= */

btnEliminarImagen.addEventListener("click", limpiarImagen);

function limpiarImagen() {
  imagen.value = "";

  previewImagen.src = "";

  previewImagen.style.display = "none";

  previewVacio.style.display = "block";

  nombreImagen.textContent = "No se seleccionó ninguna imagen";

  btnEliminarImagen.hidden = true;
}

/* =========================
   CREAR PRODUCTO
========================= */

function obtenerDatosProducto() {
  const archivoImagen = imagen.files[0];

  return {
    id: generarId(),

    nombre: nombre.value.trim(),

    descripcion: descripcion.value.trim(),

    precio: Number(precio.value),

    categoria: categoria.value,

    imagen: archivoImagen ? archivoImagen.name : "",

    activo: activo.checked,
  };
}

/* =========================
   VALIDACIÓN
========================= */

function validarProducto() {
  if (!nombre.value.trim()) {
    alert("Ingresá el nombre del producto.");

    nombre.focus();

    return false;
  }

  if (!precio.value || Number(precio.value) < 0) {
    alert("Ingresá un precio válido.");

    precio.focus();

    return false;
  }

  if (!categoria.value) {
    alert("Seleccioná una categoría.");

    categoria.focus();

    return false;
  }

  return true;
}

/* =========================
   ENVIAR FORMULARIO
========================= */

// formProducto.addEventListener("submit", function (event) {
//   event.preventDefault();

//   if (!validarProducto()) {
//     return;
//   }

//   const producto = obtenerDatosProducto();

//   /*
//    * POR AHORA NO SE ENVÍA AL BACKEND.
//    *
//    * Más adelante acá vamos a hacer:
//    *
//    * fetch(...)
//    *
//    * para guardar el producto en:
//    *
//    * assets/productos.json
//    */

//   console.log("Nuevo producto:");

//   console.log(producto);

//   mostrarModal(
//     "Producto preparado",
//     "El producto fue validado correctamente. Por ahora no se guardó en el servidor.",
//   );
// });

/* ============================================================
   CREAR FORMDATA
============================================================ */

function crearFormData() {
  const nombreProducto = nombre.value.trim();

  /*
   * El ID se genera automáticamente desde el nombre.
   *
   * Ejemplo:
   *
   * "Hamburguesa Completa"
   *
   * =>
   *
   * "hamburguesa-completa"
   */

  const id = generarId(nombreProducto);

  /*
   * La categoría seleccionada se utiliza como:
   *
   * tipo
   * carpeta
   *
   * Esto coincide con la estructura que vimos:
   *
   * Imágenes/
   * ├── bebidas/
   * ├── Fritas/
   * ├── Merluza/
   * ├── Pancho/
   * ├── Pollo/
   * └── Vacuna/
   */

  const tipo = categoria.value;

  const carpeta = categoria.value;

  const formData = new FormData();

  formData.append("id", id);

  formData.append("titulo", nombreProducto);

  formData.append("tipo", tipo);

  formData.append("carpeta", carpeta);

  formData.append("precio", precio.value);

  formData.append("descripcion", descripcion.value.trim());

  formData.append("activo", activo.checked ? "true" : "false");

  /*
   * Imagen
   */

  if (imagen.files.length > 0) {
    formData.append("imagen", imagen.files[0]);
  }

  return formData;
}

/* ============================================================
   AGREGAR PRODUCTO
============================================================ */

formProducto.addEventListener("submit", async function (event) {
  event.preventDefault();

  /*
   * Evitar doble envío.
   */

  const botonGuardar = formProducto.querySelector(".btn-guardar");

  if (botonGuardar.disabled) {
    return;
  }

  /*
   * Validaciones.
   */

  if (!validarProducto()) {
    return;
  }

  /*
   * Comprobar token.
   */

  const token = obtenerToken();

  if (!token) {
    mostrarError(
      "Sesión vencida",
      "No se encontró la sesión del editor. Volvé a iniciar sesión.",
    );

    return;
  }

  /*
   * Deshabilitar botón.
   */

  botonGuardar.disabled = true;

  const textoOriginal = botonGuardar.innerHTML;

  botonGuardar.innerHTML = "Guardando...";

  try {
    const formData = crearFormData();

    /*
     * Enviar a Render.
     *
     * IMPORTANTE:
     *
     * No ponemos Content-Type manualmente.
     *
     * Fetch lo genera automáticamente como:
     *
     * multipart/form-data
     *
     * incluyendo el boundary.
     */

    const response = await fetch(`${API_BASE}/api/editor/productos`, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    });

    /*
     * Intentar obtener JSON.
     */

    let resultado;

    try {
      resultado = await response.json();
    } catch {
      resultado = {
        error: "El servidor devolvió una respuesta inválida.",
      };
    }

    /*
     * Error HTTP.
     */

    if (!response.ok) {
      throw new Error(
        resultado.error || `Error del servidor (${response.status})`,
      );
    }

    /*
     * Producto agregado correctamente.
     */

    console.log("Producto agregado:", resultado);

    mostrarExito(
      "Producto agregado",
      resultado.mensaje || "El producto fue agregado correctamente.",
    );
  } catch (error) {
    console.error("Error agregando producto:", error);

    mostrarError(
      "No se pudo agregar",
      error.message || "Ocurrió un error al comunicarse con el servidor.",
    );
  } finally {
    botonGuardar.disabled = false;

    botonGuardar.innerHTML = textoOriginal;
  }
});

/* =========================
   MODAL
========================= */

// function mostrarModal(titulo, texto) {
//   modalTitulo.textContent = titulo;

//   modalTexto.textContent = texto;

//   modalMensaje.classList.add("mostrar");
// }

function mostrarModal(titulo, texto, exito = false) {
  modalTitulo.textContent = titulo;

  modalTexto.textContent = texto;

  const icono = document.getElementById("modalIcono");

  if (exito) {
    icono.textContent = "✓";

    icono.style.background = "#22c55e";
  } else {
    icono.textContent = "!";

    icono.style.background = "#ef4444";
  }

  modalMensaje.classList.add("mostrar");
}

function mostrarExito(titulo, texto) {
  mostrarModal(titulo, texto, true);
}

function mostrarError(titulo, texto) {
  mostrarModal(titulo, texto, false);
}

function cerrarModal() {
  modalMensaje.classList.remove("mostrar");
}

btnCerrarModal.addEventListener("click", cerrarModal);

/* =========================
   CANCELAR
========================= */

btnCancelar.addEventListener("click", function () {
  if (confirm("¿Querés cancelar la carga del producto?")) {
    window.location.href = "index.html";
  }
});

/* =========================
   VOLVER
========================= */

btnVolver.addEventListener("click", function () {
  window.location.href = "index.html";
});

/* =========================
   ESCAPE
========================= */

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (modalMensaje.classList.contains("mostrar")) {
      cerrarModal();
    }
  }
});
