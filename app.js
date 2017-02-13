const mysql = require('mysql')
const http = require('http').createServer()
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()
const connection = require('express-myconnection')
const session = require('express-session')
const uuid = require('node-uuid')
const MySQLStore = require('express-mysql-session')(session)
const multer = require('multer')
// const routes = require('./routes.js')

const fs = require('fs')
const Guid = require('guid')
const Mustache = require('mustache')
const Request = require('request')
const Querystring = require('querystring')
const path = require('path')
const formidable = require('formidable')

const options = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'expenseApp'
}
const con = connection(mysql, options)
const sessionStore = new MySQLStore(options)

let csrf_guid = Guid.raw()
const api_version = 'v1.0'
const app_id = '354578414912778'
const app_secret = '95bf1f8379d7cd0bf5fb8a9c62416a37'
const me_endpoint_base_url = 'https://graph.accountkit.com/v1.1/me'
const token_exchange_base_url = 'https://graph.accountkit.com/v1.1/access_token'

app.use(session({
  key: 'session',
  secret: `|s9a003==-32-3[\''ads.,@ZN'`,
  genid: req => uuid.v4(),
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true,
  store: sessionStore,
  maxAge: 1000 * 60 * 500,
  httpOnly: true,
  secure: true,
  ephemeral: true
}))

app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//app.set('view engine', 'html')
//app.engine('html', require('hbs').__express)
app.use(con)
app.use(express.static(__dirname + '/public'))

app.listen(3000, () => console.log('Listening at port 3k'))

const loadLogin = () => fs.readFileSync('public/login.html').toString()

const loadLoginSuccess = () => fs.readFileSync('public/login_success.html').toString()

const loadRegister = () => fs.readFileSync('public/register.html').toString()

const loadHomePage = () => fs.readFileSync('public/home.html').toString()

app.post('/sendcode', login)

function login (request, response) {
  // CSRF check
  if (request.body.csrf_nonce === csrf_guid) {
    var app_access_token = ['AA', app_id, app_secret].join('|')
    var params = {
      grant_type: 'authorization_code',
      code: request.body.code,
      access_token: app_access_token
      // appsecret_proof: app_secret
    }

    // exchange tokens
    let token_exchange_url = token_exchange_base_url + '?' + Querystring.stringify(params)
    Request.get({url: token_exchange_url, json: true}, function (err, resp, respBody) {
      var view = {
        user_access_token: respBody.access_token,
        expires_at: respBody.expires_at,
        user_id: respBody.id
      }
      // get account details at /me endpoint
      let me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token
      Request.get({url: me_endpoint_url, json: true }, function (err, resp, respBody) {
        // send login_success.html
        if (respBody.phone) {
          view.method = 'SMS'
          view.identity = respBody.phone.number
        }
        request.getConnection((err, connection) => {
          if (err) {
            console.log('Connection Error')
            return err
          }
          request.session.user = respBody.phone.national_number
        connection.query('SELECT name FROM login WHERE fbSign = ?', respBody.id, function (err, rows) {
          if (rows.length === 0 || rows[0].name === null) {
            connection.query('INSERT INTO login VALUES (?, ?, ?, ?)', [respBody.id, null, null, respBody.phone.national_number])
            var html = Mustache.to_html(loadRegister(), view)
            response.send(html)
          } else {
            let html = Mustache.to_html(loadHomePage(), view)
            response.send(html)
          }
        })
      })
    })
    })
  } else {
    // login failed
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end('Something went wrong. :( ')
  }

}


app.post('/senddata', function (request, response) {
  request.getConnection((err, connection) => {
    if (err) {
      console.log('Connection Error')
      return err
    }
  connection.query('UPDATE login SET name = ? WHERE fbSign = ?', [request.body.name, request.body.id])
  let view = {

  }
  let html = Mustache.to_html(loadHomePage(), view)
  response.send(html)
  })
})
//
// app.get('/test', (req, res) => {
//   let html = Mustache.to_html(loadHomePage())
//   res.send(html)
// })
//

app.get('/gettransaction', (req, res) => {
  const id = req.session.user
  console.log(req.session.id)
  req.getConnection((err, connection) => {
    if (err) {
      console.log('Connection Error')
      return err
    }
    connection.query('SELECT * FROM icici WHERE uID = ?', id, (err, rows) => {
      if (err) {
        console.log('Connection error. Pleas try again later')
        return null
      }
      if (rows.length === 0) {
        console.log('No transaction data available')
        return null
      }
      res.send({
        transactions: rows
      })
    })
  })
})

app.post('/upload', (req, res) => {
  var form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    console.log(files)
  })
})

app.get('/', (req, res) => {
  const view = {
    appId: app_id,
    csrf: csrf_guid,
    version: api_version
  }
  const html = Mustache.to_html(loadLogin(), view)
  res.send(html)
})
