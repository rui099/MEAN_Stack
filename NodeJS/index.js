const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');


const{ mongoose } = require('./db.js');

const swaggerDoc = require('./swagger.json');

var pedidoRouter = require('./routes/pedidoRoutes', {useNewUrlParser: true});
var userRouter = require('./routes/userRoutes', {useNewUrlParser: true});
var agendamentoController = require('./controllers/AgendamentoController', {useNewUrlParser: true});

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => console.log('Server começou na porta : 3000'));

app.use('/agendamento', agendamentoController);
app.use('/pedido', pedidoRouter);
app.use('/user', userRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));