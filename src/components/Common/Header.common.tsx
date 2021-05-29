import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CommonHeader: React.FC<any> = (props: any) => {

    const headerClick: Function = (type: string): void => {

    };  

    return (
        <Container className="App-header" style={{ color: 'white', marginLeft: '10px', marginRight: '10px', paddingBottom: '2em', paddingTop: '2em', minHeight: '6em' }}>
            <Row>
                <Col className="col">
                    <Link style={{ textDecoration: 'none' }} to={{ pathname: '/' }}>
                        <img alt='' src="/react.png" style={{ maxWidth: '6em' }} className="zb-5 rounded shadow" ></img>
                    </Link>
                </Col>
                <Col className="text-right" style={{ paddingTop: '1em' }}>
                    <span onClick={ () => headerClick('advertisers') } style={{ paddingRight: '1em' }}>Advertisers</span>
                    <span onClick={ () => headerClick('agents') } style={{ paddingRight: '1em' }}>Agents</span>
                    <span onClick={ () => headerClick('help') } style={{ paddingRight: '1em' }}>Help</span>
                </Col>
            </Row>
        </Container>
    );
};

export default CommonHeader;
