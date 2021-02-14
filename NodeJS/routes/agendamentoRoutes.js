const express = require('express')
const agendamentoController = require('../controllers/agendamentoController')
const agendamentoRouter = express.Router()

const authToken = require('../middleware/auth');
const authRole = require('../middleware/authRole');


agendamentoRouter.put("/:id",authToken,authRole("Admin Tecnico"), agendamentoController.agendamento)

module.exports = agendamentoRouter