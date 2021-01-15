import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import LayoutNoSides from '../../components/Layouts/LayoutNotSides';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMailBulk, faLocationArrow, faAddressCard, faLock } from '@fortawesome/free-solid-svg-icons'
import { useUser } from '../../util/auth/useUser'
function Register() {
    const { createUser } = useUser();
    const [firtName, setFirtName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firtNameValidation, setFirtNameValidation] = useState(false);
    const [lastNameValidation, setLastNameValidation] = useState(false);
    const [emailValidation, setEmailValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        console.log('login with ', { email, password });
        const user = { firtname: firtName, lastname: lastName, email: email, password: password };
        let isCompleted = true;
        if (firtName == '') {
            isCompleted = false;
            setFirtNameValidation(true);
        } else {
            setFirtNameValidation(false);
        }

        if (lastName == '') {
            isCompleted = false;
            setLastNameValidation(true);
        } else {
            setLastNameValidation(false);
        }

        if (email == '') {
            isCompleted = false;
            setEmailValidation(true);
        } else {
            setEmailValidation(false);
        }

        if (password == '') {
            isCompleted = false;
            setPasswordValidation(true);
        } else {
            setPasswordValidation(false);
        }

        if (isCompleted) {
            createUser(user);
        }
    };
    return (

        <LayoutNoSides >
            <Head>
                <title>Registro usuario - detalle perfecto</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <form onSubmit={handleSubmit}>
                <div className="container  padding_top_8">
                    <div className="container__col-md-al-12">
                        <div className="logo-screen-round">
                            <img src={require('../../assets/img/logo_Dp_Extend.png')} alt='Detalle perfecto' />
                        </div>
                    </div>
                    <div className="container__row">
                        <div className="container__col-md-al-12 container__col-lg-al-12">
                            <h3>Completa tus datos</h3>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="container__row">
                            <div className="container__col-md-6 container__col-lg-12">
                                <div className="panel-form-content" >
                                    <FontAwesomeIcon icon={faUser} className="forms-icon" />
                                    <input type="text" className={`panel-form-control-dp ${(firtNameValidation) ? 'panel-form-error' : ''}`} value={firtName} onChange={e => setFirtName(e.target.value)} placeholder="Nombre" />

                                </div>
                            </div>
                            <div className="container__col-md-6 container__col-lg-12">
                                <div className="panel-form-content" >
                                    <FontAwesomeIcon icon={faAddressCard} className="forms-icon" />
                                    <input type="text" className={`panel-form-control-dp ${(lastNameValidation) ? 'panel-form-error' : ''}`} value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Apellido" />
                                </div>
                            </div>
                            <div className="container__col-md-6 container__col-lg-12">
                                <div className="panel-form-content" >
                                    <FontAwesomeIcon icon={faMailBulk} className="forms-icon" />
                                    <input type="email" className={`panel-form-control-dp ${(emailValidation) ? 'panel-form-error' : ''}`} value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electronico" />
                                </div>
                            </div>
                            <div className="container__col-md-6 container__col-lg-12">
                                <div className="panel-form-content" >
                                    <FontAwesomeIcon icon={faLock} className="forms-icon" />
                                    <input type="password" className={`panel-form-control-dp ${(passwordValidation) ? 'panel-form-error' : ''}`} value={password} onChange={e => setPassword(e.target.value)} placeholder="Clave" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="container__row">
                        <div className="container__col-md-al-6 container__col-lg-al-12">

                            <button type="submit" className="btn purple panel-button-general">Crear Cuenta</button>

                        </div>
                        <div className="container__col-md-al-6 container__col-lg-al-12">
                            <p>
                                Al registrarme, declaro que soy mayor de edad y estoy de acuerdo con
                            las <a>Politicas de privacidad</a> y los <a>Terminos y condiciones</a>
                            de Detalle Perfecto.
                        </p>
                        </div>
                    </div>
                </div>
            </form>
            <footer>

            </footer>
        </LayoutNoSides>
    )
}


export default Register;