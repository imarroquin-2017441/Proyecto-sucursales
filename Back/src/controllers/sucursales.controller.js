'use strict'

const Sucursal = require('../models/sucursales.model');
const Empresa = require('../models/empresa.model');
const ProductSucu = require('../models/productSucursales.model');
const validate = require('../utils/validate');

exports.prueba = (req, res)=>{
    return res.send({message: 'Conexion wena'});
}

exports.saveSucursal = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            direccion: params.direccion,
            empresa: req.empres.sub
        }

        const msg = validate.validateData(data);
        if(msg) return res.status(400).send(msg);
        const empresExist = await Empresa.findOne({_id: req.empres.sub});
        if(!empresExist) return res.send({message: 'Empresa no encontrada'});

        const sucursal = new Sucursal(data);
        await sucursal.save();
        return res.send({message: 'Sucursal guardada'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error guardando sucursal'});
    }
}

exports.updateSucu = async(req, res)=>{
    try{
        const sucursalId = req.params.id;
        const empresId = req.empres.sub;
        const params = req.body;

        const checkUpdate = await validate.checkUpdateSucursal(params);
        if(checkUpdate === false) return res.status(400).send({message: 'Params vacios o ne se pueden actualizar'});
        const empresaExist = await Empresa.findOne({_id: empresId});
        if(!empresaExist) return res.send({message: 'Empresa no encontrada'});
        const sucursalExist = await Sucursal.findOne({_id: sucursalId})
        const permission = await validate.checkPermission(sucursalExist.empresa, empresId);
        if(permission === false) return res.status(401).send({message: 'No tienes permiso para actulizar esta sucursal'})
        const sucursalUpdated = await Sucursal.findOneAndUpdate({_id: sucursalId}, params, {new: true})
        .lean()
        .populate('empresa');
        if(!sucursalUpdated) return res.send({message: 'Sucursal no existente'});
        return res.send({message: 'Sucursal actualizada', sucursalUpdated})
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error actualizando sucursal'})
    }
}

exports.deleSucu = async(req, res)=>{
    try{    
        const sucursalId = req.params.id;
        
        const empresaExist = await Empresa.findOne({_id: req.empres.sub});
        if(!empresaExist) return res.send({message: 'Empresa no encontrada'});
        const sucursalExist = await Sucursal.findOne({_id: sucursalId});
        const permission = await validate.checkPermission(sucursalExist.empresa, req.empres.sub);
        if(permission === false) return res.status(401).send({message: 'No tienes permiso para eliminar esta sucursal'});
        await ProductSucu.deleteMany({sucursal: sucursalId});
        const sucuDeleted = await Sucursal.findOneAndDelete({_id: sucursalId})
        .lean()
        .populate('empresa');
        if(!sucuDeleted) return res.send({message: 'Sucursal no encontrada o ya eliminada'});
        return res.send({message: 'Sucursal eliminada', sucuDeleted});
    }catch(err){    
        console.log(err);
        return res.status(500).send({err, message: 'Error eliminando sucursal'})
    }
}

exports.getSucursales = async(req, res)=>{
    try{
        const sucursales = await Sucursal.find({empresa: req.empres.sub});
        if(!sucursales) return res.send({message: 'Sucursales no encontradas'});
        return res.send({message: 'Sucursales encontradas', sucursales});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Eror buscando sucursales'});
    }
}

