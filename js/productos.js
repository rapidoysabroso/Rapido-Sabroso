async function cargarProductos() {
  const contenedor = document.getElementById("menu-section");

  try {
    const res = await fetch("assets/productos.json");
    const data = await res.json();

    data.productos.forEach((prod, index) => {
      const article = document.createElement("article");
      article.className = "menu-item";
      article.id = `logo-item${index}`;

      article.innerHTML = `
                <img src="Imagenes/${prod.carpeta}/${prod.imagenes.principal}" class="${prod.id}">
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
    CargaPrecios();
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}
