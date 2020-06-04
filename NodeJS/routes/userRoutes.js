const express = require('express')
const userController = require('../controllers/UserController')
const userRouter = express.Router()

const authToken = require('../middleware/auth');
const authRole = require('../middleware/authRole');


userRouter.post("/registo",authRole('Admin'), userController.registo)
userRouter.get("/",authRole('Admin Tecnico'), userController.userList)
userRouter.post("/login", userController.login)
userRouter.delete("/:id",authToken,authRole('Admin'), userController.getUser, userController.deleteUser)
userRouter.get("/perfil",authToken, userController.userPerfil)
userRouter.put("/:id",authToken,authRole('Admin'), userController.userUpdate)

module.exports = userRouter
