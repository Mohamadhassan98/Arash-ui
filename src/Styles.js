import {ListSubheader, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


export const MyButton = withStyles(theme => ({
    root: {
        color: 'white',
        backgroundColor: '#b71c1c',
        borderRadius: '25px',
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '20px',
        paddingRight: '20px',
        marginTop: '10px',
        '&:hover': {
            backgroundColor: '#dc3b1a'
        }
    }
}))(Button);

export function ConfirmButton(direction) {
    return withStyles(theme => ({
        root: {
            color: 'white',
            backgroundColor: '#b71c1c',
            borderRadius: direction === 'left' ? '25px 0 0 25px' : '0 25px 25px 0',
            paddingTop: '15px',
            paddingBottom: '15px',
            paddingLeft: '20px',
            paddingRight: '20px',
            marginTop: '10px',
            marginBottom: '30px',
            '&:hover': {
                backgroundColor: '#dc3b1a',
            }
        }
    }))(Button);
}

export const MyTextField = withStyles({
    root: {
        marginRight: '15px',
        '& .MuiFormLabel-root': {
            color: '#393939'
        },
        '& label.Mui-focused': {
            color: '#393939'
        },
        '& .MuiInput-underline:after': {
            borderColor: '#393939'
        },
        '& .MuiOutlinedInput-root': {
            color: 'black',
            '& fieldset': {
                borderColor: '#393939'
            },
            '&:hover fieldset': {
                borderColor: '#686868'
            },
            '&.Mui-focused fieldset': {
                borderColor: '#686868'
            }
        }
    }
})(TextField);

export function CustomIcon(color = '#b71c1c') {
    return withStyles(theme => ({
        root: {
            color: color
        }
    }));
}

export const MyListSubheader = withStyles(theme => ({
    root: {
        color: 'white'
    }
}))(ListSubheader);

export const MyList = withStyles(theme => ({
    root: {
        backgroundColor: '#f2f3f4',
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)'
    }
}))(List);

export const MyListItem = withStyles(theme => ({
    root: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    }
}))(ListItem);
