import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { setIfValuesAreDifferent } from './Search.utils';

enum PropertyType {
    singlefamily = 'singlefamily',
    multifamily = 'multifamily',
    condo = 'condo'
};

const SearchTypes: React.FC<any> = (props: any) => {

    const loading: boolean = props.loading;
    const search: Function = props.search;

    const initialTypes: PropertyType[] = [];
    const [ types, setTypes ] = useState(initialTypes);

    const updateSearch = (e: any): void => setIfValuesAreDifferent(types, e, (vals: any[]) => { setTypes(vals); search(vals); });

    const getButton: Function = (button: PropertyType): JSX.Element => {
        return <Col className={ types.indexOf(button) >= 0 ? 'btn btn-selected' : 'btn btn-not-selected' } onClick={ () => updateSearch(button) }>
            <input type="checkbox"></input>
            <small>{ loading ? <Spinner as="span" animation="border" size="sm" role="status" /> : '' } { button }</small>
        </Col>;
    };

    return <Form.Row className="search-types text-center" data-toggle="buttons">
        { getButton(PropertyType.singlefamily) }
        { getButton(PropertyType.multifamily) }
        { getButton(PropertyType.condo) }
    </Form.Row>;
};

export default SearchTypes;
