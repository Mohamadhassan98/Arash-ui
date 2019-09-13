import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Profile from "../components/ProfileNavBar";
import '../styles/AddArash.css';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import axios from "axios";
import {getDateString, setAxiosDefaults} from '../Globals';
import {ConfirmButton, CustomIcon, MyTextField} from "../Styles";
import NestedList from "../components/leftnavbar";
import {Event} from "@material-ui/icons";
import {serverURLs, URLs} from "../Constants";
import {Redirect} from "react-router-dom";


export default class EditArash extends React.Component {
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
        this.pk = props.match.params.pk;
        this.apk = props.match.params.apk;
        this.state = {
            redirect: undefined,
            userPK: 0,
            userIsSuperUser: false,
            publicKey: '',
            serialNumber: '',
            license: '',
            expireDate: new Date(),
            version: '',
            purchaseDate: new Date(),
            publicKeyHelper: ' ',
            serialNumberHelper: ' ',
            licenseHelper: ' ',
            expireDateHelper: ' ',
            versionHelper: ' ',
            purchaseDateHelper: ' '
        };
        setAxiosDefaults();
    }

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
        if (this.state.expireDate < new Date()) {
            this.setState({
                expireDateHelper: this.frontErrors.expireDate
            });
            invalidData = true;
        }
        if (this.state.purchaseDate > new Date()) {
            this.setState({
                purchaseDateHelper: this.frontErrors.purchaseDate
            });
            invalidData = true;
        }
        return !invalidData;
    };

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

    componentDidMount() {
        axios.get(serverURLs.user).then(response => {
            this.setState({
                userPK: response.data.id,
                userIsSuperUser: response.data.is_superuser
            });
            const url = `${serverURLs.arash}${this.apk}/`;
            axios.get(url).then(response => {
                const {public_key: publicKey, serial_number: serialNumber, license, expire_date: expireDate, version, purchase_date: purchaseDate} = response.data;
                this.setState({
                    publicKey: publicKey,
                    serialNumber: serialNumber,
                    license: license,
                    expireDate: new Date(expireDate),
                    version: version,
                    purchaseDate: new Date(purchaseDate)
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

    submitHandle = (e) => {
        e.preventDefault();
        if (this.validateData()) {
            const url = `${serverURLs.arash}${this.apk}/`;
            const data = {
                public_key: this.state.publicKey,
                serial_number: this.state.serialNumber,
                license: this.state.license,
                expire_date: getDateString('-', this.state.expireDate),
                version: this.state.version,
                purchase_date: getDateString('-', this.state.purchaseDate),
                company: this.pk
            };
            const redirectPath = `/company/${this.pk}`;
            axios.put(url, data).then(response => {
                this.doRedirect(redirectPath);
            }).catch(e => {
                if (e.response.status === 422) {
                    this.handleErrors(e.response.data);
                } else {
                    this.doRedirect(URLs["503"]);
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
                default:
                    console.error(key, value);
                    this.doRedirect(URLs["503"]);
                    break;
            }
        }
    };

    fieldChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    errorOff = () => {
        this.setState({
            publicKeyHelper: ' ',
            serialNumberHelper: ' ',
            licenseHelper: ' ',
            expireDateHelper: ' ',
            versionHelper: ' ',
            purchaseDateHelper: ' '
        });
    };

    expireDateChange = (e, value) => {
        this.setState({
            expireDate: new Date(value)
        });
    };

    purchaseDateChange = (e, value) => {
        this.setState({
            purchaseDate: new Date(value)
        });
    };

    cancelHandle = (e) => {
        const url = `/company/${this.pk}`;
        this.props.history.push({
            pathname: url,
            state: {
                user: this.user
            }
        });
    };

    render() {
        const DateIcon = CustomIcon('#000000')(Event);
        const SaveButton = ConfirmButton('left');
        const CancelButton = ConfirmButton('right');
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <React.Fragment>
                    {this.redirect()}
                    <main className='HomePageMain2'>
                        <NestedList myHistory={this.props.history} isSuperUser={this.state.userIsSuperUser}/>
                        <div className='rightme'>
                            <Profile pk={this.state.userPK} isSuperUser={this.state.userIsSuperUser}/>
                            <Container component="main" maxWidth="xs">
                                <div className='paper'>
                                    <form className='form' noValidate>
                                        <Typography className="title" component="h1" variant="subtitle1" align='center'
                                                    gutterBottom
                                                    paragraph>
                                            Edit Arash
                                        </Typography>
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
                                                    value={this.state.publicKey}
                                                    onChange={this.fieldChange}
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
                                                    onChange={this.fieldChange}
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
                                                    keyboardIcon={<DateIcon/>}
                                                    fullWidth
                                                    variant="outlined"
                                                    format="yyyy/MM/dd"
                                                    margin="normal"
                                                    id="expireDate"
                                                    label="Expire Date"
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
                                                    onChange={this.fieldChange}
                                                    error={this.state.versionHelper !== ' '}
                                                    helperText={this.state.versionHelper}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    showTodayButton
                                                    keyboardIcon={<DateIcon/>}
                                                    fullWidth
                                                    variant="outlined"
                                                    format="yyyy/MM/dd"
                                                    margin="normal"
                                                    id="purchaseDate"
                                                    label="Purchase Date"
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
                                        <Grid container>
                                            <Grid item sm>
                                                <SaveButton
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    className='submit'
                                                    onClick={this.submitHandle}
                                                    onBlur={this.errorOff}
                                                >
                                                    Save
                                                </SaveButton>
                                            </Grid>
                                            <Grid item sm>
                                                <CancelButton
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    className='submit'
                                                    onClick={this.cancelHandle}
                                                    onBlur={this.errorOff}
                                                >
                                                    Cancel
                                                </CancelButton>
                                            </Grid>
                                        </Grid>
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
