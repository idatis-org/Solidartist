import React, { useState } from 'react'

import { registerArtist, registerBuyer } from 'services/register'


export default function useRegister() {
    const [registered, setRegistered] = useState(false)

    const initialValues = {
        username: '',
        password: '',
        alias: '',
        conditions: []
    }
    
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
        if(values.conditions.length !== 2){
            errors.conditions = 'You must accept the conditions';
        }
        console.log(errors)
    
        return errors;
    }

    const regArtist = (values) => {
        return registerArtist(values)
        .then(() => {
            setRegistered(true);
        })
    }

    const regBuyer = (values) => {
        return registerBuyer(values)
        .then(() => {
            setRegistered(true);
        })
    }

    return {
        initialValues,
        registered,
        validateFields,
        regArtist,
        regBuyer
    }
}