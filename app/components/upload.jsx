const React = require('react')

const Import = React.createClass({
  render: function () {
    return (
      <div>
       <h1>Upload here</h1>
       <div className='row'>
         <div className='coloumns small-centered main'>
           <form name='form1' method='post' encType='multipart/form-data' action='/upload'>
             <input type='file' name= 'file' id='file'className='inputfile' name='file'/>
             <button className='button expanded btn'>Submit</button>
           </form>
         </div>
       </div>
      </div>
    )
  }
})

module.exports = Import
