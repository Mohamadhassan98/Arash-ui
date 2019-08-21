import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";

export const MyButton = withStyles(theme => ({
    root: {
        color: 'white',
        marginBottom: '10%',
        marginTop: '5%',
        backgroundColor: '#8847dc',
        borderRadius: '25px',
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '70px',
        paddingRight: '70px',
        '&:hover': {
            backgroundColor: '#7847dc',
        }
    }
}))(Button);

export const ModalButton = withStyles(theme => ({
    root: {
        color: 'white',
        backgroundColor: '#52C4B9',
        borderRadius: '25px',
        '&:hover': {
            backgroundColor: '#31a897',
        }
    }
}))(Button);

export const MyTextField = withStyles({
    root: {
        '& .MuiFormLabel-root': {
            color: 'black'
        },
        '& label.Mui-focused': {
            color: '#31a897',
        },
        '& .MuiInput-underline:after': {
            borderColor: '#5ED0C0',
        },
        '& .MuiOutlinedInput-root': {
            color: 'black',
            '& fieldset': {
                borderColor: '#5ED0C0',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#31a897',
            }
        }
    }
})(TextField);

export const ModalTextField = withStyles({
    root: {
        '& .MuiFormLabel-root': {
            color: 'black'
        },
        '& label.Mui-focused': {
            color: '#31a897',
        },
        '& .MuiInput-underline:after': {
            borderColor: '#5ED0C0',
        },
        '& .MuiOutlinedInput-root': {
            color: 'black',
            '& fieldset': {
                borderColor: '#5ED0C0',
            },
            '&:hover fieldset': {
                borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#31a897',
            }
        }
    }
})(TextField);

export function LogOutIcon(props) {
    return (
        <p>Log-out icon: <span className="glyphicon glyphicon-log-out"></span></p>
    );
}
