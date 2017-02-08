let React = require('react')
let ReactDOM = require('react-dom')
let {Route, Router, IndexRoute, hashHistory} = require('react-router')
let Main = require('Main')

// load foundation
require('style!css!foundation-sites/dist/css/foundation.min.css')
$(document).foundation()

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
<Router history={hashHistory}>
  <Route path='/' component={Main}>
  </Route>
</Router>,
  document.getElementById('app')
)
