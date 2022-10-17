const mongoose = require('../database');

const sensoresSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,     /* SERÁ SALVO COMO NUMBER PARA DIFERENCIAR APENAS NO CODIGO DO ARDUINO 1=PH 2=TH2O 3=UMSOLO */
    },
    dados: {
        valor: {
            type: Number
        },
        status: {
            type: Boolean,
            required: true,
        },
    },
    dataColeta: {
        type: Date,
        default: Date
    }
});

sensoresSchema.pre('save', async function(next){
    let data = this.dataColeta
    let dataFormatada = (data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + (data.getDate() )) ; 
    next();
})

const Sensores = mongoose.model('Sensores', sensoresSchema);
module.exports = Sensores;
