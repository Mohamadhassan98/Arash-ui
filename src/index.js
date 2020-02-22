import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ResultPage from "./temp/Result";

// const route = (
//     <Router>
//         <Switch>
//             <Route exact path={"/"} component={MaterialSignIn}/>
//             <Route path={URLs.signUp} component={MaterialSignUp}/>
//             <Route path={URLs.profile} component={ProfilePage}/>
//             <Route exact path={URLs.user(':pk')} component={ProfilePage}/>
//             <Route path={URLs.userHistory(':pk')} component={History}/>
//             <Route path={URLs.userHistory()} component={History}/>
//             <Route path={URLs.home} component={HomePage}/>
//             <Route path={URLs.addCompany} component={AddCompany}/>
//             <Route exact path={URLs.company(':pk')} component={CompanyPage}/>
//             <Route path={URLs.editCompany(':pk')} component={EditCompany}/>
//             <Route path={URLs.addArash(':pk')} component={AddArash}/>
//             <Route path={URLs.editArash(':pk',':apk')} component={EditArash}/>
//             <Route path={URLs.listProfile} component={ListProfile}/>
//             <Route path={URLs["503"]} component={Page503}/>
//             <Route component={Page404}/>
//         </Switch>
//     </Router>
// );

const route = (
    <Router>
        <Route path='/result' render={(props) => <ResultPage {...props}/>}/>
    </Router>
);

ReactDOM.render(route, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
