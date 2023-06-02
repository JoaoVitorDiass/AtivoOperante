function logar() {
    if(validaCamposLogin()){
        
        localStorage.clear()
        const URL_TO_FETCH = "http://localhost:8080/security/logar?email="+$("#emailLogin").val()+"&senha="+$("#senhaLogin").val()
        fetch(URL_TO_FETCH, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(result => {
            
            if(result != "Usuario não aceito"){
                localStorage.setItem("token",result[0]) // token
                localStorage.setItem("nivel",result[1]) // nivel
                localStorage.setItem("id",result[2])    // id

                if($("#flexCheckChecked").is(":checked")){
                    localStorage.setItem("login",$("#emailLogin").val())
                }
                window.location.href = "view/menu.html";
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Dados inválidos!'
                })
            }
        })
        .catch(err => console.log(err));
    }
}


function Cadastrar() {

    if(validaCamposCadastro()) {
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

        // const URL_TO_FETCH = "http://192.168.0.135:8080/apis/security/add-usuario"
        
        const URL_TO_FETCH = "http://localhost:8080/security/add-usuario"
        
        fetch(URL_TO_FETCH, {
            method: 'POST',
            body: json,
            headers:{"content-type":"application/json"},
        })
        .then(response => response.json())
        .then(result => {

            $("#email").val("")
            $("#senha").val("")
            $("#cpf").val("")
            $('.btn-close').trigger('click');
            Swal.fire({
                toast: true,
                icon: 'success',
                title: 'Cadastrado com sucesso!',
                showConfirmButton: false,
                timer: 1800,
                timerProgressBar: true,
                position: 'top-right',
            })
            
        })
        .catch(err => console.log(err));
    }
}

function validaCamposLogin(){ 
    let flag = true;
    let msg = "";

    if($("#emailLogin").val() == "") {
        flag = false
    }
    if($("#senhaLogin").val() == "") {
        flag = false
    }
    if(!flag){
        Swal.fire({
            icon: 'error',
            title: 'Dados inválidos!'
        })
    }
    return flag;
}

function validaCamposCadastro() {
    let flag = true;
    let msg = "";

    if($("#email").val() == "" || !validaEmail()) {
        flag = false
        msg += "Email inválido!<br>"
    }
    if($("#senha").val() == ""){
        flag = false
        msg += "Senha Obrigatória!<br>"
    }
    if($("#cpf").val() == "" || !validaCpf()){
        flag = false
        msg += "CPF inválido!<br>"
    }
    if(!flag) {
        Swal.fire({
            icon: 'error',
            title: 'Dados inválidos!',
            html: msg,
        })
    }
    return flag
}
function validaEmail(){
    return $("#email").val().indexOf("@") != -1 && $("#email").val().indexOf(".com") != -1;
}
function validaCpf() {
    var cpf = $("#cpf").val();
    var ok = 1;
    var add;

    if (cpf != "") {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
                ok = 0;

        if (ok == 1) {
            add = 0;
            for (i = 0; i < 9; i++)
                add += parseInt(cpf.charAt(i)) * (10 - i);
                rev = 11 - (add % 11);
                if (rev == 10 || rev == 11)
                rev = 0;
                if (rev != parseInt(cpf.charAt(9)))
                ok = 0;
                if (ok == 1) {
                add = 0;
                for (i = 0; i < 10; i++)
                    add += parseInt(cpf.charAt(i)) * (11 - i);
                rev = 11 - (add % 11);
                if (rev == 10 || rev == 11)
                    rev = 0;
                if (rev != parseInt(cpf.charAt(10)))
                    ok = 0;
                }
        }
        return ok == 1;
    }
}

function mCpf() {
    var cpf = event.target.value;
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    event.target.value = cpf;
}

$(document).ready(function () {

    document.querySelector("#modalCadastrar").addEventListener('shown.bs.modal', function () {
        myInput.focus()
    })    

    // $('.btn-close').on('click',() => {
        $("#senha").val("") 
        $("#email").val("") 
        $("#cpf").val("") 
    // });

    if(localStorage.getItem("login") != null) {
        let a = document.getElementById("flexCheckChecked")
        a.checked = true
        $("#emailLogin").val(localStorage.getItem("login"))
    }
});
    