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
import {containsDigitOnly, isEmail, setAxiosDefaults} from "../Globals";
import AddressModal from "../components/AddressModal";
import {ConfirmButton, CustomIcon, MyTextField} from "../Styles";
import NestedList from "../components/leftnavbar";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {serverURLs, URLs} from "../Constants";
import {Redirect} from "react-router-dom";
import Default from '../static/Author__Placeholder.png';

export default class SignUp extends React.Component {

    frontErrors = {
        firstName: 'First name cannot be empty',
        lastName: 'Last name cannot be empty',
        username: 'Username cannot be empty',
        email: ['Email cannot be empty', `Email format is invalid. Example: 'example@mail.com'`],
        password: 'Password cannot be empty',
        passwordRepeat: `Password doesn't match`,
        phone: 'Mobile number must be exactly 11 characters',
        personnelCode: 'Personnel code cannot be empty'
    };

    constructor(props) {
        super(props);
        this.state = {
            redirect: undefined,
            userPK: 0,
            userIsSuperUser: false,
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            phone: '',
            personnelCode: '',
            inPlace: false,
            address: {},
            isSuperuser: false,
            profilePic: null,
            photo: Default,
            password: '',
            passwordRepeat: '',
            isVisiblePassword: false,
            isVisiblePasswordRepeat: false,
            firstNameHelper: ' ',
            lastNameHelper: ' ',
            usernameHelper: ' ',
            emailHelper: ' ',
            passwordHelper: ' ',
            passwordRepeatHelper: ' ',
            phoneHelper: ' ',
            personnelCodeHelper: ' '
        };
        setAxiosDefaults();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    submitAddress = (address) => {
        this.setState({
            address: address
        });
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

    selectImages = (event) => {
        this.setState({
            photo: URL.createObjectURL(event.target.files[0]),
            profilePic: event.target.files[0]
        });
    };

    handleClickShowPassword = () => {
        this.setState({
            isVisiblePassword: !this.state.isVisiblePassword
        });
    };

    handleClickShowPasswordRepeat = () => {
        this.setState({
            isVisiblePasswordRepeat: !this.state.isVisiblePasswordRepeat
        });
    };

    fieldChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    uploadImage = (pk) => {
        if (this.state.profilePic) {
            const fd = new FormData();
            fd.append('profile_pic', this.state.profilePic);
            axios.put(serverURLs.userImage(pk), fd).catch(error => {
                console.error(error);
                this.doRedirect(URLs["503"]);
            });
        }
    };

    submitHandle = (e) => {
        e.preventDefault();
        if (this.validateData()) {
            axios.post(serverURLs.signUp, {
                username: this.state.username,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                password: this.state.password,
                email: this.state.email,
                phone: this.state.phone,
                personnel_code: this.state.personnelCode,
                in_place: this.state.inPlace,
                is_superuser: this.state.isSuperUser,
                address: {
                    ...this.state.address,
                    postal_code: this.state.address.postalCode
                }
            }).then(response => {
                const pk = response.data.pk;
                this.uploadImage(pk);
                this.doRedirect(URLs.listProfile);
            }).catch(error => {
                if (error.response.status === 422) {
                    this.handleErrors(error.response.data);
                } else {
                    console.error(error);
                    this.doRedirect(URLs["503"]);
                }
            });
        }
    };

    doRedirect = (page) => {
        this.setState({
            redirect: page
        });
    };

    redirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
    };

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

    errorOff = () => {
        this.setState({
            firstNameHelper: ' ',
            lastNameHelper: ' ',
            usernameHelper: ' ',
            emailHelper: ' ',
            passwordHelper: ' ',
            passwordRepeatHelper: ' ',
            phoneHelper: ' ',
            personnelCodeHelper: ' '
        });
    };

    validateData = () => {
        let invalidData = false;
        const {firstName, lastName, username, email, password, passwordRepeat, phone, personnelCode} = this.state;
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
        if (phone.trim().length !== 11) {
            this.setState({
                phoneHelper: this.frontErrors.phone
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

    handleErrors = (errors) => {
        for (let [key, value] of Object.entries(errors)) {
            switch (key) {
                case 'username':
                    this.setState({
                        usernameHelper: value
                    });
                    break;
                case 'first_name':
                    this.setState({
                        firstNameHelper: value
                    });
                    break;
                case 'last_name':
                    this.setState({
                        lastNameHelper: value
                    });
                    break;
                case 'email':
                    this.setState({
                        emailHelper: value
                    });
                    break;
                case 'personnel_code':
                    this.setState({
                        personnelCodeHelper: value
                    });
                    break;
                case 'phone':
                    this.setState({
                        phoneHelper: value
                    });
                    break;
                default:
                    console.error(key, value);
                    this.doRedirect(URLs["503"]);
                    break;
            }
        }
    };

    clearProfile = () => {
        this.setState({
            photo: Default,
            profilePic: null
        });
        this.fileInput.value = null;
        this.longPressed = true;
    };

    profilePress = () => {
        this.longPress = setTimeout(this.clearProfile, 1000);
    };

    choosePicture = () => {
        this.fileInput.click();
    };

    profileRelease = () => {
        clearTimeout(this.longPress);
        if (!this.longPressed) {
            this.choosePicture();
        }
        this.longPressed = false;
    };

    cancelHandle = (e) => {
        const url = URLs.listProfile;
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
                {this.redirect()}
                <main className='HomePageMain2'>
                    <NestedList isSuperUser={this.state.userIsSuperUser} myHistory={this.props.history}/>
                    <div className='rightme'>
                        <Profile pk={this.state.userPK} isSuperUser={this.state.userIsSuperUser}/>
                        <form className='FormCenterProfile' noValidate onSubmit={this.handleSubmit}>
                            <div className='profile-photo-master' onMouseDown={this.profilePress}
                                 onMouseUp={this.profileRelease}>
                                <img src={this.state.photo} className="image" alt={this.state.photo}/>
                                <div className="middle">
                                    <div className="text">change profile picture
                                        (hold to delete)
                                    </div>
                                </div>
                                <div className="MasterProfile">
                                    <div className="col-sm-4">
                                        <input style={{display: 'none'}} className="FormField__Button mr-20"
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
                                            name="username"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="username"
                                            label="User Name"
                                            onChange={this.handleChange}
                                            value={this.state.username}
                                            error={this.state.usernameHelper !== ' '}
                                            helperText={this.state.usernameHelper}
                                            autoFocus
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
                                            onChange={(e) => this.maxFieldChange(e, 11, true)}
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
                                            onChange={(e) => this.maxFieldChange(e, 15)}
                                            value={this.state.personnelCode}
                                            error={this.state.personnelCodeHelper !== ' '}
                                            helperText={this.state.personnelCodeHelper}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AddressModal submitAddress={this.submitAddress}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField
                                            id="password"
                                            autoComplete='off'
                                            variant="outlined"
                                            type={this.state.isVisiblePassword ? 'text' : 'password'}
                                            label="Password"
                                            name="password"
                                            onChange={this.handleChange}
                                            value={this.state.password}
                                            error={this.state.passwordHelper !== ' '}
                                            helperText={this.state.passwordHelper}
                                            fullWidth
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                        >
                                                            {this.state.isVisiblePassword ? <CustomVisible/> :
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
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="inPlace" checkedIcon={<CustomChecked/>}
                                                               icon={<CustomUnChecked/>}/>}
                                            label="In place"
                                            onChange={this.inPlaceChanged}
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
                                                {this.state.userIsSuperUser ? "Save" : "change password"}
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
