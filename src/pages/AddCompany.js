import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Profile from "../components/ProfileNavBar";
import '../styles/AddCompany.css';
import {StylesProvider} from '@material-ui/styles';
import {containsDigitOnly, isEmpty} from "../Globals";
import AddressModal from "../components/AddressModal";
import axios from 'axios';

export default class AddCompany extends React.Component {

    frontErrors = {
        companyName: 'Company name cannot be empty',
        email: 'Email cannot be empty',
        address: 'Fill the address'
    };

    constructor(props) {
        super(props);
        this.state = {
            address: {},
            companyName: '',
            email: '',
            companyNameError: false,
            emailError: false,
            companyNameHelper: ' ',
            emailHelper: ' '
        };
    }

    errorOff = () => {
        this.setState({
            companyNameError: false,
            emailError: false,
            companyNameHelper: ' ',
            emailHelper: ' '
        });
    };

    validateData = () => {
        let invalidData = false;
        if (this.state.companyName.trim() === '') {
            this.setState({
                companyNameError: true,
                companyNameHelper: this.frontErrors.companyName
            });
            invalidData = true;
        }
        if (this.state.email.trim() === '') {
            this.setState({
                emailError: true,
                emailHelper: this.frontErrors.email
            });
            invalidData = true;
        }
        if (isEmpty(this.state.address)) {
            invalidData = true;
        }
        return !invalidData;
    };

    fieldChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    numericFieldChange = (e) => {
        if (containsDigitOnly(e.target.value)) {
            this.fieldChange(e);
        }
    };

    maxFieldChange = (e, max) => {
        if (e.target.value.length <= max) {
            this.fieldChange(e);
        }
    };

    submitAddress = (address) => {
        this.setState({
            address: address
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateData()) {
            const url = 'http://127.0.0.1:8000/add/company/';
            const redirect = '/home';
            axios.post(url, {
                email: this.state.email,
                name: this.state.companyName,
                address: {
                    ...this.state.address,
                    tel_phone: this.state.address.telephone,
                    postal_code: this.state.address.postalCode
                }
            }).then(response => {
                console.log(response.data);
                this.props.history.push(redirect);
            }).catch(error => {
                console.error(error.data);
            });
        }
    };

    render() {
        return (
            <StylesProvider injectFirst>
                <React.Fragment>
                    <CssBaseline/>
                    <Profile emailAddress='emohamadhassan@gmail.com' lastName='Ebrahimi' firstName='Mohamad'/>
                    <main className='HomePageMain'>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline/>
                            <div className='paper'>
                                <Typography component="h1" variant="h5">
                                    Add Company
                                </Typography>
                                <form className='form' noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="companyName"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="companyName"
                                                label="Company Name"
                                                onChange={(e) => this.maxFieldChange(e, 10)}
                                                value={this.state.companyName}
                                                error={this.state.companyNameError}
                                                helperText={this.state.companyNameHelper}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                onChange={(e) => this.maxFieldChange(e, 25)}
                                                value={this.state.email}
                                                error={this.state.emailError}
                                                helperText={this.state.emailHelper}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AddressModal submitAddress={this.submitAddress}/>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className='submit'
                                        onClick={this.handleSubmit}
                                        onBlur={this.errorOff}
                                    >
                                        Save
                                    </Button>
                                </form>
                            </div>
                        </Container>
                    </main>
                </React.Fragment>
            </StylesProvider>
        )
    }
}
