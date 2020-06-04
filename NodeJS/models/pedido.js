const mongoose = require('mongoose');
var Schema = mongoose.Schema;



var PedidoSchema = new Schema({
    nomeCompleto: {type: String,required: 'Nome obrigatorio'},
    idade: {type: Number,required: 'Idade obrigatoria'},
    cidade: {type: String},
    sintomas: {type: String,required: 'sintomas obrigatorio'},
    encaminhado: {type: Boolean},
    grupo: {type: Boolean},
    tLocalRisco: {type: Boolean},
    inicio: {type: Date},
    fim: {type: Date},
    estado:{type: String,enum: ['Agendado','Completo']},
    resultado: {type: String,enum: ['Positivo','Negativo']},
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

var Pedido = mongoose.model('Pedido',PedidoSchema,'pedidos');
module.exports = { Pedido } ;