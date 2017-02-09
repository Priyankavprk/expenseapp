const React = require('react')
const ReactDOM = require('react-dom')
const {Route, Router, IndexRoute, hashHistory} = require('react-router')
const Main = require('Main')
const Import = require('Import')
const TMain = require('TMain')

// load foundation
require('style!css!foundation-sites/dist/css/foundation.min.css')
$(document).foundation()

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
<Router history={hashHistory}>
  <Route path='/' component={Main}>
  <Route path='import' component={Import}/>
  <IndexRoute component={TMain}/>
  </Route>
</Router>,
  document.getElementById('app')
)
