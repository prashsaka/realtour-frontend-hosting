import React, { useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { ErrorMessage, Formik, Form, Field } from 'formik';

import { getUser, IUser, setUser } from '../../services/User.service';
import { IOpin, IBuyerActionPayload } from '../../services/Opin.service';
import { validateField, validatePhone } from '../../utils/Validator.util';

import './forms.css';

const ContactForm: React.FC<any> = (props: any) => {

    const buyerAction: (payload: IBuyerActionPayload) => Promise<void> = props.buyerAction;
    const title: string = props.title;
    const pin: IOpin = props.pin;
    const setAction = props.setAction;
    const [ actionStatus, setActionStatus ] = useState('');

    const [ isDone, setIsDone ] = useState(false);

    const notes: string = '';
    const user: IUser = getUser();

    return (
        <div>
            <h6 style={{ marginTop: '1em' }}>{ title }</h6>
            <Formik
                initialValues={{ u: user, n: notes }}
                onSubmit={(values: { u: IUser, n: string }, actions) => {
                    actions.setSubmitting(true);
                    setUser(values.u);
                    const p: IBuyerActionPayload = {
                        listingId: pin.listingId,
                        user: values.u,
                        notes: values.n
                    };
                    buyerAction(p)
                        .catch((err: any) => {
                            setActionStatus(err?.message || 'error');
                        })
                        .finally(() => {
                            actions.setSubmitting(false);
                            setIsDone(true);
                        });
                }}
            >
            {({ isSubmitting }) => (
                <Form>
                    <div className="form-group">
                        <Field className="form-control" name="u.name" placeholder="Name" validate={ validateField } disabled={ isDone || isSubmitting }/>
                        <ErrorMessage component="div" className="alert alert-danger" name="u.name" ></ErrorMessage>
                    </div>
                    <div className="form-group">
                        <Field className="form-control" name="u.phone" placeholder="Phone" validate={ validatePhone } disabled={ isDone || isSubmitting }/>
                        <ErrorMessage component="div" className="alert alert-danger" name="u.phone" ></ErrorMessage>
                    </div>
                    <div className="form-group">
                        <Field className="form-control" name="u.email" placeholder="Email" validate={ validateField } disabled={ isDone || isSubmitting }/>
                        <ErrorMessage component="div" className="alert alert-danger" name="u.email" ></ErrorMessage>
                    </div>
                    <div className="form-group">
                        <Field className="form-control" as="textarea" name="n" placeholder="Notes" disabled={ isDone || isSubmitting }/>
                        <ErrorMessage component="div" className="alert alert-danger" name="n" ></ErrorMessage>
                    </div>
                    { !isDone ?
                        <>
                            <Button variant="primary" type="submit" disabled={ isSubmitting }>
                                { isSubmitting ? 'Submitting ...' : 'Submit' }
                            </Button>
                            <Button variant="secondary" disabled={ isSubmitting } onClick={ () => setAction('') }>Cancel</Button>
                        </>
                        : !actionStatus || actionStatus === 'success' ?
                            <Button variant="success" disabled={ isSubmitting } onClick={ () => setAction('') }>Done!</Button>
                            :
                            <>
                                <Alert variant='danger'>{ actionStatus }</Alert>
                                <Button variant="danger" disabled={ isSubmitting } onClick={ () => setAction('') }>Close!</Button>
                            </>
                    }
                </Form>
            )}
            </Formik>
        </div>
    );
};

export default ContactForm;
