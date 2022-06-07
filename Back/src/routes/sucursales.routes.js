'use strict'

const express = require('express');
const sucursalController = require('../controllers/sucursales.controller');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.get('/getSucursal', sucursalController.prueba);
api.post('/saveSucursal', mdAuth.ensureAuth, sucursalController.saveSucursal);
api.put('/updateSucursal/:id', mdAuth.ensureAuth, sucursalController.updateSucu);
api.delete('/deleteSucursal/:id', mdAuth.ensureAuth, sucursalController.deleSucu);
api.get('/getSucursales', mdAuth.ensureAuth, sucursalController.getSucursales);
api.get('/getSucuId/:id', sucursalController.getSucuId, mdAuth.ensureAuth);

module.exports = api;