const React = require('react')

const Transaction = React.createClass({
  render: function () {
    let {id, bank} = this.props
    return (
      <div className='card'>
        <div className='card-section'>
            {id}. {bank}
        </div>

      </div>
    )
  }
})

module.exports = Transaction
