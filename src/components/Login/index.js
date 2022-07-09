import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import useUser from 'hooks/useUser';
import { useNavigate } from 'react-router-dom';
const validateFields = (values) => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required username';
    }
    if (!values.password) {
        errors.password = 'Required password';
    }

    console.log(errors)

    return errors;
}

const initialValues = {
    username: '',
    password: ''
}

export default function Login() {
    const { login, isLoginLoading, isLogged } = useUser();
    //, setStatus] = useState({ databaseError: '' })
    let navigate = useNavigate()

    if (isLogged && !isLoginLoading) {
        navigate('/', { replace: true })
    }

    const renderForm = ({ errors, isSubmitting, values, status }) => (
        <Form className='form'>
            <label htmlFor="username">
                Usuario:
            </label>
            <Field type="text" className={errors.password ? 'error' : ''} placeholder='Username' name="username" value={values.username} />
            <ErrorMessage name="username" component="small" className="form-errors" />

            <label htmlFor="password">
                Contraseña:
            </label>
            <Field type="password" className={errors.password ? 'error' : ''} placeholder='Password' name="password" value={values.password} />
            <ErrorMessage name="password" component="small" className="form-errors" />

            <button type="submit" className="submit-btn" disabled={isSubmitting && !status}>Login</button>
            <ErrorMessage name="generic" component="small" className="form-errors" />
            {status && status.databaseError && (<p>{status.databaseError}</p>)}
        </Form>
    )

    return (
        <>
            <div className='form-login'>
                <h3>Login</h3>
                <Formik
                    initialValues={initialValues}
                    validate={validateFields}
                    onSubmit={(values, { setStatus }) => {
                        const body = {
                            username: values.username,
                            password: values.password
                        }
                        login(body, setStatus)
                    }}
                >
                    {renderForm}
                </Formik>
            </div>
        </>
    )
}