import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: this.props.values.firstName || 'Your name',
      lastName: this.props.values.lastName || 'Your last name',
      phone: this.props.values.phone || 'your phone',
      personnel_code: this.props.values.personal_code || 'your personel code',
      in_place: this.props.values.in_place || 'in_place',
      address: this.props.values.address || 'Your address',
      status: this.props.values.status || 'Your status',
      photo: this.props.values.photo

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  selectImages = (event) => {
      this.setState({ photo :URL.createObjectURL(event.target.files[0]) })

}
    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        console.log(value,name);
        console.log(name);
        this.setState({
          [name]: value
        });
    }
    uploadImage = () =>{
      const fd=new FormData();
      console.log(this.state.photo);
      fd.append('photo', this.state.photo);
        axios.post('', fd)
            .then(res=>{console.log(res);
        })
}


  handleSubmit (event) {
    event.preventDefault()
  }

  render () {
    return (
      <form className='FormCenterProfile' onSubmit={this.handleSubmit}>
        <div className='accent' />

        <div className='profile-photo-master' onClick={()=>this.fileInput.click()}>
            <img src={this.state.photo} className="image" alt={this.state.photo}  />
            <div className="middle">
                <div className="text">change profile picture</div>
            </div>
        </div>

         <div className="MasterProfile">
             <div className="col-sm-4">
                <input style={{display:'none'}} className="FormField__Button mr-20 " type="file" onChange={this.selectImages} ref={fileInput=>this.fileInput=fileInput}/>
             </div>
         </div>

         <div className="MasterProfile">
             <label className="MasterField_1">First Name</label>
             <input type="text" id="first_name" className="MasterField_2" placeholder="Enter your first name" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
         </div>

          <div className="MasterProfile">
             <label className="MasterField_1" >Last Name</label>
             <input type="text" id="last_name" className="MasterField_2" placeholder="Enter your last name" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
          </div>
         <div className="MasterProfile">
             <label className="MasterField_1">Phone</label>
             <input type="text" id="phone" className="MasterField_2" placeholder="Enter your first phone" name="phone" value={this.state.phone} onChange={this.handleChange} />
         </div>

          <div className="MasterProfile">
             <label className="MasterField_1" >personel code</label>
             <input type="text" id="personnel_code" className="MasterField_2" placeholder="Enter your personnel_code" name="personnel_code" value={this.state.personnel_code} onChange={this.handleChange} />
          </div>
          <div className="MasterProfile">
             <label className="MasterField_1">in_place</label>
             <input type="text" id="in_place" className="MasterField_2" placeholder="Enter your in_place" name="in_place" value={this.state.in_place} onChange={this.handleChange} />
          </div>

          <div className="MasterProfile">
             <label className="MasterField_1" >address</label>
             <input type="text" id="address" className="MasterField_2" placeholder="Enter your address" name="address" value={this.state.address} onChange={this.handleChange} />
          </div>

          <div className="MasterProfile">
             <label className="MasterField_1" >status</label>
             <input type="text" id="status" className="MasterField_2" placeholder="Enter your status" name="status" value={this.state.status} onChange={this.handleChange} />
          </div>
          <div className="MasterProfile">
             <button className="FormField__Button mr-20" onClick={this.uploadImage}>Save</button>
          </div>
      </form>
    )
  }
}

Form.propTypes = {
  values: PropTypes.shape({
    firstName: PropTypes.string,
    jobTitle: PropTypes.string,
    birthday: PropTypes.string,
    bio: PropTypes.string,
      photo:PropTypes.string
  }).isRequired
}
