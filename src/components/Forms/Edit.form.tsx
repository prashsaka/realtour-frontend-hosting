import React, { useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { FaPlus, FaRegTrashAlt, FaVideo } from "react-icons/fa";

import { getAgent, IAgent, setAgent } from '../../services/Agent.service';
import { IAgentActionPayload, IOpin, IVideo } from '../../services/Opin.service';
import { validateField, validatePhone, validateVideo } from '../../utils/Validator.util';

import './forms.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const EditForm: React.FC<any> = (props: any) => {

    const agentAction: (cityId: string, payload: IAgentActionPayload) => Promise<void> = props.agentAction;

    const title: string = props.title;
    const pin: IOpin = props.pin;
    const setPin = props.setPin;
    const setAction: Function = props.setAction;
    const [ actionStatus, setActionStatus ] = useState('');

    const agent: IAgent = getAgent();

    const isDisabled: Function = (isSubmitting: boolean): boolean => {
        return isSubmitting || !!actionStatus;
    };
    const clearAction: Function = (): void => {
        setAction('');
        setActionStatus('');
    };

    const getVideoFields: Function = (values: { agent: IAgent, videos: IVideo[] }, isSubmitting: boolean, arrayHelpers: any): JSX.Element[] => {
        let fields: JSX.Element[];
        if (values.videos && values.videos.length) {
            fields = values
                .videos
                .map((video: IVideo, index: number) =>
                    <div key={ index }>
                        <Row>
                            <Col>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field style={{ display: 'initial' }} className="form-control col" name={ `videos.${ index }.url` } validate={ validateVideo } placeholder="Video URL" disabled={ isDisabled(isSubmitting) }/>
                                <ErrorMessage component="div" className="alert alert-danger" name="v" ></ErrorMessage>
                                <small className="text-muted">
                                    <div>YouTube or Facebook in landscape (16:9) format</div>
                                </small>
                            </Col>
                            <Col xs="auto" md="auto" style={{ paddingTop: '0.375em' }}>
                                <FaRegTrashAlt onClick={() => arrayHelpers.remove( index )}></FaRegTrashAlt>
                            </Col>
                        </Row>

                    </div>
                    );
        } else {
            fields = [];
        }
        fields.push(
            <Button variant="outline-info" disabled={ isSubmitting } onClick={ () => arrayHelpers.insert(fields.length, '') }><FaPlus></FaPlus> <FaVideo></FaVideo></Button>
        );
        return fields;
    };

    return (
        <div>
            <h6 style={{ marginTop: '1em' }}>{ title }</h6>
            <Formik
                initialValues={{ agent: agent, videos: pin.videos }}
                onSubmit={(values: { agent: IAgent, videos: IVideo[] }, actions) => {
                    actions.setSubmitting(true);
                    setAgent(values.agent);
                    const p: IAgentActionPayload = {
                        listingId: pin.listingId,
                        agent: values.agent,
                        videos: values.videos
                    };
                    agentAction('boston-ma', p)
                        .then(()=> {
                            setActionStatus('success');
                            setPin({ ...pin, videos: values.videos });
                        })
                        .catch((err: any) => {
                            if (err?.response?.status === 404) {
                                setActionStatus('Only listing agent can add videos.');    
                            } else {
                                setActionStatus(err?.message || 'error');
                            }
                        })
                        .finally(() => {
                            actions.setSubmitting(false);
                        });
                }}
            >
            {({ values, isSubmitting }) => (
                <Form>
                    <div className="form-group">
                        <Field className="form-control" name="agent.agentId" validate={ validateField } placeholder="Agent Id" disabled={ isDisabled(isSubmitting) }/>
                        <ErrorMessage component="div" className="alert alert-danger" name="agent.agentId" ></ErrorMessage>
                    </div>
                    <div className="form-group">
                        <Field className="form-control" name="agent.user.name" validate={ validateField } placeholder="Name" disabled={ isDisabled(isSubmitting) }/>
                        <ErrorMessage component="div" className="alert alert-danger" name="agent.user.name" ></ErrorMessage>
                    </div>
                    <div className="form-group">
                        <Field className="form-control" name="agent.user.phone" validate={ validatePhone } placeholder="Phone" disabled={ isDisabled(isSubmitting) }/>
                        <ErrorMessage component="div" className="alert alert-danger" name="agent.user.phone" ></ErrorMessage>
                    </div>
                    <div className="form-group">
                        <Field className="form-control" name="agent.user.email" validate={ validateField } placeholder="Email" disabled={ isDisabled(isSubmitting) }/>
                        <ErrorMessage component="div" className="alert alert-danger" name="agent.user.email" ></ErrorMessage>
                    </div>
                    <div className="form-group text-right">
                        <FieldArray name="videos" render={ arrayHelpers => getVideoFields(values, isSubmitting, arrayHelpers)}></FieldArray>
                    </div>
                    { !actionStatus ?
                        <>
                            <Button variant="primary" type="submit" disabled={ isSubmitting }>
                                { isSubmitting ? 'Submitting ...' : 'Submit' }
                            </Button>
                            <Button variant="secondary" disabled={ isSubmitting } onClick={ () => clearAction() }>Cancel</Button>
                        </>
                        : actionStatus === 'success' ?
                            <>
                                <Alert variant='success'>Successly updated videos!</Alert>
                                <Button variant="success" disabled={ isSubmitting } onClick={ () => clearAction() }>Close!</Button>
                            </>
                            :
                            <>
                                <Alert variant='danger'>{ actionStatus }</Alert>
                                <Button variant="danger" disabled={ isSubmitting } onClick={ () => clearAction() }>Close!</Button>
                            </>
                    }
                </Form>
            )}
            </Formik>
        </div>
    );
};

export default EditForm;
