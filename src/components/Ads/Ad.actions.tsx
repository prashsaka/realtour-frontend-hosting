import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { FiHeart, FiMail, FiPlusSquare, FiSmartphone } from "react-icons/fi";
import Row from 'react-bootstrap/Row';

import ContactForm from '../Forms/Contact.form';
import EditForm from '../Forms/Edit.form';
import { calendarAction, heartAction, mailAction, textAction, updateListing } from '../../services/Opin.service';
import { IOpin } from '../../services/Opin.service';

import './ads.css';

const agentActions: any = {
    'update': updateListing
};
const buyerActions: any = {
    'calendar': calendarAction,
    'heart': heartAction,
    'mail': mailAction,
    'text': textAction
};

const OpinActions: React.FC<any> = (props: any) => {

    const [ action, setAction ] = useState('');
    // const [ title, setTitle ] = useState('');
    // const pin: IOpin = props.pin;
    // const setPin = props.setPin;

    // const update = (e: any): void => {
    //     e.preventDefault();
    //     setAction('update');
    //     setTitle('');
    // }
    // const calendar = (e: any): void => {
    //     e.preventDefault();
    //     setAction('calendar');
    //     setTitle('Book a virtual tour.');
    // };
    // const heart = (e: any): void => {
    //     e.preventDefault();
    //     setAction('heart');
    //     setTitle('Favorite this listing!');
    // };
    // const mail = (e: any): void => {
    //     e.preventDefault();
    //     setAction('mail');
    //     setTitle('Email listing agent.');
    // };
    // const text = (e: any): void => {
    //     e.preventDefault();
    //     setAction('text');
    //     setTitle('Text listing agent.');
    // };

    return (
        // <Card.Footer style={{ padding: '0.25em' }}>
        //     <Row>
        //         <Col className="col-8"><Row>
        //         {/* <span onClick={ calendar}><FiCalendar color="#4285f4"></FiCalendar></span>                 */}
        //         <span onClick={ heart }><FiHeart color="#ea4334"></FiHeart></span>
        //         <span onClick={ mail }><FiMail color="#34a852"></FiMail></span>
        //         <span onClick={ text }><FiSmartphone color="#580dd0"></FiSmartphone></span></Row></Col>

        //         <Col className="col-4 text-right" ><span onClick={ update } style={{ display: 'initial', marginRight: '0.5em' }} ><FiPlusSquare color="#ff6a00"></FiPlusSquare></span></Col>
        //     </Row>

        //     { buyerActions[action]
        //         ? <ContactForm pin={{ ...pin }} buyerAction={ buyerActions[action] } title={ title } setAction={ setAction } ></ContactForm>
        //         : agentActions[action] 
        //             ? <EditForm agentAction={ updateListing } pin={ pin } setPin={ setPin } title={ title } setAction={ setAction }></EditForm>
        //             : ''
        //     }
        // </Card.Footer>
    <></>);
}

export default OpinActions;