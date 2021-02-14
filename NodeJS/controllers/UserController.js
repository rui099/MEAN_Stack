require("dotenv").config();
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongoose").Types.ObjectId;
var { User } = require("../models/Users");
var { Pedido } = require("../models/pedido");

//criar user
  const registo = async (req, res) => {
  
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      nome: req.body.nome,
      email: req.body.email,
      password: hashPass,
      role: req.body.role
    })
    const newUser = user.save(function(err) {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          return res.status(500).send({ succes: false, message: 'User already exist!' });
        }
        return res.status(500).send(err);
      }
      res.status(201).json(newUser);
  
  })
}


//ver lista de users
  const userList = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


  //autenticar user
  const login = async (req, res) => {
  const { nome, password } = req.body;
  let user = await User.findOne({ nome: nome });


  if (!user) {
    return res.status(400).json({ message: "user não existe" });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {

      const token = jwt.sign(
        {
          nome,
          email: user.email,
          role: user.role,
          id: user._id
        },
        process.env.ACESS_TOKEN_SECRET,
        {
          expiresIn: "24h",
        }
      );
      res.json({ message: "login sucessful", token: token });
    } else {
      res.send("Password incorreta");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

  //apagar user
  const deleteUser = async(req,res) =>{
  try {
    await res.user.remove();
    res.json({ message: "deleted user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


async function getUser(req, res, next) {

  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}


  //receber user logado
  const userPerfil = async(req,res)=>{
  const header = req.headers.authorization;
try{
  const base64Url = header.split('.')[1];
  buff = Buffer.from(base64Url, 'base64');
  const decoded = buff.toString('utf-8');
  const decodedJSON = JSON.parse(decoded);

  user = await User.findOne({ nome: decodedJSON.nome }).populate('pedidos');
  res.status(200).json(user);
  
}catch (err){
  return res.status(500).json({ message: err.message });
}
};


//fazer update ao user
const userUpdate = async(req,res)=>{
  
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  const salt = await bcrypt.genSalt();
  const hashPass = await bcrypt.hash(req.body.password, salt);
  const user = {
    nome: req.body.nome,
    email: req.body.email,
    password: hashPass,
    role: req.body.role
  };
  User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Erro a editar: ' + JSON.stringify(err, undefined, 2)); }

  })
}

module.exports = {
  registo,
  userList,
  login,
  deleteUser,
  userPerfil,
  userUpdate,
  getUser
}

