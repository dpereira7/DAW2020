var express = require('express');
var router = express.Router();
const Aluno = require('../controllers/aluno')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Turma de PRI de 2020' });
});

//GET lista de alunos
router.get('/alunos', (req,res) => {
  Aluno.listar()
    .then(dados => res.render('alunos', {lista: dados}))
    .catch(e => res.render('error', {error: e}))
})

//GET de um aluno
router.get(/\/alunos\/[0-9a-zA-Z]*/,(req,res)=>{
  var split = req.url.split("/")[2]
  console.log(split)
  Aluno.consultar(split)
    .then(aln => res.render('aluno',{aluno: aln}))
    .catch(e => res.render('error', {error: e}))

})

//Registar um aluno
router.get('/registar', (req, res) => {
  //res.render('alunos', {alunos: registos /* vem da base de dados */})
  res.render('form',{title: 'Registo de Aluno'})
})

//Post de aluno
router.post('/alunos', (req,res) => {
  Aluno.inserir(req)
  res.render('index', { title: 'Turma PRI de 2020' });
})

// Editar um aluno
router.get(/\/alunos\/editar\/:[0-9a-zA-Z]*/, (req, res) => {
  //res.render('alunos', {alunos: registos /* vem da base de dados */})
  var split = req.url.split(":")[1]
  Aluno.consultar(split)
  .then(aln => res.render('editar',{aluno: aln}))
  .catch(e => res.render('error', {error: e}))
})
// Put de aluno
router.post('/alunos/edit', (req,res)=>{
  Aluno.editar(req)
  res.redirect('/alunos')
})


router.get(/\/alunos\/delete\/:[0-9a-zA-Z]*/, (req,res)=>{
  var split = req.url.split(":")[1]
  Aluno.delete(split)
  res.redirect('/alunos')
})

// Editar um aluno
router.get(/\/alunos\/editar\/:[0-9a-zA-Z]*/, (req, res) => {
  var split = req.url.split(":")[1]
  Aluno.consultar(split)
  .then(aln => res.render('editar',{aluno: aln}))
  .catch(e => res.render('error', {error: e}))
})
// Put de aluno
router.put('/alunos/edit', (req,res)=>{
  Aluno.editar(req)
  res.redirect('/alunos')
})


module.exports = router;
