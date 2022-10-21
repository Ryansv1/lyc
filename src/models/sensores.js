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
    },
});

sensoresSchema.set('timestamps', true);

const Sensores = mongoose.model('Sensores', sensoresSchema);
module.exports = Sensores;
