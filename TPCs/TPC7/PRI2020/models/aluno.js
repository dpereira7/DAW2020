var mongoose = require('mongoose')

var studentSchema = new mongoose.Schema({
    Número: String,
    Nome: String,
    Git: String,
    tpc: [Number]
});

// Coleção exportada
module.exports = mongoose.model('PRI2020', studentSchema, 'work')