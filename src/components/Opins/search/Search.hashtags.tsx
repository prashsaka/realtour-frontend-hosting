import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { isMobile } from '../../../utils/DisplayUtils';
import { FaHashtag } from 'react-icons/fa';
import { setIfValuesAreDifferent } from './Search.utils';

const SearchHashtags: React.FC<any> = (props: any) => {

    const loading: boolean = props.loading;
    const search: Function = props.search;

    const initialHashtags: string[] = [];
    const [ hashtags, setHashtags ] = useState(initialHashtags);

    const updateSearch = (e: any, index: number): void => setIfValuesAreDifferent(hashtags, e, index, (vals: any[]) => { setHashtags(vals); search(vals); });

    const getHashtags = (): JSX.Element[] => {
        const fields: JSX.Element[] = [
            <Form.Group as={ Col } key="hashtag-0" className="w-25" style={{ margin: '0.2em' }} controlId="hashtag-0">
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="hashtag-0-prepend">
                            <span style={{ fontWeight: 800 }}><FaHashtag></FaHashtag></span>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control disabled={ loading } aria-describedby="hashtag-0-prepend" placeholder="Hashtag" defaultValue={ hashtags[0] } onBlur={ (e: any) => updateSearch(e, 0) }/>
                </InputGroup>
            </Form.Group>,
            <Form.Group as={ Col } key="hashtag-1" className="w-25" style={{ margin: '0.2em' }} controlId="hashtag-1">
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="hashtag-1-prepend">
                            <span style={{ fontWeight: 800 }}><FaHashtag></FaHashtag></span>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control disabled={ loading } aria-describedby="hashtag-1-prepend" placeholder="Hashtag" defaultValue={ hashtags[1] } onBlur={ (e: any) => updateSearch(e, 1) }/>
                </InputGroup>
            </Form.Group>,
            <Form.Group as={ Col } key="hashtag-2" className="w-25" style={{ margin: '0.2em' }} controlId="hashtag-2">
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="hashtag-2-prepend">
                            <span style={{ fontWeight: 800 }}><FaHashtag></FaHashtag></span>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control disabled={ loading } aria-describedby="hashtag-2-prepend" placeholder="Hashtag" defaultValue={ hashtags[2] } onBlur={ (e: any) => updateSearch(e, 2) }/>
                </InputGroup>
            </Form.Group>
        ];
        if (isMobile()) {
            return fields.map((f: JSX.Element, index: number) => <Form.Row className="fade-in" key={`f-${index}`}>{ f }</Form.Row> );
        } else {
            return [<Form.Row key="f-0" className="fade-in" >{ fields }</Form.Row>];
        }
    }
    return <>{ getHashtags() }</>;
};

export default SearchHashtags;
