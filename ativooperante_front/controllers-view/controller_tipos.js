function carregarTipo(id)
{   let info=document.getElementById("info");
    const url=`http://localhost:8080/apis/admin/get-tipos`;
    fetch(url).then(response=>response.json())
    .then(data=>info.innerHTML=JSON.stringify(data[id], null, 2))
}