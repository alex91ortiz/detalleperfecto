import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import LayoutNoSides from '../../components/Layouts/LayoutNotSides';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMailBulk, faLock } from '@fortawesome/free-solid-svg-icons'
import { useUser } from '../../util/auth/useUser'
import { parseCookies } from '../../util/auth/parseCookies';
function Login({ user }) {
    console.log(user);

    const { signin } = useUser();

    const [email, setEmail] = useState('ryan@gmail.com');
    const [password, setPassword] = useState('rrrrrr9');


    const handleSubmit = e => {
        e.preventDefault();
        console.log('login with ', { email, password });
        const user = { email, password };
        signin(user);

    };


    return (
        <LayoutNoSides >
            <Head>
                <title>Ingreso usuario - detalle perfecto</title>
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
                            <h3>Estas a pocos pasos de crear tu cuenta!</h3>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="container__row">
                            <div className="container__col-md-6 container__col-lg-12">
                                <div className="panel-form-content" >
                                    <FontAwesomeIcon icon={faMailBulk} className="forms-icon" />
                                    <input type="email" className="panel-form-control-dp" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electronico" />
                                </div>
                            </div>
                            <div className="container__col-md-6 container__col-lg-12">
                                <div className="panel-form-content" >
                                    <FontAwesomeIcon icon={faLock} className="forms-icon" />
                                    <input type="password" className="panel-form-control-dp" value={password} onChange={e => setPassword(e.target.value)} placeholder="Clave" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="container__row">
                        <div className="container__col-md-al-6 container__col-lg-al-12">

                            <button type="submit" className="btn purple panel-button-general">Ingresar</button>

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

Login.getInitialProps = ({ req }) => {
    const cookies = parseCookies(req);
    console.log(cookies)
    return {
        user: cookies.auth
    };
};

export default Login;