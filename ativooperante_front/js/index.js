function logar() {
    window.location.href = "/ativooperante_front/view/menu.html";
}



$(document).ready(function () {
    document.querySelector("#modalCadastrar").addEventListener('shown.bs.modal', function () {
        myInput.focus()
    })    
});
    
function Cadastrar() {
        var object = {};
        let formData=new FormData(document.querySelector("#formCadUsuario"));
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        
        if(document.getElementById("id").value!=="")
        {
            object.id=document.getElementById("id").value;
        }
        console.log(object["cpf"])
        object["cpf"] = $("#cpf").val().replaceAll(".","").replace("-","")
        var json = JSON.stringify(object);
        console.log(json)
        const URL_TO_FETCH = "http://localhost:8080/apis/cidadao/add-usuario"
        
        fetch(URL_TO_FETCH, {
            method: 'POST',
            body: json,
            headers:{"content-type":"application/json"},
        })
        .then(response => response.json())
        .then(result => {
            window.parent.close()
            Swal.fire({
                toast: true,
                icon: 'success',
                title: 'Cadastrado com sucesso!',
                showConfirmButton: false,
                timer: 1400,
                timerProgressBar: true,
                position: 'top-right',
            })
        })
        .catch(err => console.log(err));
}





function mCpf() {
    var cpf = event.target.value;
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    event.target.value = cpf;
}

function formataCPF() {
    $("#CPF").keydown(function (e) {
        var key = e.which || e.keyCode || e.charCode;
        if (key != 8) {
            let cpf = $("#CPF").val();

            cpf = cpf.replace(/\D/g, "");
            cpf = cpf.replace(/^(\d{3})/g, "$1.");
            cpf = cpf.replace(/(\d{3})(\d{3})/g, "$1.$2-");


            $("#cpf").val(cpf);
        }
    });
    $("#cpf").blur(function (e) {
        let cpf = $("#CPF").val();
        cpf = cpf.replace(/[^\d|\.|-]/g, "");
        $("#CPF").val(cpf);
    });
}