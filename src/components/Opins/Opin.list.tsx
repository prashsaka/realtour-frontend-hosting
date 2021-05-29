import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import CommonHeader from '../Common/Header.common';
import { getListings, IOpin } from '../../services/Opin.service';
import { IOpinSearch } from '../../services/Opin.service';
import OpinCard from './Opin.mini';
import SearchTypes from './search/Search.types';
import SearchZip from './search/Search.zip';
import SearchBeds from './search/Search.beds';
import SearchBaths from './search/Search.baths';
import SearchMinPrice from './search/Search.min.price';
import SearchMaxPrice from './search/Search.max.price';
import SearchMinSqft from './search/Search.min.sqft';
import SearchMaxSqft from './search/Search.max.sqft';
import SearchHashtags from './search/Search.hashtags';

const PINS_PAGE_SIZE: number = 30;
// const RT_CACHE_SEARCH_KEY_PREFIX: string = 'RT_CACHE_SEARCH_KEY_';
// const RT_CACHE_SEARCH_TIME: string = 'RT_CACHE_SEARCH_TIME';
// const RT_LAST_SEARCH_PROPS: string = 'RT_LAST_SEARCH_PROPS';
// const RT_LAST_SEARCH_RESULTS: string = 'RT_LAST_SEARCH_RESULTS';


