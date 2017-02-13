const React = require('react')
const {postJSON} = require('io-square-browser')

const Tdetail = React.createClass({
  handleRadio: function (e) {
    let bank = this.refs.bank.checked
    let cash = this.refs.cash.checked
    let asset = this.refs.asset.checked
    let share = this.refs.share.checked
    let income = this.refs.income.checked
    let expense = this.refs.expense.checked
    if (bank) {
      postJSON('/updatedata', 'bank')
    } else if (cash) {
      postJSON('/updatedata', 'cash')
    } else if (asset) {
      postJSON('/updatedata', 'asset')
    } else if (share) {
      postJSON('/updatedata', 'share')
    } else if (income) {
      postJSON('/updatedata', 'income')
    } else {
      postJSON('/updatedata', 'expense')
    }
  },
  render: function () {
    let id = this.props.id
    let tDetail = this.props.tDetail
    return (
      <div>
        <div className='small-9 columns'>
          <div className='row'>
            {tDetail}
          </div>
          <div className='row'>
            <label>
              <input type='radio' name='value' value='bank' ref='bank' onChange={this.handleRadio}/> Bank Account
            </label>
          </div>
          <div className='row'>
            <input type='radio' name='value' ref='cash' onChange={this.handleRadio}/> Cash Account
            <label>
            </label>
          </div>
          <div className='row'>
            <label>
              <input type='radio' name='value' ref='asset' onChange={this.handleRadio}/> Fixed Assets
            </label>
          </div>
          <div className='row'>
            <label>
              <input type='radio' name='value' ref='share' onChange={this.handleRadio}/> Shareholders Capital
            </label>
          </div>
          <div className='row'>
            <label>
              <input type='radio' name='value' ref='income' onChange={this.handleRadio}/> Income
            </label>
          </div>
          <div className='row'>
            <label>
              <input type='radio' name='value' ref='expense' onChange={this.handleRadio}/> Expense
            </label>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Tdetail
