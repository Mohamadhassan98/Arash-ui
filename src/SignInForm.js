import React, {Component} from 'react';
import './App.css';
import { Redirect } from 'react-router-dom'

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isLoggedIn:'',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    login(){
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
        if (this.state.username === 'master' && this.state.password === 'master') {
            this.history.pushState(null, 'sign-in');
        }
    }

    render() {
        if (this.state.isLoggedIn) {
             return <Redirect to='./history' />
        }
        return (
            <div className='App'>
                <div className='FormTitle'>
                    <div className="FormCenter">
                        <form className="FormFields" onSubmit={this.handleSubmit}>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="username">Username</label>
                                <input type="username" id="username"  className="FormField__Input"
                                       placeholder="Enter your username" name="username" value={this.state.username}
                                       onChange={this.handleChange}/>
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="password">Password</label>
                                <input type="password" id="password" className="FormField__Input"
                                       placeholder="Enter your password" name="password" value={this.state.password}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="FormField">
                                <button className="FormField__Button mr-20" onClick={()=>{this.login()}}>Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignInForm;


// WEBPACK FOOTER //
// ./src/pages/SignInForm.js
