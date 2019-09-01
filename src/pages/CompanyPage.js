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

class CompanyPage extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.location || !this.props.location.state || !this.props.location.state.user) {
            this.props.history.push('');
        } else {
            this.user = this.props.location.state.user;
        }
        this.pk = props.match.params.pk;
        this.state = {
            arashes: []
        };
    }

    componentDidMount() {
        if (!this.user) {
            this.props.history.push('');
        } else {
            const url = `http://127.0.0.1:8000/company/${this.pk}/arashes`;
            axios.get(url).then(response => {
                this.setState({
                    arashes: response.data
                })
            }).catch(error => {
                this.props.history.push('/503');
            });
        }
    }

    addNewArash = (e) => {
        const url = `/company/${this.pk}/add-arash`;
        this.props.history.push({
            pathname: url,
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
                        <Profile/>
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
                                        <ArashListItem arash={arash} myHistory={this.props.history}
                                                       user={this.user}/>
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