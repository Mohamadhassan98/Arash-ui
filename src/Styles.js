import {ListSubheader, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CheckBox from "@material-ui/core/Checkbox";
import React from "react";
import {green} from '@material-ui/core/colors';


export const MyButton = withStyles(theme => ({
    root: {
        color: 'white',
        // position:'absolute',
        backgroundColor: '#b71c1c',
        borderRadius: '25px',
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '20px',
        paddingRight: '20px',
        marginTop: '10px',
        '&:hover': {
            backgroundColor: '#dc3b1a',
        }
    }
}))(Button);

export const ModalButton = withStyles(theme => ({
    root: {
        color: 'white',
        backgroundColor: '#8847dc',
        borderRadius: '25px',
        left: '25px',
        right: '10px',

        '&:hover': {
            backgroundColor: '#7847dc',
        }
    }
}))(Button);

export const MyTextField = withStyles({
    root: {
        '& .MuiFormLabel-root': {
            color: '#393939'
        },
        '& label.Mui-focused': {
            color: '#393939',
        },
        '& .MuiInput-underline:after': {
            borderColor: '#393939',
        },
        '& .MuiOutlinedInput-root': {
            color: 'black',
            '& fieldset': {
                borderColor: '#393939',
            },
            '&:hover fieldset': {
                borderColor: '#686868',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#686868',
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

//DOES NOT WORK
export const MyCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
})(CheckBox);

export const CustomIcon = withStyles(theme => ({
    root: {
        color: '#b71c1c'
    }
}));

export const MyListSubheader = withStyles(theme => ({
    root: {
        color: 'white'
    }
}))(ListSubheader);