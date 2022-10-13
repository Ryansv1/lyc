const Sensores = require('../../models/sensores')

module.exports = async() => {
    const data = await Sensores.find()
    return data
}