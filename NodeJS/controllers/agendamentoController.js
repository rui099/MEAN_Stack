const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { User } = require("../models/Users");
var { Pedido } = require("../models/pedido");

const agendamento = async (req,res) =>{
  
  if (!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record with given id : ${req.params.id}`);

  userA = await User.findOne({nome: req.body.user })
  userID = userA._id;
  var ped = {
  nomeCompleto: req.body.nomeCompleto,
  idade: req.body.idade,
  cidade: req.body.cidade,
  sintomas: req.body.sintomas,
  encaminhado: req.body.encaminhado,
  grupo: req.body.grupo,
  tLocalRisco: req.body.tLocalRisco,
  inicio: req.body.inicio,
  fim: req.body.fim,
  user: userID,
  estado: "Agendado",
};

Pedido.findByIdAndUpdate(req.params.id, { $set: ped }, { new: true }, (err, doc) => {
  if(!err) {
    res.send(doc);
    userA.pedidos.push(req.params.id);
    userA.save();
  }
  else{ console.log('Erro a editar: ' + JSON.stringify(err,undefined,2));} 
  })
}



module.exports = {agendamento}


