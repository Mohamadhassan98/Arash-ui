import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Profile from "../components/ProfileNavBar";
import '../styles/AddArash.css';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import axios from "axios";
import {compareDates, getDateString} from '../Globals';
import {CustomIcon, MyButton, MyTextField} from "../Styles";
import NestedList from "../components/leftnavbar";
import {Event} from "@material-ui/icons";


export default class AddArash extends React.Component {
    frontErrors = {
        publicKey: 'Public key cannot be empty',
        serialNumber: 'Serial number cannot be empty',
        license: 'License cannot be empty',
        version: 'Version cannot be empty',
        expireDate: 'Arash is already expired',
        purchaseDate: 'Arash is not purchased yet'
    };

    constructor(props) {
        super(props);
        if (!this.props.location || !this.props.location.state || !this.props.location.state.user) {
            this.props.history.push('');
        } else {
            this.user = this.props.location.state.user;
        }
        this.pk = props.match.params.pk;
        this.state = {
            publicKey: '',
            serialNumber: '',
            license: '',
            expireDate: getDateString('/'),
            version: '',
            purchaseDate: getDateString('/'),
            publicKeyHelper: ' ',
            serialNumberHelper: ' ',
            licenseHelper: ' ',
            expireDateHelper: ' ',
            versionHelper: ' ',
            purchaseDateHelper: ' '
        };
    }

    maxFieldChange = (e, max) => {
        if (e.target.value.length <= max) {
            this.fieldChange(e);
        }
    };

    validateData = () => {
        let invalidData = false;
        if (this.state.publicKey.trim() === '') {
            this.setState({
                publicKeyHelper: this.frontErrors.publicKey
            });
            invalidData = true;
        }
        if (this.state.serialNumber.trim() === '') {
            this.setState({
                serialNumberHelper: this.frontErrors.serialNumber
            });
            invalidData = true;
        }
        if (this.state.license.trim() === '') {
            this.setState({
                licenseHelper: this.frontErrors.license
            });
            invalidData = true;
        }
        if (this.state.version.trim() === '') {
            this.setState({
                versionHelper: this.frontErrors.version
            });
            invalidData = true;
        }
        if (compareDates(this.state.expireDate, getDateString('/')) === -1) {
            this.setState({
                expireDateHelper: this.frontErrors.expireDate
            });
            invalidData = true;
        }
        if (compareDates(this.state.purchaseDate, getDateString('/')) === 1) {
            this.setState({
                purchaseDateHelper: this.frontErrors.purchaseDate
            });
            invalidData = true;
        }
        return !invalidData;
    };

