function enviarDenuncia() {
    if(!validarFormulario()) {
        
        // para usar na propria maquina
        const URL_TO_FETCH = "http://localhost:8080/apis/cidadao/add-denuncia";

        // para usar com o live server em outro pc
        // const URL_TO_FETCH = "http://192.168.0.135:8080/apis/cidadao/add-denuncia";


        let json = `{
            "id":       "",
            "titulo":   "${$("#titulo").val()}",
            "texto":    "${$("#texto").val()}",
            "urgencia": "${$("#urgencia").val()}",
            "data":     "${$("#data").val()}",
            "orgao":    {
                "id":   "${$("#orgao").val()}",
                "nome": "${document.querySelector("#orgao").options[document.querySelector("#orgao").selectedIndex].innerHTML}"
            },
            "tipo":     {
                "id":   "${$("#tipo").val()}",
                "nome": "${document.querySelector("#tipo").options[document.querySelector("#tipo").selectedIndex].innerHTML}"
            },
            "usuario":  {
                "id":   "1",
                "cpf":  "",
                "email":"",
                "senha":"",
                "nivel":""
            },
            "feedback": null
        }`

        let json2 = `
        [
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
                    "cpf": 47369606805,
                    "email": "JOOVITOR@GMAIL.COM",
                    "id": 2,
                    "nivel": 1,
                    "senha": 123
                }
            }
        ]`
        
        let denuncia = JSON.parse(json)
        
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
    })
    .catch(err => console.log(err));
    fetch(URL_TIPO, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            selectTipo.append(`<option value='${element.id}'>${element.nome}</option>`)
        });
    })
    .catch(err => console.log(err));
}

$(document).ready(() => {
    CarregarFormulario()
})