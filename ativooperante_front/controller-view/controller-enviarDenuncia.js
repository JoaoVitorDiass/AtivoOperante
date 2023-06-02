function enviarDenuncia() {
    if(!validarFormulario()) {
        
        // para usar na propria maquina
        const URL_TO_FETCH = "http://localhost:8080/apis/cidadao/add-denuncia";

        // para usar com o live server em outro pc
        // const URL_TO_FETCH = "http://192.168.0.135:8080/apis/cidadao/add-denuncia";

        let json2 = `
        {
            "data": "${$("#data").val()}",
            "feedback": null,
            "id": null,
            "orgao": {
                "id": ${$("#orgao").val()},
                "nome": "${document.querySelector("#orgao").options[document.querySelector("#orgao").selectedIndex].innerHTML}"
            },
            "texto": "${$("#texto").val()}",
            "tipo": {
                "id": ${$("#tipo").val()},
                "nome": "${document.querySelector("#tipo").options[document.querySelector("#tipo").selectedIndex].innerHTML}"
            },
            "titulo": "${$("#titulo").val()}",
            "urgencia": ${$("#urgencia").val()},
            "usuario": {
                "cpf": null,
                "email": null,
                "id": ${localStorage.getItem("id")},
                "nivel": ${localStorage.getItem("nivel")},
                "senha": null
            }
        }`
        
        console.log(denuncia)
        fetch(URL_TO_FETCH, {
            method: 'POST',
            body: json2,
            headers:{"content-type":"application/json",
                    'Authorization': `${localStorage.getItem("token")}`},
        })
        .then(response => response.text())
        .then(result => {
            console.log(result)
            location.reload()
        })
        .catch(err => console.log(err));
    }
}
function validarFormulario() {
    let msg = "";
    let flag = false;

    // return flag;
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
    return flag;
}

function CarregarFormulario() {
    let selectOrgao = $("#orgao");
    let selectTipo  = $("#tipo");

    // para usar na propria maquina
    const URL_ORGAO = "http://localhost:8080/apis/cidadao/get-orgaos";
    const URL_TIPO =  "http://localhost:8080/apis/cidadao/get-tipos";

    // para usar com o live server em outro pc
    // const URL_ORGAO = "http://192.168.0.135:8080/apis/cidadao/get-orgaos";
    // const URL_TIPO =  "http://192.168.0.135:8080/apis/cidadao/get-tipos";

    fetch(URL_ORGAO, {
        method: 'GET',
        headers: { 'Authorization': `${localStorage.getItem("token")}`, }
    })
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            selectOrgao.append(`<option value='${element.id}'>${element.nome}</option>`)
        });
        fetch(URL_TIPO, {
            method: 'GET',
            headers: { 'Authorization': `${localStorage.getItem("token")}`, }
        })
        .then(response => response.json())
        .then(result => {
            result.forEach(element => {
                selectTipo.append(`<option value='${element.id}'>${element.nome}</option>`)
            });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

$(document).ready(() => {
    CarregarFormulario()
})