    submitHandle = (e) => {
        e.preventDefault();
        if (this.validateData()) {
            const url = 'http://127.0.0.1:8000/add/arash/';
            const data = {
                public_key: this.state.publicKey,
                serial_number: this.state.serialNumber,
                license: this.state.license,
                expire_date: this.state.expireDate.toString().replace(/\//g, '-'),
                version: this.state.version,
                purchase_date: this.state.purchaseDate.toString().replace(/\//g, '-'),
                company: this.pk
            };
            const redirectPath = '/company/' + this.pk;
            axios.post(url, data).then(response =>
                this.props.history.push({
                    pathname: redirectPath,
                    state: {
                        user: this.user
                    }
                })).catch(e => {
                switch (e.response.status) {
                    case 400:
                        this.handleErrors(e.response.data);
                        break;
                    default:
                        this.props.history.push('/503');
                }
            });
        }
    };

    handleErrors = (errors) => {
        for (let [key, value] of Object.entries(errors)) {
            switch (key) {
                case 'public_key':
                    this.setState({
                        publicKeyHelper: value
                    });
                    break;
                case 'serial_number':
                    this.setState({
                        serialNumberHelper: value
                    });
                    break;
                case 'license':
                    this.setState({
                        licenseHelper: value
                    });
                    break;
                case 'expire_date':
                    this.setState({
                        expireDateHelper: value
                    });
                    break;
                case 'version':
                    this.setState({
                        versionHelper: value
                    });
                    break;
                case 'purchase_date':
                    this.setState({
                        purchaseDateHelper: value
                    });
                    break;
            }
        }
    };

    fieldChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    errorOff = () => {
        this.setState({
            publicKeyHelper: ' ',
            serialNumberHelper: ' ',
            licenseHelper: ' ',
            expireDateHelper: ' ',
            versionHelper: ' ',
            purchaseDateHelper: ' ',
        });
    };

    expireDateChange = (e, value) => {
        this.setState({
            expireDate: value
        })
    };

    purchaseDateChange = (e, value) => {
        this.setState({
            purchaseDate: value
        })
    };

    componentDidMount() {
        if (!this.user) {
            this.props.history.push('');
        }
    }

    render() {
        const DateIcon = CustomIcon('#000000')(Event);
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <React.Fragment>
                    <main className='HomePageMain2'>
                        <NestedList user={this.user} myHistory={this.props.history}/>
                        <div className='rightme'>
                            <Profile/>
                            <Container component="main" maxWidth="xs">
                                <div className='paper'>
                                    <Typography component="h1" variant="h5">
                                        Add Arash
                                    </Typography>
                                    <form className='form' noValidate>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <MyTextField
                                                    name="publicKey"
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="publicKey"
                                                    label="Public Key"
                                                    autoFocus
                                                    onChange={this.fieldChange}
                                                    value={this.state.publicKey}
                                                    error={this.state.publicKeyHelper !== ' '}
                                                    helperText={this.state.publicKeyHelper}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MyTextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="serialNumber"
                                                    label="Serial Number"
                                                    name="serialNumber"
                                                    value={this.state.serialNumber}
                                                    onChange={(e) => this.maxFieldChange(e, 16)}
                                                    error={this.state.serialNumberHelper !== ' '}
                                                    helperText={this.state.serialNumberHelper}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MyTextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="license"
                                                    label="License"
                                                    name="license"
                                                    value={this.state.license}
                                                    onChange={this.fieldChange}
                                                    error={this.state.licenseHelper !== ' '}
                                                    helperText={this.state.licenseHelper}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    showTodayButton
                                                    keyboardIcon=<DateIcon/>
                                                fullWidth
                                                variant="outlined"
                                                format="yyyy/MM/dd"
                                                margin="normal"
                                                id="expireDate"
                                                label="Expire Date"
                                                defaultValue={getDateString('/')}
                                                value={this.state.expireDate}
                                                KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                                onChange={this.expireDateChange}
                                                error={this.state.expireDateHelper !== ' '}
                                                name='expireDate'
                                                helperText={this.state.expireDateHelper}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MyTextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="version"
                                                    label="Version"
                                                    name="version"
                                                    value={this.state.version}
                                                    onChange={(e) => this.maxFieldChange(e, 10)}
                                                    error={this.state.versionHelper !== ' '}
                                                    helperText={this.state.versionHelper}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <KeyboardDatePicker
                                                    keyboardIcon=<DateIcon/>
                                                showTodayButton
                                                disableToolbar
                                                fullWidth
                                                variant="outlined"
                                                format="yyyy/MM/dd"
                                                margin="normal"
                                                id="purchaseDate"
                                                label="Purchase Date"
                                                defaultValue={getDateString('/')}
                                                value={this.state.purchaseDate}
                                                KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                                onChange={this.purchaseDateChange}
                                                name='purchaseDate'
                                                error={this.state.purchaseDateHelper !== ' '}
                                                helperText={this.state.purchaseDateHelper}
                                                />
                                            </Grid>
                                        </Grid>
                                        <MyButton
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className='submit'
                                            onClick={this.submitHandle}
                                            onBlur={this.errorOff}
                                        >
                                            Save
                                        </MyButton>
                                    </form>
                                </div>
                            </Container>
                        </div>
                    </main>
                </React.Fragment>
            </MuiPickersUtilsProvider>
        );
    }
}