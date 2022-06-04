'use strict'

const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');
const productSucursalescontroller = require('../controllers/productSucursales.controller');

api.get('/prueba', productSucursalescontroller.prueba);
api.get('/getProducts', productSucursalescontroller.getProducts);
api.get('/searchProduct', productSucursalescontroller.searchProduct);
api.post('/Ventas/:id', productSucursalescontroller.agregarVenta);
api.get('/mostSale', productSucursalescontroller.mostSales);
api.get('/mostStock', productSucursalescontroller.mostStock);

module.exports = api;