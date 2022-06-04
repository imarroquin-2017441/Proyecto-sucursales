'use strict'

const express = require('express');
const empresaController = require('../controllers/empresa.controller');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.get('/pruebaEmpresa', empresaController.prueba);
api.post('/register', empresaController.register);
api.post('/login', empresaController.login);

api.put('/update/:id', mdAuth.ensureAuth, empresaController.update);
api.delete('/delete/:id', mdAuth.ensureAuth, empresaController.delete);

api.get('/getEmpres', [mdAuth.ensureAuth, mdAuth.isAdmin], empresaController.getEmpres)
api.post('/saveEmpres', [mdAuth.ensureAuth, mdAuth.isAdmin], empresaController.saveEmpres);
api.put('/updateEmpres/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], empresaController.updateEmpres);
api.delete('/deleteEmpres/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], empresaController.deleteEmpres);

module.exports = api;