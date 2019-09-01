import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Profile from "../components/ProfileNavBar";
import '../styles/EditCompany.css';
import {isEmpty} from "../Globals";
import AddressModal from "../components/AddressModal";
import axios from 'axios';
import {MyButton, MyTextField} from "../Styles";
import NestedList from "../components/leftnavbar";
import {Typography} from "@material-ui/core";

export default class EditCompany extends React.Component {

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
        this.pk = props.match.params.pk;
        this.state = {
            address: {},
            companyName: '',
            email: '',
            companyNameHelper: ' ',
            emailHelper: ' '
        };
    }

    errorOff = () => {
        this.setState({
            companyNameHelper: ' ',
            emailHelper: ' '
        });
    };

    componentDidMount() {
        if (!this.user) {
            this.props.history.push('');
        } else {
            const url = 'http://127.0.0.1:8000/company/' + this.pk;
            axios.get(url).then(result => {
                const {name: companyName, email, address} = result.data;
                this.setState({
                    companyName: companyName,
                    email: email,
                    address: address
                })
            }).catch(error => {
                this.props.history.push('/503')
            });
        }
    }

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
            const url = `http://127.0.0.1:8000/company/${this.pk}/`;
            const redirect = '/home';
            axios.put(url, {
                email: this.state.email,
                name: this.state.companyName,
                address: this.state.address
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
                <main className='HomePageMain2'>
                    <NestedList user={this.user} myHistory={this.props.history}/>
                    <div className='rightme'>
                        <Profile/>
                        <Container component="main" maxWidth="xs">
                            <div className='paper'>
                                <form className='form' noValidate>
                                    <Typography component='h1' variant="subtitle1" align='center' gutterBottom
                                                paragraph>
                                        Edit Company
                                    </Typography>
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
                                            <AddressModal submitAddress={this.submitAddress}
                                                          address={this.state.address}/>
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
                    </div>
                </main>
            </React.Fragment>
        );
    }
}
