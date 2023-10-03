const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const fileUpload = require('express-fileupload');

const app = express();
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload({ createParentPath: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', {layout: 'dark', name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { layout: 'main' });
});

app.get('/info', (req, res) => {
  res.render('info', { layout: 'dark' });
});

app.get('/history', (req, res) => {
  res.render('history', { layout: 'main' });
});

app.post('/contact/send-message', (req, res) => {

  const { author, sender, title, message} = req.body;
  let image = req.files.image;

  image.mv('./public/' + image.name);

  if(author && sender && title && message && (image.mimetype === 'image/png' || 'image/jpg' || 'image/jpeg' || 'image/gif')) {
    res.render('contact', { isSent: true, filename: image.name });
  }
  else {
    res.render('contact', { isError: true});
  }

});


app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});