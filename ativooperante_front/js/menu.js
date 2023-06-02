function EnviarDenuncia() {
    document.getElementById("mainIframe").src = "enviarDenuncia.html"
}
function MinhasDenuncias() {
    document.getElementById("mainIframe").src = "minhasDenuncias.html"
}
function TipoDenuncia() {
    document.getElementById("mainIframe").src = "tipoDenuncia.html"
}
function Orgaos() {
    document.getElementById("mainIframe").src = "orgaos.html"
}
function Usuarios() {
    document.getElementById("mainIframe").src = "usuarios.html"
}

function logout() {
    localStorage.removeItem("token")
    window.location.href = "../index.html"
}
function verificaPermissoes() {
    const nivel = localStorage.getItem("nivel")
    if(nivel > 1){
        $("#denuncias").hide()
        $("#tiposDenucia").hide()
        $("#orgaos").hide()
    }
}

$(document).ready(() => {
    $(".nav-link").on('click', () =>{ 
        let iframe = document.getElementById("mainIframe")
        iframe.classList.add("shadow")
        iframe.classList.add("p-3")
        iframe.classList.add("mb-5")
        iframe.classList.add("bg-white")
        iframe.classList.add("rounded")
    })
    verificaPermissoes()
})