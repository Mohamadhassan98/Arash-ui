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
import arash from '../B71c1c.png';
import '../styles/CompanyListItem.css';
import Grid from "@material-ui/core/Grid";
import {CustomIcon} from "../Styles";

export default class CompanyListItem extends React.Component {

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
        const url = `http://127.0.0.1:8000/company/${this.props.company.id}/`;
        axios.delete(url).then(response => {
            window.location.reload();
        }).catch(error => {
            this.props.myHistory.push('/503');
        });
    };

    onEditClick = () => {
        this.props.myHistory.push({
            pathname: `company/${this.props.company.id}/edit`,
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
        const hasFax = this.props.company.address.fax && this.props.company.address.fax !== '';
        // noinspection JSCheckFunctionSignatures
        const CustomEditIcon = CustomIcon(Edit);
        // noinspection JSCheckFunctionSignatures
        const CustomDeleteIcon = CustomIcon(Delete);
        // noinspection JSCheckFunctionSignatures
        const CustomExpandLessIcon = CustomIcon(ExpandLess);
        // noinspection JSCheckFunctionSignatures
        const CustomExpandMoreIcon = CustomIcon(ExpandMore);
        return (
            <div key={this.props.company.id}>
                <ListItem divider={!this.state.detailsOpen} button onClick={this.handleClick}>
                    <Grid container>
                        <Grid item sm>
                            <ListItemText
                                primary={this.props.company.name}
                                secondary={this.props.company.company_code}
                            />
                        </Grid>
                        <Grid item sm>
                            <ListItemText primary={this.props.company.email}/>
                        </Grid>
                    </Grid>
                    <ListItemSecondaryAction>
                        <IconButton>
                            <img src={arash} alt='ArashLogo' width={32} height={32}/>
                        </IconButton>
                        <IconButton onClick={this.onEditClick}>
                            <CustomEditIcon/>
                        </IconButton>
                        <IconButton onClick={this.onDeleteClick} color='secondary'>
                            <CustomDeleteIcon/>
                        </IconButton>
                        <DeleteConfirmAlert model='Company' confirmHandle={this.handleDelete}
                                            open={this.state.deleteModalOpen} cancelHandle={this.cancelDelete}/>
                        {this.state.detailsOpen ? <CustomExpandLessIcon onClick={this.handleClick} color='#B71C1C'/> :
                            <CustomExpandMoreIcon onClick={this.handleClick} color='#B71C1C'/>}
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={this.state.detailsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem>
                            <ListItemText
                                primary={`Address: ${this.props.company.address.city} ${this.props.company.address.street} ${this.props.company.address.alley.length === 0 ? '' : `${this.props.company.address.alley}`} ${this.props.company.address.plaque}`}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Postal Code: ${this.props.company.address.postal_code}`}/>
                        </ListItem>
                        <ListItem divider={!hasFax}>
                            <ListItemText primary={`Telephone: ${this.props.company.address.tel_phone}`}/>
                        </ListItem>
                        {hasFax &&
                        <ListItem divider={hasFax}>
                            <ListItemText primary={`fax: ${this.props.company.address.fax}`}/>
                        </ListItem>}
                    </List>
                </Collapse>
            </div>
        );
    }
}

CompanyListItem.propTypes = {
    company: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    myHistory: PropTypes.object.isRequired
};