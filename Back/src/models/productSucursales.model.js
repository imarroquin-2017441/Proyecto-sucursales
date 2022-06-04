'use strict'

const mongoose = require('mongoose');

const productSucursal = mongoose.Schema({
    name: String,
    stock: Number,
    sales: Number,
    sucursal: {type: mongoose.Schema.ObjectId, ref: 'Sucursal'}
});

module.exports = mongoose.model('ProductSucursal', productSucursal);