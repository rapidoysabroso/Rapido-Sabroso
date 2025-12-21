//const { event } = require("jquery");

//const imgsocial = document.querySelector('#ImgSocial');
const facebook = document.querySelector("#Facebook");
const instagram = document.querySelector("#Instagram");
const price = document.querySelectorAll(".price");
const page = document.querySelector("#page a");
const metaContent = document.querySelector('meta[name="description"]');
const ContMeta =
  "Cumen Truck ofrece una deliciosa variedad de comidas rápidas, incluyendo hamburguesas, tacos y panchos, elaborados con ingredientes frescos y de calidad. Disfruta de opciones como la Hamburguesa de Cordero con cebolla caramelizada y alioli, o el Taco Veggie con verduras salteadas, todo a precios accesibles. ¡El buen sabor te espera en Cumen Truck!";
//definimos constante plataforma
const plataforma = navigator.userAgent;
const validaUsuario = document.querySelector(".validaUsuario");
const closePopup = document.getElementById("close-popup");
const specialButton = document.getElementById("toggleMobileView");
const username = document.getElementById("username");
const password = document.getElementById("password");

//const savedTheme = localStorage.getItem("theme");
var savedTheme = "";

//definimos la funcion onload
window.onload = function () {
  metaContent.content = ContMeta;
  //creaSpecialBtn();
  //creaLoginForm();
  // savedTheme = localStorage.getItem("theme");
  // if (savedTheme === 'styles.css') {
  //     specialButton.title = 'Click para ver la versión Mobil.!';
  // } else {
  //     specialButton.title = 'Click para ver la versión de escritorio.!';
  // }
  //console.log(savedTheme)
};
//document.body.onload = cargarImg;
//Definimos la funcion que agrega los titulos a los componentes
function Titulos() {
  if (instagram.onmouseover) {
    instagram.title = 'Visitar página de Instagram de "Cumen Truck"';
  }
  if (facebook.onmouseover) {
    facebook.title = 'Visitar página de Facebook de "Cumen Truck"';
  }
  const loginPopup = document.getElementById("login-popup");
  const validaUsuario = document.querySelector(".validaUsuario");
  const closePopup = document.getElementById("close-popup");
  const specialButton = document.getElementById("toggleMobileView");
  if (loginPopup.style.display != "none") {
    if (validaUsuario.onmouseover) {
      if (validaUsuario.textContent === "Ingresar") {
        validaUsuario.title = "Click para ingresar.!";
      } else if (validaUsuario.textContent === "Cerrar sesión") {
        validaUsuario.title = "Click para cerrar.!";
      }
    }
    if (closePopup.onmouseover) {
      closePopup.title = "Click para cerrar.!";
    }
  }
  if (specialButton.onmouseover) {
    if (
      window.location.pathname.includes("about") ||
      window.location.pathname.includes("bebidas")
    ) {
      let body = document.querySelector("body");
      if (body.style.width.match("360px")) {
        specialButton.title = "Click para ver la versión de escritorio.!";
      } else {
        specialButton.title = "Click para ver la versión Mobil.!";
      }
    } else if (window.location.pathname.includes("index")) {
      if (savedTheme === "styles.css") {
        specialButton.title = "Click para ver la versión Mobil.!";
      } else {
        specialButton.title = "Click para ver la versión de escritorio.!";
      }
      // if (specialButton.onmouseover) {
      //     if (savedTheme === 'styles.css') {
      //         specialButton.title = 'Click para ver la versión Mobil.!';
      //     } else {
      //         specialButton.title = 'Click para ver la versión de escritorio.!';
      //     }
    }
  }
  //}
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
  if (destino === undefined) {
    alert("No existe el bloque destino");
  } else if (savedTheme.includes("styles-mobile-2")) {
    //
  } else {
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
//definimos la funcion que crea el boton de top para dispositivos moviles
function creaSpecialBtn() {
  let destino = "";
  if (
    window.location.pathname.includes("about") ||
    window.location.pathname.includes("bebidas")
  ) {
    destino = document.querySelector("footer");
  } else {
    destino = document.querySelector("footer");
  }
  if (destino === undefined) {
    alert("No existe el bloque destino");
    //} else if (savedTheme.includes('styles-mobile-2')) {
    //
  } else {
    let nodoBtn = document.createElement("button");
    nodoBtn.id = "toggleMobileView";
    nodoBtn.className = "hidden2";
    nodoBtn.addEventListener("click", function () {
      toggleMobileClass();
    });
    nodoBtn.addEventListener("onmouseover", function () {
      Titulos();
    });
    destino.appendChild(nodoBtn);
    // var nodo1 = document.querySelector('.top');
    // var nodoButton = document.createElement("button");
    // nodoButton.id = 'myBtn';
    // nodoButton.addEventListener('click' , topFunction);
    // nodo1.appendChild(nodoButton);
  }
}
function creaLoginForm() {
  let destino = document.querySelector("body");
  let nodoLogin = document.createElement("div");
  nodoLogin.className = "popup";
  nodoLogin.id = "login-popup";
  destino.appendChild(nodoLogin);
  const detailContent = `
        <div class="popup-content">
            <div class="cabecera">
                <!-- <span class="close-btn" id="close-popup" onmouseover="Titulos()">&times;</span> -->
                <span class="close-btn" id="close-popup" onmouseover="Titulos()"></span>
            </div>
            <h2>Iniciar Sesión</h2>
            <form class="login-form">
                <label for="username">Nombre de usuario:</label>
                <input type="text" id="username" name="username" required>
                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="password" required>
                <button type="submit" class="validaUsuario" onmouseover="Titulos()">Ingresar</button>
            </form>
        </div>
    `;
  nodoLogin.innerHTML = detailContent;
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
  if (plataforma.includes("Win") && savedTheme.includes("styles")) {
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
if (plataforma.includes("Win") && savedTheme.includes("styles.css")) {
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
} else if (
  plataforma.includes("Android") ||
  savedTheme.includes("styles-mobile-2") ||
  plataforma.includes("Win")
) {
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
      ["index", "Cumen-Truck", "Menu-Cumen-Truck", "bebidas", "about"].some(
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
//al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
  //cargarImg();
  cargarProductos();
  //por cada elemento dentro de la constante "price", realizamos la busqueda del "id"
  //dentro del array "precios".
  //una vez localizado el ID del elemento, dentro del array PRICE, colocamos el valor del mismo
  //dentro del "TEXTCONTENT" del elemento.
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
  if (
    esMovil() ||
    savedTheme.includes("styles-mobile-2") ||
    plataforma.includes("Win")
  ) {
    if (window.location.pathname.includes("about")) {
      //
    } else if (savedTheme.includes("styles-mobile-2")) {
      //creaTop();
    } else {
      creaTop();
    }
    //creaTop();
    const mybutton = document.getElementById("myBtn");
    const menuItems = document.querySelectorAll(".menu-item");
    const detailView = document.createElement("div");
    detailView.id = "details";
    detailView.className = "detail-view";
    //document.querySelector('main').appendChild(detailView);
    document.querySelector(".menu-section").appendChild(detailView);

    if (
      [
        "bebidas",
        "Cumen-Truck/bebidas",
        "Menu-Cumen-Truck/bebidas",
        "about",
      ].some((path) => window.location.pathname.includes(path))
    ) {
    } else if (
      ["index", "Cumen-Truck", "Menu-Cumen-Truck"].some((path) =>
        window.location.pathname.includes(path)
      )
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
          //itemid.classList.add('hidden');
          let menuItemsArray = Array.from(menuItems);
          menuItemsArray.forEach((menuclass) => {
            if (menuclass.classList.contains("hidden")) {
              detailView.classList.remove("active");
              menuclass.classList.remove("hidden"); // Mostrar el elemento
            } //else {
            //itemid.classList.add('hidden'); // Ocultar el elemento
            //}
          });
          itemid.classList.add("hidden");

          setTimeout(() => {
            item.ontransitionend = (evento) => {
              if (
                evento.propertyName === "transform" &&
                item.classList.contains("hidden")
              ) {
                // Asegura que estamos escuchando transform
                //if (classi == 'ok'){
                detailView.classList.add("active");
                detailView.id = "details-" + item.id;
                //lalalala(detailView);
                detailView.style.transform = "scale(1)";
                //}
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
          video.src = "Videos/" + numero[0] + ".webm";
          //video.src = 'Videos/' + numero[0] + '.mp4';
          video.type = "video/mp4";
          video.autoplay = true;
          video.muted = true;
          video.loop = true;
          video.play();
          // Manejar el botón "Volver"
          //const backButton = detailView.querySelector('.back-button');
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
    } //else if (['bebidas', 'Cumen-Truck/bebidas'].some(path => window.location.pathname.includes(path))) {
    //
    //}
    //
  }
});
//definimos la funcion para cargar los precios
function CargaPrecios() {
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
  //console.log(resultado);
  //console.log(`ScaleX: ${escalaX}, ScaleY: ${escalaY}`);
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
      "https://drive.google.com/thumbnail?id=1UfPrutLsxYQr52bRgDICUiTtRvd07ylU&sz=w1280";
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
  //const menu = document.querySelector(".menu");
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
//const menuItems = document.querySelectorAll('.menu-item');

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

// document.getElementById('toggleMobileView').addEventListener( "mouseover", function() {
// //specialButton.addEventListener("mouseover", function() {
//     if (savedTheme) {
//         //console.log(savedTheme);
//     }
// });

// Mostrar el pop-up al hacer doble clic en el área del footer
function show() {
  const loginForm = document.querySelector(".login-form");
  const footerArea = document.getElementById("footer-area");
  const loginPopup = document.getElementById("login-popup");
  const validaUsuario = document.querySelector(".validaUsuario");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const closePopup = document.getElementById("close-popup");
  let usuario = localStorage.getItem("username");
  let clave = localStorage.getItem("password");
  footerArea.addEventListener("dblclick", () => {
    loginPopup.style.display = "block";
    if (usuario && clave) {
      username.value = usuario;
      password.value = clave;
      validaUsuario.focus();
    } else {
      username.focus();
    }
  });
  // Cerrar el pop-up al hacer clic en la 'x'
  closePopup.addEventListener("click", () => {
    loginPopup.style.display = "none";
  });
  // Cerrar el pop-up al hacer clic fuera de él
  window.addEventListener("click", (event) => {
    if (event.target === loginPopup) {
      loginPopup.style.display = "none";
    }
  });
  loguear(event);
  // loginForm.addEventListener('submit', (event) => {
  //     if (validaUsuario.textContent === 'Ingresar') {
  //         iniciarSesion(event);
  //     } else {
  //         cerrarSesion(event);
  //     }
  // });
}

document.addEventListener("DOMContentLoaded", () => {
  creaLoginForm();
  creaSpecialBtn();
  const footerArea = document.getElementById("footer-area");
  const loginPopup = document.getElementById("login-popup");
  const loginForm = document.querySelector(".login-form");
  //const closePopup = document.getElementById('close-popup');
  const validaUsuario = document.querySelector(".validaUsuario");
  const closePopup = document.getElementById("close-popup");
  const specialButton = document.getElementById("toggleMobileView");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  //let sesion = localStorage.getItem('sesion');
  let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  let usuario = localStorage.getItem("username");
  let clave = localStorage.getItem("password");

  // Mostrar el pop-up al hacer doble clic en el área del footer
  // function show() {
  //     footerArea.addEventListener('dblclick', () => {
  //         loginPopup.style.display = 'block';
  //         if (usuario && clave) {
  //             username.value = usuario;
  //             password.value = clave;
  //             validaUsuario.focus();
  //         } else {
  //             username.focus();
  //         }
  //     });
  // }
  show();
  // Cerrar el pop-up al hacer clic en la 'x'
  closePopup.addEventListener("click", () => {
    loginPopup.style.display = "none";
  });

  // Cerrar el pop-up al hacer clic fuera de él
  window.addEventListener("click", (event) => {
    if (event.target === loginPopup) {
      loginPopup.style.display = "none";
    }
  });

  // Cerrar el pop-up al hacer clic fuera de él
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && loginPopup.style.display === "block") {
      loginPopup.style.display = "none";
    }
    // if (event.target === loginPopup) {
    //     loginPopup.style.display = 'none';
    // }
  });

  function iniciarSesion(event) {
    event.preventDefault();
    const username2 = username.value;
    const password2 = password.value;
    // Credenciales estáticas
    const validUsername = "admin";
    const validPassword = "1234";
    if (username2 === validUsername && password2 === validPassword) {
      isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username2);
      localStorage.setItem("password", password2);
      specialButton.disabled = false;
      specialButton.classList.toggle("active2");
      validaUsuario.textContent = "Cerrar sesión";
      loginPopup.style.display = "none";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  }

  function cerrarSesion(event) {
    event.preventDefault();
    localStorage.removeItem("isLoggedIn");
    isLoggedIn = false;
    validaUsuario.textContent = "Ingresar";
    specialButton.disabled = true;
    specialButton.classList.toggle("active2");
    loginPopup.style.display = "none";
  }

  loginForm.addEventListener("submit", (event) => {
    if (validaUsuario.textContent === "Ingresar") {
      iniciarSesion(event);
    } else {
      cerrarSesion(event);
    }
  });
  // Mantener sesión activa si está guardada en localStorage
  if (localStorage.getItem("isLoggedIn") === "true") {
    validaUsuario.textContent = "Cerrar sesión";
    specialButton.disabled = false;
    specialButton.classList.add("active2");
  }
});

function loguear(event) {
  const loginForm = document.querySelector(".login-form");
  const validaUsuario = document.querySelector(".validaUsuario");
  loginForm.addEventListener("submit", (event) => {
    if (validaUsuario.textContent === "Ingresar") {
      iniciarSesion(event);
    } else {
      cerrarSesion(event);
    }
  });
}

function iniciarSesion(event) {
  event.preventDefault();
  const footerArea = document.getElementById("footer-area");
  const loginPopup = document.getElementById("login-popup");
  const loginForm = document.querySelector(".login-form");
  //const closePopup = document.getElementById('close-popup');
  const validaUsuario = document.querySelector(".validaUsuario");
  const closePopup = document.getElementById("close-popup");
  const specialButton = document.getElementById("toggleMobileView");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  //let sesion = localStorage.getItem('sesion');
  let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  let usuario = localStorage.getItem("username");
  let clave = localStorage.getItem("password");
  const username2 = username.value;
  const password2 = password.value;
  // Credenciales estáticas
  const validUsername = "admin";
  const validPassword = "1234";
  if (username2 === validUsername && password2 === validPassword) {
    isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username2);
    localStorage.setItem("password", password2);
    specialButton.disabled = false;
    specialButton.classList.toggle("active2");
    validaUsuario.textContent = "Cerrar sesión";
    loginPopup.style.display = "none";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

function cerrarSesion(event) {
  event.preventDefault();
  const footerArea = document.getElementById("footer-area");
  const loginPopup = document.getElementById("login-popup");
  const loginForm = document.querySelector(".login-form");
  //const closePopup = document.getElementById('close-popup');
  const validaUsuario = document.querySelector(".validaUsuario");
  const closePopup = document.getElementById("close-popup");
  const specialButton = document.getElementById("toggleMobileView");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  //let sesion = localStorage.getItem('sesion');
  let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  let usuario = localStorage.getItem("username");
  let clave = localStorage.getItem("password");
  const username2 = username.value;
  const password2 = password.value;
  // Credenciales estáticas
  const validUsername = "admin";
  const validPassword = "1234";
  localStorage.removeItem("isLoggedIn");
  isLoggedIn = false;
  validaUsuario.textContent = "Ingresar";
  specialButton.disabled = true;
  specialButton.classList.toggle("active2");
  loginPopup.style.display = "none";
}
const specialButton2 = document.getElementById("toggleMobileView");
function toggleMobileClass() {
  if (
    window.location.pathname.includes("about") ||
    window.location.pathname.includes("bebidas")
  ) {
    let body = document.querySelector("body");
    if (body.style.width.match("360px")) {
      //if (window.matchMedia("(max-width: 501px)").matches) {
      //document.body.classList.add("mobile-style");
      //body.style.removeProperty("width");
      //specialButton2.title = 'Click para ver la versión Mobil.!';
      document.querySelector("body").style.removeProperty("width");
    } else {
      //document.body.classList.remove("mobile-style");
      //specialButton2.title = 'Click para ver la versión de escritorio.!';
      body.style.width = "360px";
    }
  } else if (window.location.pathname.includes("index")) {
    //
  }
}

specialButton2.addEventListener("click", function () {
  let stylesheet = document.getElementById("stylePage");
  let currentTheme = stylesheet.getAttribute("href");

  if (window.location.pathname.includes("bebidas")) {
    currentTheme = "styles3.css";
    if (currentTheme === "styles3.css") {
      toggleMobileClass();
      //stylesheet.setAttribute("href", "styles-mobile-2.css");
      //this.textContent = "Activar Modo Escritorio";
      //localStorage.setItem("theme", "styles-mobile-2.css");
      //document.getElementById("toggleMobileView").title = 'Click para ver la versión de escritorio.!';
    } else {
      stylesheet.setAttribute("href", "styles.css");
      //this.textContent = "Activar Modo Mobile";
      this.textContent = "";
      localStorage.setItem("theme", "styles.css");
      document.getElementById("toggleMobileView").title =
        "Click para ver la versión Mobil.!";
    }
  }
  if (window.location.pathname.includes("about")) {
    currentTheme = "styles2.css";
    toggleMobileClass();
  }
  if (window.location.pathname.includes("index")) {
    currentTheme = "styles.css";
    if (currentTheme === "styles.css") {
      stylesheet.setAttribute("href", "styles-mobile-2.css");
      //this.textContent = "Activar Modo Escritorio";
      localStorage.setItem("theme", "styles-mobile-2.css");
      document.getElementById("toggleMobileView").title =
        "Click para ver la versión de escritorio.!";
    } else {
      stylesheet.setAttribute("href", "styles.css");
      //this.textContent = "Activar Modo Mobile";
      this.textContent = "";
      localStorage.setItem("theme", "styles.css");
      document.getElementById("toggleMobileView").title =
        "Click para ver la versión Mobil.!";
    }
  }
});
