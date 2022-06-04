'use strict'

const mongoose = require('mongoose');

exports.init = ()=>{
  //linea de conexión
  const uriMongo = 'mongodb://127.0.0.1:27017/sucursales';
  mongoose.Promise = global.Promise;

  //manejar el ciclo de vida de la conexión
    mongoose.connection.on('error', ()=>{
        console.log('MongoDB | No se pudo conectar a MongoDB');
        mongoose.disconnect();
    });
    mongoose.connection.on('connecting', ()=>{
        console.log('MongoDB | intentando conexion');
    });
    mongoose.connection.on('connected', ()=>{
        console.log('MongoDB | conectado a MongoDB');
    });
    mongoose.connection.once('open', ()=>{
        console.log('MongoDB | conectado a la database');
    });
   mongoose.connection.on('reconnected', ()=>{
       console.log('MongoDB | reconectando a MongoDB');
   });
   mongoose.connection.on('disconnected', ()=>{
       console.log('MongoDB | desconectado');
   });

   //ejecutar método de conexión
   mongoose.connect(uriMongo, {
       connectTimeoutMS: 2500,
       maxPoolSize: 50,
       useNewUrlParser: true
   }).catch(err=>console.log(err));
}