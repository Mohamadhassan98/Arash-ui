import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Page404 from "./pages/404NotFound";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import CompanyPage from "./pages/CompanyPage";
import MaterialSignUp from "./pages/MaterialSignUp";
import AddCompany from "./pages/AddCompany";
import EditCompany from "./pages/EditCompany";
import MaterialSignIn from "./pages/MaterialSignIn";
import AddArash from "./pages/AddArash";
import EditArash from "./pages/EditArash";
import ProfilePage from "./pages/ProfilePage";
import History from "./pages/History";
import Page503 from "./pages/503NotAvailable";
import ListProfile from "./pages/ListProfile";
import {URLs} from "./Constants";

const route = (
    <Router>
        <Switch>
            <Route exact path={URLs.signIn} component={MaterialSignIn}/>
            <Route path={URLs.signUp} component={MaterialSignUp}/>
            <Route path={URLs.profile} component={ProfilePage}/>
            <Route exact path="/user/:pk" component={ProfilePage}/>
            <Route path="/user/:pk/history" component={History}/>
            <Route path={URLs.history} component={History}/>
            <Route path={URLs.home} component={HomePage}/>
            <Route path={URLs.addCompany} component={AddCompany}/>
            <Route exact path='/company/:pk' component={CompanyPage}/>
            <Route path='/company/:pk/edit' component={EditCompany}/>
            <Route path='/company/:pk/add-arash' component={AddArash}/>
            <Route path='/company/:pk/edit-arash/:apk' component={EditArash}/>
            <Route path={URLs.listProfile} component={ListProfile}/>
            <Route path={URLs["503"]} component={Page503}/>
            <Route component={Page404}/>
        </Switch>
    </Router>
);

ReactDOM.render(route, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
