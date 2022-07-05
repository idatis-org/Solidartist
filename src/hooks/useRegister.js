import React, { useState } from 'react'

import { registerArtist, registerBuyer } from 'services/register'


export default function useRegister() {
    const [registered, setRegistered] = useState(false)

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
        if(values.conditions.length !== 2){
            errors.conditions = 'You must accept the conditions';
        }
        console.log(errors)
    
        return errors;
    }

    //Function to register an Artist
    const regArtist = (values) => {
        return registerArtist(values)
        .then(() => {
            setRegistered(true);
        })
    }

    //Function to register a Buyer

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