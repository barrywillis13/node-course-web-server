const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


//////////////////////////////////////////////////////////////////////
// M I D D L E W A R E
//////////////////////////////////////////////////////////////////////

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log +'\n', (error) => {
    if (error){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));
//////////////////////////////////////////////////////////////////////
// H E L P E R S
//////////////////////////////////////////////////////////////////////

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//////////////////////////////////////////////////////////////////////
// R O U T I N G   F U N C T I O N S
//////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Welcome Page',
    welcomeMessage: 'Welcome to the single-most bestest website OF ALL TIME!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Website is Borked!'
  })
})

//////////////////////////////////////////////////////////////////////
// L I S T E N E R
//////////////////////////////////////////////////////////////////////

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
