'use strict'

const bcrypt = require('bcrypt-nodejs');
const Empresa = require('../models/empresa.model');

exports.validateData = (data) =>{
    let keys = Object.keys(data), msg = '';

    for(let key of keys){
        if(data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
        msg += `The params ${key} es obligatorio\n`
    }
    return msg.trim();
}

exports.alreadyEmpres = async (name)=>{
   try{
    let exist = Empresa.findOne({name:name}).lean()
    return exist;
   }catch(err){
       return err;
   }
}

exports.encrypt = async (password) => {
    try{
        return bcrypt.hashSync(password);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.checkPassword = async (password, hash)=>{
    try{
        return bcrypt.compareSync(password, hash);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.checkPermission = async (empresId, sub)=>{
    try{
        if(empresId != sub){
            return false;
        }else{
            return true;
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.checkUpdate = async (empres)=>{
    if(empres.password || 
       Object.entries(empres).length === 0 || 
       empres.role){
        return false;
    }else{
        return true;
    }
}

exports.checkUpdateAdmin = async(empres)=>{
    if(empres.password ||
       Object.entries(empres).length === 0){
        return false;
    }else{
        return true;
    }
}

exports.checkUpdateSucursal = async(sucursal)=>{
    if(sucursal.empresa ||
       Object.entries(sucursal).length === 0){
        return false;
    }else{
        return true;
    }
}

exports.checkUpdateProducto = async(product)=>{
    if(product.empresa ||
       Object.entries(product).length === 0){
        return false;
    }else{
        return true;
    }
}