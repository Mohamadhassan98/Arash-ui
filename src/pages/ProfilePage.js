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
import {CustomIcon, MyButton, MyTextField} from '../Styles'
import NestedList from "../components/leftnavbar";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.user = props.location.state.user;
        this.pk = props.match.params.pk;
        this.state = {
            firstName: this.user.first_name,
            lastName: this.user.last_name,
            email: this.user.email,
            phone: this.user.phone,
            personnelCode: this.user.personnel_code,
            inPlace: this.user.in_place,
            address: this.user.address,
            isSuperUser: this.user.is_superuser,
            profilePic: null,
            photo: `http://127.0.0.1:8000/user-img/${this.user.id}`,
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
            isVisiblePasswordRepeat: false
        };
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

    isSuperUserChanged = (e, checked) => {
        this.setState({
            isSuperUser: checked
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
        if (this.state.profilePic) {
            const fd = new FormData();
            fd.append('profile_pic', this.state.profilePic);
            axios.put(`http://127.0.0.1:8000/user-img/${this.pk ? this.pk : this.user.id}/`, fd).catch(error => {
                console.error(error);
            });
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {firstName: first_name, lastName: last_name, username, email, phone, personnelCode: personnel_code, inPlace: in_place, address, newPassword} = this.state;
        const url = `http://127.0.0.1:8000/user/${this.pk ? this.pk : this.user.id}/`;
        axios.put(url, {
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            phone: phone,
            personnel_code: personnel_code,
            in_place: in_place,
            address: address,
            password: newPassword
        }).then(response => {
            this.uploadImage();
            if (!this.pk) {
                this.user.first_name = first_name;
                this.user.last_name = last_name;
                this.user.username = username;
                this.user.email = email;
                this.user.phone = phone;
                this.user.personnel_code = personnel_code;
                this.user.in_place = in_place;
                this.user.address = address;
            }
            const redirect = this.pk ? `/list/profile` : `/home`;
            this.props.history.push({
                pathname: redirect,
                state: {
                    user: this.user
                }
            });
        }).catch(error => {
            console.error(error);
            //TODO("Errors are welcomed!")
        });
    };

    componentDidMount() {
        if (this.pk) {
            const url = 'http://127.0.0.1:8000/user/' + this.pk + '/';
            axios.get(url).then(response => {
                this.setState({
                    firstName: response.data['first_name'],
                    lastName: response.data['last_name'],
                    phone: response.data['phone'],
                    email: response.data['email'],
                    personnelCode: response.data['personnel_code'],
                    inPlace: response.data['in_place'],
                    address: response.data['address'],
                    photo: `http://127.0.0.1:8000/user-img/${this.pk}`,
                    isSuperUser: response.data['is_superuser']
                })
            }).catch(error => {
                //TODO("Show error pages!")
            });
        }
    }

    render() {
        const CustomVisible = CustomIcon()(Visibility);
        const CustomInvisible = CustomIcon()(VisibilityOff);
        const CustomChecked = CustomIcon()(CheckBoxIcon);
        const CustomUnChecked = CustomIcon()(CheckBoxOutlineBlankIcon);

        return (
            <React.Fragment>
                <main className='HomePageMain2'>
                    <NestedList user={this.user} myHistory={this.props.history}/>
                    <div className='rightme'>
                        <Profile pk={this.user.id} isSuperUser={this.user.is_superuser}/>
                        <form className='FormCenterProfile' noValidate onSubmit={this.handleSubmit}>
                            {this.state.isSuperUser ? (
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
                                            onChange={this.handleChange}
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
                                            // onChange={this.state.isSuperUser ? this.isSuperUserChanged : null}
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
                                    <MyButton
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        color="primary"
                                        onClick={this.handleSubmit}
                                        onBlur={this.errorOff}
                                    >
                                        {this.state.isSuperUser ? "Save" : "change password"}
                                    </MyButton>
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
