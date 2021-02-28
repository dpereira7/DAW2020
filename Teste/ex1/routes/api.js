var express = require('express');
var router = express.Router();
var cas = require('../controllers/casamentos')

router.get('/casamentos', function(req, res, next) {
  //GET /api/casamentos?nome=X - Devolve uma lista com os casamentos onde o nome X aparece incluído no título;
  if(req.query.nome!=null ){
      cas.listarNome(req.query.nome)
      .then(data =>{res.status(200).jsonp(data)})
      .catch(err => res.status(500).jsonp({error:err}))
  }else{
    //GET /api/casamentos?ano=YYYY - Devolve a lista de casamentos realizados no ano YYYY;
    if(req.query.ano!=null){
      cas.listarAno(req.query.ano + '/' + req.query.ano) 
        .then(data =>res.status(200).jsonp(data)) 
        .catch(err => res.status(500).jsonp({error:err}))
    }else{
      //GET /api/casamentos?byAno=true - Devolve a lista de casamentos agrupadas por ano, ou seja, devolve uma lista de anos em que a cada ano está associada uma lista de casamentos;
      if(req.query.byAno!=null){ 
        cas.listarbyAno()
        .then(data =>{res.status(200).jsonp(data)})
        .catch(err => res.status(500).jsonp({error:err}))
      }else{
        //GET /api/casamentos - Devolve a lista dos casamentos, com os campos: date, title e ref;
        cas.listar()
        .then(data => res.status(200).jsonp({casamentos:data}))
        .catch(err => res.status(500).jsonp({error:err}))
      }
    }
  }
});

//GET /api/casamentos/:id - Devolve a informação completa de um casamento;
router.get('/casamentos/:id', function(req, res, next){
  cas.lookUp(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))  
})

//GET /api/casamentos/noivos - Devolve uma lista de nomes dos noivos, ordenada alfabeticamente, e o id do respetivo registo;
router.get('/noivos', function(req, res, next){
  cas.listarNoivos()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))  
})

module.exports = router;