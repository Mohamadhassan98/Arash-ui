import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {CustomIcon, MyListSubheader} from '../Styles';
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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

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
        color: '#f2f3f4',
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
    const goToListProfile = () => {
        const url = `/list/profile`;
        if (props.inListProfile) {
            window.location.reload();
        } else {
            props.myHistory.push(url, {
                user: user,
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
    const CustomListAltOutlinedIcon = CustomIcon()(ListAltOutlinedIcon);
    const CustomContactsOutlinedIcon = CustomIcon()(ContactsOutlinedIcon);
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
                <MyListSubheader color='#b71c1c' component="div" id="nested-list-subheader" className='ListSubHeader'>
                    {'Menu'}
                </MyListSubheader>
            }
            className={classes.root}
        >
            <ListItem button onClick={goToCompanies} selected={props.inCompanies}>
                <ListItemIcon>
                    <CustomListAltOutlinedIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="Companies"/>
            </ListItem>
            <ListItem button onClick={goToProfile} selected={props.inProfile}>
                <ListItemIcon>
                    <CustomAccountCircleIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="Profile"/>
            </ListItem>
            <ListItem button onClick={goToHistory} selected={props.inHistory}>
                <ListItemIcon>
                    <CustomHistoryOutlinedIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="History"/>
            </ListItem>
            <ListItem button onClick={goToHelp}>
                <ListItemIcon>
                    <CustomHelpOutlineOutlinedIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="Help"/>
            </ListItem>
            <ListItem button onClick={goToListProfile}>
                <ListItemIcon>
                    <CustomAssignmentIndIcon/>
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="List Profile"/>
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
    user: PropTypes.object.isRequired,
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
