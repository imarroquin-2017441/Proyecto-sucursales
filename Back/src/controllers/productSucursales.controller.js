'use strict'

const ProductSucursal = require('../models/productSucursales.model');
const validate = require('../utils/validate');

exports.prueba = (req, res)=>{
    return res.send({message: 'Conexion wena'});
}

exports.getProducts = async (req, res)=>{
    try {
        const products = await ProductSucursal.find()
        .lean();
        return res.send({message: 'Products found:', products})
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.searchProduct = async (req, res)=>{
    try {
        const params = req.body;
        const data = {
            name: params.name
        };
        const msg = validate.validateData(data);
        if (!msg) {
            const product = await ProductSucursal.find({name: {$regex:params.name, $options: 'i'}});
            return res.send({product});
        }else{
            return res.status(400).send(msg);
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.mostSales = async(req, res)=>{
    try{
        const productsMostSales = await ProductSucursal.find()
            .sort({sales: -1})
            .lean();
        return res.send({products: productsMostSales});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error buscando productos más vendidos'});
    }
}

exports.mostStock = async(req, res)=>{
    try{
        const productsMostStock = await ProductSucursal.find()
            .sort({stock: -1})
            .lean();
        return res.send({products: productsMostStock});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error buscando productos con mas stock'});
    }
}


exports.agregarVenta = async (req, res)=>{
    try{
        const params = req.body;
        let data ={sale: Number(params.sale)};
        const productSucursalId = req.params.id;
        const findProduct = await ProductSucursal.findOne({_id: productSucursalId});
        if(data.sale <= findProduct.stock){
            const updProductSucursal = await ProductSucursal.findOneAndUpdate({_id: productSucursalId}, 
                {stock: findProduct.stock - data.sale, sales: findProduct.sales + data.sale}, 
                {new: true});
            return res.status(200).send({message: 'Venta agregada', updProductSucursal});
        }else{
            return res.status(400).send({message: 'No tenemos esa cantidad disponible :('});
        }
    }catch (err) {
        console.log(err);
        return err;
    }
}