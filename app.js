const path = require('path');
const exphbs = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');
const Users = require('./Users');

const app = express();
const port = 9000;
const hbs = exphbs.create({
   defaultLayout: 'main',
   extname: '.hbs',
   layoutsDir: path.join(__dirname, 'views/layouts'),
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users/*', (request, response) => {
   switch (request.params['0']) {
      case 'home': {
         response.render('home');
         break;
      }
      case 'addUser': {
         response.render('addUser');
         break;
      }
      case 'deleteUser': {
         response.render('deleteUser');
         break;
      }
      case 'getUsers': {
         response.render('users', { users: Users.getUsers() });
         break;
      }
      default: {
         response.sendStatus(404);
      }
   }
});

app.post('/users/*', (request, response) => {
   switch (request.params['0']) {
      case 'addUser': {
         Users.addUser(request.body.name);
         response.redirect('/users/home');
         break;
      }
      case 'deleteUser': {
         Users.deleteUser(request.body.name);
         response.redirect('/users/home');
         break;
      }
      default: {
         response.sendStatus(404);
      }
   }
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
