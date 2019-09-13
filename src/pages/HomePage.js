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
import '../styles/HomePage.css';
import {serverURLs, URLs} from "../Constants";
import {setAxiosDefaults} from "../Globals";
import {Redirect} from "react-router-dom";


export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: undefined,
            userPK: 0,
            userIsSuperUser: false,
            companies: []
        };
        setAxiosDefaults();
    }

    componentDidMount() {
        axios.get(serverURLs.user).then(response => {
            this.setState({
                userPK: response.data.id,
                userIsSuperUser: response.data.is_superuser
            });
            axios.get(serverURLs.companies).then(response => {
                this.setState({
                    companies: response.data
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

    addNewCompanyButton = () => {
        this.props.history.push(URLs.addCompany);
    };

    render() {
        return (
            <React.Fragment>
                {this.redirect()}
                <main className='HomePageMain2'>
                    <NestedList myHistory={this.props.history}
                                inCompanies
                                isSuperUser={this.state.userIsSuperUser}/>
                    <div className="rightme">
                        <Profile pk={this.state.userPK} isSuperUser={this.state.userIsSuperUser}/>
                        <Container className='cardGrid' maxWidth="md">
                            <div className='AddCompanyButton'>
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
                                        <CompanyListItem company={company} myHistory={this.props.history}/>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="h5" align="center" paragraph>
                                    No company to show!
                                </Typography>
                            )}
                        </Container>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}
