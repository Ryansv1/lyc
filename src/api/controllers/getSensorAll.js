const express = require('express');
const Sensores = require('../../models/sensores');
const checkApiKey = require('../../app/middlewares/checkApiKey');
const router = express.Router();

router.post('/getall', async (req, res) => {
    const { sensor, dataColeta } = req.body
    try {
        console.log(req.body)
        const dadosSensor = await Sensores.find({id:sensor});   
        res.json(dadosSensor)

    } catch (err) {
        console.log("entrou no erro")
        res.json(err)
    }

})

module.exports = app => app.use('/api', router);