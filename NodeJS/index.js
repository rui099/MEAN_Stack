const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const{ mongoose } = require('./db.js');
const swaggerDoc = require('./swagger.json');
const path = require('path');

var pedidoRouter = require('./routes/pedidoRoutes', {useNewUrlParser: true});
var userRouter = require('./routes/userRoutes', {useNewUrlParser: true});
var agendamentoRouter = require('./routes/agendamentoRoutes', {useNewUrlParser: true});

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 5000, () => console.log('Server começou na porta : 5000'));

app.use('/agendamento', agendamentoRouter);
app.use('/pedido', pedidoRouter);
app.use('/user', userRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));


app.use(express.static(__dirname + '/Frontend/dist/Frontend'));
app.use('/*', function (req,res){
    console.log("sent");
    try{
        res.sendFile(path.join(__dirname + '/Frontend/dist/Frontend'));
    }catch(err){
        console.log(err);
    }
})
