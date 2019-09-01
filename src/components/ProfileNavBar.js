import React from 'react';
import profile from '../Author__Placeholder.png';
import {AppBar} from "@material-ui/core";
import PropTypes from 'prop-types';
import Toolbar from "@material-ui/core/Toolbar";
import arash from "../B71c1c.png";

function Profile(props) {
    return (
        <AppBar color={'white'} className='AppBar' position="sticky">
            <Toolbar className="toolbar">
                <img className='profilePictureTrigger' src={profile} alt='ProfilePictureTrigger'/>
                <img src={arash} alt='ArashLogo' className='ArashLogo'/>
                <p className='Arash'>Arash</p>
            </Toolbar>
        </AppBar>
    );
}

Profile.propTypes = {
    imageSource: PropTypes.string
};

export default Profile;
