import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Profile from "../components/ProfileNavBar";
import '../App.css';
import axios from 'axios';
import Typography from "@material-ui/core/Typography";
import {MyButton} from "../Styles";
import NestedList from "../components/leftnavbar";
import {Add} from "@material-ui/icons";
import List from "@material-ui/core/List";
import CompanyListItem from "../components/CompanyListItem";

export default class HomePage extends React.Component {
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
            companies: []
        };
    }

    componentDidMount() {
        if (!this.user) {
            this.props.history.push('');
        } else {
            const url = 'http://127.0.0.1:8000/companies';
            const config = {
                headers: {
                    'X-CSRFToken': this.csrftoken,
                    // Authorization: `Bearer ${this.sessionId}`,
                    // 'Cookie': 'sessionid=' + this.sessionId
                }
            };
            axios.get(url, config).then(response => {
                this.setState({
                    companies: response.data
                })
            }).catch(error => {
                this.props.history.push('/503');
            });
        }
    }

    addNewCompanyButton = (e) => {
        this.props.history.push({
            pathname: '/company/add',
            state: {
                user: this.user
            }
        })
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
                        <main className='HomePageMain'>
                            <Container className='cardGrid' maxWidth="lg">
                                <div className='heroButtons'>
                                    <Grid container justify='flex-end'>
                                        <Grid item>
                                            <MyButton color="primary" onClick={this.addNewCompanyButton}>
                                                <Add/>
                                                Add Company
                                            </MyButton>
                                        </Grid>
                                    </Grid>
                                </div>
                                {this.state.companies && this.state.companies.length !== 0 ? (
                                    <List className='List'>
                                        {this.state.companies.map(company => (
                                            <CompanyListItem company={company} myHistory={this.props.history}
                                                             user={this.user}/>
                                        ))}
                                    </List>
                                ) : (
                                    <Typography variant="h5" align="center" color="white" paragraph>
                                        No company to show!
                                    </Typography>
                                )}
                            </Container>
                        </main>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}
