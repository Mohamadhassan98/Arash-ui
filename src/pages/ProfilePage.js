import React from 'react'
import axios from 'axios';
import '../styles/ProfilePage.css';
import Profile from "../components/ProfileNavBar";
import AddressModal from "../components/AddressModal";
import pic from '../jane-doe.jpg'
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {Container} from "@material-ui/core";
import {MyButton, MyCheckbox, MyTextField} from '../Styles'
import NestedList from "../components/leftnavbar";

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.user = props.location.state.user;
        this.state = {
            firstName: this.user.first_name,
            lastName: this.user.last_name,
            email: this.user.email,
            phone: this.user.phone,
            personnelCode: this.user.personnel_code,
            inPlace: this.user.in_place,
            address: this.user.address,
            status: this.user.status,
            photo: pic,
            oldPassword: '',
            newPassword: '',
            passwordRepeat: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            phoneError: '',
            personnelCodeError: '',
            inPlaceError: '',
            statusError: '',
            firstNameHelper: '',
            lastNameHelper: '',
            emailHelper: '',
            phoneHelper: '',
            personnelCodeHelper: '',
            oldPasswordError: '',
            oldPasswordHelper: '',
            newPasswordError: '',
            newPasswordHelper: '',
            passwordRepeatError: '',
            passwordRepeatHelper: '',
            isVisibleOldPassword: false,
            isVisibleNewPassword: false,
            isVisiblePasswordRepeat: false


        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.pk = props.match.params.pk;
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

    statusChanged = (e, checked) => {
        this.setState({
            status: checked
        });
    };

    selectImages = (event) => {
        this.setState({photo: URL.createObjectURL(event.target.files[0])});
    };

    handleClickShowOldPassword = () => {
        this.setState({isVisibleOldPassword: !this.state.isVisibleOldPassword});
    };
    handleClickShowNewPassword = () => {
        this.setState({isVisibleNewPassword: !this.state.isVisibleNewPassword});
    };

    handleClickShowPasswordRepeat = () => {
        this.setState({isVisiblePasswordRepeat: !this.state.isVisiblePasswordRepeat});
    };


    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleBoxChange(e) {
        this.setState({
            [e.target.name]: !this.state.inPlace

        });
    }

    uploadImage = () => {
        const fd = new FormData();
        console.log(this.state.photo);
        fd.append('photo', this.state.photo);
        axios.post('', fd)
            .then(res => {
                console.log(res);
            })
    };


    handleSubmit(event) {
        event.preventDefault();
        const {firstName: first_name, lastName: last_name, username, email, phone, personnelCode: personnel_code, inPlace: in_place, address, newPassword} = this.state;
        const url = `http://127.0.0.1:8000/user/${this.user.id}/`;
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
            this.user.first_name = first_name;
            this.user.last_name = last_name;
            this.user.username = username;
            this.user.email = email;
            this.user.phone = phone;
            this.user.personnel_code = personnel_code;
            this.user.in_place = in_place;
            this.user.address = address;
            this.user.password = newPassword;
        }).catch(error => {
            console.error(error);
            //TODO("Errors are welcomed!")
        });
    };


    componentDidMount() {
        const url = '127.0.0.1:8000/user/' + this.pk + '/';
        axios.get(url).then(response => {
            console.log(response);
            this.setState({
                firstName: response.data['first_name'],
                lastName: response.data['last_name'],
                phone: response.data['phone'],
                email: response.data['email'],
                personnelCode: response.data['personnel_code'],
                inPlace: response.data['in_place'],
                address: response.data['address'],
                photo: '', //TODO("Not in database yet")
                status: response.data['status'] === 'ma',
            })
        }).catch(error => {
            //TODO("Show error pages!")
        })
    }

    render() {
        return (
            <React.Fragment>

                <main className='HomePageMain2'>
                    <NestedList user={this.user}
                                myHistory={this.props.history}/>
                    <div className="rightme">
                        <Profile
                            user={this.user}
                            myHistory={this.props.history}/>

                        <form className='FormCenterProfile' noValidate onSubmit={this.handleSubmit}>
                            {this.state.status === 'ma' ? (
                                <div className='profile-photo-master' onClick={() => this.fileInput.click()}>
                                    <img src={this.state.photo} className="image" alt={this.state.photo}/>
                                    <div className="middle">
                                        <div className="text">change profile picture</div>
                                    </div>
                                    <div className="MasterProfile">
                                        <div className="col-sm-4">
                                            <input style={{display: 'none'}} className="FormField__Button mr-20 "
                                                   type="file"
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
                                            variant={this.state.status === 'ma' ? "outlined" : "standard"}
                                            InputProps={{
                                                readOnly: this.state.status !== 'ma'
                                            }}
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            onChange={this.handleChange}
                                            value={this.state.firstName}
                                            error={this.state.firstNameError}
                                            helperText={this.state.firstNameHelper}
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField
                                            variant={this.state.status === 'ma' ? "outlined" : "standard"}
                                            InputProps={{
                                                readOnly: this.state.status !== 'ma'
                                            }}
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            onChange={this.handleChange}
                                            value={this.state.lastName}
                                            error={this.state.lastNameError}
                                            helperText={this.state.lastNameHelper}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField
                                            variant={this.state.status === 'ma' ? "outlined" : "standard"}
                                            InputProps={{
                                                readOnly: this.state.status !== 'ma'
                                            }}
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            onChange={this.handleChange}
                                            value={this.state.email}
                                            error={this.state.emailError}
                                            helperText={this.state.emailHelper}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField
                                            variant={this.state.status === 'ma' ? "outlined" : "standard"}
                                            InputProps={{
                                                readOnly: this.state.status !== 'ma'
                                            }}
                                            required
                                            fullWidth
                                            id="phone"
                                            label="Phone"
                                            name="phone"
                                            onChange={this.handleChange}
                                            value={this.state.phone}
                                            error={this.state.phoneError}
                                            helperText={this.state.phoneHelper}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField
                                            variant={this.state.status === 'ma' ? "outlined" : "standard"}
                                            InputProps={{
                                                readOnly: this.state.status !== 'ma'
                                            }}
                                            required
                                            fullWidth
                                            id="personnelCode"
                                            label="Personnel Code"
                                            name="personnelCode"
                                            onChange={this.handleChange}
                                            value={this.state.personnel_code}
                                            error={this.state.personnelCodeError}
                                            helperText={this.state.personnelCodeHelper}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<MyCheckbox value="inPlace"/>}
                                            label="in place"
                                            onChange={this.state.status === 'ma' ? this.inPlaceChanged : null}
                                            checked={this.state.inPlace}

                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="ma" color="primary"/>}
                                            label="Is Super User"
                                            onChange={this.state.status === 'ma' ? this.statusChanged : null}
                                            checked={this.state.status}

                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <AddressModal address={this.state.address}
                                                      submitAddress={this.submitAddress}/>

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
                                            error={this.state.oldPasswordError}
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
                                                            {this.state.isVisibleOldPassword ? <Visibility/> :
                                                                <VisibilityOff/>}
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
                                            error={this.state.newPasswordError}
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
                                                            {this.state.isVisibleNewPassword ? <Visibility/> :
                                                                <VisibilityOff/>}
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
                                            error={this.state.passwordRepeatError}
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
                                                            {this.state.isVisiblePasswordRepeat ? <Visibility/> :
                                                                <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <MyButton
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleSubmit}
                                        onBlur={this.errorOff}
                                    >
                                        {this.state.status === 'ma' ? "Save" : "change password"}
                                    </MyButton>
                                </Grid>

                            </Container>
                        </form>
                    </div>
                    <footer/>
                </main>
            </React.Fragment>

        )
    }
}
