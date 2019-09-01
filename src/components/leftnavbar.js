import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {MyListSubheader} from '../Styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from "prop-types";
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import '../styles/LeftNavBar.css';

const useStyles = makeStyles(theme => ({
    root: {
        width: '20%',
        height: '100%',
        // maxWidth: 360,
        position: 'fixed',
        backgroundColor: '#424242',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    listItem: {
        color: '#b71c1c',
    }
}));


function NestedList(props) {
    const classes = useStyles();
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

    const goToCompanies = () => {
        const url = `/home`;
        if (props.inCompanies) {
            window.location.reload();
        } else {
            props.myHistory.push(url, {
                user: user
            });
        }
    };

    const goToHelp = () => {
        window.open('http://engold.ui.ac.ir/~zamani/internship/files/introduce.pdf');
    };

    const goToLogout = () => {
        const url = `/`;
        props.myHistory.push(url);
    };
    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <MyListSubheader color='#b71c1c' component="div" id="nested-list-subheader" className='ListSubHeader'>
                    {'Menu'}
                </MyListSubheader>
            }
            className={classes.root}
        >
            <ListItem button onClick={goToCompanies} selected={props.inCompanies}>
                <ListItemIcon>
                    <ListAltOutlinedIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="Companies"/>
            </ListItem>
            <ListItem button onClick={goToProfile} selected={props.inProfile}>
                <ListItemIcon>
                    <ContactsOutlinedIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="Profile"/>
            </ListItem>
            <ListItem button onClick={goToHistory} selected={props.inHistory}>
                <ListItemIcon>
                    <HistoryOutlinedIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="History"/>
            </ListItem>
            <ListItem button onClick={goToHelp}>
                <ListItemIcon>
                    <HelpOutlineOutlinedIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="Help"/>
            </ListItem>
            <ListItem button onClick={goToLogout}>
                <ListItemIcon>
                    <ExitToAppOutlinedIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="Logout"/>
            </ListItem>
        </List>
    );
}

NestedList.propTypes = {
    myHistory: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    inProfile: PropTypes.bool,
    inHistory: PropTypes.bool,
    inCompanies: PropTypes.bool,

};

NestedList.defaultProps = {
    inCompanies: false,
    inProfile: false,
    inHistory: false
};

export default NestedList;
