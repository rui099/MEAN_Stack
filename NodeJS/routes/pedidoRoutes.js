const express = require('express')
const pedidoController = require('../controllers/pedidoController')
const pedidoRouter = express.Router()

const authToken = require('../middleware/auth');
const authRole = require('../middleware/authRole');

pedidoRouter.get("/",authToken,authRole("Admin Normal Tecnico"),pedidoController.pedidoList)
pedidoRouter.get("/find/:id",authToken,authRole("Admin Normal Tecnico"),pedidoController.pedidoFindById)
pedidoRouter.post("/",authToken,authRole("Admin Normal Tecnico"),pedidoController.pedidoCreat)
pedidoRouter.put("/find/:id",authToken,authRole("Admin Normal Tecnico Doutor"),pedidoController.pedidoUpdate)
pedidoRouter.delete("/find/:id",authToken,authRole("Admin Normal Tecnico"),pedidoController.getPedido, pedidoController.pedidoDelete)
pedidoRouter.get("/estatisticas",authRole("Admin"),pedidoController.estatisticas)

module.exports = pedidoRouter