var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
var app = express();
require('dotenv').config()
const bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({extended:false}))

app.use('/', (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

app.use('/public', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE === 'uppercase'){
        res.json({'message':'HELLO JSON'})
    } else {
        res.json({'message':'Hello json'})
    }
})

app.get('/now', 

    (req, res, next) => {
    req.time = new Date().toString()
    next()

},  (req, res) => {
    res.json({time: req.time})
}
)

app.get('/:word/echo', (req, res) => {
    const word = req.params.word
    res.json({echo:word})
})

app.route('/name')
    .get((req, res) => {
        const { first } = req.query
        const { last } = req.query
        res.json({ name: `${first} ${last}` })
    })
    .post((req, res) => {
        const { first } = req.body
        const { last } = req.body
        res.json({ name: `${first} ${last}` })
    })


 module.exports = app;
