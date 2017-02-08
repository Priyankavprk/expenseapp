let React = require('react')
let Transaction = require('Transaction')

let TransactionList = React.createClass({
  render: function () {
    let {transactions} = this.props
    let renderTransactions = () => {
       return transactions.map((transaction) => {
        return (
          <Transaction key={transaction.id} {...transaction}/>
        )
      })
    }
    return (
      <div>
        {renderTransactions()}
      </div>
    )
  }
})

module.exports = TransactionList
