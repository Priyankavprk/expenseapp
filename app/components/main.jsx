let React = require('react')
let Nav = require('Nav')
let TransactionList = require('TransactionList')

let Main = React.createClass({
  getInitialState: function () {
    return {
      transactions: [
        {
          id: 1,
          bank: 'SBI'
        }, {
          id: 2,
          bank: 'HDFC'
        }
      ]
    }
  },
  render: function () {
    let {transactions} = this.state
    return (
      <div>
        <Nav/>
        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5 main">
              <TransactionList transactions={transactions}/>
          </div>
        </div>
       </div>
    )
  }
})

module.exports = Main
