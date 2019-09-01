import React from "react";
import ListItem from "@material-ui/core/ListItem";
import {ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";
import {Delete, Edit, ExpandLess, ExpandMore} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import axios from "axios";
import DeleteConfirmAlert from "./DeleteConfirmAlert";
import '../styles/ArashListItem.css';
import Grid from "@material-ui/core/Grid";
import {CustomIcon, MyTextField} from "../Styles";
import Icon from "@material-ui/core/Icon";
import Dead from '../Dead.png';
import Alive from '../Alive.png';

export default class ArashListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsOpen: false,
            deleteModalOpen: false
        };
    }

    handleClick = () => {
        this.setState({
            detailsOpen: !this.state.detailsOpen
        });
    };

    handleDelete = () => {
        const url = `http://127.0.0.1:8000/arash/${this.props.arash.id}/`;
        axios.delete(url).then(response => {
            window.location.reload();
        }).catch(error => {
            this.props.myHistory.push('/503');
        });
    };

    onEditClick = () => {
        this.props.myHistory.push({
            pathname: `${this.props.arash.company}/edit-arash/${this.props.arash.id}`,
            state: {
                user: this.props.user
            }
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

    render() {
        // noinspection JSCheckFunctionSignatures
        const CustomEditIcon = CustomIcon()(Edit);
        // noinspection JSCheckFunctionSignatures
        const CustomDeleteIcon = CustomIcon()(Delete);
        // noinspection JSCheckFunctionSignatures
        const CustomExpandLessIcon = CustomIcon()(ExpandLess);
        // noinspection JSCheckFunctionSignatures
        const CustomExpandMoreIcon = CustomIcon()(ExpandMore);
        return (
            <div key={this.props.arash.id}>
                <ListItem divider={!this.state.detailsOpen} button onClick={this.handleClick}>
                    <Grid container>
                        <Grid item sm>
                            <ListItemText
                                primary={this.props.arash.serial_number}
                                secondary={this.props.arash.expire_date}
                            />
                        </Grid>
                        <Grid item sm>
                            <ListItemText primary={this.props.arash.version}/>
                        </Grid>
                        <Grid item md>
                            <Icon>
                                <img alt='KeepAlive' src={this.props.arash.is_alive ? Alive : Dead} width={32}
                                     height={32} className='Icon'/>
                            </Icon>
                        </Grid>
                    </Grid>
                    <ListItemSecondaryAction>
                        <IconButton onClick={this.onEditClick}>
                            <CustomEditIcon/>
                        </IconButton>
                        <IconButton onClick={this.onDeleteClick}>
                            <CustomDeleteIcon/>
                        </IconButton>
                        <DeleteConfirmAlert model='Arash' confirmHandle={this.handleDelete}
                                            open={this.state.deleteModalOpen} cancelHandle={this.cancelDelete}/>
                        {this.state.detailsOpen ? <CustomExpandLessIcon onClick={this.handleClick}/> :
                            <CustomExpandMoreIcon onClick={this.handleClick}/>}
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={this.state.detailsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className='SubList'>
                        <ListItem>
                            <MyTextField
                                variant='standard'
                                InputProps={{
                                    readOnly: true
                                }}
                                fullWidth
                                id="publicKey"
                                label="Public Key"
                                name="publicKey"
                                value={`${this.props.arash.public_key}`}
                            />
                        </ListItem>
                        <ListItem>
                            <MyTextField
                                variant='standard'
                                InputProps={{
                                    readOnly: true
                                }}
                                fullWidth
                                id="license"
                                label="License"
                                name="license"
                                value={`${this.props.arash.license}`}
                            />
                        </ListItem>
                        <ListItem>
                            <MyTextField
                                variant='standard'
                                InputProps={{
                                    readOnly: true
                                }}
                                id="purchaseDate"
                                label="Purchase Date"
                                name="purchaseDate"
                                value={`${this.props.arash.purchase_date}`}
                            />
                        </ListItem>
                    </List>
                </Collapse>
            </div>
        );
    }
}

ArashListItem.propTypes = {
    arash: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    myHistory: PropTypes.object.isRequired
};