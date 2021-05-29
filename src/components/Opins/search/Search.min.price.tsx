import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaChevronRight, FaDollarSign } from 'react-icons/fa';
import { setIfValueIsDifferent } from './Search.utils';

const SearchMinPrice: React.FC<any> = (props: any) => {

    const search: Function = props.search;

    const [ minPrice ] = useState('');
    const changeMinPrice = (event: any): void => setIfValueIsDifferent(minPrice, event, search);

    return <Form.Group as={ Col } className="w-25" style={{ margin: '0.2em' }}  controlId="minPrice">
        <InputGroup>
            <InputGroup.Prepend><InputGroup.Text id="minPricePrepend"><FaChevronRight></FaChevronRight><FaDollarSign></FaDollarSign></InputGroup.Text></InputGroup.Prepend>
            <Form.Control aria-describedby="minPricePrepend" placeholder="Min Price" defaultValue={ minPrice } onBlur={ changeMinPrice }/>
        </InputGroup>
    </Form.Group>;
};

export default SearchMinPrice;
