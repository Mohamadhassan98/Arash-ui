import React from 'react'
import PropTypes from 'prop-types'
import Form from './Form'

const Profile = (props) => (
  <div>
    <Form values={props.profileFields} />
    <footer />
  </div>
)

Profile.propTypes = {
  profileFields: PropTypes.object.isRequired
}

export default Profile
