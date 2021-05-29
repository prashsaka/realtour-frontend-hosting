import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaChevronLeft } from 'react-icons/fa';
import { setIfValueIsDifferent } from './Search.utils';

const SearchMaxSqft: React.FC<any> = (props: any) => {

    const search: Function = props.search;

    const [ maxSqft ] = useState('');
    const changeMaxSqft = (event: any): void => setIfValueIsDifferent(maxSqft, event, search);

    return <Form.Group as={ Col } className="w-25" style={{ margin: '0.2em' }}  controlId="maxSqft">
        <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text id="maxSqftPrepend">
                    <FaChevronLeft></FaChevronLeft>
                    <img alt='' src="/sqft.svg" style={{ maxWidth: '1.5em' }}></img>
                </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control aria-describedby="maxSqftPrepend" placeholder="Max Sqft" defaultValue={ maxSqft } onBlur={ changeMaxSqft }/>
        </InputGroup>
    </Form.Group>;
};

export default SearchMaxSqft;
