import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import useUser from 'hooks/useUser';
import { useNavigate } from 'react-router-dom';
// import { web3auth } from 'services/web3Service';
import { AVALANCHE_MAINNET_PARAMS } from "services/settings.js"
import { useWeb3ConnectionContext } from "context/Web3ConnectionContext"
import LoadingSpinner from 'components/LoadingSpinner';
import './Login.css';
import 'boxicons';

// import { AVALANCHE_NOT_INSTALLED_ERROR } from 'avalanche';

// Promise.resolve(typeof Crypto !== 'undefined'
//     ? Crypto
//     : import("crypto-browserify"))

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

// function addAvalancheNetwork() {
//     injected.getProvider()
//         .then((provider) => {
//             provider.request({
//                 method: "wallet_addEthereumChain",
//                 params: [AVALANCHE_MAINNET_PARAMS],
//             })
//                 .catch((error) => {
//                     console.log(error)
//                 })
//         })
// }

export default function Login() {
    const { login, isLoginLoading, isLogged } = useUser();
    const [user, setUser] = useState();
    const [balance, setBalance] = useState();

    //const [status, setStatus] = useState({ databaseError: '' })
    let navigate = useNavigate()

    //WEB 3

    // const { connector, useIsActive, useAccount, useError } =
    //     useWeb3ConnectionContext();
    // const isActive = useIsActive();
    // const activeAccount = useAccount();

    // const error = useError();

    // const web3authProvider = web3auth.connect();

    // const web3 = new Web3(web3authProvider);

    // async function getWeb3() {
    //     setUser(await web3auth.getUserInfo()); // web3auth instance

    //     // Get user's balance in ether
    //     const balance = web3.utils.fromWei(
    //         await web3.eth.getBalance(address) // Balance is in wei
    //     );
    //     setBalance(balance);
    // }

    console.log("User: " + user);
    console.log("Balance: " + balance);

    useEffect(() => {
        if (isLogged && !isLoginLoading) {
            navigate(-1, { replace: true })
        }
    }, [isLogged, isLoginLoading, navigate])

    const renderForm = ({ errors, isSubmitting, values, status }) => (
        <Form className='form' >
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
           
            {isLoginLoading ? <LoadingSpinner /> :
                
                
                <>
                    <button type="submit" className="submit-btn" disabled={isSubmitting && !status}>Registrarse</button>
                    <ErrorMessage name="generic" component="small" className="form-errors" />
                    {status && status.databaseError && (<p>{status.databaseError}</p>)}
                </>
            }

            
        </Form>
    )

    // if (error?.message === AVALANCHE_NOT_INSTALLED_ERROR) {
    //     return (
    //         <>
    //             Avalanche Extension is not present. Go install from app store
    //             <h1>
    //                 <a
    //                     target="_blank"
    //                     rel="noreferrer"
    //                     href="https://chrome.google.com/webstore/detail/core/agoakfejjabomempkjlepdflaleeobhb?hl=en&authuser=1"
    //                 >
    //                     Here
    //                 </a>
    //             </h1>
    //         </>
    //     );
    // }

    // if (!isActive) {
    //     return (
    //         <button onClick={() => connector.activate()}>
    //             <img height={20} src='' alt="logo" />
    //             <span style={{ marginLeft: '5px' }}>Connect Avalanche</span>
    //         </button>
    //     );
    // }

    return (
        <>
            <div className='form-login'>
                <h3>¡Bienvenido de nuevo!</h3>
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
                {/* <>connected: {activeAccount}</>; */}
            </div>
        </>
    )
}