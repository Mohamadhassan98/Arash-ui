import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {CustomIcon, MyListSubheader} from '../Styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from "prop-types";
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import '../styles/LeftNavBar.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import axios from 'axios';
import {serverURLs, URLs} from "../Constants";

const useStyles = makeStyles(theme => ({
    root: {
        width: '20%',
        height: '100%',
        position: 'fixed',
        backgroundColor: '#424242',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    listItem: {
        color: '#f2f3f4',
    }
}));

function NestedList(props) {

    const classes = useStyles();

    const goToProfile = () => {
        if (props.inProfile) {
            window.location.reload();
        } else {
            props.myHistory.push(URLs.profile);
        }
    };

    const goToHistory = () => {
        if (props.inHistory) {
            window.location.reload();
        } else {
            props.myHistory.push(URLs.userHistory());
        }
    };

    const goToCompanies = () => {
        if (props.inCompanies) {
            window.location.reload();
        } else {
            props.myHistory.push(URLs.home);
        }
    };

    const goToListProfile = () => {
        if (props.inListProfile) {
            window.location.reload();
        } else {
            props.myHistory.push(URLs.listProfile);
        }
    };

    const goToHelp = () => {
        window.open(serverURLs.help);
    };

    const goToLogout = () => {
        axios.get(serverURLs.logout).then(response => {
            props.myHistory.push(URLs.signIn);
        });
    };

    const CustomListAltOutlinedIcon = CustomIcon()(ListAltOutlinedIcon);
    const CustomHistoryOutlinedIcon = CustomIcon()(HistoryOutlinedIcon);
    const CustomHelpOutlineOutlinedIcon = CustomIcon()(HelpOutlineOutlinedIcon);
    const CustomExitToAppOutlinedIcon = CustomIcon()(ExitToAppOutlinedIcon);
    const CustomAccountCircleIcon = CustomIcon()(AccountCircleIcon);
    const CustomAssignmentIndIcon = CustomIcon()(AssignmentIndIcon);
    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <MyListSubheader component="div" id="nested-list-subheader" className='ListSubHeader'>
                    {'Menu'}
                </MyListSubheader>
            }
            className={classes.root}>
            <ListItem button onClick={goToCompanies} selected={props.inCompanies}>
                <ListItemIcon>
                    <CustomListAltOutlinedIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="List Company"/>
            </ListItem>
            {props.isSuperUser &&
            <ListItem button onClick={goToListProfile} selected={props.inListProfile}>
                <ListItemIcon>
                    <CustomAssignmentIndIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="List Profile"/>
            </ListItem>}
            <ListItem button onClick={goToProfile} selected={props.inProfile}>
                <ListItemIcon>
                    <CustomAccountCircleIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="Your Profile"/>
            </ListItem>
            <ListItem button onClick={goToHistory} selected={props.inHistory}>
                <ListItemIcon>
                    <CustomHistoryOutlinedIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="Your History"/>
            </ListItem>
            <ListItem button onClick={goToHelp}>
                <ListItemIcon>
                    <CustomHelpOutlineOutlinedIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="Help"/>
            </ListItem>
            <ListItem button onClick={goToLogout}>
                <ListItemIcon>
                    <CustomExitToAppOutlinedIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="Logout"/>
            </ListItem>
        </List>
    );
}

NestedList.propTypes = {
    myHistory: PropTypes.object.isRequired,
    isSuperUser: PropTypes.bool.isRequired,
    inProfile: PropTypes.bool,
    inHistory: PropTypes.bool,
    inCompanies: PropTypes.bool,
    inListProfile: PropTypes.bool
};

NestedList.defaultProps = {
    inCompanies: false,
    inProfile: false,
    inHistory: false,
    inListProfile: false
};

export default NestedList;
