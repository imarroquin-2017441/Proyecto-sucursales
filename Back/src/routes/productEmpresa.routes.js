'use strict'

const express = require('express');
const productEmpres = require('../controllers/productEmpresa.controller');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.get('/productosEmpresa', productEmpres.prueba);
api.post('/saveProductoE', mdAuth.ensureAuth, productEmpres.saveProductoE);
api.post('/sendProduct', mdAuth.ensureAuth, productEmpres.sendProduct);
api.put('/updateProducto/:id', mdAuth.ensureAuth, productEmpres.updateProduct);
api.delete('/deleteProducto/:id', mdAuth.ensureAuth, productEmpres.deleProduct);
api.get('/getProductos', mdAuth.ensureAuth, productEmpres.getProductos);

module.exports = api;