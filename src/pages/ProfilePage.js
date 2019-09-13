import React from 'react'
import axios from 'axios';
import '../styles/ProfilePage.css';
import Profile from "../components/ProfileNavBar";
import AddressModal from "../components/AddressModal";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {Container} from "@material-ui/core";
import {ConfirmButton, CustomIcon, MyTextField} from '../Styles'
import NestedList from "../components/leftnavbar";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import {serverURLs, URLs} from "../Constants";
import {containsDigitOnly, isEmail, setAxiosDefaults} from "../Globals";
import {Redirect} from "react-router-dom";
import Default from '../static/Author__Placeholder.png';

export default class ProfilePage extends React.Component {

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
        this.pk = props.match.params.pk;
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
            isSuperUser: false,
            profilePic: null,
            photo: '',
            photoCleared: false,
            oldPassword: '',
            newPassword: '',
            passwordRepeat: '',
            firstNameHelper: ' ',
            lastNameHelper: ' ',
            emailHelper: ' ',
            phoneHelper: ' ',
            personnelCodeHelper: ' ',
            oldPasswordHelper: ' ',
            newPasswordHelper: ' ',
            passwordRepeatHelper: ' ',
            isVisibleOldPassword: false,
            isVisibleNewPassword: false,
            isVisiblePasswordRepeat: false,
            pk: ''
        };
        setAxiosDefaults();
    }

    submitAddress = (address) => {
        this.setState({
            address: address
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

    handleClickShowOldPassword = () => {
        this.setState({
            isVisibleOldPassword: !this.state.isVisibleOldPassword
        });
    };

    handleClickShowNewPassword = () => {
        this.setState({
            isVisibleNewPassword: !this.state.isVisibleNewPassword
        });
    };

    handleClickShowPasswordRepeat = () => {
        this.setState({
            isVisiblePasswordRepeat: !this.state.isVisiblePasswordRepeat
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    uploadImage = () => {
        const url = `${serverURLs.userImage}${this.pk ? this.pk : this.state.pk}/`;
        if (this.state.profilePic) {
            const fd = new FormData();
            fd.append('profile_pic', this.state.profilePic);
            axios.put(url, fd).catch(error => {
                console.error(error);
                this.doRedirect(URLs["503"]);
            });
        } else if (this.state.photoCleared) {
            axios.delete(url).catch(error => {
                console.error(error);
                this.doRedirect(URLs["503"]);
            });
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validateData()) {
            const url = `${serverURLs.user}${this.pk ? this.pk : this.state.pk}/`;
            axios.put(url, {
                username: this.state.username,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                password: this.state.newPassword,
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
                this.uploadImage();
                const redirect = this.pk ? URLs.listProfile : URLs.home;
                this.doRedirect(redirect);
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
        axios.get(serverURLs.user).then(response => {
            this.setState({
                userPK: response.data.id,
                userIsSuperUser: response.data.is_superuser
            });
            const url = `${serverURLs.user}${this.pk ? this.pk : this.state.userPK}/`;
            axios.get(url).then(response => {
                this.setState({
                    firstName: response.data['first_name'],
                    lastName: response.data['last_name'],
                    phone: response.data['phone'],
                    email: response.data['email'],
                    personnelCode: response.data['personnel_code'],
                    inPlace: response.data['in_place'],
                    address: response.data['address'],
                    photo: `${serverURLs.userImage}${this.pk ? this.pk : this.state.userPK}/`,
                    isSuperUser: response.data['is_superuser']
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
            profilePic: null,
            photoCleared: true
        });
        this.longPressed = true;
        this.fileInput.value = null;
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
        const url = `/home`;
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
                            {this.state.isSuperUser ? (
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
                            ) : (
                                <div className='profile-photo'>
                                    <img src={this.state.photo} alt={this.state.photo} className="image"/>
                                </div>
                            )}
                            <Container maxWidth="xs">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <MyTextField
                                            name="firstName"
                                            variant={this.state.isSuperUser ? "outlined" : "standard"}
                                            InputProps={{
                                                readOnly: !this.state.isSuperUser
                                            }}
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
                                            variant={this.state.isSuperUser ? "outlined" : "standard"}
                                            InputProps={{
                                                readOnly: !this.state.isSuperUser
                                            }}
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
                                            variant={this.state.isSuperUser ? "outlined" : "standard"}
                                            InputProps={{
                                                readOnly: !this.state.isSuperUser
                                            }}
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
                                            variant={this.state.isSuperUser ? "outlined" : "standard"}
                                            InputProps={{
                                                readOnly: !this.state.isSuperUser
                                            }}
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
                                            variant={this.state.isSuperUser ? "outlined" : "standard"}
                                            InputProps={{
                                                readOnly: !this.state.isSuperUser
                                            }}
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
                                            checked={this.state.isSuperUser}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AddressModal address={this.state.address}
                                                      submitAddress={this.submitAddress}
                                                      disabled={!this.state.isSuperUser}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField
                                            id="oldPassword"
                                            autoComplete='off'
                                            variant="outlined"
                                            type={this.state.isVisibleOldPassword ? 'text' : 'password'}
                                            label="Old Password"
                                            name="oldPassword"
                                            onChange={this.handleChange}
                                            value={this.state.oldPassword}
                                            error={this.state.oldPasswordHelper !== ' '}
                                            helperText={this.state.oldPasswordHelper}
                                            fullWidth
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="toggle password visibility"
                                                            onClick={this.handleClickShowOldPassword}
                                                        >
                                                            {this.state.isVisibleOldPassword ? <CustomVisible/> :
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
