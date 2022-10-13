const express = require('express');
const Sensores = require('../../models/sensores');
const checkApiKey = require('../../app/middlewares/checkApiKey')
const router = express.Router();

router.post('/getdata', checkApiKey, async (req, res) => {
    try {
        const data = req.body
        const sensorData = await Sensores.find()
        res.json(sensorData)
    } catch (error) {
        res.json(error)
    }

})

module.exports = app => app.use('/api', router);