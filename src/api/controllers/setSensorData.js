const express = require('express');
const Sensores = require('../../models/sensores');
const checkApiKey = require('../../app/middlewares/checkApiKey');
const router = express.Router();

router.post('/inserir', checkApiKey, async (req, res)=>{
    try {
        
        const Sensor = await Sensores.create(req.body);
        return  res.json({
            ricardo: true
        })

    } catch (err){
        return console.log("erro ao cadastrar dados do sensor.")
    }
});

module.exports = app => app.use('/api', router);
