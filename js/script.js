//const imgsocial = document.querySelector('#ImgSocial');
const facebook = document.querySelector("#Facebook");
const instagram = document.querySelector("#Instagram");
const ubicacion = document.querySelector("#Ubicacion");
//const price = document.querySelectorAll(".price");
const page = document.querySelector("#page a");
//const metaContent = document.querySelector('meta[name="description"]');
//const ContMeta =
//"Cumen Truck ofrece una deliciosa variedad de comidas rápidas, incluyendo hamburguesas, tacos y panchos, elaborados con ingredientes frescos y de calidad. Disfruta de opciones como la Hamburguesa de Cordero con cebolla caramelizada y alioli, o el Taco Veggie con verduras salteadas, todo a precios accesibles. ¡El buen sabor te espera en Cumen Truck!";
//definimos constante plataforma
const plataforma = navigator.userAgent;

//definimos la funcion onload
//window.onload = function () {
//metaContent.content = ContMeta;
//cargarMetaDescription();
//};
//Definimos la funcion que agrega los titulos a los componentes
function Titulos() {
  if (instagram.onmouseover) {
    instagram.title = 'Visitar página de Instagram de "Rápido y Sabroso"';
  }
  if (facebook.onmouseover) {
    facebook.title = 'Visitar página de Facebook de "Rápido y Sabroso"';
  }
  if (ubicacion.onmouseover) {
    ubicacion.title = 'Visitar nuestra ubicación en Google Maps"';
  }
}
//definimos la funcion para crear un nuevo div por cada item del menu
//para luego crear un nuevo elemento img para colocar el logo con efecto
function cargarImg() {
  var destino = document.querySelectorAll(".menu-item");
  //var destino = elem;
  if (destino === undefined) alert("No existe el bloque destino");
  else {
    for (let i = 0; i < destino.length; i++) {
      var nodoDivImg = document.createElement("div");
      nodoDivImg.id = "nodo-img-item";
      nodoDivImg.className = "nodo-img-item";
      destino[i].appendChild(nodoDivImg);
    }
    var nodo1 = document.querySelectorAll("#nodo-img-item");
    for (let c = 0; c < nodo1.length; c++) {
      var nodoImg = document.createElement("img");
      if (plataforma.includes("Win")) {
        nodoImg.setAttribute("src", "Imagenes/logo-transparente.avif");
      } else if (plataforma.includes("Android")) {
        nodoImg.setAttribute("src", "Imagenes/logo-transparente-266x100.avif");
      }
      nodoImg.id = "img-item-" + c;
      nodo1[c].appendChild(nodoImg);
    }
  }
}

//definimos la funcion que crea el boton de top para dispositivos moviles
function creaTop() {
  if (window.location.pathname.includes("about")) {
    var destino = document.querySelector(".container");
  } else {
    destino = document.querySelector("main");
  }
  if (destino === undefined) alert("No existe el bloque destino");
  else {
    var nodoTop = document.createElement("div");
    nodoTop.className = "top";
    destino.appendChild(nodoTop);
    var nodo1 = document.querySelector(".top");
    var nodoButton = document.createElement("button");
    nodoButton.id = "myBtn";
    nodoButton.addEventListener("click", topFunction);
    nodo1.appendChild(nodoButton);
  }
}
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const hahaha = document.getElementById("jaja");
const todosss = document.querySelectorAll(
  "div:not(.menu-container), header p, .menu-section"
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
  setTimeout(() => {
    menu.classList.add("active");
    menuToggle.addEventListener("click", () => {
      tiene = menu.classList.value;
      if (tiene === "menu active") {
        menu.classList.remove("active");
      } else {
        menu.classList.add("active");
      }
    });
    if (
      ["index", "Rapido-Sabroso", "Rapido_Sabroso", "bebidas", "about"].some(
        (path) => window.location.pathname.includes(path)
      )
    ) {
      window.onscroll = function () {
        scrollFunction();
        menuVisible2();
        sisi();
      };
    }
  }, 500);
}

