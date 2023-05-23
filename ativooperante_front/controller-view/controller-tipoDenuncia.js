function carregaDados() {

    // para usar na propria maquina
    const URL_TO_FETCH = "http://localhost:8080/apis/admin/get-tipos"

    // para usar com o live server em outro pc
    // const URL_TO_FETCH = "http://localhost:8080/apis/admin/get-tipos";

    fetch(URL_TO_FETCH, {
        method: 'GET',
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
                                    <i class="fa-solid fa-pen-to-square text-lg" onclick="Modal(${data}, 'Alterar')">
                                    </i>`
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
                    "infoEmpty": "0 Registros de Clientes",
                    "emptyTable": "Nenhum cliente foi encontrado!",
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
    <div style="width: 86%; margin: auto;">
        <button type="button" style="margin-bottom: 20px; padding: 5px 30px; font-weight: bold;" class="btn btn-danger" onclick="voltar()">Voltar</button>
    </div>
    <form id="tipo" name="tipo" cellspacing="0" style="width:50%; margin: auto; margin-top: 50px">

        <h1 style="text-align: center; margin-bottom: 40px;">Novo Tipo de Denúncia</h1>

        <!-- Text input -->
        <div class="form-outline mb-4">
            <input type="text" id="tip_nome" name="tip_nome" class="form-control" />
            <label class="form-label" for="titulo">Descrição
                <span style="font-weight: bold; color: red;">*</span>
            </label>
        </div>

        <!-- Submit button -->
        <button type="button" onclick="enviarTipo()" class="btn btn-primary btn-block mb-4">Enviar</button>
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
        let tipo = `{
            "tip_id":    "",
            "tip_nome":  "${$("#tip_nome").val()}"
        }`
        let json = JSON.parse(tipo)

        console.log(json)
        // para usar na propria maquina
        const URL_TO_FETCH = "http://localhost:8080/apis/admin/save-tipo"

        fetch(URL_TO_FETCH, {
            method: 'POST',
            body: json,
        })
        .then(response => response.text())
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err));
    }
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