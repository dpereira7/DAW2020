var http = require('http')
var fs = require('fs')


var aux = require('./mymod.js')

http.createServer(function (req, res){
    console.log(req.method + " " + req.url + " " + aux.myDateTime())
    var splita = req.url.split("/")
    var num = splita[splita.length-1]

        if(req.url.length == 1){
            fs.readFile('site/index.html', function(err, data){
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(data)
                res.end()
            })
        }
        else if(req.url.match(/\/arqs\/[0-9][0-9]?[0-9]?$/) && num<122 && num >=0){
            fs.readFile('site/arq' + num + '.html', function(err, data){
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(data)
                res.end()
            })

        }   else{
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write("<p>O URL é inválido.</p>")
                res.end()
    }

}).listen(7777)

console.log('Servidor à escuta na porta 7777......')