let a = "";
let b = "";
let scrolll = "";
const inicios = 85;
const target = 20;
let final = "";
//const TargetHeight = document.documentElement.offsetHeight - screen.height;
const TargetHeight = document.documentElement.offsetHeight - window.innerHeight;
// When the user scrolls down 20px from the top of the document, show the button
function scrollFunction() {
  const mybutton = document.getElementById("myBtn");
  const topp = document.querySelector(".top");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrolll = window.scrollY;
    mybutton.style.display = "block";
    if (isBottomOfPage()) {
      topp.style.bottom = 85 + "px";
    } else if (
      scrolll <=
      Math.max(document.documentElement.scrollHeight) - window.innerHeight
    ) {
      final = inicios - (TargetHeight - scrolll);
      if (final > target && final <= inicios) {
        topp.style.bottom = Math.max(target, final) + "px";
      } else {
        topp.style.bottom = 20 + "px";
      }
    }
  } else {
    mybutton.style.display = "none";
  }
}
//funcion para determinar si llegamos al final de la pagina
function isBottomOfPage() {
  //return window.scrollY + window.innerHeight >= Math.round(document.documentElement.scrollHeight);
  return (
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight
  );
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  //const mybutton = document.getElementById("myBtn");
  //document.body.scrollTop = 0; // For Safari
  //document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  if ("scrollTo" in window) {
    // Verifica si el navegador soporta scrollTo
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    // Fallback para navegadores más antiguos
    let currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(topFunction);
      window.scrollTo(0, currentScroll - currentScroll / 8); // Efecto suave manual
    }
  }
}
// Verifica si el dispositivo es móvil
function esMovil() {
  return /Mobi|Android/i.test(navigator.userAgent);
}
let elemID = "";
let classi = "";
const path = window.location.pathname.toLowerCase();
const esBebidas = path.includes("/bebidas");
const esHome =
  path.endsWith("/") ||
  path.endsWith("/index.html") ||
  path.includes("rapido_sabroso") ||
  path.includes("rapido-sabroso");
//al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
  cerrarImagenesAlScroll();
  if (esBebidas) {
    cargarBebidas();
    cargarMetaDescription("assets/descripciones.json", "bebidas");
  } else if (esHome) {
    cargarProductos("comida");
    cargarMetaDescription("assets/descripciones.json", "index");
  }
  const price = document.querySelectorAll(".price");
  price.forEach((element) => {
    (async () => {
      const descripcion = await buscarDescripcion2(
        element.id.toLowerCase(),
        "precios",
        "precios"
      ); // Cambiar a otro identificador para probar
      element.textContent = "$" + descripcion;
    })();
  });

  if (esMovil()) {
    if (window.location.pathname.includes("about")) {
      //
    } else {
      creaTop();
    }
  }
});
//definimos la funcion para cargar los precios
function CargaPrecios() {
  const price = document.querySelectorAll(".price");
  price.forEach((element) => {
    (async () => {
      const descripcion = await buscarDescripcion2(
        element.id.toLowerCase(),
        "precios",
        "precios"
      ); // Cambiar a otro identificador para probar
      element.textContent = "$" + descripcion;
    })();
  });
}
//definimos la funcion que verifica si un componente tiene transformacion
function esTransform(ele) {
  const estilo = window.getComputedStyle(ele);
  const transform = estilo.transform;
  if (transform === "none") {
    console.log("No se ha aplicado ninguna transformación.");
    return;
  }
  // Analizamos la matriz de transformación
  const valores = transform.match(/matrix\(([^)]+)\)/)[1].split(", ");
  const escalaX = parseFloat(valores[0]); // El valor de scaleX está en la posición 0
  const escalaY = parseFloat(valores[3]); // El valor de scaleY está en la posición 3 (en una matriz 2D)
  let resultado = "";
  if (escalaX > 0 && escalaY > 0) {
    resultado = 1;
  } else {
    resultado = 0;
  }
  return resultado;
}
// Función para cargar el archivo JSON
async function cargarJson(url) {
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok)
      throw new Error(`Error al cargar JSON: ${respuesta.statusText}`);
    const datos = await respuesta.json(); // Parsear el JSON
    return datos;
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
  }
}
// Función para buscar una descripción por su identificador
async function buscarDescripcion2(identificador, titu, archivo) {
  const datos = await cargarJson("assets/" + archivo + ".json");
  if (titu === "precios") {
    if (datos && datos.precios && datos.precios[identificador]) {
      return datos.precios[identificador];
    } else {
      return "Descripción no encontrada.";
    }
  } else {
    if (datos.descripciones && datos.descripciones[identificador]) {
      return datos.descripciones[identificador];
    } else {
      return "Identificador no encontrado.";
    }
  }
}
//funcion que carga la foto del about
function CargaAbout() {
  if (
    window.location.pathname.includes("about") ||
    location.href.includes("about")
  ) {
    const imgabout = document.querySelector("#about");
    //const urrl = 'https://drive.google.com/thumbnail?id=1YZXo3GZ2YbBhlp6sXreHzNA2yd54bq8z&sz=w4000';
    //cargamos la imagen si es WINDOWS en una resolucion de 2K
    //const urlAbout = 'https://drive.google.com/thumbnail?id=1jtZBdlz_Pzj1W_RU5xWxLn_-8CWtZBUB&sz=w2000';
    const urlAbout =
      "https://lh3.googleusercontent.com/d/1fl28fxt32upUwGDsodLgYaIfL-LtKJm-=w1280?authuser=0";
    //"https://drive.google.com/thumbnail?id=1UfPrutLsxYQr52bRgDICUiTtRvd07ylU&sz=w1280";
    imgabout.style.backgroundSize = "cover";
    imgabout.style.backgroundRepeat = "no-repeat";
    if (plataforma.includes("Android")) {
      imgabout.src = "Imagenes/about-baja.avif";
      imgabout.alt = "About-Baja";
    } else if (plataforma.includes("Win")) {
      imgabout.src = urlAbout;
      imgabout.alt = "About-1280";
    }
  }
}
//funcion que oculta o expande el menu segun scroll
function menuVisible2() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    if (menu.classList.value === "menu active") {
      menu.classList.remove("active");
    }
    if (isBottomOfPage()) {
      if (menu.classList.value === "menu") {
        menu.classList.add("active");
      }
    }
  } else {
    if (menu.classList.value === "menu") {
      menu.classList.add("active");
    }
  }
}

