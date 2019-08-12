import React from 'react'
import PropTypes from 'prop-types'

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

  handleChange (event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
  }

  render () {
    return (
      <form className='FormCenterProfile' onSubmit={this.handleSubmit}>
          <div className='accent' />
          <div className='profile-photo'>
            <img src={this.state.photo} alt={this.state.photo} />
          </div>
         <div className="FormProfile">
             <label className="FieldProfile_1">First Name</label>
             <label  id="firstname" className="FieldProfile_2">{this.state.firstName}</label>
         </div>

          <div className="FormProfile">
             <label className="FieldProfile_1" >Last Name</label>
             <label  id="lastname" className="FieldProfile_2">{this.state.lastName}</label>
          </div>
         <div className="FormProfile">
             <label className="FieldProfile_1">Phone</label>
             <label  id="phone" className="FieldProfile_2">{this.state.phone}</label>
         </div>

          <div className="FormProfile">
                <label className="FieldProfile_1" >personel code</label>
             <label  id="code" className="FieldProfile_2">{this.state.personnel_code}</label>
          </div>
          <div className="FormProfile">
             <label className="FieldProfile_1">in_place</label>
             <label  id="inplace" className="FieldProfile_2">{this.state.in_place}</label>
          </div>

          <div className="FormProfile">
             <label className="FieldProfile_1" >address</label>
             <label  id="address" className="FieldProfile_2">{this.state.address}</label>
          </div>

          <div className="FormProfile">
             <label className="FieldProfile_1" >status</label>
             <label  id="status" className="FieldProfile_2">{this.state.status}</label>
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
    bio: PropTypes.string
  }).isRequired
}
