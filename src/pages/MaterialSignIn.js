import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import '../styles/MaterialSignIn.css';
import axios from 'axios';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import {MyButton, MyTextField} from "../Styles";
import ArashLogo from '../B71c1c.png';

export default class MaterialSignIn extends React.Component {

    frontErrors = {
        username: 'Username cannot be empty',
        password: 'Password cannot be empty'
    };

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            username: '',
            password: '',
            usernameHelper: ' ',
            passwordHelper: ' ',
            open: false
        };
    }

    handleClickShowPassword = () => {
        this.setState({isVisible: !this.state.isVisible});
    };

    validateData = () => {
        let invalidData = false;
        if (this.state.username.trim() === '') {
            this.setState({
                usernameHelper: this.frontErrors.username
            });
            invalidData = true;
        }
        if (this.state.password.trim() === '') {
            this.setState({
                passwordHelper: this.frontErrors.password
            });
        }
        return !invalidData;
    };

    submitHandle = (e) => {
        e.preventDefault();
        if (this.validateData()) {
            const url = 'http://127.0.0.1:8000/accounts/login/';
            axios.post(url, {
                username: this.state.username,
                password: this.state.password
            }).then(response => {
                const csrftoken = response.headers.csrftoken;
                const sessionId = response.headers.sessionid;
                this.props.history.push({
                    pathname: '/home',
                    state: {
                        user: response.data,
                        csrftoken: csrftoken,
                        sessionId: sessionId
                    }
                });
            }).catch(error => {
                if (error.response)
                    switch (error.response.status) {
                        case 401:
                            this.setState({
                                detailsOpen: true
                            });
                            break;
                        default:
                            this.props.history.push('/503')
                    }
                else {
                    this.props.history.push('/503')

                }
            });
        }
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    errorOff = () => {
        this.setState({
            usernameHelper: ' ',
            passwordHelper: ' '
        });
    };

    closeModal = () => {
        this.setState({detailsOpen: false});
    };

    render() {
        return (
            <React.Fragment>
                <main className='HomePageMain'>

                    <div className="App__Form">
                        <Container component="main" maxWidth='xs'>
                            {/*<div className='triangle'></div>*/}
                            <div className='pepper'>
                                {/*<Typography component="h1" variant="h5" color={'black'}>*/}
                                {/*    Sign in*/}
                                {/*</Typography>*/}
                                <p className="p">sign in</p>
                                <form className='form2' noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item
                                              xs={12}>
                                            <MyTextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="username"
                                                label="Username"
                                                name="username"
                                                helperText={this.state.usernameHelper}
                                                error={this.state.usernameHelper !== ' '}
                                                onChange={this.onChange}
                                                value={this.state.username}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <MyTextField
                                                required
                                                id="password"
                                                name='password'
                                                variant="outlined"
                                                type={this.state.isVisible ? 'text' : 'password'}
                                                label="Password"
                                                fullWidth
                                                error={this.state.passwordHelper !== ' '}
                                                helperText={this.state.passwordHelper}
                                                onChange={this.onChange}
                                                value={this.state.password}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="toggle password visibility"
                                                                onClick={this.handleClickShowPassword}
                                                            >
                                                                {this.state.isVisible ? <Visibility/> :
                                                                    <VisibilityOff/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <MyButton
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={this.submitHandle}
                                        onBlur={this.errorOff}
                                    >
                                        Sign In
                                    </MyButton>
                                    <Dialog
                                        open={this.state.open}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        onBackdropClick={this.closeModal}
                                        onClose={this.closeModal}
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Wrong credentials"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                The username and/or password provided was not correct.
                                            </DialogContentText>
                                        </DialogContent>
                                    </Dialog>
                                </form>
                            </div>
                        </Container>
                    </div>
                    <div className="App__Aside">
                        <img className='arashLogo' src={ArashLogo} alt='arashLogo'/>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}
