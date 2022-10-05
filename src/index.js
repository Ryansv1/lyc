const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();

// Setup
app.set('view engine', 'ejs');
app.set('views', 'src/views/');
app.use(express.static('src/public'))

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/index')(app);
const authMiddleware = require('./app/middlewares/auth')
const checkErrorMiddleware = require('./app/middlewares/checkError')

// Rotas

app.get('/', authMiddleware, checkErrorMiddleware, (req, res) => {
    res.render('pages/index', { title:'Lycooper'});
});
app.get('/signin', (req, res)=>{
    res.render('pages/signin', { title:'Lycooper'});
});
app.get('/login', (req, res)=>{
    res.render('pages/login', { title:'Lycooper'});
});


app.listen(8090);
console.log('app running on 8090');