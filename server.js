var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var faker = require('faker');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/admin', {
  useNewUrlParser: true,
  user: 'root',
  pass: 'example',
  dbName: 'mydb',
});

const Users = mongoose.model('Users', { 
  name: String,
  email: String,
});

for (var i=0; i<10; i++) {
  new Users({ 
    name: faker.name.findName(),
    email: faker.internet.email(),
  }).save().then( () => console.log('save complete'))
}

// respond with "hello world" when a GET request is made to the homepage
app.use(bodyParser.json())

app.get('/', function (req, res, next) {
  res.send('hello world')
})

app.use(morgan('dev'))

app.get('/users', function (req, res) {
  const promise = Users.find().then((mongores) => {
    console.log('mongo db response here')
    res.json(mongores)
  })
})

app.post('/user', function (req, res) {
  db.push({ name: req.body.name, email: req.body.email })
  res.json('post ok')
})

app.listen(9090, function() {
  console.log('server is start')
})
