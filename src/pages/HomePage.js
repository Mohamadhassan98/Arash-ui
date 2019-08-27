import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Profile from "../components/ProfileNavBar";
import '../App.css';
import CompanyCardView from "../components/CompanyCardView";
import axios from 'axios';
import Typography from "@material-ui/core/Typography";
import {MyButton} from "../Styles";
import NestedList from "../components/test"

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
        // const MyButton = withStyles(theme => ({
        //     root: {
        //         color: theme.palette.getContrastText(purple[500]),
        //         backgroundColor: '#52C4B9',
        //         borderRadius:'25px',
        //         '&:hover': {
        //             backgroundColor: '#31a897',
        //         },
        //     },
        // }))(Button);
        return (
            <React.Fragment>
                {/*<CssBaseline/>*/}
                <Profile
                    user={this.user}
                    myHistory={this.props.history}/>
                <main className='HomePageMain2'>
                    <NestedList/>
                    <div className="rightme">
                        <Container maxWidth='md'>
                            <div className='heroButtons'>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <MyButton variant="contained" color="primary" onClick={this.addNewCompanyButton}>
                                            +Company
                                        </MyButton>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                        <Container className='cardGrid' maxWidth="md">
                            {this.state.companies && this.state.companies.length !== 0 ? (
                                <Grid container spacing={4}>
                                    {this.state.companies.map(company => (
                                        <Grid item key={company.id} xs={12} sm={6} md={4}>
                                            <CompanyCardView companyName={company.name}
                                                             pk={company.id}
                                                             email={company.email}
                                                             myHistory={this.props.history}
                                                             user={this.user}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Typography variant="h5" align="center" color="white" paragraph>
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
