'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secretKey = 'SecretKeyToExample';

exports.createToken = async (empres)=>{
    try{
        const payload = {
            sub: empres._id,
            name: empres.name,
            type: empres.type,
            email: empres.email,
            role: empres.role,
            iat: moment().unix(),
            exp: moment().add(1, 'hour').unix()
        }
        return jwt.encode(payload, secretKey);
    }catch(err){
        console.log(err);
        return err
    }
    
}