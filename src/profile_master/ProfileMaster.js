import React from 'react'
import PropTypes from 'prop-types'
import Form from './Form'

const ProfileMaster = (props) => (
  <div>
    <Form values={props.profileFields} />
    <footer />
  </div>
)

ProfileMaster.propTypes = {
  profileFields: PropTypes.object.isRequired
}

export default ProfileMaster
