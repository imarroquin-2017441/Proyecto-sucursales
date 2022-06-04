'use strict'

const mongoose = require('mongoose');

const sucursalSchema = mongoose.Schema({
    name: String,
    direccion: String,
    empresa: {type: mongoose.Schema.ObjectId, ref: 'Empresa'}
});

module.exports = mongoose.model('Sucursal', sucursalSchema);