'use strict'

const ProductEmpresa = require('../models/productEmpresa.model');
const ProductSucursal = require('../models/productSucursales.model');
const Empresa = require('../models/empresa.model');
const Sucursal = require('../models/sucursales.model');
const validate = require('../utils/validate');

exports.prueba = (req, res)=>{
    return res.send({message: 'Conexion wena'});
}

exports.saveProductoE = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            proveedor: params.proveedor,
            stock: params.stock,
            empresa: req.empres.sub
        }

        const msg = validate.validateData(data);
        if(msg) return res.status(400).send(msg);
        const empresExist = await Empresa.findOne({_id: req.empres.sub});
        if(!empresExist) return res.send({message: 'Empresa no encontrada'});

        const productoE = new ProductEmpresa(data);
        await productoE.save();
        return res.send({message: 'Producto de empresa guardado'})

    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error guardando producto'});
    }
}

exports.sendProduct = async(req, res)=>{
    try{
        const params = req.body;
        const empresId = req.empres.sub;
        const data = {
            name: params.name,
            stock: params.stock,
            sales: 0,
            sucursal: params.sucursal
        }

        const msg = validate.validateData(data);
        if(msg) return res.status(400).send(msg);
        const productExist = await ProductEmpresa.findOne({name: {$regex: params.name, $options: 'i'}});
        if(!productExist) return res.send({message: 'Producto no existente en la empresa'});
        const empresaExist = await Empresa.findOne({_id: empresId});
        if(!empresaExist) return res.send({message: 'Empresa no econtrada'});
        const sucursalExist = await Sucursal.findOne({_id: params.sucursal});
        if(!sucursalExist) return res.send({message: 'la sucursal no existe, pruebe con otra'});
        const permission = await validate.checkPermission(productExist.empresa, empresId);
        if(permission === false) return res.status(401).send({message: 'No puedes realizar esta accion :('});
        const productSucu = await ProductSucursal.findOne({name: {$regex: params.name, $options: 'i'}, sucursal: params.sucursal});
        if(!productSucu){
            if(productExist.stock >= params.stock){
                const enviado = {
                    name: params.name,
                    stock: params.stock,
                    sales: 0,
                    sucursal: params.sucursal
                }

                const resta = {
                    name: productExist.name,
                    proveedor: productExist.proveedor,
                    stock: productExist.stock - params.stock,
                    empresa: productExist.empresa
                }

                const productoSucur = new ProductSucursal(enviado);
                await productoSucur.save();
                const productEmpres = await ProductEmpresa.findOneAndUpdate({_id: productExist.id}, resta, {new: true});
                return res.send({message: 'producto enviado a sucursal', productEmpres});
            }else if(productExist.stock < params.stock){
                return res.send({message: 'Stock insuficiente'});
            }
        }else if(productSucu){
            if(productExist.stock >= params.stock){
                const enviado = {
                    name: productSucu.name,
                    stock: (productSucu.stock*1) + (params.stock*1),
                    sales: productSucu.sales,
                    sucursal: productSucu.sucursal
                }

                const resta = {
                    name: productExist.name,
                    proveedor: productExist.proveedor,
                    stock: productExist.stock - params.stock,
                    empresa: productExist.empresa
                }

                const productoSucur = await ProductSucursal.findOneAndUpdate({_id: productSucu.id}, enviado, {new: true});
                const productEmpres = await ProductEmpresa.findByIdAndUpdate({_id: productExist.id}, resta, {new: true});
                return res.send({message: 'Se agrego mas stock', productoSucur, productEmpres});
            }else if(productExist.stock < params.stock){
                return res.send({message: 'Stock insuficiente en la empresa'});
            }
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Producto no enviado'});
    }
}

exports.updateProduct = async(req, res)=>{
    try{
        const productoId = req.params.id;
        const empresId = req.empres.sub;
        const params = req.body;

        const checkUpdate = await validate.checkUpdateProducto(params);
        if(checkUpdate === false) return res.status(400).send({message: 'Params vacios o no se pueden actualizar'});
        const empresaExist = await Empresa.findOne({_id: empresId});
        if(!empresaExist) return res.send({message: 'Empresa no encontrada'});
        const productoExist = await ProductEmpresa.findOne({_id: productoId});
        const permission = await validate.checkPermission(productoExist.empresa, empresId);
        if(permission === false) return res.status(401).send({message: 'No tienes permiso para actulizar este producto'});
        const productoUpdated = await ProductEmpresa.findOneAndUpdate({_id: productoId}, params, {new: true});
        if(!productoUpdated) return res.send({message: 'Producto no existente'});
        return res.status(500).send({message: 'Producto actualizado', productoUpdated});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error actualizando producto'});
    }
}

exports.deleProduct = async(req, res)=>{
    try{
        const productId = req.params.id;
        const empresId = req.empres.sub;

        const empresaExist = await Empresa.findOne({_id: empresId});
        if(!empresaExist) return res.send({message: 'Empresa no encontrada'});
        const productExist = await ProductEmpresa.findOne({_id: productId});
        const permission = await validate.checkPermission(productExist.empresa, empresId);
        if(permission === false) return res.status(401).send({message: 'No tienes permiso para eliminar esta producto'});
        const productDeleted = await ProductEmpresa.findOneAndDelete({_id: productId});
        if(!productDeleted) return res.send({message: 'Producto no encontrado o ya eliminado'});
        return res.send({message: 'Producto eliminado', productDeleted});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error eliminado producto'});
    }
}

exports.getProductos = async(req, res)=>{
    try{
        const productos = await ProductEmpresa.find({empresa: req.empres.sub});
        if(!productos) return res.send({message: 'Producto no encontrados'});
        return res.send({message: 'Productos encontrados', productos});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error buscando productos'});
    }
}