function done(value) {
    url = "/concluirtarefa?id=" + value;
    $.getJSON( url, function() {
    })
    $('table#pendentes tr#' + value).remove();
    addToTableTerminated(value,'concluida')
}

function cancel(value) {    
    url = "/cancelartarefa?id=" + value;
    $.getJSON( url, function() {
    })
    $('table#pendentes tr#' + value).remove();
    addToTableTerminated(value,'cancelada')  
    
}



function callback() {
    location.reload(true)
}

function addToTableTerminated(value,estado){
    $.ajax({
        type: 'GET',
        url: "/tarefas/" + value,
        dataType: 'json',
        success: function(data) {
            var responsavel = data.responsavel
            var d_limite = data.d_limite
            var descricao = data.descricao  
            var markup = "<tr><td>" + d_limite + "</td><td>"+ responsavel +"</td> <td>"+ descricao +"</td> <td>" + estado + "</td></tr>"
            $("table#terminadas").append(markup);    
        }
    });
    

}