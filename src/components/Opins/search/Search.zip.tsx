import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { setIfValueIsDifferent } from './Search.utils';

const SearchZip: React.FC<any> = (props: any) => {

    const search: Function = props.search;

    const [ zip ] = useState('');
    const changeZip = (event: any): void => setIfValueIsDifferent(zip, event, search);

    return <Form.Group as={ Col } className="w-25" style={{ margin: '0.2em' }}  controlId="zip">
        <InputGroup>
            <InputGroup.Prepend><InputGroup.Text id="zipPrepend"><span style={{ fontWeight: 800 }}>Z</span></InputGroup.Text></InputGroup.Prepend>
            <Form.Control aria-describedby="zipPrepend" placeholder="Zip" defaultValue={ zip } onBlur={ changeZip }/>
        </InputGroup>
    </Form.Group>;
};

export default SearchZip;
