import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../components/Title';
import '../styles/History.css'
import axios from 'axios';
import Profile from "../components/ProfileNavBar";
import Container from "@material-ui/core/Container";

class History extends Component {
    constructor(props) {
        super(props);
        if (!this.props.location || !this.props.location.state || !this.props.location.state.user) {
            this.props.history.push('');
        } else {
            this.user = this.props.location.state.user;
            this.pk = this.user.id;
        }
        this.state = {
            histories: []
        };
    }


    componentDidMount() {
        if (!this.user) {
            this.props.history.push('');
        } else {
            const url = `http://127.0.0.1:8000/user/${this.pk}/logs`;
            axios.get(url).then(response => {
                this.setState({
                    histories: response.data
                })
            }).catch(error => {
                this.props.history.push('/503');
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Profile user={this.user} myHistory={this.props.history} inHistory={true}/>
                <main className='HomePageMain2'>
                    <Container component="main" maxWidth="md" className="mycontainer">
                        <Title>Logs</Title>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">Operation</TableCell>
                                    <TableCell align="center">Operand</TableCell>
                                    <TableCell align="center">Details</TableCell>
                                    <TableCell align="center">Object</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.histories.map(history => (
                                    <TableRow key={history.id}>
                                        <TableCell align="center">{history.date}</TableCell>
                                        <TableCell align="center">{history.operation}</TableCell>
                                        <TableCell align="center">{history.operand}</TableCell>
                                        <TableCell align="center">{history.fields}</TableCell>
                                        <TableCell align="center">{history.operand_object}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Container>
                </main>
            </React.Fragment>
        );
    }
}

export default History;
