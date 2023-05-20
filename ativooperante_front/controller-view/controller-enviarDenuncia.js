function enviarDenuncia() {
    if(validarFormulario()) {

        let formData = new FormData($("#formEnviarDenuncia"));

        const URL_TO_FETCH = "localhost:8080/";
        fetch(URL_TO_FETCH, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err));
    }
}
function validarFormulario() {
    let msg = "";
    let flag = false;

    if($("#titulo").val() == "") {
        msg += "Titulo obrigatório!<br>";
        flag = true;
    }
    if($("#orgao").val() == "") {
        msg += "Orgão obrigatório!<br>";
        flag = true;
    }
    if($("#urgencia").val() == "") {
        msg += "Urgencia obrigatório!<br>";
        flag = true;
    }
    if($("#tipo").val() == "") {
        msg += "Tipo obrigatório!<br>";
        flag = true;
    }
    if($("#data").val() == "") {
        msg += "Data obrigatório!<br>";
        flag = true;
    }
    if($("#texto").val() == "") {
        msg += "Texto obrigatório!<br>";
        flag = true;
    }
    
    if(flag) {
        Swal.fire({
            icon: 'error',
            title: 'Campos Necessários!',
            html: msg,
        })
    }
}