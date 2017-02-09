const React = require('react')

const Import = React.createClass({
  render: function () {
    return (
      <div>
       <h1>Import here</h1>
       <div className='row'>
         <div className='coloumns small-centered main'>
           <form name='form1' method='post' encType='multipart/form-data' action='/upload'>
             <label className='fileContainer'>
             <input type='file' className='' name='file'/>
             </label>
             <button className='button expanded'>Submit</button>
           </form>
         </div>
       </div>
      </div>
    )
  }
})

module.exports = Import
