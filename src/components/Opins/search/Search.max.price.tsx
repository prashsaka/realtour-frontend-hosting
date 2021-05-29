import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaChevronLeft, FaDollarSign } from 'react-icons/fa';
import { setIfValueIsDifferent } from './Search.utils';

const SearchMaxPrice: React.FC<any> = (props: any) => {

    const search: Function = props.search;

    const [ maxPrice ] = useState('');
    const changeMaxPrice = (event: any): void => setIfValueIsDifferent(maxPrice, event, search);

    return <Form.Group as={ Col } className="w-25" style={{ margin: '0.2em' }}  controlId="maxPrice">
        <InputGroup>
            <InputGroup.Prepend><InputGroup.Text id="maxPricePrepend"><FaChevronLeft></FaChevronLeft><FaDollarSign></FaDollarSign></InputGroup.Text></InputGroup.Prepend>
            <Form.Control aria-describedby="maxPricePrepend" placeholder="Max Price" defaultValue={ maxPrice } onBlur={ changeMaxPrice }/>
        </InputGroup>
    </Form.Group>;
};

export default SearchMaxPrice;
