function carregaDados() {
    // para usar na propria maquina
    const URL_TO_FETCH = "http://localhost:8080/apis/cidadao/get-denuncia/2";

    // para usar com o live server em outro pc
    // const URL_TO_FETCH = "http://192.168.0.135:8080/apis/cidadao/get-denuncia/2";

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

                                return `<i class="fa-solid fa-trash text-lg" onclick="deletar(${data})">
                                    </i>
                                    <i class="fa-solid fa-pen-to-square text-lg" onclick="alterar(${data})">
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
        // console.log(result)
        window.location.reload()
    })
    .catch(err => console.log(err));
}

$(document).ready(() => {
    carregaDados()
})