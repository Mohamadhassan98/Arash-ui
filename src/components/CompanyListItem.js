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
import arash from '../static/B71c1c.png';
import '../styles/CompanyListItem.css';
import Grid from "@material-ui/core/Grid";
import {CustomIcon, MyTextField} from "../Styles";
import {serverURLs, URLs} from "../Constants";

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
        const url = serverURLs.company(this.props.company.id);
        axios.delete(url).then(response => {
            window.location.reload();
        }).catch(error => {
            this.props.myHistory.push(URLs["503"]);
        });
    };

    onEditClick = () => {
        const url = URLs.editCompany(this.props.company.id);
        this.props.myHistory.push(url);
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

    goToArash = () => {
        const url = URLs.company(this.props.company.id);
        this.props.myHistory.push(url);
    };

    render() {
        const hasFax = this.props.company.address.fax && this.props.company.address.fax !== '';
        const CustomEditIcon = CustomIcon()(Edit);
        const CustomDeleteIcon = CustomIcon()(Delete);
        const CustomExpandLessIcon = CustomIcon()(ExpandLess);
        const CustomExpandMoreIcon = CustomIcon()(ExpandMore);
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
                        <IconButton onClick={this.goToArash}>
                            <img src={arash} alt='ArashLogo' width={32} height={32}/>
                        </IconButton>
                        <IconButton onClick={this.onEditClick}>
                            <CustomEditIcon/>
                        </IconButton>
                        <IconButton onClick={this.onDeleteClick}>
                            <CustomDeleteIcon/>
                        </IconButton>
                        <DeleteConfirmAlert model='Company' confirmHandle={this.handleDelete}
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
                                id="address"
                                label="Address"
                                name="address"
                                value={`${this.props.company.address.city} ${this.props.company.address.street} ${this.props.company.address.alley.length === 0 ? '' : `${this.props.company.address.alley}`} ${this.props.company.address.plaque}`}
                            />
                        </ListItem>
                        <ListItem>
                            <MyTextField
                                variant='standard'
                                InputProps={{
                                    readOnly: true
                                }}
                                id="postalCode"
                                label="Postal Code"
                                name="postalCode"
                                value={`${this.props.company.address.postal_code}`}
                            />
                            <MyTextField
                                variant='standard'
                                InputProps={{
                                    readOnly: true
                                }}
                                id="telephone"
                                label="Telephone"
                                name="telephone"
                                value={`${this.props.company.address.telephone}`}
                            />
                            {hasFax &&
                            <MyTextField
                                variant='standard'
                                InputProps={{
                                    readOnly: true
                                }}
                                fullWidth
                                id="fax"
                                label="Fax"
                                name="fax"
                                value={`${this.props.company.address.fax}`}
                            />}
                        </ListItem>
                    </List>
                </Collapse>
            </div>
        );
    }
}

CompanyListItem.propTypes = {
    company: PropTypes.object.isRequired,
    myHistory: PropTypes.object.isRequired
};