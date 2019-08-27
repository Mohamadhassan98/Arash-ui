import React from 'react';
import '../unnamed.jpg';
import profile from '../Author__Placeholder.png';
import crown from '../crowns.png';
import Popup from "reactjs-popup";
import {AppBar} from "@material-ui/core";
import PropTypes from 'prop-types';
import {ModalButton} from "../Styles";


function ProfileNavBar(props) {
    const user = props.user;
    const goToProfile = () => {
        if (props.inProfile) {
            window.location.reload();
        } else {
            props.myHistory.push('/profile', {
                user: user
            });
        }
    };

    const goToHistory = () => {
        const url = `/history`;
        if (props.inHistory) {
            window.location.reload();
        } else {
            props.myHistory.push(url, {
                user: user
            });
        }
    };

    return (
        <div className='ProfileNB'>
            <label className='fullNameLabel'>{user.first_name + ' ' + user.last_name}</label>
            <label className='emailLabel'>{user.email}</label>
            <img className='profilePicture' src={profile} alt='ProfilePicture'/>
            {
                user.status === 'ma' &&
                <img src={crown} className='masterCrown' alt='MasterCrown'/>
            }
            <ModalButton className='button profileButton' onClick={goToProfile}>
                Profile
            </ModalButton>
            <ModalButton className='button historyButton' onClick={goToHistory}>
                History
            </ModalButton>
        </div>
    );
}

function Profile(props) {

    const downloadHelp = () => {
        window.open('http://engold.ui.ac.ir/~zamani/internship/files/introduce.pdf');
    };

    return (
        <AppBar color={'white'} className='AppBar' position="sticky">
            {/*<Toolbar>*/}
                <Popup
                    trigger={<img className='profilePictureTrigger' src={profile} alt='ProfilePictureTrigger'/>}
                    position='bottom right'
                    on='click'
                    contentStyle={{
                        position: 'absolute',
                        zIndex: '0',
                        width: '340px',
                        height: '260px',
                        background: "transparent",
                        border: "0px solid transparent",
                        boxShadow: "rgba(0, 0, 0, 0) 0px 0px 0px",
                        padding: '0px'
                    }}
                >
                    <ProfileNavBar
                        user={props.user}
                        myHistory={props.myHistory}
                        inProfile={props.inProfile}
                        inHistory={props.inHistory}/>
                </Popup>
            {/*<HelpIcon onClick={downloadHelp}/>*/}
            {/*<LogOutIcon/>*/}
            {/*</Toolbar>*/}
        </AppBar>
    )
}

Profile.propTypes = {
    myHistory: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    inProfile: PropTypes.bool,
    inHistory: PropTypes.bool
};

Profile.defaultProps = {
    inProfile: false,
    inHistory: false
};

export default Profile;
