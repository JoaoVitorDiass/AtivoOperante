function carregaDados() {

    if(localStorage.getItem("nivel") == 1) {
        consultaAdmin() 
    }
    else {
        consultaUsuario()
    }
}
function consultaAdmin() {
    const URL_TO_FETCH = "http://localhost:8080/apis/admin/get-denuncias-all";
    
    fetch(URL_TO_FETCH, {
        method: 'GET',
        headers: { 'Authorization': `${localStorage.getItem("token")}`, }
    })
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            switch(element.urgencia) {
                case 1: element.urgencia = "Normal"; break;
                case 2: element.urgencia = "Medio"; break;
                case 3: element.urgencia = "Urgente"; break;
                case 4: element.urgencia = "Extremamente urgente"; break;
            }
        });
        if (!$.fn.dataTable.isDataTable('#denuncias')) {
            $('#denuncias').DataTable({
                data: result,
                columns: [
                    {
                        "data": "id",
                    },
                    {
                        "data": "titulo",
                    },
                    {
                        "data": "urgencia",
                    },
                    {
                        "data": "orgao.nome",
                    },
                    {
                        "data": "tipo.nome",
                    },
                    {
                        "data": "data",
                    },
                    {
                        "data": 'id',
                        render: function (data, type) {
                            if (type === 'display') {
                                let html = `<i class="fa-solid fa-trash text-lg" onclick="deletar(${data})"></i>  `
                                html +=    `<i class="fa-solid fa-comment-dots text-lg" onclick="feedback(${data})"></i>`


                                return html
                            }
    
                            return data;
                        },
                    },
                ],
                "ordering": false,
                "searching": false,
                "pageLength": 10,
                "lengthChange": false,
                language: {
                    "info": "Exibindo de _START_ a _END_ de _TOTAL_ registros",
                    "infoEmpty": "",
                    "emptyTable": "Nenhuma denúncia foi encontrada!",
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
                        "width": "5%"
                    },
                    {
                        "targets": 1,
                        "className": "text-left",
                        "width": "30%"
                    },
                    {
                        "targets": 2,
                        "className": "text-center",
                        "width": "20%"
                    },
                    {
                        "targets": 3,
                        "className": "text-center",
                        "width": "10%"
                    },
                    {
                        "targets": 4,
                        "className": "text-center",
                        "width": "10%"
                    }
                    ,
                    {
                        "targets": 5,
                        "className": "text-center",
                        "width": "15%"
                    },
                    {
                        "targets": 6,
                        "className": "text-center",
                        "width": "10%"
                    }
                ],
                rowReorder: true,
            });
        } else {
            let tabela = $('#denuncias').DataTable();
            tabela.clear();
            tabela.rows.add(result);
            tabela.draw();
        }
    })
    .catch(err => console.log(err));
}
function consultaUsuario() {
    const URL_TO_FETCH = "http://localhost:8080/apis/cidadao/get-denuncia/"+localStorage.getItem("id");
    fetch(URL_TO_FETCH, {
        method: 'GET',
        headers: { 'Authorization': `${localStorage.getItem("token")}`, }
    })
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            switch(element.urgencia) {
                case 1: element.urgencia = "Normal"; break;
                case 2: element.urgencia = "Medio"; break;
                case 3: element.urgencia = "Urgente"; break;
                case 4: element.urgencia = "Extremamente urgente"; break;
            }
        });
        if (!$.fn.dataTable.isDataTable('#denuncias')) {
            $('#denuncias').DataTable({
                data: result,
                columns: [
                    {
                        "data": "id",
                    },
                    {
                        "data": "titulo",
                    },
                    {
                        "data": "urgencia",
                    },
                    {
                        "data": "orgao.nome",
                    },
                    {
                        "data": "tipo.nome",
                    },
                    {
                        "data": "data",
                    },
                    {
                        "data": 'id',
                        render: function (data, type) {
                            if (type === 'display') {
                                let html = `<i class="fa-solid fa-comment-dots text-lg" onclick="feedback(${data})"></i>`
                                return html
                            }
    
                            return data;
                        },
                    },
                ],
                "ordering": false,
                "searching": false,
                "pageLength": 10,
                "lengthChange": false,
                language: {
                    "info": "Exibindo de _START_ a _END_ de _TOTAL_ registros",
                    "infoEmpty": "",
                    "emptyTable": "Nenhuma denúncia foi encontrada!",
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
                        "width": "5%"
                    },
                    {
                        "targets": 1,
                        "className": "text-left",
                        "width": "30%"
                    },
                    {
                        "targets": 2,
                        "className": "text-center",
                        "width": "20%"
                    },
                    {
                        "targets": 3,
                        "className": "text-center",
                        "width": "10%"
                    },
                    {
                        "targets": 4,
                        "className": "text-center",
                        "width": "10%"
                    }
                    ,
                    {
                        "targets": 5,
                        "className": "text-center",
                        "width": "15%"
                    },
                    {
                        "targets": 6,
                        "className": "text-center",
                        "width": "10%"
                    }
                ],
                rowReorder: true,
            });
        } else {
            let tabela = $('#denuncias').DataTable();
            tabela.clear();
            tabela.rows.add(result);
            tabela.draw();
        }
    })
    .catch(err => console.log(err));
}

