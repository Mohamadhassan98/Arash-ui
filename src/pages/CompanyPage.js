import React from "react";
import Profile from "../components/ProfileNavBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ArashCardView from "../components/ArashCardView";
import axios from 'axios';
import {MyButton} from "../Styles";

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
                {/*<CssBaseline/>*/}
                <Profile user={this.user} myHistory={this.props.history}/>
                <main className='ArashPageMain'>
                    <Container maxWidth='md'>
                        <div className='heroButtons'>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <MyButton variant="contained" color="primary" onClick={this.addNewArash}>
                                        Add new Arash
                                    </MyButton>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                    <Container className='cardGrid' maxWidth="md">
                        <Grid container spacing={4}>
                            {this.state.arashes.map(arash => (
                                <Grid item key={arash.id} xs={12} sm={6} md={4}>
                                    <ArashCardView companyName={'Shaina'}
                                                   imageSource={'http://shainaco.com/wp-content/uploads/2016/12/Banner_Shaina_LogoNew.png'}
                                                   pk={this.pk}
                                                   apk={arash.id}
                                                   myHistory={this.props.history}
                                                   user={this.user}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>
            </React.Fragment>
        );
    }
}

export default CompanyPage;