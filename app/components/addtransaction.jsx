const React = require('react')

const AddTransaction = React.createClass({
  render: function () {
    return (
      <div>
        <form name='addtransaction' method='POST' action='/addTransaction'>
          <div className='row'>
           <div className='small-3 columns'>
             <label htmlFor='date' className='text-right middle'>Date of transaction</label>
           </div>
           <div className='small-9 columns'>
            <input type='date' id='date'/>
           </div>
          </div>
          <div className='row'>
           <div className='small-3 columns'>
             <label htmlFor='detail' className='text-right middle'>Details</label>
           </div>
           <div className='small-9 columns'>
            <input type='text' id='detail' placeholder='enter the details'/>
           </div>
          </div>
          <div className='row'>
           <div className='small-3 columns'>
             <label htmlFor='amount' className='text-right middle'>Amount</label>
           </div>
           <div className='small-9 columns'>
            <input type='text' id='amount' placeholder='enter the amount'/>
           </div>
          </div>
          <div className='row'>
           <div className='small-3 columns'>
             <label htmlFor='type' className='text-right middle'>Type of transaction</label>
           </div>
           <div className='small-9 columns'>
            <input type='text' id='type' placeholder='type of transaction'/>
           </div>
          </div>
          <button className='button expanded btn'>Submit</button>
        </form>
      </div>
    )
  }
})

module.exports = AddTransaction
