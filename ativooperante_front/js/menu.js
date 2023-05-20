function EnviarDenuncia() {
    let iframe = document.getElementById("mainIframe")
    iframe.src = "/ativooperante_front/view/enviarDenuncia.html"
    iframe.classList.add("shadow")
    iframe.classList.add("p-3")
    iframe.classList.add(" mb-5")
    iframe.classList.add("bg-white")
    iframe.classList.add("rounded")
}