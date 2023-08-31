const express = require('express')
const path = require('path')
const server = express()
server.use(express.urlencoded()) //reads
server.use(express.static(path.resolve('../client')))
let fs = require('fs')
server.post('/formData', (req, res) => {
  const file = JSON.parse(fs.readFileSync('writeMe.txt', 'utf8'))
  if (req.body.password == file.password && req.body.user == file.user) {
    res.redirect('http://localhost:3000/home.html');
  }
  else {
    res.send('wrong password<a href="http://localhost:3000/">(Go back!)</a>')
  }
})
server.post('/reData', (req, res) => {
  console.log(req.body)
  res.redirect('http://localhost:3000/index.html');
  fs.writeFileSync('writeMe.txt', JSON.stringify(req.body));
})
server.get('/register', (req, res) => {
  res.sendFile(path.resolve('../client/re.html'))
})
server.listen(3000, () => {
  console.log("server stuff doing good")
  console.log("http://localhost:3000/")
})
server.get('/login', (req, res) => {
  res.sendFile(path.resolve('../client/index.html'))
})