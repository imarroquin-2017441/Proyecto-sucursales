'use strict'

const mongoose = require('mongoose');

const empresaSchema = mongoose.Schema({
    name: String,
    type: String,
    email: String,
    password: String,
    phone: String,
    role: String
});

module.exports = mongoose.model('Empresa', empresaSchema);