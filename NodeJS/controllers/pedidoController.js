const express = require("express");
var ObjectId = require("mongoose").Types.ObjectId;
var { Pedido } = require("../models/pedido");
var { User } = require("../models/Users");



  const pedidoList = async (req, res) => {
  try {
    const pedido = await Pedido.find({}).sort({grupo: -1});
    res.status(200).json(pedido);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


  const pedidoFindById = async (req, res) => {
  res.status(200).json(res.pedido);
};


  const pedidoCreat = async (req, res) => {
  
  if(req.body.grupo == null)
  req.body.grupo = false;

  if(req.body.encaminhado == null)
  req.body.encaminhado= false;

  if(req.body.tLocalRisco == null)
  req.body.tLocalRisco = false;

  const pedido = new Pedido({
    nomeCompleto: req.body.nomeCompleto,
    idade: req.body.idade,
    cidade: req.body.cidade,
    sintomas: req.body.sintomas,
    encaminhado: req.body.encaminhado,
    grupo: req.body.grupo,
    tLocalRisco: req.body.tLocalRisco,
  });

  try {
    const newPedido = pedido.save();
    res.status(201).json(newPedido);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



  const pedidoUpdate = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record with given id : ${req.params.id}`);

  const grupo = true;

  if(req.body.grupo == null || req.body.grupo == "")
    grupo = false;


var ped = {
  nomeCompleto: req.body.nomeCompleto,
  idade: req.body.idade,
  cidade: req.body.cidade,
  sintomas: req.body.sintomas,
  encaminhado: req.body.encaminhado,
  grupo: grupo,
  tLocalRisco: req.body.tLocalRisco,
  inicio: req.body.inicio,
  fim: req.body.fim,
  user: req.body.user,
  estado:req.body.estado,
  resultado: req.body.resultado
};
if(req.body.resultado != null || req.body.resultado != "")
ped.estado = "Completo";

Pedido.findByIdAndUpdate(req.params.id, { $set: ped }, { new: true }, (err, doc) => {
  if (!err) { res.send(doc); }
  else { console.log('Erro a editar: ' + JSON.stringify(err, undefined, 2)); }

})
};




  const pedidoDelete = async (req, res) => {
  try {
    await res.pedido.remove();
    res.json({ message: "pedido deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


async function getPedido(req, res, next) {
  try {
    pedido = await Pedido.findById(req.params.id);
    if (pedido == null) {
      return res.status(404).json({ message: "cannot find pedido" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.pedido = pedido;
  next();
}



  const estatisticas = async (req, res) => {
  const now = new Date();
  const inicioDeHoje = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diaSeguinte = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
  const mesInicio = new Date(now.getFullYear(), now.getMonth());
  const mesFim = new Date(now.getFullYear(), now.getMonth()+1);
  


  try {
    feitoHoje = await Pedido.countDocuments({ inicio:{"$gte": inicioDeHoje, "$lt": diaSeguinte},estado: "Completo" });
    feitoHojePositivo = await Pedido.countDocuments({ inicio:{"$gte": inicioDeHoje, "$lt": diaSeguinte},resultado: "Positivo" });

    feitoEsteMes = await Pedido.countDocuments({ inicio:{"$gte": mesInicio, "$lt": mesFim},estado: "Completo" });
    feitoEsteMesPositivo = await Pedido.countDocuments({ inicio:{"$gte": mesInicio, "$lt": mesFim},resultado: "Positivo" });
    
     userToday= await User.find().populate({
      path: 'pedidos',
      match: { inicio:{"$gte": inicioDeHoje, "$lt": diaSeguinte},estado: "Completo" }
    })


    res.status(200).json({
      feitoHoje: feitoHoje,
      feitoHojePositivo: feitoHojePositivo,
      feitoEsteMes: feitoEsteMes,
      feitoEsteMesPositivo: feitoEsteMesPositivo,
      userToday: userToday
     });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  pedidoList,
  pedidoFindById,
  pedidoCreat,
  pedidoUpdate,
  pedidoDelete,
  getPedido,
  estatisticas
}

