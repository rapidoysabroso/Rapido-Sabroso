function esDispositivoMovil() {
    return /Android|iPhone|iPad|iPod|Windows Phone|webOS|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent);
}

async function esMovil2() {
    if (navigator.userAgentData) {
        const datos = await navigator.userAgentData.getHighEntropyValues(["platform"]);
        return datos.platform === "Android" || datos.platform === "Win";
    }
    return esDispositivoMovil(); // Fallback si `userAgentData` no está disponible
}

document.addEventListener("DOMContentLoaded", async () => {
    const head = document.head;
    let link = document.getElementById("stylePage");

    if (!link) {
        link = document.createElement("link");
        link.id = "stylePage";
        link.rel = "stylesheet";
        head.appendChild(link);
    }

    //const esMovil = await esMovil2();
    //link.href = esMovil ? "styles-mobile.css" : "styles.css";
    esMovil2().then(esMovil => {
        link.href = esMovil ? "styles-mobile.css" : "styles.css";
    });

    // Cambiar el logo
    const logo = document.querySelector("#Logo");
    if (logo) {
        logo.src = esMovil ? "Imagenes/logo-transparente-266x100.avif" : "Imagenes/logo-transparente.avif";
    }
});
