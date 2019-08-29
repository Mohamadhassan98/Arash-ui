import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";


export default class DeleteConfirmAlert extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
        this.props.cancelHandle();
    };

    handleConfirm = () => {
        this.handleClose();
        this.props.confirmHandle();
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            open: nextProps.open
        });
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Confirm"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete this {this.props.model}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleConfirm} color="primary">
                        Yes
                    </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

DeleteConfirmAlert.propTypes = {
    model: PropTypes.string.isRequired,
    confirmHandle: PropTypes.func.isRequired,
    cancelHandle: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};