var http = require('http')
var axios = require('axios')
var fs = require('fs')

var static = require('./server-static.js')

var {parse} = require('querystring')


// Funções auxilidares

function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', () => {
            console.log(body)
            callback(parse(body))
        })
    }
}


// Template para o formulário de tarefa ------------------
function geraFormTarefa( responsaveis ){
    let pagHTML = `
    <html>
        <head>
            <title>Gestão de Tarefas</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="../w3.css"/>
            <link rel="icon" href="favicon.png"/>
            <script src="https://code.jquery.com/jquery-3.4.1.min.js" ></script>
            <script type="text/javascript" src="funcoes.js"/></script>
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>Registo de Tarefa</h2>
            </div>

            <form class="w3-container" action="/tarefas" method="POST">
                <label class="w3-text-teal"><b>Descrição</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">
          
                <label class="w3-text-teal"><b>Responsável</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" list="responsaveis" name="responsavel">


                <datalist id="responsaveis">`

                var option = 
                responsaveis.forEach(r =>{
                    pagHTML += `
                    <option>${r.responsavel}</option>
                    `
                })

                pagHTML += `</datalist>

                <label class="w3-text-teal"><b>Data Limite [AAAA-MM-DD]</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="d_limite">
          
                <input type="hidden" name="estado" value="pendente">

                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>`

    return pagHTML
}


// Template para a página com a lista de tarefas pendentes ------------------
function geraPagTarefasPendentes( tarefasPendentes, d){
    let pagHTML = `
              <div class="w3-container w3-teal">
                  <h2>Lista de Tarefas Pendentes</h2>
              </div>
              <table id="pendentes" class="w3-table w3-bordered">
                  <tr>
                      <th> Data Limite </th>
                      <th> Responsável </th>
                      <th> Descrição </th>
                  </tr>
    `
    
    tarefasPendentes.forEach(t => {
        pagHTML += `
          <tr id=${t.id}>
              <td>${t.d_limite}</td>
              <td>${t.responsavel}</td>
              <td>${t.descricao}</td>
              <td><button class="w3-button w3-teal w3-circle" onclick="done(${t.id})" type="submit" value="Concluir">&#10004</button></td>
              <td><button class="w3-button w3-red w3-circle" onclick="cancel(${t.id})" type="submit" value="Cancelar">&#10006</button></td>
          </tr>
        `
    });
  
    pagHTML += `</table>`

    return pagHTML
  }



// Template para a página com a lista de tarefas terminadas ------------------
function geraPagTarefasTerminadas( tarefasTerminadas, d){
    let pagHTML = `
              <div class="w3-container w3-teal">
                  <h2>Lista de Tarefas Terminadas</h2>
              </div>
              <table id="terminadas" class="w3-table w3-bordered">
                  <tr>
                      <th> Data Limite </th>
                      <th> Responsável </th>
                      <th> Descrição </th>
                      <th> Estado </th>
                  </tr>
    `
    
    tarefasTerminadas.forEach(t => {
        pagHTML += `
          <tr>
              <td>${t.d_limite}</a></td>
              <td>${t.responsavel}</td>
              <td>${t.descricao}</td>
              <td>${t.estado}</td>
          </tr>
        `
    });
  
    pagHTML += `
          </table>
          <div class="w3-container w3-teal">
              <address>Gerado por Diogo Pereira::PRI2020 em ${d} --------------</address>
          </div>
      </body>
      </html>
    `
    return pagHTML
  }



function getPagInic(res,d){
    //GET da lista de responsáveis
    var requestResponsaveis = axios.get("http://localhost:3000/tarefas")
    //GET das tarefas pendentes
    var requestTarefasPendentes = axios.get("http://localhost:3000/tarefas?estado=pendente&_sort=d_limite,responsavel&_order=asc,asc")
    //GET das tarefas em que o estado não é igual (_ne = not equal) a pendente
    var requestTarefasTerminadas = axios.get("http://localhost:3000/tarefas?estado_ne=pendente&_sort=d_limite,responsavel&_order=asc,asc")


    //Envia múltiplos pedidos 
    axios.all([requestResponsaveis,requestTarefasPendentes,requestTarefasTerminadas])
        .then(axios.spread((...responses) =>{
            var responsaveis = responses[0].data
            var tarefasPendentes = responses[1].data
            var tarefasTerminadas = responses[2].data

            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write(geraFormTarefa(responsaveis))
            res.write(geraPagTarefasPendentes(tarefasPendentes,d))
            res.write(geraPagTarefasTerminadas(tarefasTerminadas,d))
            res.end()
        }))
        .catch(function(erro){
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>Não foi possível obter a lista de tarefas...")
            res.end()
        })
}





// Criação do servidor

var todoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    if(static.recursoEstatico(req)){
        static.sirvoRecursoEstatico(req, res)
    }
    else{
    switch(req.method){
        case "GET": 
            // GET /lista --------------------------------------------------------------------
            if((req.url == "/") || (req.url == "/tarefas")){
                getPagInic(res,d)
            }
            else if (/\/tarefas\/*/.test(req.url)){
                var idt = req.url.split("/")[2]
                axios.get("http://localhost:3000/tarefas/" + idt)
                    .then(response => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(response.data));
                    })
                    .catch(function(erro){
                        console.log(erro)
                    })
            }
            else if(/\/concluirtarefa/.test(req.url)){
                var idt = req.url.split("=")[1]
                axios.get("http://localhost:3000/tarefas/" + idt)
                    .then( response => {
                        requestget = response.data
                        
                        axios.put("http://localhost:3000/tarefas/" + idt, {
                            descricao: requestget.descricao,
                            responsavel: requestget.responsavel,
                            d_limite: requestget.d_limite,
                            estado: 'concluida'
                        })
                        .then(response =>{
                            res.end();
                        })
                        .catch(function(erro){
                            console.log(erro);
                        });
                    })
                    .catch(function(erro){
                        console.log(erro);
                    });
            }
            else if(/\/cancelartarefa/.test(req.url)){
                var idt = req.url.split("=")[1]
                axios.get("http://localhost:3000/tarefas/" + idt)
                    .then( response => {
                        requestget = response.data
                        
                        axios.put("http://localhost:3000/tarefas/" + idt, {
                            descricao: requestget.descricao,
                            responsavel: requestget.responsavel,
                            d_limite: requestget.d_limite,
                            estado: 'cancelada'
                        })
                        .then(response =>{
                            res.end();
                        })
                        .catch(function(erro){
                            console.log(erro);
                        });
                    })
                    .catch(function(erro){
                        console.log(erro);
                    });
            }
            else if(req.url == "/funcoes.js"){
                fs.readFile("funcoes.js", function(erro, dados){
                    if(!erro){
                        res.writeHead(200, {'Content-Type': 'text/css;charset=utf-8'})
                        res.write(dados)
                        res.end()
                    }
                })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break
        case "POST":
            if(req.url == '/tarefas'){
                recuperaInfo(req, function (info){
                console.log('POST de tarefa:' + JSON.stringify(info))
                axios.post("http://localhost:3000/tarefas/", info)
                getPagInic(res,d)
                })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>POST" + req.url + "não suportado neste serviço.</p>")
                res.end()
            }
            
            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
    }
})

todoServer.listen(7777)
console.log('Servidor à  escuta na porta 7777...')