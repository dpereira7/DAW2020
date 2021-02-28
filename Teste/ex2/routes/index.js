var express = require('express');
var router = express.Router();
var axios = require('axios');








var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTExMjIyMyIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJwcmkyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMDk4Mjg1NiwiZXhwIjoxNjExMDExNjU2fQ.b0Y2KQCgnc8XOyHBPRB9XRbRksB0j6VAQrZdNuy_FI6kvBG6FRyuQiG1f4dSpKMapAwum9N5mba1byo-hJIVjcqqBa7RjvrIpFT7jwK9dSzbYG2vqYrxikoUXi6joCaoS6P90eaUdlgp4kh9_Olrv8SRHGiEh_Qd-QeFqBhp8MoWQhGTgkjowxb_iTXRULqsfYRjo6FcPPHoGW13b8GPqBt3JqCA2tWEy4HmK3tBrJMAOhfHYzaczhEI_w1rxZlnc0ExQtcysUpLCp5fOu-_ReP7Q5johlcxduGDWSOlcRM_OJIR8mdM9QOG6TSnVGh7d_sWhAYnPhkmKezjdzuuIw"

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token='+token)
    .then(dados => {
      res.render('index', {title: 'CLAV',classes:dados.data})
    })
    .catch(err => res.render('error',{error:err}))
});



router.get('/classes/:id',function(req, res){
  axios.get('http://clav-api.di.uminho.pt/v2/classes/'+ req.params.id+'?token='+token)
    .then(dados => {
      res.render('classe', {title:'CLAV',classe:dados.data})
    })
    .catch(err => res.render('error',{error:err}))
})

module.exports = router;
