var cas = require('../models/casamentos')


module.exports.listar = () => {
    return cas.find({}, {
        "date": 1,
        "title": 1,
        "_id": 1
    }).exec()
}

module.exports.lookUp = (id) => {
    return cas.findOne({_id:id}).exec()
}

module.exports.listarNome = (nome) => {
    return cas.find({title :{$regex:nome}});
  };
  
module.exports.listarbyAno = () =>{
    return cas.aggregate([{
        $group: {_id: "$date",
            casamentos: {
                $push: {
                    id: "$_id",
                    title: "$title"
                }
            }
        }
    }]).exec();
}

module.exports.listarAno = (ano) => {
    return cas.find({date:ano}).exec()
}

module.exports.listarNoivos = () =>{
    return cas.aggregate([
        { $addFields: {
            "lista": { $regexFind: { input: "$title", regex: "(?<=: ).*?(?= c)" }}
        }},
        {$sort: {lista: 1}},
        {$group:
            {_id:null,
            noivos:{$push:{id:"$_id",noivo:"$lista.match"}}
            }},
        {$project:{
            _id:0,
          noivos:1
        }}
    ]).exec();
}