import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import LayoutNoSides from '../../components/Layouts/LayoutNotSides';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPhone, faMap } from '@fortawesome/free-solid-svg-icons';
import loadDB from '../../firebase.config';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
import axios from 'axios';
function Information({ uid, datacontact, dataaddress, datalocation, producto }) {

    const [contact, setContact] = useState(datacontact);
    const [address, setAddress] = useState(dataaddress);
    const [location, setLocation] = useState(datalocation);
    const router = useRouter();
    const handleSubmit = e => {
        e.preventDefault();
        const information = { contact, address, location };
        const firebase = loadDB();
        const db = firebase.firestore();
        let total = producto.contenido.reduce((tol, current) => {
            return tol + current.precio * current.cantidad;
        }, 0);

        total += producto.tamano.valor;
        total += producto.envio.valor;
        db.collection('dp_users').doc(uid).set({ information: information }).then(snapshot => {
            information.id = uid;
            db.collection('dp_orders').add({ product: producto, user: information, total }).then(snapshotor => {
                axios.get('http://localhost:3000/payment/envio/'+snapshotor.id ).then(response => {
                    router.push('/payment/'+ producto.id + "/" + snapshotor.id);
                });
            });
        });
    };


    return (
        <LayoutNoSides>
            <Head>
                <title>Registro usuario - detalle perfecto</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <form onSubmit={handleSubmit}>
                <div className="container padding_top_5">
                    <div className="container__col-md-al-12">
                        <div className="logo-screen-round">
                            <img src={require('../../assets/img/logo_Dp_Extend.png')} alt='Detalle perfecto' />
                        </div>
                    </div>
                    <div className="container__row">
                        <div className="container__col-md-al-12 container__col-lg-al-12">
                            <h3>Proporci&oacute;nanos tu direcci&oacute;n donde te encuentras localizado y tu n&uacute;mero de telefono
                            al que podamos contactarte a traves de Whatsapp!
                        </h3>
                        </div>
                    </div>

                    <div className="panel">
                        <div className="container__row">
                            <div className="container__col-md-6 container__col-lg-12">
                                <div className="panel-form-content" >

                                    <FontAwesomeIcon icon={faPhone} className="forms-icon" />

                                    <input type="tel" pattern="[0-9]{10}" className="panel-form-control-dp" value={contact} onChange={e => setContact(e.target.value)} placeholder="Numero Contacto" />
                                </div>
                            </div>
                            <div className="container__col-md-6 container__col-lg-12">
                                <div className="panel-form-content" >
                                    <FontAwesomeIcon icon={faHome} className="forms-icon" />
                                    <input type="text" className="panel-form-control-dp" value={address} onChange={e => setAddress(e.target.value)} placeholder="Direccion" />
                                </div>
                            </div>
                            <div className="container__col-md-al-12 container__col-lg-al-12">
                                <div className="container__row">


                                    <div className="container__col-md-6 container__col-lg-12">
                                        <div className="panel-form-content" >
                                            <FontAwesomeIcon icon={faMap} className="forms-icon" />
                                            <input type="text" className="panel-form-control-dp" value={location} onChange={e => setLocation(e.target.value)} placeholder="Barrio" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container__row">
                        <div className="container__col-md-al-6 container__col-lg-al-12">

                            <button type="submit" className="btn purple panel-button-general">Confirmar datos</button>

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

export async function getServerSideProps(context) {
    let isLoguin = false;
    const auth = cookies(context).authsession || '';
    const uid = cookies(context).UID || '';
    const producto = cookies(context).p_s || '';

    let datacontact = '';
    let dataaddress = '';
    let datalocation = '';
    if (auth != '') {
        isLoguin = true;
        const firebase = loadDB();
        const db = firebase.firestore();
        let result = await new Promise((resolve, reject) => {
            db.collection('dp_users').doc(uid)
                .get()
                .then(snapshot => {
                    let data = null;

                    if (snapshot.exists) {
                        data = snapshot.data();
                        resolve(data);
                    }

                })
                .catch(error => {
                    console.log(error)
                    reject([]);
                });
        });
        return {
            props: {
                uid: uid,
                datacontact: result.information.contact,
                dataaddress: result.information.address,
                datalocation: result.information.location,
                producto: producto
            }
        }
    }

};

export default Information;