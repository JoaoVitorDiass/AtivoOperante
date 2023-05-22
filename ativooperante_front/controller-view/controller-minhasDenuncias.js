function carregaDados() {

    // para usar na propria maquina
    const URL_TO_FETCH = "http://localhost:8080/apis/cidadao/get-denuncia/2";

    // para usar com o live server em outro pc
    // const URL_TO_FETCH = "http://localhost:8080/apis/cidadao/get-denuncia/2";

    fetch(URL_TO_FETCH, {
        method: 'GET',
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
                        "data": 'cod',
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
                }
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

$(document).ready(() => {
    carregaDados()
})