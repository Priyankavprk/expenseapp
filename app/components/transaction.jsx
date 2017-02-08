let React = require('react')

let Transaction = React.createClass({
  render: function () {
    let {id, bank} = this.props
    return (
      <div className="box-style">
        {id}. {bank}
      </div>
    )
  }
})

module.exports = Transaction
