const path = require('path');
const exphbs = require('express-handlebars');
const express = require('express');
const app = express();
const port = 9000;

let users = [];

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (request, response) => {
   response.render('home', {
      name: 'John',
   });
});

app.post('/', (request, response) => {
   if (request.body.removeUser == undefined) {
      users.push(request.body.addUser);
   } else {
      users = users.filter(name => name != request.body.removeUser);
   }
   response.render('home', {
      name: 'John',
   });
});

app.post('/users', (request, response) => {
   let str = `Users:<br>`;
   for (let i = 0; i < users.length; i++) {
      str += `${users[i]} <br>`;
   }
   response.send(str);
});

app.engine(
   '.hbs',
   exphbs({
      defaultLayout: 'main',
      extname: '.hbs',
      layoutsDir: path.join(__dirname, 'views/layouts'),
   }),
);
app.set('view engine', '.hbs');

app.set('views', path.join(__dirname, 'views'));

app.listen(port, err => {
   if (err) {
      return console.log('ERROR: ', err);
   }
   console.log(`> Ready on http://localhost:${port}`);
});
