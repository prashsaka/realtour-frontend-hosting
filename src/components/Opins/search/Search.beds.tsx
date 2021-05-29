import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaBed } from 'react-icons/fa';
import { setIfValueIsDifferent } from './Search.utils';

const SearchBeds: React.FC<any> = (props: any) => {

    const search: Function = props.search;

    const [ beds ] = useState('');
    const changeBeds = (event: any): void => setIfValueIsDifferent(beds, event, search);

    return <Form.Group as={ Col } className="w-25" style={{ margin: '0.2em' }}  controlId="beds">
        <InputGroup>
            <InputGroup.Prepend><InputGroup.Text id="bedsPrepend"><FaBed></FaBed></InputGroup.Text></InputGroup.Prepend>
            <Form.Control aria-describedby="bedsPrepend" placeholder="Min Beds" defaultValue={ beds } onBlur={ changeBeds }/>
        </InputGroup>
    </Form.Group>;
};

export default SearchBeds;