function deletar(id) {
    // para usar na propria maquina
    const URL_TO_FETCH = "http://localhost:8080/apis/admin/del-denuncia/"+id
    
    // para usar na outra maquina
    // const URL_TO_FETCH = "http://192.168.0.135:8080/apis/admin/del-denuncia/"+id
    fetch(URL_TO_FETCH, {
        method: 'GET',
        headers: { 'Authorization': `${localStorage.getItem("token")}`, }
    })
    .then(response => response.text())
    .then(result => {
        window.location.reload()
    })
    .catch(err => console.log(err));
}

function feedback(id) {

    $("body").empty()

    let formulario = `
    <div style="width: 86%; margin: auto;">
        <button type="button" style="margin-bottom: 20px; padding: 5px 30px; font-weight: bold;" class="btn btn-danger" onclick="voltar()">Voltar</button>
    </div>
    <form id="tipo" name="tipo" cellspacing="0" style="width:50%; margin: auto; margin-top: 50px">

        <h1 style="text-align: center; margin-bottom: 40px;">Enviar Feedback</h1>

        <input type="hidden" id="id" name="id" value="">

        <div class="form-outline mb-4">
        <textarea class="form-control" id="texto" name="texto" rows="4"></textarea>
            <label class="form-label" for="titulo">Descrição
                <span style="font-weight: bold; color: red;">*</span>
            </label>
        </div>

        <!-- Submit button -->
        <button type="button" onclick="enviarFeedback(${id})" class="btn btn-primary btn-block mb-4">Enviar</button>
    </form>`

    const URL_TO_FETCH = "http://localhost:8080/apis/cidadao/get-denuncia-id/"+id
    fetch(URL_TO_FETCH, {
        method: 'GET',
        headers: { 'Authorization': `${localStorage.getItem("token")}`, }
    })
    .then(response => response.json())
    .then(result => {
        if(result.feedback == null && localStorage.getItem("nivel") == 1){
            $("body").append(formulario)
        }
        else {
            carregaDenuncia(result)
        }
    })
    .catch(err => console.log(err));
    
}
function enviarFeedback(id) {
    const URL_TO_FETCH = `http://localhost:8080/apis/admin/add-feedback/${id}/${btoa($("#texto").val())}`
    fetch(URL_TO_FETCH, {
        method: 'GET',
        headers: { 'Authorization': `${localStorage.getItem("token")}`, }
    })
    .then(response => response.text())
    .then(result => {
        window.location.reload()
    })
    .catch(err => console.log(err));
}
function carregaDenuncia(result) {
    let html = `
    <div style="width: 86%; margin: auto;">
        <button type="button" style="padding: 5px 30px; font-weight: bold;" class="btn btn-danger" onclick="voltar()">Voltar</button>
    </div>
    <form id="denuncia" name="denuncia" cellspacing="0" style="width:100%; padding-top: 40px;">
    <!-- Text input -->
    <div class="form-outline mb-4">
        <input type="text" id="titulo" name="titulo" value='${result.titulo}' class="form-control"disabled />
        <label class="form-label" for="titulo">Titulo
        </label>
    </div>

    <!-- 2 column grid layout with text inputs for the first and last names -->
    <div class="row mb-2">
        <div class="col">
            <select name="orgao" id="orgao" class="form-select" disabled>
                <option value="${result.orgao.id}" selected>${result.orgao.nome}</option>
            </select>
            <label class="form-label" for="orgao">Orgão
            </label>
        </div>
        <div class="col">
            <div class="form-outline">
                <!-- <input type="text" id="form6Example2" class="form-control" /> -->
                <select name="urgencia" id="urgencia" class="form-select" disabled>
                    <option value="" selected>Selecione o nivel de urgencia</option>
                    <option value="1">Normal</option>
                    <option value="2">Medio</option>
                    <option value="3">Urgente</option>
                    <option value="4">Extremamente urgente</option>
                </select>
                <label class="form-label" for="form6Example2">Urgencia
                </label>
            </div>
        </div>
    </div>

    <div class="row mb-2">
        <div class="col">
            <select name="tipo" id="tipo" class="form-select" disabled>
                <option value="${result.tipo.id}" selected>${result.tipo.nome}</option>
            </select>
            <label class="form-label" for="tipo">Tipo
            </label>
        </div>
        <div class="col">
            <input type="date" id="data" name="data" value='${result.data}' class="form-control" disabled/>
            <label class="form-label" for="data">Data
            </label>
        </div>
    </div>

    <!-- Message input -->
    <div class="form-outline mb-2">
        <textarea class="form-control" id="texto" name="texto" rows="4" disabled>${result.texto}</textarea>
        <label class="form-label" for="texto">Texto
        </label>
    </div>

    <!-- Message input -->
    <div class="form-outline mb-2">
        <textarea class="form-control" id="feedback" name="texto" rows="4" disabled></textarea>
        <label class="form-label" for="texto">Feedback
        </label>
    </div>
</form>`
$("body").append(html)
$("#urgencia").val(result.urgencia)
if(result.feedback != null) {
    $("#feedback").val(result.feedback.texto)
}
}

function voltar() {
    document.location.reload()
}

$(document).ready(() => {
    carregaDados()
})