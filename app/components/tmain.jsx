const React = require('react')
const TransactionList = require('TransactionList')
const {getJSON} = require('io-square-browser')

const TMain = React.createClass({
  /*getInitialState: function () {
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
  },*/
  componentDidMount: function () {
    getJSON('/gettransaction').then((response) => {
      this.setState(
        {transactions: response.transactions}
      )
    })
  },
  render: function () {
    // console.log(this.state)
    if (!this.state) {
      return (<div>
        Loading
      </div>)
    }
    let {transactions} = this.state
    return (
      <div>
        <TransactionList transactions={transactions}/>
      </div>
    )
  }
})

module.exports = TMain
