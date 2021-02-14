var { User } = require("./models/Users");
const mongoose = require('mongoose');
var bcrypt = require("bcrypt");

mongoose.connect('mongodb+srv://Rui:123@cluster0-cwtph.mongodb.net/Cluster0?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true }, (err) => {
    if(!err)
    console.log('Conecctado ao Mongo ...');
    else
    console.log('Erro na conecção : ' + JSON.stringify(err, undefined, 2));
})//o codigo baixo foi copiado de um ficheiro que o professor Edgar disponibilizou
.then(async (mongoose) => {
    const adminUser = await User.findOne({ role: 'Admin' }).select('+password')
    if (!adminUser) {
        console.log('creating admin user')
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
        const adminUser = await new User({
            nome: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: hashPass,
            role: 'Admin'
        })
            .save()
            .catch(console.error)

        if (adminUser) {
            console.log('Admin created')
            console.table([adminUser.toJSON()])
        }
    } else {
        console.log('Admin:')
        console.table([adminUser.toJSON()])
    }
})
.catch(console.error)



module.exports = mongoose;