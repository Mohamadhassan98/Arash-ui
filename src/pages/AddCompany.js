import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Profile from "../components/ProfileNavBar";
import '../styles/AddCompany.css';
import {isEmpty, setAxiosDefaults} from "../Globals";
import AddressModal from "../components/AddressModal";
import axios from 'axios';
import {ConfirmButton, MyTextField} from "../Styles";
import NestedList from "../components/leftnavbar";
import {serverURLs, URLs} from "../Constants";
import {Redirect} from "react-router-dom";

export default class AddCompany extends React.Component {

    frontErrors = {
        companyName: 'Company name cannot be empty',
        email: 'Email cannot be empty'
    };

    constructor(props) {
        super(props);
        this.state = {
            redirect: undefined,
            userPK: 0,
            userIsSuperUser: false,
            address: {},
            companyName: '',
            email: '',
            companyNameHelper: ' ',
            emailHelper: ' '
        };
        setAxiosDefaults();
    }

    componentDidMount() {
        axios.get(serverURLs.user()).then(response => {
            this.setState({
                userPK: response.data.id,
                userIsSuperUser: response.data.is_superuser
            });
        }).catch(error => {
            if (error.response) {
                if (error.response.status === 403) {
                    this.doRedirect(URLs.signIn);
                } else {
                    this.doRedirect(URLs["503"]);
                }
            } else {
                console.error(error);
                this.doRedirect(URLs["503"]);
            }
        });
    }

    doRedirect = (page) => {
        this.setState({
            redirect: page
        });
    };

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
            axios.post(serverURLs.addCompany, {
                email: this.state.email,
                name: this.state.companyName,
                address: {
                    ...this.state.address,
                    postal_code: this.state.address.postalCode
                }
            }).then(response => {
                this.doRedirect(URLs.home);
            }).catch(error => {
                if (error.response.status === 422) {
                    this.handleErrors(error.response.data);
                } else {
                    this.doRedirect(URLs["503"]);
                }
            });
        }
    };

    handleErrors = (errors) => {
        for (let [key, value] of Object.entries(errors)) {
            switch (key) {
                case 'name':
                    this.setState({
                        companyNameHelper: value
                    });
                    break;
                case 'email':
                    this.setState({
                        emailHelper: value
                    });
                    break;
                default:
                    console.error(key, value);
                    this.doRedirect(URLs["503"]);
                    break;
            }
        }
    };

    redirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
    };

    cancelHandle = (e) => {
        const url = URLs.home;
        this.props.history.push({
            pathname: url,
            state: {
                user: this.user
            }
        });
    };

    render() {
        const SaveButton = ConfirmButton('left');
        const CancelButton = ConfirmButton('right');
        return (
            <React.Fragment>
                {this.redirect()}
                <main className='HomePageMain2'>
                    <NestedList myHistory={this.props.history} isSuperUser={this.state.userIsSuperUser}/>
                    <div className='rightme'>
                        <Profile pk={this.state.userPK} isSuperUser={this.state.userIsSuperUser}/>
                        <Container component="main" maxWidth="xs">
                            <div className='paper'>
                                <form className='form' noValidate>
                                    <Typography className="title" component="h1" variant="subtitle1" align='center'
                                                gutterBottom
                                                paragraph>
                                        Add Company
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
                                            <AddressModal submitAddress={this.submitAddress}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item sm>
                                            <SaveButton
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className='submit'
                                                onClick={this.submitHandle}
                                                onBlur={this.errorOff}
                                            >
                                                Save
                                            </SaveButton>
                                        </Grid>
                                        <Grid item sm>
                                            <CancelButton
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className='submit'
                                                onClick={this.cancelHandle}
                                                onBlur={this.errorOff}
                                            >
                                                Cancel
                                            </CancelButton>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                        </Container>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}
