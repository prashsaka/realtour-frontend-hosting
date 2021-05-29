import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaBath } from 'react-icons/fa';
import { setIfValueIsDifferent } from './Search.utils';

const SearchBaths: React.FC<any> = (props: any) => {

    const search: Function = props.search;

    const [ baths ] = useState('');
    const changeBaths = (event: any): void => setIfValueIsDifferent(baths, event, search);

    return <Form.Group as={ Col } className="w-25" style={{ margin: '0.2em' }}  controlId="baths">
        <InputGroup>
            <InputGroup.Prepend><InputGroup.Text id="bathsPrepend"><FaBath></FaBath></InputGroup.Text></InputGroup.Prepend>
            <Form.Control aria-describedby="bathsPrepend" placeholder="Min Baths" defaultValue={ baths } onBlur={ changeBaths }/>
        </InputGroup>
    </Form.Group>;
};

export default SearchBaths;
