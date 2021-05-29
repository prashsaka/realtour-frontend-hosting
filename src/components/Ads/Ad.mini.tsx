import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import { getAd, IAd } from '../../services/Ad.service';
import AdActions from './Ad.actions';
import VideoEmbed from '../Embeds/Video.embed';


/*
photo/video
Favorite
email
text
Facebook
Instagram
Twitter


Plus => ability to add videos for a business


Address
Hashtags
Description (144 or fewer chars)


There will be another .txt file in the similar format as the MLS file.
This file will be manually created, updated whenever there is a new client => Shannon.
The file will have their own hashtags.
Text is the description of their business.
Website

*/

const AdMini: React.FC<any> = (props: any) => {

    const initialAd: IAd = props.ad;
    const [ ad, setAd ] = useState(initialAd);
    const adId: string = props.match?.params?.adId;
    useEffect(() => {
        if (!ad && adId) {
            getAd('boston-ma', adId)
                .then((res: IAd) => {
                    setAd(res);
                });
        }
    }, [ initialAd, ad, adId ]);

    if (!ad) return <></>;

    let borderColor;
    switch (props.index % 5) {
        case 0:
            borderColor = '#007bff';
            break;
        case 1:
            borderColor = '#653333';
            break;
        case 2:
            borderColor = '#6d8c66';
            break;
        case 3:
            borderColor = '#565090';
            break;
        default:
            borderColor = '#0b80a2';
            break;
    }

    let header;
    if (ad.video) {
        header = <VideoEmbed style={{ width: '100%' }} video={ ad.video } autoplay={ true } ></VideoEmbed>;
    } else if (ad.pictures && ad.pictures.length) {
        header =
            <Link style={{ textDecoration: 'none' }} target='_details' to={{ pathname:`/details/${ad.adId }`, state: { borderColor, ad: JSON.parse(JSON.stringify(ad)) }}}>
                <img alt='' style={{ width: '100%' }} src={ ad.pictures[0].toString() }/>
            </Link>;
    }

    return (
        <>
            <Card className="shadow zrounded" style={{ borderColor, float: 'left', maxWidth: '24em', position: 'initial', margin: '0.5em', color: '#653333' }}>
                <Card.Header className="text-center" style={{ padding: '0' }}>
                    { header }
                </Card.Header>
                <AdActions ad={ ad }></AdActions>
                <Card.Body>
                    <Link style={{ textDecoration: 'none' }} target='_details' to={{ pathname:`/details/${ad.adId}`, state: {borderColor, ad: JSON.parse(JSON.stringify(ad))} }}>
                        <Card.Subtitle>
                            <Row>
                                <Col>
                                    <div><small>{ ad.streetNo } { ad.streetName } { ad.suite || '' }</small></div>
                                    <div>{ ad.zip.padStart(5, '0') }</div>
                                </Col>
                                <Col className="text-right">
                                    {/* <div><small>{ `${ad.sqft} sq ft` || '' }</small></div>
                                    <div>{ `$${ad.price.toLocaleString()}` }</div> */}
                                </Col>
                            </Row>
                        </Card.Subtitle>
                        <p></p>
                        <span className="hashtag">{ ad.hashtags.map(h => `#${ h }`).join(' ') }</span>
                        <p></p>
                        <p>{ ad.remarks.substring(0, 144) }...</p>
                    </Link>
                </Card.Body>
            </Card>
        </>
    );
};

export default AdMini;
