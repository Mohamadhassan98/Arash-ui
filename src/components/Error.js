import React from 'react';
import {Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from 'reactstrap';
import '../styles/Error.css';
import PropTypes from 'prop-types';


export default function Error(props) {
    return (
        <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="6">
                        <div className="clearfix">
                            <h1 className="float-left display-3 mr-4">{props.errorCode}</h1>
                            <h4 className="pt-3">{props.mainError}</h4>
                            <p className="text-muted float-left">{props.details}</p>
                        </div>
                        <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-search"></i>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input size="16" type="text" placeholder="What are you looking for?"/>
                            <InputGroupAddon addonType="append">
                                <Button className='button historyButton'>
                                    Search
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

Error.propTypes = {
    errorCode: PropTypes.number.isRequired,
    mainError: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired
};