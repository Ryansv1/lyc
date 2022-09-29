const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth.json');

const router = express.Router();

router.post('/register', async (req,res) => {
    const { email } = req.body;
    
    try {
        if(await User.findOne({ email }))
        return res.status(400).send({ error:'User Already Exists'})
        
        const user = await User.create(req.body);

        User.password = undefined;

        return res.send({ 
            user, 
            token: generateToken({ id: user.id }) 
         });

    } catch (err){
        return res.status(400).send({ error: 'Registration Failed '});
    }
});

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, { 
        expiresIn:86400,  
      });
}

router.post('/authenticate', async (req,res) =>{
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.status(400).send({ error:'Usuário não encontrado'});

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error:'Invalid Password'});

        User.password = undefined;

    res.send({ 
        user, 
        token: generateToken({ id: user.id }) 
     });
    
});

router.post('/forgot_pass', async(req, res) =>{
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user)
        return res.status(400).send({ error: 'User not Found'});
        
        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        })
        mailer.sendMail({
            to: email,
            from: 'ryaan.gs2020@gmail.com',
            template: '/forgot_pass',
            context: { token },
        }, (err) =>{
            console.log(err)
            if(err)
            return res.status(400).send({error: 'Cannot send forgot password email'});

        res.send();
        })

    } catch(err){
        console.log(err)
        res.status(400).send({ error: 'Error on forgot pass, try again'})
    }
});
module.exports = app => app.use ('/auth', router);