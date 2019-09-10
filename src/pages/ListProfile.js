import React from 'react';
import axios from "axios";
import {MyButton, MyList} from '../Styles'
import NestedList from "../components/leftnavbar";
import Profile from "../components/ProfileNavBar";
import Container from "@material-ui/core/Container";
import ProfileListItem from "../components/ProfileListItem"
import Grid from "@material-ui/core/Grid";
import {Add} from "@material-ui/icons";
import '../App.css'
import {setAxiosDefaults} from "../Globals";
import {serverURLs, URLs} from "../Constants";
import {Redirect} from "react-router-dom";

export default class ListProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: undefined,
            userPK: 0,
            userIsSuperUser: false,
            deleteModalOpen: false,
            profiles: []
        };
        setAxiosDefaults();
    };

    redirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
    };

    doRedirect = (page) => {
        this.setState({
            redirect: page
        });
    };

    componentDidMount() {
        axios.get(serverURLs.user).then(response => {
            this.setState({
                userPK: response.data.id,
                userIsSuperUser: response.data.is_superuser
            });
            axios.get(serverURLs.users).then(response => {
                this.setState({
                    profiles: response.data
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

    addNewUser = () => {
        this.props.history.push(URLs.signUp);
    };

    render() {
        return (
            <React.Fragment>
                {this.redirect()}
                <main className='HomePageMain2'>
                    <NestedList isSuperUser={this.state.userIsSuperUser}
                                myHistory={this.props.history}/>
                    <div className="rightme">
                        <Profile pk={this.state.userPK} isSuperUser={this.state.userIsSuperUser}/>
                        <Container className='cardGrid' maxWidth="md">
                            <div className='AddUserButton'>
                                <Grid container justify='flex-end'>
                                    <Grid item>
                                        <MyButton color="primary" onClick={this.addNewUser}>
                                            <Add/>
                                            Add User
                                        </MyButton>
                                    </Grid>
                                </Grid>
                            </div>
                            <MyList>
                                {this.state.profiles.map(profile => (
                                    <ProfileListItem profile={profile} myHistory={this.props.history}/>
                                ))}
                            </MyList>
                        </Container>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}
