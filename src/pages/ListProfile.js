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

export default class ListProfile extends React.Component {

    constructor(props) {
        super(props);
        if (!this.props.location || !this.props.location.state || !this.props.location.state.user) {
            this.props.history.push('');
        } else {
            this.user = this.props.location.state.user;
            this.csrftoken = this.props.location.state.csrftoken;
            this.sessionId = this.props.location.state.sessionId;
        }
        this.state = {
            deleteModalOpen: false,
            profiles: []
        };
    };

    componentDidMount() {
        const url = `http://127.0.0.1:8000/list/profile/`;
        axios.get(url).then(response => {
            console.log(response.data);
            this.setState({
                profiles: response.data
            });
            console.log()
        }).catch(error => {
            this.props.history.push('/503');
        });

    }

    addNewUser = () => {
        let path = `/sign-up`;
        this.props.history.push({
            pathname: path,
            state: {
                user: this.props.location.state.user
            }
        });

    };

    render() {
        return (
            <React.Fragment>
                <main className='HomePageMain2'>
                    <NestedList user={this.user}
                                myHistory={this.props.history}/>
                    <div className="rightme">
                        <Profile/>
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
                                    <ProfileListItem profile={profile} myHistory={this.props.history}
                                                     user={this.user}/>
                                ))}
                            </MyList>
                        </Container>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}
