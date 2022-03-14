
import React, { useEffect, useState } from 'react';

import Head from 'next/head'
import Layout from '../components/Layouts/Layout'
import Main from '../components/Main'
import loadDB from '../firebase.config';
import Splash from '../components/Layouts/Splash'


function Pedido({ orders }) {
  const [readyDp, setReadyDp] = useState(false)
  const [appRendered, setAppRendered] = useState(false)
  useEffect(() => {
    

    const timer = setTimeout(() => {
      setReadyDp(true)
    }, 6000);

    return () => clearTimeout(timer);
  }, [readyDp, appRendered]);



  return (
    <div>
      {readyDp ? (
        <Layout gotocat={true}>
          <Head>
            <title>Detalle perfecto - Mis pedidos</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          
          </Head>
          
          <footer>

          </footer>
        </Layout>
      ) : (
          <Splash />
        )}
    </div>
  )
}


export async function getServerSideProps() {

  const firebase = loadDB();
  const db = await firebase.firestore();

  let result = await new Promise((resolve, reject) => {
    db.collection('dp_orders')
      .get()
      .then(snapshot => {
        let data = [];
        snapshot.forEach(doc => {
          let dataSerialize = doc.data();
          //dataSerialize.fecha = JSON.stringify(dataSerialize.fecha);

          data.push(
            Object.assign(
              {
                id: doc.id
              },
              dataSerialize
            )
          );

        });
        resolve(data);
      })
      .catch(error => {
        console.log(error)
        reject([]);
      });
  });

  return {
    props: {
      orders: result
    },
  }
}

export default Pedido;