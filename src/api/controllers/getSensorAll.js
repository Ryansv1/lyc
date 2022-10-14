const express = require('express');
const Sensores = require('../../models/sensores');
const checkApiKey = require('../../app/middlewares/checkApiKey');
const router = express.Router();

router.post('/getall', async (req, res) => {
    const { sensor, dataColeta } = req.body
    try {
        if(sensor === 1){
            const dadosSensor = await Sensores.findOne({ id: sensor });
            console.log(dadosSensor)
        } if(sensor === 2){
            const dadosSensor = await Sensores.findOne({ id: sensor });
            console.log(dadosSensor)
        } if (sensor === 3){
            const dadosSensor = await Sensores.findOne({ id: sensor });
            console.log(dadosSensor)
        } if (sensor === 4){
            const dadosSensor = await Sensores.findOne({ id: sensor });
            console.log(dadosSensor)
        } else{
            console.log(error)
        }
        

    } catch (err) {
        console.log("entrou no erro")
        res.json(err)
    }

})

module.exports = app => app.use('/api', router);