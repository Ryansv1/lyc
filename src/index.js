const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Setup
app.set('view engine', 'ejs');
app.set('views', 'src/views/');
app.use(express.static('src/public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/authController')(app);

// Rotas

app.get('/', (req, res) => {
    res.render('pages/login');
});
app.get('/signin', (req, res)=>{
    res.render('pages/index', { title:'Lycooper'})
})


app.listen(8090);
console.log('app running on 8090');