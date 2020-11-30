var http = require('http')
var axios = require('axios')


http.createServer(function (req, res) {
    console.log(req.method + ' ' + req.url)
    if (req.method = 'GET') {
        if (req.url == '/') {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            res.write('<h2 style="text-align: center;">Escola de Música</h2>')
            res.write('<ul>')
            res.write('<li><a href="/alunos">Lista de Alunos</li>')
            res.write('<li><a href="/cursos">Lista de Cursos</li>')
            res.write('<li><a href="/instrumentos">Lista de Instrumentos</li>')
            res.write('</ul>')
            res.end()
        }
        else if (req.url == '/alunos') {
            axios.get('http://localhost:3001/alunos?_sort=nome&_order=asc')
                .then(function (resp) {
                    alunos = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write('<h2 style="text-align: center;">Lista de Alunos</h2>')
                    res.write('<ul style="columns: 2;">')

                    alunos.forEach(a => {
                        res.write('<li><a href="/alunos/' + a.id + '">' + a.id  + ' - ' + a.nome + '</a></li>')
                    });

                    res.write('</ul>')
                    res.write('<address style="text-align: center;">[<a href="/">Voltar</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log('Erro na obtenção da lista de alunos: ' + error);
                });
        }
        else if (req.url.match('\/alunos\/A(E[\-])?[0-9]+')) {
            console.log("Estou aqui")
            var split = req.url.split("/")[req.url.split("/").length-1]
            axios.get('http://localhost:3001/alunos/' + split)
                .then(function (resp) {
                    aluno = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write('<h2 style="text-align: center;">' + aluno.nome +  '</h2>')
                    res.write('<ul>')
                    res.write('<li> <b>Id:</b> ' + aluno.id + '</li>')
                    res.write('<li> <b>Nome:</b> ' + aluno.nome + '</li>')
                    res.write('<li> <b>Data de Nascimento:</b> ' + aluno.dataNasc + '</li>')
                    res.write('<li> <b>Curso:</b><a href="/cursos/' + aluno.curso + '">' + aluno.curso + '</a></li>')
                    res.write('<li> <b>Instrumento:</b> ' + aluno.instrumento + '</li>')
                    res.write('<li> <b>Ano do Curso:</b> ' + aluno.anoCurso + '</li>')
                    res.write('</ul>')
                    res.write('</br>')
                    res.write('<address style="text-align: center;">[<a href="/alunos">Voltar</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log('Erro na obtenção da página do aluno: ' + error);
                });
        }
        else if (req.url == '/cursos') {
            axios.get('http://localhost:3001/cursos/?_sort=id&_order=asc')
                .then(function (resp) {
                    cursos = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write('<h2 style="text-align: center;">Lista de Cursos</h2>')
                    res.write('<ul style="columns: 2;">')

                    cursos.forEach(c => {
                        res.write('<li><a href="/cursos/' + c.id + '">' + c.id  + ' - ' + c.designacao + '</a></li>')
                    });

                    res.write('</ul>')
                    res.write('<address style="text-align: center;">[<a href="/">Voltar</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log('Erro na obtenção da lista de cursos: ' + error);
                });
        }
        else if (req.url.match('\/cursos\/C[B|S][0-9]+')) {
            var split = req.url.split("/")[req.url.split("/").length-1]
            axios.get('http://localhost:3001/cursos/' + split)
                .then(function (resp) {
                    curso = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write('<h2 style="text-align: center;">' + curso.designacao + '</h2>')
                    res.write('<ul>')
                    res.write('<li> <b>Id:</b> ' + curso.id + '</li>')
                    res.write('<li> <b>Designação:</b> ' + curso.designacao + '</li>')
                    res.write('<li> <b>Duração:</b> ' + curso.duracao + '</li>')
                    res.write('<li> <b>Instrumento:</b> ' + curso.instrumento["#text"] + '</li>')
                    res.write('</ul>')
                    res.write('</br>')
                    res.write('<address style="text-align: center;">[<a href="/cursos">Voltar</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log('Erro na obtenção da página do curso: ' + error);
                });
        }
        else if (req.url == '/instrumentos') {
            axios.get('http://localhost:3001/instrumentos')
                .then(function (resp) {
                    instrumentos = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write('<h2 style="text-align: center;">Lista de Instrumentos</h2>')
                    res.write('<ul style="columns: 2;">')

                    instrumentos.forEach(i => {
                        res.write('<li><a href="/instrumentos/' + i.id + '">' + i.id  + ' - ' + i['#text'] + '</a></li>')
                    });

                    res.write('</ul>')
                    res.write('<address style="text-align: center;">[<a href="/">Voltar</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log('Erro na obtenção da lista de instrumentos: ' + error);
                });
        }
        else if (req.url.match('\/instrumentos\/I[0-9]+')) {
            var split = req.url.split("/")[req.url.split("/").length-1]
            axios.get('http://localhost:3001/instrumentos/' + split)
                .then(function (resp) {
                    instrumento = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write('<h2 style="text-align: center;">Instrumento: ' + instrumento.id +  '</h2>')
                    res.write('<ul>')
                    res.write('<li> <b>Id:</b> ' + instrumento.id + '</li>')
                    res.write('<li> <b>Nome:</b> ' + instrumento['#text'] + '</li>')
                    res.write('</ul>')
                    res.write('</br>')
                    res.write('<address style="text-align: center;">[<a href="/instrumentos">Voltar</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log('Erro na obtenção da página do instrumento: ' + error);
                });
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
            res.end()
        }
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
        res.end()
    }

}).listen(4000)

console.log('Servidor à escuta na porta 4000....')