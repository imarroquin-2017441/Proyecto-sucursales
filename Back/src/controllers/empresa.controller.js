'use strict'

const Empresa = require('../models/empresa.model');
const Sucursal = require('../models/sucursales.model');
const ProductEmpre = require('../models/productEmpresa.model');
const { validateData, alreadyEmpres, encrypt, checkPassword, checkPermission,
        checkUpdate, checkUpdateAdmin } = require('../utils/validate');
const jwt = require('../services/jwt');

exports.prueba = (req, res)=>{
    return res.send({message: 'Conexion wena'});
}

exports.register = async(req, res)=>{
    try{
        const params = req.body;
        let data = {
            name: params.name,
            type: params.type,
            email: params.email,
            password: params.password,
            phone: params.phone,
            role: 'Empresa'
        }
        let msg = validateData(data);

        if(msg) return res.status(400).send(msg);
        let already = await alreadyEmpres(data.name);
        if(already) return res.status(400).send({message: 'Nombre de empresa ya en uso, Prueba con otro'});
        data.password = await encrypt(params.password);

        let empres = new Empresa(data);
        await empres.save();
        return res.send({message: 'Empresa creada'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error guardando Empresa'});
    }
}

exports.login = async(req, res)=>{
    try{
        const params = req.body;
        let data = {
            name: params.name,
            password: params.password
        }
        let msg = validateData(data);

        if(msg) return res.status(400).send(msg);
        let already = await alreadyEmpres(params.name);
        if(already && checkPassword(data.password, already.password)){
            let token = await jwt.createToken(already);
            delete already.password;
            return res.send({message: 'Login completado', already, token});
        }else return res.status(401).send({message: 'Credenciales invalidas'})
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error al loguearse'})
    }
}

exports.saveAdmin = async (req, res)=>{
    try{
        const params = req.body;
        let data = {
            name: params.name,
            password: params.password,
            role: 'Admin'
        }
        let msg = validateData(data);

        if(msg) return res.status(400).send(msg);
        let already = await alreadyEmpres(data.name);
        if(already) return res.status(400).send({message: 'Nombre de Admin ya en uso, Prueba con otro'});
        data.password = await encrypt(params.password);

        let empres = new Empresa(data);
        await empres.save();
        return res.send({message: 'Admin creado'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error guardando Empresa'});
    }
}

exports.update = async (req, res)=>{
    try{
        const empresId = req.params.id;
        const params = req.body;
        
        const empresExist = await Empresa.findOne({_id: empresId});
        if(!empresExist) return res.send({message: 'Empresa no encontrada'});
        const permission = await checkPermission(empresId, req.empres.sub);
        if(permission === false) return res.status(401).send({message: 'No tienes permiso para actualizar a esta empresa'});
        const validateUpdate = await checkUpdate(params);
        if(validateUpdate === false) return res.status(400).send({message: 'No se puede actulizar esos parametros o params invalidos'});
        let alreadyName = await alreadyEmpres(params.name);
        if(alreadyName && empresExist.name != params.name) return res.send({message: 'Name ya en uso'});
        const empresUpdate = await Empresa.findOneAndUpdate({_id: empresId}, params, {new: true}).lean();
        if(empresUpdate) return res.send({message: 'Empresa actualizada', empresUpdate});
        return res.send({message: 'Empresa no actualizada'})
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Fallo al actualizar empresa'});
    }
}

exports.delete = async(req, res)=>{
    try{
        const empresId = req.params.id;
        const permission = await checkPermission(empresId, req.empres.sub);
        if(permission === false) return res.status(403).send({message: 'No tienes permisos para eliminar esta Empresa'});
        const empresDeleted = await Empresa.findOneAndDelete({_id: empresId});
        await Sucursal.deleteMany({empresa: empresId});
        await ProductEmpre.deleteMany({empresa: empresId});
        if(empresDeleted) return res.send({message: 'Empresa Eliminada', empresDeleted});
        return res.send({message: 'Empresa no encontrada o ya elimindada'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error eliminando empresa'});
    }   
}

exports.getEmpres = async(req, res)=>{
    try{
        const empresas = await Empresa.find().lean();
        if(empresas.length == 0) return res.send({message: 'Empresas no encontradas'});
        return res.send({empresas});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error trayendo las empresas'});
    }
}

exports.saveEmpres = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            type: params.type,
            email: params.email,
            password: params.password,
            phone: params.phone,
            role: params.role
        }
        
        const msg = validateData(data);
        if(msg) return res.status(400).send(msg);
        const empresExist = await alreadyEmpres(params.name);
        if(empresExist) return res.send({message: 'Name ya en uso'});
        if(params.role != 'Admin' && params.role != 'Empresa') return res.status(400).send({message: 'Role invalido'});
        data.password = await encrypt(params.password);

        const empresa = new Empresa(data);
        await empresa.save();
        return res.send({message: 'Empresa guardada satisfactoriamente'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error guardando la empresa'});
    }
}

exports.updateEmpres = async(req, res)=>{
    try{
        const empresId = req.params.id;
        const params = req.body;

        const empresExist = await Empresa.findOne({_id: empresId});
        if(!empresExist) return res.send({message: 'Empresa no encontrada'});
        const emptyEmpres = await checkUpdateAdmin(params);
        if(emptyEmpres === false) return res.send({message: 'Params vacios o no actualizados'});
        const validateUpdate = await checkUpdate(params);
        if(validateUpdate === false) return res.status(400).send({message: 'No se puede actulizar esos parametros o params invalidos'});
        if(empresExist.role === 'Admin') return res.send({message: 'No puedes actualizar a un Administrador'});
        const nameAlready = await alreadyEmpres(params.name);
        if(nameAlready && empresExist.name != params.name) return res.send({message: 'Name ya en uso'});
        //if(params.role != 'Admin' && params.role != 'Empresa') return res.status(400).send({message: 'Role invalido'});
        const empresUpdated = await Empresa.findOneAndUpdate({_id: empresId}, params, {new: true});
        if(!empresUpdated) return res.send({message: 'Empresa no actualizada'});
        return res.send({message: 'Empresa actualizada exitosamente'});

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error actulizando empresa'});
    }
}

exports.deleteEmpres = async(req, res)=>{
    try{
        const empresId = req.params.id;

        const empresExist = await Empresa.findOne({_id: empresId});
        if(!empresExist) return res.send({message: 'Empresa no encontrada'});
        if(empresExist.role === 'Admin') return res.send({message: 'No se puede eliminar a un Administrador'});
        await Sucursal.deleteMany({empresa: empresId});
        await ProductEmpre.deleteMany({empresa: empresId});
        const empresDeleted = await Empresa.findOneAndDelete({_id: empresId});
        if(!empresDeleted) return res.send({message: 'No se puedo eliminar a la empresa'});
        return res.send({message: 'Empresa eliminada', name: empresDeleted.name});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error eliminando empresa'})
    }
}