function sisi() {
  const menuItems = document.querySelectorAll(".menu-item");
  const deta = document.querySelector(".detail-view");
  menuItems.forEach((item, index) => {
    if (item.classList.contains("hidden")) {
      if (deta.getBoundingClientRect().top <= -370) {
        deta.classList.remove("active");
        item.classList.remove("hidden");
      } else if (isBottomOfPage() || window.scrollY == 0) {
        deta.classList.remove("active");
        item.classList.remove("hidden");
      } else if (deta.getBoundingClientRect().top >= 730) {
        deta.classList.remove("active");
        item.classList.remove("hidden");
      }
    }
  });
}

//let contenedor;
async function cargarProductos(tipoPermitido = "comida") {
  const contenedor = document.getElementById("menu-section");
  contenedor.innerHTML = ""; // limpieza por seguridad

  try {
    const res = await fetch("assets/productos.json");
    const data = await res.json();

    const productosFiltrados = data.productos.filter(
      (prod) => prod.tipo === tipoPermitido
    );

    productosFiltrados.forEach((prod, index) => {
      const article = document.createElement("article");
      article.className = "menu-item";
      article.id = `logo-item${index}`;

      article.innerHTML = `
        ${
          prod.imagenes.principal
            ? `
          <img src="Imagenes/${prod.carpeta}/${prod.imagenes.principal}" 
               class="${prod.id}" id="${prod.id}" fetchpriority="high">
        `
            : ""
        }

        <img src="Imagenes/fondo-img.avif" class="FondoImg">

        <img src="Imagenes/${prod.carpeta}/${prod.imagenes.item}" class="Img1">

        ${
          prod.imagenes.texto
            ? `
          <img src="Imagenes/${prod.carpeta}/${prod.imagenes.texto}" class="Img2">
        `
            : ""
        }

        <h3>${prod.titulo}</h3>
        ${prod.descripcion ? `<p>${prod.descripcion}</p>` : ""}
        <p class="price" id="${prod.id}"></p>
      `;

      contenedor.appendChild(article);
    });

    cargarImg();
    inicializarDetalleMobile();
    CargaPrecios();
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}
let imagenExpandida = false;
async function cargarBebidas() {
  const contenedor = document.getElementById("menu-section1");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  try {
    const res = await fetch("assets/productos.json");
    const data = await res.json();

    const bebidas = data.productos.filter((p) => p.tipo === "bebida");

    bebidas.forEach((prod) => {
      const div = document.createElement("div");
      div.className = "menu-item";
      div.id = prod.id;

      div.innerHTML = `
        <h3>${prod.titulo}</h3>

        <img
          src="Imagenes/fondo-img.avif"
          class="FondoImg"
          id="FondoImg"
          alt=""
        />

        <img
          src="Imagenes/${prod.carpeta}/${prod.imagenes.item}"
          class="Img1"
          id="Img1"
          alt=""
        />

        <p class="price" id="${prod.precio_id}"></p>
      `;

      contenedor.appendChild(div);
      const elTexto = div.querySelector("h3");
      const elPrecio = div.querySelector("p");

      const imgProducto = div.querySelector(".Img1");
      imgProducto.addEventListener("click", () => {
        console.log(elTexto);
        console.log(elPrecio);
        //elPrecio.classList.remove("price");
        if (imagenExpandida) {
          cerrarImagen();
        } else {
          expandirImagenUnica(imgProducto, elTexto, elPrecio);
        }
      });
    });

    // reutilizás todo lo que ya tenés
    cargarImg();
    CargaPrecios();
    inicializarImagenesBebidas();
    invertirFondos();
  } catch (error) {
    console.error("Error cargando bebidas:", error);
  }
}

function inicializarImagenesBebidas() {
  const itemsMenu2 = document.querySelectorAll(".menu-item");

  itemsMenu2.forEach((item) => {
    const nuevoDiv = document.createElement("div");
    nuevoDiv.className = "imagenes";

    const img1 = item.querySelector(".Img1");
    const price = item.querySelector(".price");

    if (img1) nuevoDiv.appendChild(img1);
    if (price) item.insertBefore(nuevoDiv, price);
  });
}

function invertirFondos() {
  const fondos = document.querySelectorAll(".FondoImg");

  fondos.forEach((item, index) => {
    if (index % 2 === 0 && fondos[index + 1]) {
      fondos[index + 1].style.transform = "scaleX(-1)";
    }
  });
}

async function cargarProductos2() {
  const contenedor = document.getElementById("menu-section");

  try {
    const res = await fetch("assets/productos.json");
    const data = await res.json();

    data.productos.forEach((prod, index) => {
      const article = document.createElement("article");
      article.className = "menu-item";
      article.id = `logo-item${index}`;

      article.innerHTML = `
                  <img src="Imagenes/${prod.carpeta}/${prod.imagenes.principal}" class="${prod.id}" id="${prod.id}">
                  <img src="Imagenes/fondo-img.avif" class="FondoImg">
                  <img src="Imagenes/${prod.carpeta}/${prod.imagenes.item}" class="Img1">
                  <img src="Imagenes/${prod.carpeta}/${prod.imagenes.texto}" class="Img2">
  
                  <h3>${prod.titulo}</h3>
                  <p>${prod.descripcion}</p>
                  <p class="price" id="${prod.id}"></p>
              `;

      contenedor.appendChild(article);
    });

    // 🔹 luego de crear los items, cargamos precios e imágenes extra
    cargarImg();
    inicializarDetalleMobile();
    CargaPrecios();
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

function inicializarDetalleMobile() {
  if (!esMovil()) return;

  const contenedor = document.getElementById("menu-section");
  const menuItems = document.querySelectorAll(".menu-item");
  const detailView = document.createElement("div");
  detailView.id = "details";
  detailView.className = "detail-view";
  contenedor.appendChild(detailView);

  if (
    [
      "bebidas",
      "Rapido_Sabroso/bebidas",
      "Menu-Cumen-Truck/bebidas",

      "about",
    ].some((path) => window.location.pathname.includes(path))
  ) {
  } else if (
    esHome
    // ["index", "Rapido_Sabroso", "Rapido-Sabroso"].some((path) =>
    //   window.location.pathname.includes(path)
    // )
  ) {
    menuItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        // Calcular la posición del artículo
        const rect = item.getBoundingClientRect();
        const positionX = rect.left + window.scrollX;
        const positionY = rect.top + window.scrollY;

        // Establecer el estilo de `detailView` para que coincida
        detailView.style.left = `${positionX}px`;
        detailView.style.top = `${positionY}px`;
        detailView.style.width = `${rect.width}px`; // Mantener el ancho del artículo
        detailView.style.height = `${rect.height}px`; // Mantener la altura del artículo
        detailView.style.transform = "scale(0)";
        // Forzar un reflow para registrar el estado inicial
        detailView.offsetHeight;

        const itemid = document.getElementById(item.id);
        let menuItemsArray = Array.from(menuItems);
        menuItemsArray.forEach((menuclass) => {
          if (menuclass.classList.contains("hidden")) {
            detailView.classList.remove("active");
            menuclass.classList.remove("hidden"); // Mostrar el elemento
          }
        });
        itemid.classList.add("hidden");

        setTimeout(() => {
          item.ontransitionend = (evento) => {
            if (
              evento.propertyName === "transform" &&
              item.classList.contains("hidden")
            ) {
              // Asegura que estamos escuchando transform
              detailView.classList.add("active");
              detailView.id = "details-" + item.id;
              detailView.style.transform = "scale(1)";
            }
          };
        }, 300);

        // Mostrar información detallada
        const detailContent = `
                    <img src="Imagenes/logo-transparente.avif" alt="" id="FondoImg" class="FondoImg">
                    <div class="descContent">
                        <h2>${item.querySelector("h3").textContent}</h2>
                        <!-- <p>${
                          item.querySelector("p:not(.price)").textContent
                        }</p> -->
                        <video autoplay muted loop>
                            <!-- <source src="Imagenes/Chori-Burguer/chori-burguer.webm" type="video/mp4"> -->
                        </video>
                        <div class="descripcion">
                            <!-- <p name="text" id="descr" class="descripcion"></p> -->
                            <p id="descr"></p>
                        </div>
                        <h1>${item.querySelector(".price").textContent}</h1>
                    </div>
                    <!-- <button class="back-button"><img src="Imagenes/close.webp" alt="" id="btnClose" class="btnClose"></button> -->
                    <div class="back-button"><button id="btnClose" class="btnClose"></button></div>
                    <div class="play-button"><button title="play" id="btnPlay" class="btnPlay" onclick="leerTexto()"></button></div>
                    <!-- <button onclick="leerTexto()">Leer texto</button> -->
                `;
        detailView.innerHTML = detailContent;
        var lklk = item.querySelector(".price");
        // Ejemplo de uso
        (async () => {
          const descripcion = await buscarDescripcion2(
            lklk.id.toLowerCase(),
            "descripciones",
            "descripciones"
          );
          const AreaDescription = document.querySelector("#descr");
          AreaDescription.textContent = descripcion;
        })();
        const video = document.querySelector("video");
        const string = item.id;
        const numero = string.match(/\d+/);
        if (video.canPlayType("video/webm; codecs=vp8,vorbis")) {
          video.src = `Videos/${numero}.webm`;
        } else if (video.canPlayType("video/mp4")) {
          video.src = `Videos/${numero}.mp4`;
        }
        //video.src = "Videos/" + numero[0] + ".webm";
        video.type = "video/mp4";
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.play();
        // Manejar el botón "Volver"
        const backButton = detailView.querySelector(".btnClose");
        backButton.addEventListener("click", () => {
          if (esTransform(detailView) > 0) {
            detailView.style.transform = "scale(0)";
          } else {
            detailView.style.transform = "scale(1)";
          }
          detailView.classList.replace("active", "final");
          setTimeout(() => {
            detailView.ontransitionend = (evento) => {
              if (
                evento.propertyName === "transform" &&
                detailView.classList.contains("final")
              ) {
                // Asegura que estamos escuchando transform
                detailView.classList.remove("final");
                detailView.innerHTML = ""; // Limpia el contenido
                item.classList.remove("hidden"); // Vuelve a mostrar el elemento
              }
            };
          }, 300);
        });
      });
    });
  }
}

