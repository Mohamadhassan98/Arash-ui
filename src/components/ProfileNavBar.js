import React from 'react';
import {AppBar} from "@material-ui/core";
import PropTypes from 'prop-types';
import Toolbar from "@material-ui/core/Toolbar";
import arash from "../static/B71c1c.png";
import Crown from '../static/crowns.png';
import '../App.css';
import {serverURLs} from "../Constants";

export default function Profile(props) {
    return (
        <AppBar className='AppBar' position="sticky">
            <Toolbar className="toolbar">
                <div className='profilePicture'>
                    <img className='profilePictureTrigger' src={`${serverURLs.userImage}${props.pk}/`}
                         alt='ProfilePictureTrigger'/>
                    {props.isSuperUser &&
                    <img src={Crown} className='masterCrown' alt='masterCrown'/>}
                </div>
                <img src={arash} alt='ArashLogo' className='ArashLogo'/>
                <p className='Arash'>Arash</p>
            </Toolbar>
        </AppBar>
    );
}

Profile.propTypes = {
    pk: PropTypes.number.isRequired,
    isSuperUser: PropTypes.bool.isRequired
};