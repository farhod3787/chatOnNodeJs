const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const server = require('http').Server(app);
const io = require('socket.io')(server, {serveClient: true});
const mongoose = require('mongoose');
const passport = require('passport');
const { Strategy } = require('passport-jwt');


mongoose.connect('mongodb://localhost:27017/chatik', {promiseLibrary: global.Promise});
mongoose.Promise = require('bluebird');



nunjucks.configure('./client/views/', {
    autoescape: true,
    express: app
});

app.use('/assets', express.static('./client/public'));

app.get('/', (req, res)=>{
    res.render('index.html', {date: new Date()});
})

require('./socket')(io);

server.listen(3000,   ()=>{
    console.log('Server started on port 3000');
})


//   1:49 min