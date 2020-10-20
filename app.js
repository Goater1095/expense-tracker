const express = require('express')
const mongoose = require('mongoose')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const port = 3000
const app = express()
const Record = require('./models/Record')

//set template engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//set mongodb
mongoose.connect('mongodb://localhost/expense', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//set use
app.use(bodyParser.urlencoded({ extends: true }))
//set route
//C"R"UD
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then((records) => res.render('index', { records }))
    .catch((error) => console.log(error))
})

//"C"RUD
app.get('/records/new', (req, res) => {
  return res.render('new')
})
app.post('/records', (req, res) => {
  const record = req.body
  return Record.create(record)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

//CR"U"D
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch((error) => console.log(error))
})
app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((record) => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})
//CRU"D"
app.get('/records/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})
app.listen(port, () => {
  console.log(`Express Server is start on http://localhost:${port}`)
})
