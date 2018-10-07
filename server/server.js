const express = require('express')
const path = require('path')
const config = require('../webpack.config.js')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const bodyParser = require('body-parser')
const cors = require('cors')

const auth = require('./api/auth')
const data = require('./api/data')

var app = express()

app.use(bodyParser.json())
app.use(cors())

app.post('/api/auth/register', auth.register)
app.post('/api/auth/login', auth.login)

app.post('/api/tasklists', data.getAllTaskLists)
app.post('/api/tasklists/new', data.newTaskList)
app.post('/api/tasklists/delete', data.deleteTaskList)
app.post('/api/tasklists/update', data.updateTaskList)
app.post('/api/task', data.taskDetails)
app.post('/api/task/new', data.newTask)
app.post('/api/task/update', data.updateTask)
app.post('/api/task/delete', data.deleteTask)
app.post('/api/note/new', data.newNote)
app.post('/api/note/update', data.updateNote)
app.post('/api/note/delete', data.deleteNote)

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
app.use(webpackHotMiddleware(compiler))
app.use(express.static('./dist'))

app.get('*', function(req,res) {
    res.sendFile(path.resolve('client/index.html'))
})

var port = 3000
app.listen(port, function(error) {
    if (error) throw error
})