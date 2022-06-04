'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const empresaRoutes = require('../src/routes/empresa.routes');
const sucursalRoutes = require('../src/routes/sucursales.routes')
const productEmpres = require('../src/routes/productEmpresa.routes');
const productSucursales = require('../src/routes/productSucursales.routes');

const app = express(); //instancia

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use('/empresa', empresaRoutes);
app.use('/sucursal', sucursalRoutes);
app.use('/productoEmpresa', productEmpres);
app.use('/productoSales', productSucursales);

module.exports = app;