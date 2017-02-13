const React = require('react')
const Tdetail = require('Tdetail')

const Transaction = React.createClass({
  getInitialState: function () {
    return {
      showDetail: false
    }
  },
  handleClick: function () {
    this.setState({
      showDetail: (!this.showDetail)
    })
  },
  render: function () {
    let {tID, tDate, tDetails, tAmount, bal} = this.props
    return (
      <div className='card box-style' onClick={this.handleClick}>
        <div className='card-divider'>
          Bank
        </div>
        <div className='card-section'>
            <div className='row'>
              <div className='small-12 columns float-left'>
                {tDate}
              </div>
            </div>
            <div className='row'>
              <div className='small-6 columns'>
                {tAmount}
              </div>
              <div className='small-6 columns float-right bal'>
                {bal}
              </div>
            </div>
          </div>
        {this.state.showDetail ? <Tdetail id={tID} tDetail={tDetails}/> : null}
      </div>
    )
  }
})

module.exports = Transaction
