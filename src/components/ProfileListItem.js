import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import axios from "axios";
import {CustomIcon, MyListItem} from '../Styles'
import proimg from "../jane-doe.jpg"
import IconButton from "@material-ui/core/IconButton";
import {Delete, Edit} from "@material-ui/icons";
import DeleteConfirmAlert from "./DeleteConfirmAlert";
import PropTypes from "prop-types";


export default class ListProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteModalOpen: false,
            profiles: []
        };
    }

    componentDidMount() {

        const url = `http://127.0.0.1:8000/list/profile/`;
        axios.get(url).then(response => {
            console.log(response.data);
            this.setState({
                profiles: response.data
            })
        }).catch(error => {
            this.props.myHistory.push('/503');
        });

    }

    handleDelete = () => {
        const url = `http://127.0.0.1:8000/user/${this.props.profile.id}/`;
        axios.delete(url).then(response => {
            window.location.reload();
        }).catch(error => {
            this.props.myHistory.push('/503');
        });
    };
    onDeleteClick = () => {
        this.setState({
            deleteModalOpen: true
        });
    };
    cancelDelete = () => {
        this.setState({
            deleteModalOpen: false
        });
    };
    onEditClick = () => {
        this.props.myHistory.push({
            pathname: `/profile`,
            state: {
                user: this.props.profile
            }
        });
    };

    render() {
        const CustomEditIcon = CustomIcon(Edit);
        const CustomDeleteIcon = CustomIcon(Delete);
        return (

            <MyListItem key={this.props.profile} button>
                <ListItemAvatar>
                    <Avatar
                        alt={`Avatar`}
                        src={proimg}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={this.props.profile.first_name + '  ' + this.props.profile.last_name}
                    secondary={this.props.profile.email}
                />
                <IconButton onClick={this.onEditClick}>
                    <CustomEditIcon/>
                </IconButton>
                <IconButton onClick={this.onDeleteClick} color='secondary'>
                    <CustomDeleteIcon/>
                </IconButton>
                <DeleteConfirmAlert model='User' confirmHandle={this.handleDelete}
                                    open={this.state.deleteModalOpen}
                                    cancelHandle={this.cancelDelete}/>
            </MyListItem>
        )
    }
}

ListProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    myHistory: PropTypes.object.isRequired
};
