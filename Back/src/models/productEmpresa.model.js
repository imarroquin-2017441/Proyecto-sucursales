'use strict'

const mongoose = require('mongoose');

const productEmpresa = mongoose.Schema({
    name: String,
    proveedor: String,
    stock: Number,
    empresa: {type: mongoose.Schema.ObjectId, ref: 'Empresa'}
});

module.exports = mongoose.model('ProductEmpresa', productEmpresa);