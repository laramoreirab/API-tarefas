const express = require('express')
const fs = require('fs')
const router = express.Router()

const autenticar = (req,res,next) => {
     
    const token = req.headers['authorization']
    if(token == 'segredo'){
        next()
    }
    else{
        res.status(401).send('Não Autorizado!')
    }
}

module.exports = router