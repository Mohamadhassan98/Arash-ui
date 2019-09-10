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
import {CustomIcon, MyButton, MyTextField} from "../Styles";
import ArashLogo from '../static/B71c1c.png';
import {getCSRF, setAxiosDefaults} from "../Globals";
import {serverURLs, URLs} from "../Constants";
import {Redirect} from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

export default class MaterialSignIn extends React.Component {
    frontErrors = {
        username: 'Username cannot be empty',
        password: 'Password cannot be empty'
    };

    constructor(props) {
        super(props);
        this.state = {
            redirect: undefined,
            isVisible: false,
            username: '',
            password: '',
            usernameHelper: ' ',
            passwordHelper: ' ',
            open: false,
            keep: false
        };
        setAxiosDefaults();
    }

    componentDidMount() {
        if (getCSRF()) {
            axios.get(serverURLs.user).then(response => {
                this.doRedirect(URLs.home);
            });
        }
    }

    handleClickShowPassword = () => {
        this.setState({
            isVisible: !this.state.isVisible
        });
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
            axios.post(serverURLs.login, {
                username: this.state.username,
                password: this.state.password,
                keep: this.state.keep
            }).then(response => {
                axios.defaults.headers = {
                    'X-CSRFToken': getCSRF()
                };
                this.doRedirect(URLs.home);
            }).catch(error => {
                if (error.response) {
                    if (error.response.status === 401) {
                        this.setState({
                            open: true
                        });
                    } else {
                        this.doRedirect(URLs["503"]);
                    }
                } else {
                    console.error(error);
                    this.doRedirect(URLs["503"]);
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
        this.setState({
            open: false
        });
    };

    redirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
    };

    doRedirect = (page) => {
        this.setState({
            redirect: page
        });
    };

    changeKeep = (event, checked) => {
        this.setState({
            keep: checked
        });
    };

    render() {
        const CustomVisible = CustomIcon()(Visibility);
        const CustomInvisible = CustomIcon()(VisibilityOff);
        const CustomChecked = CustomIcon()(CheckBoxIcon);
        const CustomUnChecked = CustomIcon()(CheckBoxOutlineBlankIcon);
        return (
            <React.Fragment>
                {this.redirect()}
                <main className='HomePageMain'>
                    <div className="App__Form">
                        <Container component="main" maxWidth='xs'>
                            <div className='pepper'>
                                <p className="p">SIGN IN</p>
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
                                                                {this.state.isVisible ? <CustomVisible/> :
                                                                    <CustomInvisible/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox value="keep" checkedIcon={<CustomChecked/>}
                                                                   icon={<CustomUnChecked/>}/>}
                                                label="Keep me signed in"
                                                onChange={this.changeKeep}
                                                checked={this.state.keep}
                                            />
                                        </Grid>
                                    </Grid>
                                    <MyButton
                                        type="submit"
                                        fullWidth
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
