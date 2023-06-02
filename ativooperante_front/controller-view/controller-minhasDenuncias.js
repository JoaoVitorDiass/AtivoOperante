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
        console.log(result)
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
                                console.log(data + " - " + type)
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
    const URL_TO_FETCH = "";
    $("body").empty()
    $("body").append(formulario)
}
function enviarFeedback(id) {
    const URL_TO_FETCH = `http://localhost:8080/apis/admin/add-feedback/${id}/${$("#texto").val()}`
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

function voltar() {
    document.location.reload()
}

$(document).ready(() => {
    carregaDados()
})