const Opins: React.FC<any> = (props: any) => {

    const cityId: string = props.state?.cityId || 'boston-ma';
    // const lastSearchProps = localStorage.getItem(RT_LAST_SEARCH_PROPS);
    const initialSearch: IOpinSearch = /* lastSearchProps ? JSON.parse(lastSearchProps) : */ {
        baths: 0,
        beds: 0,
        hashtags: ['', '', ''],
        lastId: '',
        maxPrice: 0,
        minPrice: 0,
        maxSqft: 0,
        minSqft: 0,
        types: [],
        zip: ''
    };
    const [ search, setSearch ] = useState(initialSearch);
    const [ extendedSearch, setExtendedSearch ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    // const lastSearchResults = localStorage.getItem(RT_LAST_SEARCH_RESULTS);
    const initialPins: IOpin[] = /* lastSearchResults ? JSON.parse(lastSearchResults) : */ [];
    const [ pins, setPins ] = useState(initialPins);
    const [ noResults, setNoResults ] = useState(false);
    const [ append, setAppend ] = useState(false);

    useEffect(() => {
        setLoading(true);

        // const cacheSearchTime = localStorage.getItem(RT_CACHE_SEARCH_TIME);
        // let key = RT_CACHE_SEARCH_KEY_PREFIX;
        // if (cacheSearchTime && +cacheSearchTime + 14400000 > new Date().getTime()) {
        //     if (search.baths) key = `${ key }_baths_${ search.baths }`;
        //     if (search.beds) key = `${ key }_beds_${ search.beds }`;
        //     if (search.hashtags) key = `${ key }_hashtags_${ search.hashtags.join('|') }`;
        //     if (search.lastId) key = `${ key }_lastId_${ search.lastId }`;
        //     if (search.maxPrice) key = `${ key }_maxPrice_${ search.maxPrice }`;
        //     if (search.minPrice) key = `${ key }_minPrice_${ search.minPrice }`;
        //     if (search.maxSqft) key = `${ key }_maxSqft_${ search.maxSqft }`;
        //     if (search.minSqft) key = `${ key }_minSqft_${ search.minSqft }`;
        //     if (search.types) key = `${ key }_types_${ search.types.join('|') }`;
        //     if (search.zip) key = `${ key }_baths_${ search.zip }`;

        //     const cachedSearchResults = localStorage.getItem(key);
        //     if (cachedSearchResults) {
        //         setPins(JSON.parse(cachedSearchResults));
        //         return setLoading(false);
        //     }
        // }

        getListings(cityId, search)
            .then((res: IOpin[]) => {
                let newPins: IOpin[];
                if (append) {
                    newPins = pins.map(p => p);
                    res.forEach(p => {
                        if (!newPins.find(n => n.listingId === p.listingId)) {
                            newPins.push(p);
                        }
                    });
                } else {
                    newPins = res;
                }
                // if (!cacheSearchTime) localStorage.setItem(RT_CACHE_SEARCH_TIME, `${new Date().getTime()}`);
                // localStorage.setItem(key, JSON.stringify(newPins));
                setPins(newPins);
                if (res && res.length) {
                    setNoResults(false);
                } else {
                    setNoResults(true);
                }
            })
            .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ cityId, search ]);

    const updateSearch: Function = (prop: string, value: string | number): void => {
        // Paging
        if (prop === 'lastId' && value !== search.lastId) {
            setAppend(true);
            return setSearch({ ...search, lastId: value.toString() });
        }

        setAppend(false);
        if (prop === 'hashtag-0' || prop === 'hashtag-1' || prop === 'hashtag-2') {
            const index: number = +prop.charAt(8);
            value = `${value}`.toLowerCase().replace('#', '').replace(' ', '');
            const hashtags: string[] = search.hashtags || [];
            if (hashtags[index] === value) return;
            hashtags[index] = value;
            return setSearch({ ...search, lastId: '', hashtags: hashtags });
        }
    };

    const changeBaths = (baths: any): void => { setAppend(false); setSearch({ ...search, lastId: '', baths: baths }); };
    const changeBeds = (beds: any): void => { setAppend(false); setSearch({ ...search, lastId: '', beds: beds }); };
    const changeHashtags = (hashtags: string[]): void => { setAppend(false); setSearch({ ...search, lastId: '', hashtags: hashtags }); };
    const changeMaxPrice = (maxPrice: any) => { setAppend(false); setSearch({ ...search, lastId: '', maxPrice: maxPrice }); };
    const changeMinPrice = (minPrice: any) => { setAppend(false); setSearch({ ...search, lastId: '', minPrice: minPrice }); };
    const changeMaxSqft = (maxSqft: any) => { setAppend(false); setSearch({ ...search, lastId: '', maxSqft: maxSqft }); };
    const changeMinSqft = (minSqft: any) => { setAppend(false); setSearch({ ...search, lastId: '', minSqft: minSqft }); };
    const changeTypes = (types: string[]): void => { setAppend(false); setSearch({ ...search, lastId: '', types: types }); };
    const changeZip = (zip: string): void => { setAppend(false); setSearch({ ...search, lastId: '', zip: zip }); };


    const nextPage = (): void => updateSearch('lastId', pins[pins.length - 1].sortId);

    const isMobile = (): boolean => window.screen.width < 768;
    const getDisplayPins = (): any => {
        const count: number = isMobile() ? 1 : 3;
        const colStyle = isMobile() ? { paddingLeft: 15, paddingRight: 15 } : { padding: 0 };
        const displayPins: any[] = [];
        for (let counter: number = 0; counter < count; counter++) {
            displayPins[counter] = [];
        }
        pins
            .forEach((d: IOpin, i: number) => {
                const counter = i % count;
                displayPins[counter].push(<OpinCard key={ `opin-key-${d.listingId}` } pin={ d } index={ i }></OpinCard>);
            });
        return <Row>
            { displayPins.map((d: IOpin[], i: number) => <Col style={ colStyle } key={ `col-${search.lastId}-${i}` }>{ d.map((p: IOpin, j: number) => p) }</Col>) }
        </Row>;
    };

    const getSearchOptions = (): any => {
        const options = {
            zip: <SearchZip search={ changeZip } ></SearchZip>,
            bedBath: <>
                <SearchBeds search={ changeBeds } ></SearchBeds>
                <SearchBaths search={ changeBaths } ></SearchBaths>
            </>,
            hashtags: <SearchHashtags search={ changeHashtags } ></SearchHashtags>,
            minMaxPrice: <>
                <SearchMinPrice search={ changeMinPrice } ></SearchMinPrice>
                <SearchMaxPrice search={ changeMaxPrice } ></SearchMaxPrice>
            </>,
            minMaxSqft: <>
                <SearchMinSqft search={ changeMinSqft } ></SearchMinSqft>
                <SearchMaxSqft search={ changeMaxSqft } ></SearchMaxSqft>
            </>
        };

        if (isMobile()) {
            return <>
                <Form.Row>
                    { options.zip }
                </Form.Row>
                <Form.Row>
                    { options.minMaxPrice }
                </Form.Row>
                <Button variant="link" style={{ color: 'white', textDecoration: 'none' }} onClick={ () => setExtendedSearch(!extendedSearch) }>
                    Extended Search Options { extendedSearch ? <FaChevronUp></FaChevronUp> : <FaChevronDown></FaChevronDown> }
                </Button>
                <Form.Row className="fade-in" style={{ display: extendedSearch ? '' : 'none' }} >
                    { options.bedBath }
                </Form.Row>
                <Form.Row className="fade-in" style={{ display: extendedSearch ? '' : 'none' }} >
                    { options.minMaxSqft }
                </Form.Row>
                <Form.Row className="fade-in" style={{ display: extendedSearch ? '' : 'none' }} >
                    { options.hashtags }
                </Form.Row>
            </>
        } else {
            return <>
                <Form.Row>
                    { options.zip }
                    { options.minMaxPrice }
                </Form.Row>
                <Button variant="link" style={{ color: 'white', textDecoration: 'none' }} onClick={ () => setExtendedSearch(!extendedSearch) }>
                    Extended Search Options { extendedSearch ? <FaChevronUp></FaChevronUp> : <FaChevronDown></FaChevronDown> }
                </Button>
                <Form.Row className="fade-in" style={{ display: extendedSearch ? '' : 'none' }} >
                    { options.bedBath }                        
                    { options.minMaxSqft }
                </Form.Row>
                <Form.Row className="fade-in" style={{ display: extendedSearch ? '' : 'none' }} >
                    { options.hashtags }
                </Form.Row>
            </>
        }
    };

    const getFooter = (): any => {
        if (loading) {
            return <div className="alert alert-info text-center" role="alert"><Spinner as="span" animation="border" size="sm" role="status" /> Loading ...</div>;
        } else if (noResults && !pins.length) {
            return <div className="alert alert-info text-center" role="alert">No properties match your search criteria</div>;
        } else if (noResults || pins.length < PINS_PAGE_SIZE) {
            return <div className="alert alert-info text-center" role="alert">No more properties match your search criteria</div>;
        } else if (!noResults) {
            return <Row><Col className="text-right" style={{ margin: '1em' }}><Button key="next" className="text-right shadow" variant="info" onClick={ nextPage }>More ...</Button></Col></Row>;
        }
    };

    return (
        <>
            <CommonHeader></CommonHeader>
            <Container>
                <SearchTypes loading={ loading } search={ changeTypes } ></SearchTypes>
                <hr/>
                { getSearchOptions() }
                <hr/>
                <div className="list-displaypins" style={{  }}>
                    { getDisplayPins() }
                </div>
                { getFooter() }
            </Container>
        </>
    );
};

export default Opins;
