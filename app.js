const path = require('path');
const exphbs = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 9000;
const hbs = exphbs.create({
   defaultLayout: 'main',
   extname: '.hbs',
   layoutsDir: path.join(__dirname, 'views/layouts'),
});

let users = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
   response.render('home');
});

app.get('/deleteUser', (request, response) => {
   response.render('deleteUser');
});

app.post('/deleteUser', (request, response) => {
   users = users.filter(e => e.name != request.body.name);
   response.redirect('/');
});

app.get('/addUser', (request, response) => {
   response.render('addUser');
});

app.post('/addUser', (request, response) => {
   if (users.filter(e => e.name == request.body.name).length === 0) {
      users.push({
         name: request.body.name,
      });
   }
   response.redirect('/');
});

app.get('/users', (request, response) => {
   response.render('users', { users });
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, err => {
   if (err) {
      return console.log('ERROR: ', err);
   }
   console.log(`> Ready on http://localhost:${port}`);
});
