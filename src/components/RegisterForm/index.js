import { Formik, Field, Form, ErrorMessage } from 'formik';
import React from 'react';
import useRegister from 'hooks/useRegister'
import './RegisterForm.css'

export default function RegisterForm() {
    const {registered, initialValues, validateFields, regArtist} = useRegister()

    if (registered) {
        <h1>Registrado</h1>
    }

    return (
        <div className="form-container">
            <Formik
                initialValues={initialValues}
                validate={validateFields}
                onSubmit={(values, { setFieldError }) => {
                    return regArtist(values)
                        .catch(() => {
                            setFieldError('generic', 'Revisa los campos e intentalo de nuevo')
                        })
                }}
            >

                {
                    ({ errors, isSubmitting, values }) => (
                        <Form className="form" >
                            <label htmlFor="username">
                                Usuario:
                            </label>
                            <Field type="text" className={errors.password ? 'error' : ''} placeholder='Username' name="username" value={values.username} />
                            <ErrorMessage name="username" component="small" className="form-errors" />

                            <label htmlFor="alias">
                                Alias:
                            </label>
                            <Field type="text" className={errors.password ? 'error' : ''} placeholder='Alias' name="alias" value={values.alias} />
                            <ErrorMessage name="alias" component="small" className="form-errors" />

                            <label htmlFor="password">
                                Contraseña:
                            </label>
                            <Field type="password" className={errors.password ? 'error' : ''} placeholder='Password' name="password" value={values.password} />
                            <ErrorMessage name="password" component="small" className="form-errors" />

                            <div id="checkbox-group-form">Condiciones</div>
                            <div role="group" className="form-checkbox" aria-labelledby="checkbox-group-form">
                                <label>
                                    <Field type="checkbox" name="conditions" value="contentAccept" />
                                    No subiré contenido inapropiado, confirmo que mis intenciones son éticas y no fraudulentas, no haré mal uso de la plataforma, y tengo un sueldo mensual por debajo del mínimo profesional
                                </label>
                                <label>
                                    <Field type="checkbox" name="conditions" value="passwordAccept" />
                                    Si se pierde la contraseña se perderá la cuenta
                                </label>
                                <ErrorMessage name="conditions" component="small" className="form-errors" />
                            </div>

                            <button type="submit" className="submit-btn" disabled={isSubmitting}>Registrar</button>
                            <ErrorMessage name="generic" component="small" className="form-errors" />
                        </Form>
                    )
                }

            </Formik>
        </div>
    )

}