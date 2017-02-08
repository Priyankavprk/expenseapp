let React = require('react')
let {Link, IndexLink} = require('react-router')

let Nav = React.createClass({
  render: function () {
    return (
        <div className='top-bar'>
          <div className='top-bar-left'>
            <ul className='menu'>
              <li className='menu-text'>ExpenseApp</li>
              <li><IndexLink to='/' activeClassName='active' activeStyle={{fontWeight: 'bold'}}>Transactions</IndexLink></li>
              <li><Link to='/import' activeClassName='active' activeStyle={{fontWeight: 'bold'}}>Import</Link></li>
              <li><Link to='/examples' activeClassName='active' activeStyle={{fontWeight: 'bold'}}>Examples</Link></li>
            </ul>
          </div>
        </div>
      )
  }
})

module.exports = Nav
