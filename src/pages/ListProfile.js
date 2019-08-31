import React from 'react';
import axios from "axios";
import {MyButton, MyList} from '../Styles'
import NestedList from "../components/leftnavbar";
import Profile from "../components/ProfileNavBar";
import Container from "@material-ui/core/Container";
import ProfileListItem from "../pages/ProfileListItem"
import Grid from "@material-ui/core/Grid";
import {Add} from "@material-ui/icons";

export default class ListProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            deleteModalOpen: false,
            profiles: []
        };
    }

    componentDidMount() {
        const url = `http://127.0.0.1:8000/list/profile/`;
        axios.get(url).then(response => {
            console.log(response.data);
            this.setState({
                profiles: response.data
            });
            console.log()
        }).catch(error => {
            // this.props.myHistory.push('/503');
        });

    }

    addNewUser = () => {
        const url = `/sign-up`;
        axios.get(url);
    };

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
                        <Container className='cardGrid' maxWidth="md">
                            <div className='AddCompanyButton'>
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
