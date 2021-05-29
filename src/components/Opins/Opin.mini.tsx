import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import { getListing, IOpenHouse, IOpin, IVirtualTour } from '../../services/Opin.service';
import OpinActions from './Opin.actions';
import VideoEmbed from '../Embeds/Video.embed';
import { getLatestVideo, getLiveOpenHouse, getVirtualTourVideos } from './videosUtility';
import { getDisplayDate, getDisplayTime } from '../../utils/DisplayUtils';
import OpenHouses from './Open.houses';

const OpinCard: React.FC<any> = (props: any) => {

    const initialPin: IOpin = props.pin;
    const [ pin, setPin ] = useState(initialPin);
    const listingId: string = props.match?.params?.listingId;
    useEffect(() => {
        if (!pin && listingId) {
            getListing('boston-ma', listingId)
                .then((res: IOpin) => {
                    setPin(res);
                });
        }
    }, [ initialPin, pin, listingId ]);

    if (!pin) return <></>;

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

    let header: JSX.Element | undefined;
    let video: URL | undefined;
    let videoDesc: JSX.Element = <></>;

    const nextOpenHouse: IOpenHouse | undefined = getLiveOpenHouse(pin);
    if (nextOpenHouse) {
        video = nextOpenHouse.url;
        videoDesc = <div style={{ marginBottom: '2em' }}>{ `${ getDisplayDate(nextOpenHouse.startDateTime) } ${ getDisplayTime(nextOpenHouse.startDateTime) } - ${ getDisplayTime(nextOpenHouse.endDateTime) }` }</div>;
    }
    if (!video) {
        video = getLatestVideo(pin);
    }
    if (!video) {
        const virtualTour: IVirtualTour = getVirtualTourVideos(pin)[0];
        video = virtualTour && virtualTour.url;
    }
    if (video) {
        header =
            <>
                <VideoEmbed style={{ width: '100%' }} video={ video } autoplay={ true } ></VideoEmbed>
                { videoDesc }
            </>;
    } else if (pin.pictures && pin.pictures.length) {
        header =
            <Link style={{ textDecoration: 'none' }} target='_details' to={{ pathname:`/details/${pin.listingId }`, state: { borderColor, pin: JSON.parse(JSON.stringify(pin)) }}}>
                <img alt='' style={{ width: '100%' }} src={ pin.pictures[0].toString() }/>
            </Link>;
    }

    return (
        <>
            <Card className="shadow zrounded fade-in" style={{ borderColor, float: 'left', maxWidth: '24em', position: 'initial', margin: '0.5em', color: '#653333' }}>
                <Card.Header className="text-center" style={{ padding: '0' }}>
                    { header }
                </Card.Header>
                <OpinActions pin={ pin } setPin={ setPin }></OpinActions>
                <Card.Body style={{ padding: '0.75em 0.5em 0.25em 0.75em' }}>
                    <Link style={{ textDecoration: 'none' }} target='_details' to={{ pathname:`/details/${pin.listingId}`, state: {borderColor, pin: JSON.parse(JSON.stringify(pin))} }}>
                        <p/>
                        <Card.Subtitle>
                            <Row>
                                <Col style={{ marginLeft: '2em' }}>
                                    <div><small>{ pin.streetNo } { pin.streetName } { pin.unitNumber ? pin.unitNumber : '' }</small></div>
                                    <div>{ pin.zip.padStart(5, '0') }</div>
                                </Col>
                                <Col style={{ marginRight: '2em' }} className="text-right">
                                    <div><small>{ `${pin.sqft} sq ft` || '' }</small></div>
                                    <div>{ `$${pin.price.toLocaleString()}` }</div>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col>
                                    <OpenHouses pin={ pin }></OpenHouses>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <p></p>
                                    <span className="hashtag text-center">{ pin.hashtags.slice(0, 4).map(h => `#${ h }`).join(' ') }</span>
                                <p></p>
                                </Col>
                            </Row>
                        </Card.Subtitle>
                        <p>{ pin.remarks.substring(0, 75) }...</p>
                    </Link>
                </Card.Body>
            </Card>
        </>
    );
};

export default OpinCard;
