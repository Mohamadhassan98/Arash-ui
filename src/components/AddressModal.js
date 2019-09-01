import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import {containsDigitOnly} from "../Globals";
import Grid from "@material-ui/core/Grid";
import '../styles/AddressModal.css';
import {MyButton, MyTextField} from "../Styles";

export default class AddressModal extends React.Component {
    frontErrors = {
        city: 'City cannot be empty',
        street: 'Street cannot be empty',
        postalCode: 'Postal code must be exactly 10 characters',
        plaque: 'Plaque cannot be empty',
        telephone: 'Telephone must be exactly 11 characters',
        fax: 'Fax must be exactly 11 characters'
    };
    inputColor = {
        style: {
            color: 'black'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            address: props.address,
            cityError: false,
            streetError: false,
            alleyError: false,
            postalCodeError: false,
            plaqueError: false,
            telephoneError: false,
            faxError: false,
            cityHelper: ' ',
            streetHelper: ' ',
            alleyHelper: ' ',
            postalCodeHelper: ' ',
            plaqueHelper: ' ',
            telephoneHelper: ' ',
            faxHelper: ' ',
            addressHelper: props.addressHelper
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.address.city !== '') {
            this.setState({
                address: {
                    ...nextProps.address,
                    postalCode: nextProps.address.postal_code,
                }
            });
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    validateData = () => {
        let invalidData = false;
        if (this.state.address.city.trim() === '') {
            this.setState({
                cityError: true,
                cityHelper: this.frontErrors.city
            });
            invalidData = true;
        }
        if (this.state.address.street.trim() === '') {
            this.setState({
                streetError: true,
                streetHelper: this.frontErrors.street
            });
            invalidData = true;
        }
        if (this.state.address.postalCode.trim().length !== 10) {
            this.setState({
                postalCodeError: true,
                postalCodeHelper: this.frontErrors.postalCode
            });
            invalidData = true;
        }
        if (this.state.address.plaque.trim() === '') {
            this.setState({
                plaqueCodeError: true,
                plaqueCodeHelper: this.frontErrors.plaque
            });
            invalidData = true;
        }
        if (this.state.address.telephone.trim().length !== 11) {
            this.setState({
                telephoneError: true,
                telephoneHelper: this.frontErrors.telephone
            });
            invalidData = true;
        }
        if (this.state.address.fax.trim().length > 0 && this.state.address.fax.trim().length !== 11) {
            this.setState({
                faxError: true,
                faxHelper: this.frontErrors.fax
            });
            invalidData = true;
        }
        return !invalidData;
    };

    errorOff = () => {
        this.setState({
            cityError: false,
            streetError: false,
            alleyError: false,
            postalCodeError: false,
            plaqueError: false,
            telephoneError: false,
            faxError: false,
            cityHelper: ' ',
            streetHelper: ' ',
            alleyHelper: ' ',
            postalCodeHelper: ' ',
            plaqueHelper: ' ',
            telephoneHelper: ' ',
            faxHelper: ' ',
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateData()) {
            this.props.submitAddress(this.state.address);
            this.setState({
                open: false
            });
        }
    };

    fieldChange = (e) => {
        this.setState({
            address: {
                ...this.state.address,
                [e.target.name]: e.target.value
            }
        });
    };

    numericFieldChange = (e) => {
        if (containsDigitOnly(e.target.value)) {
            this.fieldChange(e);
        }
    };

    maxFieldChange = (e, max, numeric = false) => {
        if (e.target.value.length <= max) {
            if (numeric) {
                this.numericFieldChange(e);
            } else {
                this.fieldChange(e);
            }
        }
    };

    render() {
        return (
            <div>
                <MyTextField
                    variant="outlined"
                    required
                    autoComplete='off'
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    InputProps={{readOnly: true}}
                    onClick={this.handleClickOpen}
                    value={this.state.address.city ? (`${this.state.address.city} ${this.state.address.street} ${this.state.address.alley.length === 0 ? '' : `${this.state.address.alley}`} ${this.state.address.plaque}`) : ''}
                    error={this.state.addressHelper !== ' '}
                    helperText={this.state.addressHelper}
                />
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Address</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your address.
                        </DialogContentText>
                        <form className='form' noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <MyTextField
                                        name="city"
                                        className='placeHolder'
                                        variant="outlined"
                                        required
                                        InputProps={{readOnly: this.props.disabled}}
                                        fullWidth
                                        id="city"
                                        label="City"
                                        autoFocus
                                        onChange={(e) => this.maxFieldChange(e, 15)}
                                        error={this.state.cityError}
                                        helperText={this.state.cityHelper}
                                        value={this.state.address.city}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MyTextField
                                        variant="outlined"
                                        InputProps={{readOnly: this.props.disabled}}
                                        required
                                        fullWidth
                                        id="street"
                                        label="Street"
                                        name="street"
                                        onChange={(e) => this.maxFieldChange(e, 15)}
                                        error={this.state.streetError}
                                        helperText={this.state.streetHelper}
                                        value={this.state.address.street}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MyTextField
                                        variant="outlined"
                                        InputProps={{readOnly: this.props.disabled}}
                                        fullWidth
                                        id="alley"
                                        label="Alley"
                                        name="alley"
                                        onChange={(e) => this.maxFieldChange(e, 15)}
                                        error={this.state.alleyError}
                                        helperText={this.state.alleyHelper}
                                        value={this.state.address.alley}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MyTextField
                                        variant="outlined"
                                        InputProps={{readOnly: this.props.disabled}}
                                        fullWidth
                                        required
                                        id="postalCode"
                                        label="Postal Code"
                                        name="postalCode"
                                        onChange={(e) => this.maxFieldChange(e, 10, true)}
                                        error={this.state.postalCodeError}
                                        helperText={this.state.postalCodeHelper}
                                        value={this.state.address.postalCode}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MyTextField
                                        InputProps={{readOnly: this.props.disabled}}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="plaque"
                                        label="Plaque"
                                        name="plaque"
                                        onChange={(e) => this.maxFieldChange(e, 10)}
                                        error={this.state.plaqueError}
                                        helperText={this.state.plaqueHelper}
                                        value={this.state.address.plaque}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MyTextField
                                        variant="outlined"
                                        InputProps={{readOnly: this.props.disabled}}
                                        fullWidth
                                        required
                                        id="telephone"
                                        label="Telephone"
                                        name="telephone"
                                        onChange={(e) => this.maxFieldChange(e, 11, true)}
                                        error={this.state.telephoneError}
                                        helperText={this.state.telephoneHelper}
                                        value={this.state.address.telephone}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MyTextField
                                        variant="outlined"
                                        InputProps={{readOnly: this.props.disabled}}
                                        fullWidth
                                        id="fax"
                                        label="Fax"
                                        name="fax"
                                        onChange={(e) => this.maxFieldChange(e, 11, true)}
                                        error={this.state.faxError}
                                        helperText={this.state.faxHelper}
                                        value={this.state.address.fax}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MyTextField
                                        variant="outlined"
                                        InputProps={{readOnly: this.props.disabled}}
                                        fullWidth
                                        id="details"
                                        label="Details"
                                        name="details"
                                        onChange={this.fieldChange}
                                        value={this.state.address.details}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <MyButton onClick={this.handleClose} color="primary">
                            Cancel
                        </MyButton>
                        <MyButton onClick={this.handleSubmit} color="primary" onBlur={this.errorOff}>
                            Save
                        </MyButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AddressModal.propTypes = {
    submitAddress: PropTypes.func.isRequired,
    address: PropTypes.object,
    addressHelper: PropTypes.string,
    disabled: PropTypes.bool
};

AddressModal.defaultProps = {
    address: {
        city: '',
        street: '',
        alley: '',
        postalCode: '',
        plaque: '',
        telephone: '',
        fax: '',
        details: ''
    },
    addressHelper: ' '
};