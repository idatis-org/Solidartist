import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import useUser from 'hooks/useUser';
import { useNavigate } from 'react-router-dom';
const validateFields = () => {

}

const initialValues = {
    username: '',
    password: ''
}

export default function Login() {
    const { login, isLoginLoading, hasLoginError, isLogged } = useUser();
    let navigate = useNavigate()

    if(isLogged && !isLoginLoading){
        navigate('/')
    }

    return (
        <>
            <div className='form-login'>
                <h3>Login</h3>
                <Formik
                    initialValues={initialValues}
                    validate={validateFields}
                    onSubmit={(values, { setFieldError }) => {
                        const body = {
                            username: values.username,
                            password: values.password
                        }
                        return login(body)
                            .catch(() => {
                                setFieldError('generic', 'Revisa los campos e intentalo de nuevo')
                            })
                    }}
                >
                    {
                        ({ errors, isSubmitting, values }) => (
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

                                <button type="submit" className="submit-btn" disabled={isSubmitting}>Login</button>
                                <ErrorMessage name="generic" component="small" className="form-errors" />
                            </Form>
                        )
                    }

                </Formik>
            </div>
        </>
    )
}