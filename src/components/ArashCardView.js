import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import React from "react";
import PropTypes from "prop-types";
import DeleteConfirmAlert from "./DeleteConfirmAlert";
import {Button} from "@material-ui/core";
import '../styles/ArashCardView.css';
import axios from "axios";

function ArashCardView(props) {
    const handleDelete = () => {
        const url = `http://127.0.0.1:8000/arash/${props.apk}`;
        axios.delete(url).then(response => {
            window.location.reload();
        }).catch(error => {
            props.myHistory.push('/503');
        });
    };

    const onEditClick = () => {
        props.myHistory.push({
            pathname: `/company/${props.pk}/edit-arash/${props.apk}`,
            state: {
                user: props.user
            }
        });
    };

    return (
        <Card className='ArashCard'>
            <CardMedia
                className='CardMedia'
                image={props.imageSource}
                title={props.imageTitle}
            />
            <CardContent className={props.disabled ? 'disabled' : ''}>
                <Typography>
                    {/*TODO("Choose what to show")*/}
                    This is a media card. You can use this section to describe the content.
                </Typography>
            </CardContent>
            <CardActions className={props.disabled ? 'disabled' : ''}>
                <DeleteConfirmAlert model='Arash' confirmHandle={handleDelete}/>
                <Button onClick={onEditClick}>
                    Edit
                </Button>
            </CardActions>
        </Card>
    )
}

ArashCardView.propTypes = {
    imageSource: PropTypes.string.isRequired,
    imageTitle: PropTypes.string,
    pk: PropTypes.number.isRequired,
    apk: PropTypes.number.isRequired,
    myHistory: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    user: PropTypes.object.isRequired
};

ArashCardView.defaultProps = {
    imageTitle: "",
    disabled: false
};

export default ArashCardView;