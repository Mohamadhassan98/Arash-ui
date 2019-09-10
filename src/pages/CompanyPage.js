import React from "react";
import Profile from "../components/ProfileNavBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import {MyButton} from "../Styles";
import NestedList from "../components/leftnavbar";
import {Add} from "@material-ui/icons";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ArashListItem from "../components/ArashListItem";
import {setAxiosDefaults} from "../Globals";
import {serverURLs, URLs} from "../Constants";
import {Redirect} from "react-router-dom";

class CompanyPage extends React.Component {
    constructor(props) {
        super(props);
        this.pk = props.match.params.pk;
        this.state = {
            redirect: undefined,
            userPK: 0,
            userIsSuperUser: false,
            arashes: []
        };
        setAxiosDefaults();
    }

    componentDidMount() {
        axios.get(serverURLs.user).then(response => {
            this.setState({
                userPK: response.data.id,
                userIsSuperUser: response.data.is_superuser
            });
            const url = `${serverURLs.company}${this.pk}/arashes/`;
            axios.get(url).then(response => {
                this.setState({
                    arashes: response.data
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

    addNewArash = () => {
        const url = `/company/${this.pk}/add-arash`;
        this.props.history.push(url);
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
                            <div className='AddCompanyButton'>
                                <Grid container justify='flex-end'>
                                    <Grid item>
                                        <MyButton color="primary" onClick={this.addNewArash}>
                                            <Add/>
                                            Add Arash
                                        </MyButton>
                                    </Grid>
                                </Grid>
                            </div>
                            {this.state.arashes && this.state.arashes.length !== 0 ? (
                                <List className='List'>
                                    {this.state.arashes.map(arash => (
                                        <ArashListItem arash={arash} myHistory={this.props.history}/>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="h5" align="center" color="white" paragraph>
                                    No arash to show!
                                </Typography>
                            )}
                        </Container>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default CompanyPage;