import React, {Component} from 'react';
// import Profile from "../components/ProfileNavBar";

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            hasAgreed: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    createuser(){
         const formData = new FormData();
         formData.set("username", this.state.username);
         formData.set("password", this.state.password);
        fetch('http://127.0.0.1:8000/accounts/login/',
            {
                method:"POST",
                header: { "Content-Type": "multipart/form-data" },

                body:formData
            }

            ).then((response) => {

            console.log('success', response);
            if (response.status === 200)
             this.setState({
              isLoggedIn: true
            });
            else{
                console.log("user is not find")
            }
        }
    )
    }
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
            <div className='AppBar'>
                <Profile emailAddress='emohamadhassan@gmail.com' firstName='Mohamad' lastName='Ebrahimi'
                         isMaster={true}/>
                <div className='App'>
                    <div className='FormTitle'>
                        <div className="FormCenter">
                            <form onSubmit={this.handleSubmit} className="FormFields">
                                <div className="FormField">
                                    <label className="FormField__Label" htmlFor="name">Full Name</label>
                                    <input type="text" id="name" className="FormField__Input"
                                           placeholder="Enter your full name" name="name" value={this.state.name}
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="FormField">
                                    <label className="FormField__Label" htmlFor="password">Password</label>
                                    <input type="password" id="password" className="FormField__Input"
                                           placeholder="Enter your password" name="password" value={this.state.password}
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="FormField">
                                    <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                                    <input type="email" id="email" className="FormField__Input"
                                           placeholder="Enter your email" name="email" value={this.state.email}
                                           onChange={this.handleChange}/>
                                </div>

                                <div className="FormField">
                                    <label className="FormField__CheckboxLabel">
                                        <input className="FormField__Checkbox" type="checkbox" name="hasAgreed"
                                               value={this.state.hasAgreed} onChange={this.handleChange}/> I agree all
                                        statements in <a href="" className="FormField__TermsLink">terms of service</a>
                                    </label>
                                </div>

                                <div className="FormField">
                                    <button className="FormField__Button mr-20">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpForm;


// WEBPACK FOOTER //
// ./src/pages/SignUpForm.js
