import React from 'react';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Profile from "../components/ProfileNavBar";
import '../styles/AddCompany.css';
import {isEmpty} from "../Globals";
import AddressModal from "../components/AddressModal";
import axios from 'axios';
import {MyButton, MyTextField} from "../Styles";

export default class AddCompany extends React.Component {

    frontErrors = {
        companyName: 'Company name cannot be empty',
        email: 'Email cannot be empty',
    };

    constructor(props) {
        super(props);
        if (!this.props.location || !this.props.location.state || !this.props.location.state.user) {
            this.props.history.push('');
        } else {
            this.user = this.props.location.state.user;
        }
        this.state = {
            address: {},
            companyName: '',
            email: '',
            companyNameHelper: ' ',
            emailHelper: ' '
        };
    }

    componentDidMount() {
        if (!this.user) {
            this.props.history.push('');
        }
    }

    errorOff = () => {
        this.setState({
            companyNameHelper: ' ',
            emailHelper: ' '
        });
    };

    validateData = () => {
        let invalidData = false;
        if (this.state.companyName.trim() === '') {
            this.setState({
                companyNameHelper: this.frontErrors.companyName
            });
            invalidData = true;
        }
        if (this.state.email.trim() === '') {
            this.setState({
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
                this.props.history.push({
                    pathname: redirect,
                    state: {
                        user: this.user
                    }
                });
            }).catch(error => {
                this.props.history.push('/503');
            });
        }
    };

    render() {
        return (
                <React.Fragment>
                    <Profile user={this.user} myHistory={this.props.history}/>
                    <main className='HomePageMain'>
                        <Container component="main" maxWidth="xs">
                            <div className='paper'>
                                <Typography component="h1" variant="h5">
                                    Add Company
                                </Typography>
                                <form className='form' noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <MyTextField
                                                name="companyName"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="companyName"
                                                label="Company Name"
                                                onChange={(e) => this.maxFieldChange(e, 10)}
                                                value={this.state.companyName}
                                                error={this.state.companyNameHelper !== ' '}
                                                helperText={this.state.companyNameHelper}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <MyTextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                onChange={(e) => this.maxFieldChange(e, 25)}
                                                value={this.state.email}
                                                error={this.state.emailHelper !== ' '}
                                                helperText={this.state.emailHelper}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AddressModal submitAddress={this.submitAddress}/>
                                        </Grid>
                                    </Grid>
                                    <MyButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className='submit'
                                        onClick={this.handleSubmit}
                                        onBlur={this.errorOff}
                                    >
                                        Save
                                    </MyButton>
                                </form>
                            </div>
                        </Container>
                    </main>
                </React.Fragment>
        )
    }
}
