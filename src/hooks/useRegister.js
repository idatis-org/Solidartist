import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { registerArtist, registerBuyer } from 'services/register'

const toastSuccess = () => toast.success('¡Te has registrado correctamente!', {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});


export default function useRegister() {
    const [registered, setRegistered] = useState(false)
    const navigate = useNavigate();

    //Initial values of the form
    const initialValues = {
        username: '',
        password: '',
        alias: '',
        conditions: []
    }

    //Validations to perform on the form
    const validateFields = (values) => {
        console.log(values)
        const errors = {};
        if (!values.username) {
            errors.username = 'Required username';
        }
        if (!values.alias) {
            errors.alias = 'Required alias';
        }
        if (!values.password) {
            errors.password = 'Required password';
        } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        if (values.conditions.length !== 2) {
            errors.conditions = 'You must accept the conditions';
        }
        console.log(errors)

        return errors;
    }

    //Function to register an Artist
    const regArtist = (values) => {
        return registerArtist(values)
            .then((res) => {
                if (res.ok) {
                    setRegistered(true);
                    toastSuccess();

                    setTimeout(() => {
                        navigate('/login', { replace: true })
                    }, 1500);
                }
            })
    }

    //Function to register a Buyer
    const regBuyer = (values) => {
        return registerBuyer(values)
            .then((res) => {
                if (res.ok) {
                    setRegistered(true);
                    toastSuccess();

                    setTimeout(() => {
                        navigate('/login', { replace: true })
                    }, 1500);
                }
            })
    }

    return {
        initialValues,
        validateFields,
        regArtist,
        regBuyer
    }
}