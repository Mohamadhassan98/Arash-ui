import React from 'react'
import axios from 'axios';
import '../styles/ProfilePage.css';
import Profile from "../components/ProfileNavBar";
import AddressModal from "../components/AddressModal";

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.location || !this.props.location.state || !this.props.location.state.user) {
            this.props.history.push('');
        } else {
            this.user = this.props.location.state.user;
        }
        this.state = {
            firstName: this.user.first_name,
            lastName: this.user.last_name,
            email: this.user.email,
            phone: this.user.phone,
            personnelCode: this.user.personnel_code,
            inPlace: this.user.in_place,
            address: this.user.address,
            status: this.user.status === 'ma' ? 'Master' : 'Admin',
            photo: '',
        };
        this.pk = props.match.params.pk;
    }

    submitAddress = (address) => {
        this.setState({
            address: address
        });
    };


    selectImages = (event) => {
        this.setState({photo: URL.createObjectURL(event.target.files[0])});
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    uploadImage = () => {
        const fd = new FormData();
        console.log(this.state.photo);
        fd.append('photo', this.state.photo);
        axios.post('', fd).then(res => {
            console.log(res);
        });
    };


    handleSubmit = (event) => {
        event.preventDefault();
        const {firstName: first_name, lastName: last_name, username, email, phone, personnelCode: personnel_code, inPlace: in_place, address} = this.state;
        const url = `http://127.0.0.1:8000/user/${this.user.id}/`;
        axios.put(url, {
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            phone: phone,
            personnel_code: personnel_code,
            in_place: in_place,
            address: address
        }).then(response => {
            this.user.first_name = first_name;
            this.user.last_name = last_name;
            this.user.username = username;
            this.user.email = email;
            this.user.phone = phone;
            this.user.personnel_code = personnel_code;
            this.user.in_place = in_place;
            this.user.address = address;
        }).catch(error => {
            this.props.history.push('/503');
        });
    };


    componentDidMount() {
        if (!this.user) {
            this.props.history.push('');
        }
    }

    render() {
        return (
            <div>
                <Profile
                    myHistory={this.props.history}
                    user={this.user}
                    inProfile={true}/>
                {this.user.status === 'ma' ? (
                    <form className='FormCenterProfile' onSubmit={this.handleSubmit}>
                        <div className='accent'/>
                        <div className='profile-photo-master' onClick={() => this.fileInput.click()}>
                            <img src={this.state.photo} className="image" alt={this.state.photo}/>
                            <div className="middle">
                                <div className="text">change profile picture</div>
                            </div>
                        </div>
                        <div className="MasterProfile">
                            <div className="col-sm-4">
                                <input style={{display: 'none'}} className="FormField__Button mr-20 " type="file"
                                       onChange={this.selectImages} ref={fileInput => this.fileInput = fileInput}/>
                            </div>
                        </div>
                        <div className="MasterProfile">
                            <label className="MasterField_1">First Name</label>
                            <input type="text" id="first_name" className="MasterField_2"
                                   placeholder="Enter your first name"
                                   name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
                        </div>

                        <div className="MasterProfile">
                            <label className="MasterField_1">Last Name</label>
                            <input type="text" id="last_name" className="MasterField_2"
                                   placeholder="Enter your last name"
                                   name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                        </div>
                        <div className="MasterProfile">
                            <label className="MasterField_1">Phone</label>
                            <input type="text" id="phone" className="MasterField_2" placeholder="Enter your first phone"
                                   name="phone" value={this.state.phone} onChange={this.handleChange}/>
                        </div>

                        <div className="MasterProfile">
                            <label className="MasterField_1">personnel code</label>
                            <input type="text" id="personnel_code" className="MasterField_2"
                                   placeholder="Enter your personnel_code" name="personnel_code"
                                   value={this.state.personnelCode} onChange={this.handleChange}/>
                        </div>
                        <div className="MasterProfile">
                            <label className="MasterField_1">in place</label>
                            <input type="text" id="in_place" className="MasterField_2" placeholder="Enter your in_place"
                                   name="in_place" value={this.state.inPlace ? 'Yes' : 'No'}
                                   onChange={this.handleChange}/>
                        </div>

                        <div className="MasterProfile">
                            <label className="MasterField_1">address</label>
                            {/*<input type="text" id="address" className="MasterField_2" placeholder="Enter your address"*/}
                            {/*       name="address" value={this.state.address} onChange={this.handleChange}/>*/}
                            <AddressModal address={this.user.address} submitAddress={this.submitAddress}/>
                        </div>

                        <div className="MasterProfile">
                            <label className="MasterField_1">status</label>
                            <input type="text" id="status" className="MasterField_2" placeholder="Enter your status"
                                   name="status" value={this.state.status} onChange={this.handleChange}/>
                        </div>
                        <div className="MasterProfile">
                            <button className="FormField__Button mr-20" onClick={this.uploadImage}>Save</button>
                        </div>
                    </form>
                ) : (
                    <form className='FormCenterProfile' onSubmit={this.handleSubmit}>
                        <div className='accent'/>
                        <div className='profile-photo'>
                            <img src={this.state.photo} alt={this.state.photo}/>
                        </div>
                        <div className="FormProfile">
                            <label className="FieldProfile_1">First Name</label>
                            <label id="firstname" className="FieldProfile_2">{this.state.firstName}</label>
                        </div>

                        <div className="FormProfile">
                            <label className="FieldProfile_1">Last Name</label>
                            <label id="lastname" className="FieldProfile_2">{this.state.lastName}</label>
                        </div>
                        <div className="FormProfile">
                            <label className="FieldProfile_1">Phone</label>
                            <label id="phone" className="FieldProfile_2">{this.state.phone}</label>
                        </div>

                        <div className="FormProfile">
                            <label className="FieldProfile_1">personnel code</label>
                            <label id="code" className="FieldProfile_2">{this.state.personnelCode}</label>
                        </div>
                        <div className="FormProfile">
                            <label className="FieldProfile_1">in place</label>
                            <label id="inplace" className="FieldProfile_2">{this.state.inPlace ? 'Yes' : 'No'}</label>
                        </div>

                        <div className="FormProfile">
                            <label className="FieldProfile_1">address</label>
                            <label id="address" className="FieldProfile_2">{this.state.address}</label>
                        </div>

                        <div className="FormProfile">
                            <label className="FieldProfile_1">status</label>
                            <label id="status" className="FieldProfile_2">{this.state.status}</label>
                        </div>
                    </form>
                )}
                <footer/>
            </div>
        )
    }
}
