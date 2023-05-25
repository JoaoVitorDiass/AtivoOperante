function EnviarDenuncia() {
    document.getElementById("mainIframe").src = "/ativooperante_front/view/enviarDenuncia.html"
}
function MinhasDenuncias() {
    document.getElementById("mainIframe").src = "/ativooperante_front/view/minhasDenuncias.html"
}
function TipoDenuncia() {
    document.getElementById("mainIframe").src = "/ativooperante_front/view/tipoDenuncia.html"
}
function Orgaos() {
    document.getElementById("mainIframe").src = "/ativooperante_front/view/orgaos.html"
}

$(document).ready(() => {
    $(".nav-link").on('click', () =>{ 
        let iframe = document.getElementById("mainIframe")
        iframe.classList.add("shadow")
        iframe.classList.add("p-3")
        iframe.classList.add(" mb-5")
        iframe.classList.add("bg-white")
        iframe.classList.add("rounded")
    })
})