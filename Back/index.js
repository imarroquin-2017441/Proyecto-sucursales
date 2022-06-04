'use strict'

const mongoConfig = require('./configs/mongoConfig');
const app = require('./configs/app');
const port = 3200;
const empresaController = require('./src/controllers/empresa.controller')

mongoConfig.init();

app.listen(port,()=>{
    console.log(`Servidor http corriendo en el puerto ${port}`);
    //empresaController.saveAdmin();
});