function carregaDados() {

    // para usar na propria maquina
    const URL_TO_FETCH = "http://localhost:8080/apis/admin/get-tipos"

    // para usar com o live server em outro pc
    // const URL_TO_FETCH = "http://192.168.0.135:8080/apis/admin/get-tipos";

    fetch(URL_TO_FETCH, {
        method: 'GET',
        headers: { 'Authorization': `${localStorage.getItem("token")}`, }
    })
    .then(response => response.json())
    .then(result => {
        if (!$.fn.dataTable.isDataTable('#tipoDenuncia')) {
            $('#tipoDenuncia').DataTable({
                data: result,
                columns: [
                    {
                        "data": "id",
                    },
                    {
                        "data": "nome",
                    },
                    {
                        "data": 'id',
                        render: function (data, type) {
                            if (type === 'display') {

                                return `<i class="fa-solid fa-trash text-lg" onclick="deletar(${data})">
                                    </i>
                                    <!--<i class="fa-solid fa-pen-to-square text-lg" onclick="Modal(${data}, 'Alterar')">
                                    </i>-->`
                            }

                            return data;
                        },
                    },
                ],
                "ordering": false,
                "searching": false,
                "pageLength": 7,
                "lengthChange": false,
                language: {
                    "info": "Exibindo de _START_ a _END_ de _TOTAL_ registros",
                    "infoEmpty": "",
                    "emptyTable": "Nenhum Tipo de denúncia foi encontrada!",
                    oPaginate: {
                        sNext: 'Próximo',
                        sPrevious: 'Anterior',
                        sFirst: 'Primeiro',
                        sLast: 'Último',
                    }
                },
                "drawCallback": function (settings) {
                    $(".paginate_button ").on("click", () => {
                        modifica_table();
                    })
                },
                "columnDefs": [
                    {
                        "targets": 0, // your case first column
                        "className": "text-center",
                        "width": "17%"
                    },
                    {
                        "targets": 1,
                        "className": "text-left",
                        "width": "70%"
                    },
                    {
                        "targets": 2,
                        "className": "text-right",
                        "width": "13%"
                    }
                ],
                rowReorder: true,
            });
        } else {
            let tabela = $('#tipoDenuncia').DataTable();
            tabela.clear();
            tabela.rows.add(result);
            tabela.draw();
        }
    })
    .catch(err => console.log(err));
}

function novo() {
    let formulario = `
    <div style="width: 93%; margin: auto;">
        <button type="button" style="margin-bottom: 20px; padding: 5px 30px; font-weight: bold;" class="btn btn-danger" onclick="voltar()">Voltar</button>
    </div>
    <form id="tipo" name="tipo" cellspacing="0" style="width:70%; margin: auto; padding: 50px; border: 1px solid rgba(0, 0, 0, 0.074); border-radius: 10px;box-shadow: 2px 9px 8px 0px rgba(240,240,240,1);">

        <h1 style="text-align: center; margin-bottom: 40px;  color: rgb(57, 57, 212);">Novo Tipo de Denúncia</h1>

        <input type="hidden" id="id" name="id" value="">

        <!-- Text input -->
        <div class="form-outline mb-4">
            <input type="text" id="nome" name="nome" class="form-control" />
            <label class="form-label" for="titulo">Descrição
                <span style="font-weight: bold; color: red;">*</span>
            </label>
        </div>

        <!-- Submit button -->
        <div style="width: 100%;height: 70px; display: flex; justify-content: center;">
        <button type="button" onclick="enviarTipo()" class="btn btn-primary btn-lg mb-4">Enviar</button>
        </div>

        <div class="text" style="border: 2px solid rgba(72, 108, 226, 0.633); text-align: center;border-radius: 6px; display: flex; justify-content: center; align-items: center; margin: 0; padding: 7px; font-size: 15px; font-weight: bold; ">
            <p>A denúncia é a peça acusatória iniciadora da ação penal pública (condicionada ou incondicionada). Consiste na explanação de fatos, com a devida indicação de provas, que constituem, em tese, ilícito penal, junto à manifestação expressa da vontade de que seja aplicada a lei penal a quem é presumivelmente o autor da conduta, a quem se firma a pretensão punitiva</p>
        </div>
    </form>
    `
    $("body").empty()
    $("body").append(formulario)
}

function voltar() {
    document.location.reload()
}

function enviarTipo(){ 
    if(validarCampos()) {
        
        var object = {};
        let formData=new FormData(document.querySelector("#tipo"));
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        
        if(document.getElementById("id").value!=="")
        {
            object.id=document.getElementById("id").value;
            
        }
        var json = JSON.stringify(object);

        // para usar na propria maquina
        const URL_TO_FETCH = "http://localhost:8080/apis/admin/save-tipo"
        
        // para usar na outra maquina
        // const URL_TO_FETCH = "http://192.168.0.135:8080/apis/admin/save-tipo"
        
        fetch(URL_TO_FETCH, {
            method: 'POST',
            body: json,
            headers:{   'Authorization': ""+localStorage.getItem("token"),
                        "content-type":"application/json",
                    },
        })
        .then(response => response.json())
        .then(result => {
            voltar()
        })
        .catch(err => console.log(err));
    }
}

function deletar(id) {
    // para usar na propria maquina
    const URL_TO_FETCH = "http://localhost:8080/apis/admin/del-tipo/"+id;
    
    // para usar na outra maquina
    // const URL_TO_FETCH = "http://192.168.0.135:8080/apis/admin/del-tipo/"+id;
    fetch(URL_TO_FETCH, {
        method: 'GET',
        headers: { 'Authorization': `${localStorage.getItem("token")}`,}
    })
    .then(response => response.text())
    .then(result => {
        window.location.reload()
    })
    .catch(err => console.log(err));

}

function validarCampos() {
    
    if($("#tip_nome").val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Campos Necessários!',
            html: "Descrição obrigatória!",
        })
        return false;
    }
    return true;
}

$(document).ready(() => {
    carregaDados()
})