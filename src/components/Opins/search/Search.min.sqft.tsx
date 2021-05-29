import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaChevronRight } from 'react-icons/fa';
import { setIfValueIsDifferent } from './Search.utils';

const SearchMinSqft: React.FC<any> = (props: any) => {

    const search: Function = props.search;

    const [ minSqft ] = useState('');
    const changeMinSqft = (event: any): void => setIfValueIsDifferent(minSqft, event, search);

    return <Form.Group as={ Col } className="w-25" style={{ margin: '0.2em' }}  controlId="minSqft">
        <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text id="minSqftPrepend">
                    <FaChevronRight></FaChevronRight>
                    <img alt='' src="/sqft.svg" style={{ maxWidth: '1.5em' }}></img>
                </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control aria-describedby="minSqftPrepend" placeholder="Min Sqft" defaultValue={ minSqft } onBlur={ changeMinSqft }/>
        </InputGroup>
    </Form.Group>;
};

export default SearchMinSqft;
