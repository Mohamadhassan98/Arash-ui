import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Profile from "../components/ProfileNavBar";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import '../styles/MaterialSignUp.css';
import axios from "axios";
import {containsDigitOnly, isEmail} from "../Globals";
import AddressModal from "../components/AddressModal";
import {ConfirmButton, CustomIcon, MyTextField} from "../Styles";
import NestedList from "../components/leftnavbar";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

export default class SignUp extends React.Component {
    frontErrors = {
        firstName: 'First name cannot be empty',
        lastName: 'Last name cannot be empty',
        username: 'Username cannot be empty',
        email: ['Email cannot be empty', 'Email format is invalid. Example: \'example@mail.com\''],
        password: 'Password cannot be empty',
        passwordRepeat: `Password doesn't match`,
        mobilePhone: 'Mobile number must be exactly 11 characters',
        personnelCode: 'Personnel code cannot be empty'
    };

    constructor(props) {
        super(props);
        if (!this.props.location || !this.props.location.state || !this.props.location.state.user) {
            this.props.history.push('');
        } else {
            this.user = this.props.location.state.user;
        }
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            passwordRepeat: '',
            mobilePhone: '',
            personnelCode: '',
            inPlace: false,
            address: {},
            isSuperuser: false,
            isVisiblePassword: false,
            isVisiblePasswordRepeat: false,
            firstNameHelper: ' ',
            lastNameHelper: ' ',
            usernameHelper: ' ',
            emailHelper: ' ',
            passwordHelper: ' ',
            passwordRepeatHelper: ' ',
            mobilePhoneHelper: ' ',
            personnelCodeHelper: ' ',
        };
    }

    errorOff = () => {
        this.setState({
            firstNameHelper: ' ',
            lastNameHelper: ' ',
            usernameHelper: ' ',
            emailHelper: ' ',
            passwordHelper: ' ',
            passwordRepeatHelper: ' ',
            mobilePhoneHelper: ' ',
            personnelCodeHelper: ' '
        });
    };

    validateData = () => {
        let invalidData = false;
        const {firstName, lastName, username, email, password, passwordRepeat, mobilePhone, personnelCode} = this.state;
        if (firstName.trim() === '') {
            this.setState({
                firstNameHelper: this.frontErrors.firstName
            });
            invalidData = true;
        }
        if (lastName.trim() === '') {
            this.setState({
                lastNameHelper: this.frontErrors.lastName
            });
            invalidData = true;
        }
        if (username.trim() === '') {
            this.setState({
                usernameHelper: this.frontErrors.username
            });
            invalidData = true;
        }
        if (email.trim() === '') {
            this.setState({
                emailHelper: this.frontErrors.email[0]
            });
            invalidData = true;
        } else if (!isEmail(email)) {
            this.setState({
                emailHelper: this.frontErrors.email[1]
            });
            invalidData = true;
        }
        if (password.trim() === '') {
            this.setState({
                passwordHelper: this.frontErrors.password
            });
            invalidData = true;
        }
        if (passwordRepeat.trim() !== password) {
            this.setState({
                passwordRepeatHelper: this.frontErrors.passwordRepeat
            });
            invalidData = true;
        }
        if (mobilePhone.trim().length !== 11) {
            this.setState({
                mobilePhoneHelper: this.frontErrors.mobilePhone
            });
            invalidData = true;
        }
        if (personnelCode.trim() === '') {
            this.setState({
                personnelCodeHelper: this.frontErrors.personnelCode
            });
            invalidData = true;
        }
        return !invalidData;
    };

    fieldChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitAddress = (address) => {
        this.setState({
            address: address
        });
    };

    componentDidMount() {
        if (!this.user) {
            this.props.history.push('');
        }
    }

    maxFieldChange = (e, max, numeric = false) => {
        if (e.target.value.length <= max) {
            if (numeric) {
                this.numericFieldChange(e);
            } else {
                this.fieldChange(e);
            }
        }
    };

    numericFieldChange = (e) => {
        if (containsDigitOnly(e.target.value)) {
            this.fieldChange(e);
        }
    };

    handleClickShowPassword = () => {
        this.setState({isVisiblePassword: !this.state.isVisiblePassword});
    };

    handleClickShowPasswordRepeat = () => {
        this.setState({isVisiblePasswordRepeat: !this.state.isVisiblePasswordRepeat});
    };

    submitHandle = (e) => {
        e.preventDefault();
        if (this.validateData()) {
            const url = 'http://127.0.0.1:8000/signup/';
            axios.post(url, {
                username: this.state.username,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                password: this.state.password,
                email: this.state.email,
                phone: this.state.mobilePhone,
                personnel_code: this.state.personnelCode,
                in_place: this.state.inPlace,
                is_superuser: this.state.isSuperUser,
                address: {
                    ...this.state.address,
                    postal_code: this.state.address.postalCode,
                }
            }).then(response => {
                const csrftoken = response.headers.csrftoken;
                // const sessionId = response.headers.sessionid;
                this.props.history.push({
                    pathname: '/list/profile',
                    state: {
                        user: this.user,
                        csrftoken: csrftoken,
                        // sessionId: sessionId
                    }
                });
            }).catch(error => {
                console.error(error);
            });
        }
    };

    isSuperUserChanged = (e, checked) => {
        this.setState({
            isSuperUser: checked
        });
    };

    inPlaceChanged = (e, checked) => {
        this.setState({
            inPlace: checked
        });
    };

    cancelHandle = (e) => {
        const url = `/profile-list`;
        this.props.history.push({
            pathname: url,
            state: {
                user: this.user
            }
        });
    };

    render() {
        const CustomVisible = CustomIcon()(Visibility);
        const CustomInvisible = CustomIcon()(VisibilityOff);
        const CustomChecked = CustomIcon()(CheckBoxIcon);
        const CustomUnChecked = CustomIcon()(CheckBoxOutlineBlankIcon);
        const SaveButton = ConfirmButton('left');
        const CancelButton = ConfirmButton('right');
        return (
            <React.Fragment>
                <main className='HomePageMain2'>
                    <NestedList user={this.user} myHistory={this.props.history}/>
                    <div className='rightme'>
                        <Profile pk={this.user.id} isSuperUser={this.user.is_superuser}/>
                        <form className='FormCenterProfile' noValidate onSubmit={this.handleSubmit}>
                            <div className='profile-photo-master' onClick={() => this.fileInput.click()}>
                                <img src={this.state.photo} className="image" alt={this.state.photo}/>
                                <div className="middle">
                                    <div className="text">change profile picture</div>
                                </div>
                                <div className="MasterProfile">
                                    <div className="col-sm-4">
                                        <input style={{display: 'none'}} className="FormField__Button mr-20 "
                                               type="file"
                                               accept='image/*'
                                               onChange={this.selectImages}
                                               ref={fileInput => this.fileInput = fileInput}/>
                                    </div>
                                </div>
                            </div>

                            <Container maxWidth="xs">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <MyTextField
                                            name="firstName"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            onChange={this.handleChange}
                                            value={this.state.firstName}
                                            error={this.state.firstNameHelper !== ' '}
                                            helperText={this.state.firstNameHelper}
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            onChange={this.handleChange}
                                            value={this.state.lastName}
                                            error={this.state.lastNameHelper !== ' '}
                                            helperText={this.state.lastNameHelper}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            onChange={this.handleChange}
                                            value={this.state.email}
                                            error={this.state.emailHelper !== ' '}
                                            helperText={this.state.emailHelper}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="phone"
                                            label="Phone"
                                            name="phone"
                                            onChange={this.handleChange}
                                            value={this.state.phone}
                                            error={this.state.phoneHelper !== ' '}
                                            helperText={this.state.phoneHelper}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="personnelCode"
                                            label="Personnel Code"
                                            name="personnelCode"
                                            onChange={this.handleChange}
                                            value={this.state.personnelCode}
                                            error={this.state.personnelCodeHelper !== ' '}
                                            helperText={this.state.personnelCodeHelper}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="inPlace" checkedIcon={<CustomChecked/>}
                                                               icon={<CustomUnChecked/>}/>}
                                            label="In place"
                                            onChange={this.state.isSuperUser ? this.inPlaceChanged : null}
                                            checked={this.state.inPlace}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="isSuperUser" checkedIcon={<CustomChecked/>}
                                                               icon={<CustomUnChecked/>}/>}
                                            label="Is Super User"
                                            onChange={this.isSuperUserChanged}
                                            checked={this.state.isSuperUser}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AddressModal address={this.state.address}
                                                      submitAddress={this.submitAddress}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField
                                            autoComplete='off'
                                            id="newPassword"
                                            variant="outlined"
                                            type={this.state.isVisibleNewPassword ? 'text' : 'password'}
                                            label="New Password"
                                            name="newPassword"
                                            onChange={this.handleChange}
                                            value={this.state.newPassword}
                                            error={this.state.newPasswordHelper !== ' '}
                                            helperText={this.state.newPasswordHelper}
                                            fullWidth
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="toggle password visibility"
                                                            onClick={this.handleClickShowNewPassword}
                                                        >
                                                            {this.state.isVisibleNewPassword ? <CustomVisible/> :
                                                                <CustomInvisible/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField
                                            autoComplete='off'
                                            id="passwordRepeat"
                                            variant="outlined"
                                            type={this.state.isVisiblePasswordRepeat ? 'text' : 'password'}
                                            label="Confirm Password"
                                            name="passwordRepeat"
                                            onChange={this.handleChange}
                                            value={this.state.passwordRepeat}
                                            error={this.state.passwordRepeatHelper !== ' '}
                                            helperText={this.state.passwordRepeatHelper}
                                            fullWidth
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="toggle password visibility"
                                                            onClick={this.handleClickShowPasswordRepeat}
                                                        >
                                                            {this.state.isVisiblePasswordRepeat ? <CustomVisible/> :
                                                                <CustomInvisible/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
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
                                                {this.state.isSuperUser ? "Save" : "change password"}
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
                                </Grid>
                            </Container>
                        </form>
                    </div>
                    <footer/>
                </main>
            </React.Fragment>
        );
    }
}
