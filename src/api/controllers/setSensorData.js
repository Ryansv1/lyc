const express = require('express');
const Sensores = require('../../models/sensores');
const checkApiKey = require('../../app/middlewares/checkApiKey');
const router = express.Router();

router.post('/insert', checkApiKey, async (req, res)=>{
    try {
        
        const Sensor = await Sensores.create(req.body);
        return  res.json({
            status: ok
        })  /* criar code arduino com os parametros necessários e no formato ideal do json  do model "sensores" */

    } catch (err){
        return console.log("erro ao cadastrar dados do sensor.")
    }
});

module.exports = app => app.use('/api', router);
