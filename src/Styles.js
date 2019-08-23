import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CheckBox from "@material-ui/core/Checkbox"
import React from "react";
import {green} from '@material-ui/core/colors'

export const MyButton = withStyles(theme => ({
    root: {
        color: 'white',
        marginBottom: '10%',
        marginTop: '20%',
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
        backgroundColor: '#8847dc',
        borderRadius: '25px',
        left: '25px',

        '&:hover': {
            backgroundColor: '#7847dc',
        }
    }
}))(Button);

export const MyTextField = withStyles({
    root: {
        '& .MuiFormLabel-root': {
            color: '#7847dc'
        },
        '& label.Mui-focused': {
            color: '#7847dc',
        },
        '& .MuiInput-underline:after': {
            borderColor: '#8847dc',
        },
        '& .MuiOutlinedInput-root': {
            color: 'black',
            '& fieldset': {
                borderColor: '#8847dc',
            },
            '&:hover fieldset': {
                borderColor: '#7847dc',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#7847dc',
            }
        }
    }
})(TextField);

export const ModalTextField = withStyles({
    root: {
        '& .MuiFormLabel-root': {
            color: '#7847dc'
        },
        '& label.Mui-focused': {
            color: '#7847dc',
        },
        '& .MuiInput-underline:after': {
            borderColor: '#8847dc',
        },
        '& .MuiOutlinedInput-root': {
            color: 'black',
            '& fieldset': {
                borderColor: '#8847dc',
            },
            '&:hover fieldset': {
                borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#7847dc',
            }
        }
    }
})(TextField);

export function LogOutIcon(props) {
    return (
        <p>Log-out icon: <span className="glyphicon glyphicon-log-out"></span></p>
    );
}

//DOES NOT WORK
export const MyCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
})(CheckBox);