/**
 * Carga el meta description desde un archivo JSON
 * @param {string} jsonPath - Ruta al archivo JSON
 * @param {string} defaultPage - Página por defecto (ej: "index")
 */

function cargarMetaDescription(
  jsonPath = "assets/descripciones.json",
  defaultPage = "index"
) {
  const metaTag = document.querySelector('meta[name="description"]');
  if (!metaTag) return;

  let page = window.location.pathname.split("/").pop().replace(".html", "");
  if (!page) page = defaultPage;

  fetch(jsonPath)
    .then((res) => res.json())
    .then((meta) => {
      if (meta.descripciones[page]) {
        metaTag.setAttribute("content", meta.descripciones[page]);
      }
    })
    .catch((err) => {
      console.error("Error cargando meta description:", err);
    });
}

function cerrarImagenesAlScroll() {
  window.addEventListener("scroll", () => {
    if (imagenExpandida) {
      cerrarImagen();
    }
    // const imgExpandida = document.querySelector(".img-expandida");
    // if (imgExpandida) {
    //   imgExpandida.classList.remove("img-expandida");
    //   imagenExpandida = false;
    // }
  });
}

function expandirImagenUnica(img, texto, precio) {
  const actual = document.querySelector(".img-expandida");
  const actualTexto = document.querySelector("h3");
  const actualPrice = document.querySelector("p");

  if (actual && actual !== img) {
    actual.classList.remove("img-expandida");
  }
  if (actualTexto && actualTexto !== texto) {
    actualTexto.classList.remove("texto-expandido");
  }
  if (actualPrice && actualPrice !== texto) {
    actualPrice.classList.remove("p-expandido");
  }

  img.classList.add("img-expandida");
  texto.classList.add("texto-expandido");
  precio.classList.remove(".price");
  precio.classList.add("p-expandido");
  imagenExpandida = true;
}
function cerrarImagen() {
  const img = document.querySelector(".img-expandida");
  const texto = document.querySelector(".texto-expandido");
  const precio = document.querySelector(".p-expandido");
  if (img) img.classList.remove("img-expandida");
  if (texto) texto.classList.remove("texto-expandido");
  if (precio) precio.classList.remove("p-expandido");
  imagenExpandida = false;
}
