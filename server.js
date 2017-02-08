const fs = require('fs')
const Guid = require('guid')
const express = require('express')
const bodyParser = require('body-parser')
const Mustache = require('mustache')
const Request = require('request')
const Querystring = require('querystring')
const app = express()
const path = require("path")

app.use(express.static(path.join(__dirname,'/public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


let csrf_guid = Guid.raw()
const api_version = 'v1.0'
const app_id = '354578414912778'
const app_secret = '95bf1f8379d7cd0bf5fb8a9c62416a37'
const me_endpoint_base_url = 'https://graph.accountkit.com/v1.1/me'
const token_exchange_base_url = 'https://graph.accountkit.com/v1.1/access_token'

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'db'
})

connection.connect(function (err) {
  if (!err) {
    console.log('Database is connected ... nn')
  } else {
    console.log('Error connecting database ... nn')
    console.log(err)
  }
})

function loadLogin () {
  return fs.readFileSync('public/login.html').toString()
}

app.get('/', function (request, response) {
  var view = {
    appId: app_id,
    csrf: csrf_guid,
    version: api_version
  }

  let html = Mustache.to_html(loadLogin(), view)
  response.send(html)
})

function loadLoginSuccess () {
  return fs.readFileSync('public/login_success.html').toString()
}

function loadRegister () {
  return fs.readFileSync('public/register.html').toString()
}
function loadHomePage () {
  return fs.readFileSync('public/home.html').toString()
}

app.post('/sendcode', function (request, response) {
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
      console.log(respBody)
      var view = {
        user_access_token: respBody.access_token,
        expires_at: respBody.expires_at,
        user_id: respBody.id
      }
      //var id = respBody.id
      // get account details at /me endpoint
      let me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token
      Request.get({url: me_endpoint_url, json: true }, function (err, resp, respBody) {
        // send login_success.html
        console.log(respBody)
        if (respBody.phone) {
          view.method = 'SMS'
          view.identity = respBody.phone.number
        }
        connection.query('SELECT * FROM login WHERE id = ?', respBody.id, function (err, rows) {
          console.log(rows, err)
          if (rows.length === 0) {
            connection.query('INSERT INTO login VALUES (?, ?, ?, ?)', [respBody.id, null, null, respBody.phone.number])
            var html = Mustache.to_html(loadRegister(), view)
            response.send(html)
          } else {
            let html = Mustache.to_html(loadHomePage(), view)
            response.send(html)
         }

        //  connection.end()
        })
      })
    })
  } else {
    // login failed
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end('Something went wrong. :( ')
  }
})


app.post('/senddata', function (request, response) {
  connection.query('UPDATE login SET name = ? WHERE id = ?', [request.body.name, request.body.id])
  let view = {

  }
  let html = Mustache.to_html(loadHomePage(), view)
  response.send(html)
  //connection.end()
})

app.get('/test',(req,res)=>{
  let html = Mustache.to_html(loadHomePage())
  res.send(html)
})

app.listen(3000)
