import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import CommonHeader from '../Common/Header.common';
import { getListing, IOpin, IOpenHouse, IVirtualTour } from '../../services/Opin.service';
import OpinActions from './Opin.actions';
import VideoEmbed from '../Embeds/Video.embed';
import { getLiveOpenHouse, getVirtualTourVideos } from './videosUtility';
import { getDisplayDate, getDisplayTime } from '../../utils/DisplayUtils';
import OpenHouses from './Open.houses';


const OpinDetails: React.FC<any> = (props: any) => {

    const state = props.location.state;
    const initialPin: IOpin = state && state.pin;
    const [ pin, setPin ] = useState(initialPin);
    useEffect(() => {
        if (!pin) {
            getListing('boston-ma', props.match.params.id)
                .then((res: IOpin) => {
                    setPin(res);
                });
        }
    }, [ initialPin, pin, props.match.params.id ]);

    if (!pin) return <></>;

    const videoItems: any[] = [];

    const nextOpenHouses: IOpenHouse[] = getLiveOpenHouse(pin);
    if (nextOpenHouses && nextOpenHouses.length) {
        const nextOpenHouse: IOpenHouse = nextOpenHouses[0];
        if (nextOpenHouse.url) {
            videoItems.push(
                <>
                    <VideoEmbed key='nextopenhouse' video={ nextOpenHouse.url } datetime={ nextOpenHouse.startDateTime } autoplay='true'></VideoEmbed>
                    <div style={{ marginBottom: '2em' }}>{ `${ getDisplayDate(nextOpenHouse.startDateTime) } ${ getDisplayTime(nextOpenHouse.startDateTime) } - ${ getDisplayTime(nextOpenHouse.endDateTime) }` }</div>
                </>
            );
        }
    }

    pin.videos = pin.videos || [];
    for (let i = pin.videos.length - 1; i >= 0; i--) {
        videoItems.push(<VideoEmbed key={ `video-${ i }` } video={ `${pin.videos[i].url }` } autoplay={ i === (pin.videos.length - 1) }></VideoEmbed>);
    }

    const virtualTours: IVirtualTour[] = getVirtualTourVideos(pin);
    virtualTours.forEach((v: IVirtualTour) => videoItems.push(<VideoEmbed style={{ width: '100%' }} video={ v.url } autoplay={ true } ></VideoEmbed>));

    pin.pictures = pin.pictures || [];
    const carouselItems: any[] = pin
        .pictures
        .map((p: URL, i: number) =>
            <Carousel.Item key={ `picture-${ i }` } className="text-center">
                <img alt='' style={{ maxHeight: '40em', height: '100%', width: '100%', objectFit: 'contain' }} src={ p.toString() }/>
            </Carousel.Item>
        );

    const borderColor = (state && state.borderColor) || '#007bff';
    return (
        <>
            <CommonHeader></CommonHeader>
            <Container>
                <div  className="sticky-top" style={{ backgroundColor: 'white', textAlign: 'center', 'width': '100%' }}>
                    <OpinActions pin={ pin } setPin={ setPin }></OpinActions>
                </div>
                <Card className="shadow mb-5 zrounded" style={{ borderColor, position: 'initial', color: '#653333' }}>
                    <Card.Header className="text-center" style={{ padding: '0' }}>
                        { videoItems }
                        <Carousel>
                            { carouselItems }
                        </Carousel>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col>
                                    <div><small>{ pin.streetNo } { pin.streetName } { pin.unitNumber ? pin.unitNumber : '' }</small></div>
                                    <div>{ pin.zip.padStart(5, '0') }</div>
                                </Col>
                                <Col className="text-right">
                                    <div><small>{ `${pin.sqft} sq ft` || '' }</small></div>
                                    <div>{ `$${pin.price.toLocaleString()}` }</div>
                                </Col>
                            </Row>
                        </Card.Title>
                        <hr/>
                        <p></p>
                        <Row>
                            <Col>
                                <OpenHouses pin={ pin }></OpenHouses>
                            </Col>
                            <Col>
                                <span className="hashtag">{ pin.hashtags.map(h => `#${ h }`).join(' ') }</span>
                            </Col>
                        </Row>
                        <p></p>
                        <hr/>
                        <p className="card-text">
                            { pin.remarks }
                        </p>
                        <hr/>
                        <Container >
                            { pin.facts &&
                                Object
                                    .keys(pin.facts)
                                    .filter(d => pin.facts[d])
                                    .sort()
                                    .map((d: string) => 
                                        <Row key={ d }><Col xs={6} className="text-right text-capitalize">{ d }</Col><Col xs={ 6 }>{ pin.facts[d] }</Col></Row>
                                    )
                            }
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default OpinDetails;
