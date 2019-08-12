import React, { Component } from 'react';
import { HashRouter as Router, Route} from 'react-router-dom';
import SignUpForm from './SignUpForm';
 import SignInForm from './SignInForm';
import Profile from './profile/Profile';
import ProfileMaster from './profile_master/ProfileMaster';
import './App.css';
import History from './history'
class App extends Component {
      constructor (props) {
    super(props)
    this.state = {
      profileFields: {
        firstName: 'Jane',
        lastName: 'hora',
        phone:'091328884',
        personnel_code:'88888',
        in_place:'true',
        address:'',
        status:'admin',
        photo: require('./jane-doe.jpg')

      }
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
         <div className="FormTitle">
              <Route path="/" component={SignUpForm}>
              </Route>
              <Route path="/login" component={SignInForm}>
                  <SignInForm />
              </Route>
              <Route path="/Profile" component={Profile}>
                  <Profile profileFields={this.state.profileFields} />
              </Route>

              <Route path="/Master" component={ProfileMaster}>
                  <ProfileMaster profileFields={this.state.profileFields}  />
              </Route>
              <Route path="/history" component={History}>
                  <History />
              </Route>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;



// WEBPACK FOOTER //
// ./src/App.js
