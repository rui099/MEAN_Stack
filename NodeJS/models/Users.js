const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    nome: { type: String,required: 'Nome obrigatorio',unique : true},
    email: { type: String, required: 'Email obrigatorio'},
    password: { type: String, required:'Password obrigatoria',
        minlenght:[8,'Password precisa de ter mais de 8 carateres']},
    role: {type: String,enum: ['Admin','Tecnico','Normal','Doutor'], required: 'Role obrigatoria'},
    pedidos: [{ type: Schema.Types.ObjectId, ref: 'Pedido' }]


});

 UserSchema.path('email').validate( (val) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(val);
},'Email invalido');

var User = mongoose.model('User',UserSchema,'users');
module.exports = { User } ;