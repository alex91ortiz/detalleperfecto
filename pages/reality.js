
import React, { useEffect, useState } from 'react';

import Head from 'next/head'
import loadDB from '../firebase.config';
import Splash from '../components/Layouts/Splash'



function Pedido({ orders }) {
  const [readyDp, setReadyDp] = useState(false)
  const [appRendered, setAppRendered] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!appRendered) {
        const script1 = document.createElement("script");
        script1.src = "https://cdn.jsdelivr.net/gh/aframevr/aframe@1c2407b26c61958baa93967b5412487cd94b290b/dist/aframe-master.min.js";
        script1.async = true;
        document.body.appendChild(script1);

        const script = document.createElement("script");
        script.src = "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js";
        script.async = true;
        document.body.appendChild(script);
      }

      setAppRendered(true)

    }

    const timer = setTimeout(() => {
      setReadyDp(true)
    }, 6000);

    return () => clearTimeout(timer);
  }, [readyDp, appRendered]);



  return (
    <div>
      {readyDp ? (
        <div>
          <Head>
            <title>Detalle perfecto - Mis pedidos</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          </Head>
          {!appRendered &&
            <div class="arjs-loader">
              <div>Loading, please wait...</div>
            </div>
          }
          {appRendered &&

            <a-scene
              vr-mode-ui="enabled: false;"
              renderer="logarithmicDepthBuffer: true;"
              embedded
              arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;">

              <a-nft
                type='nft'
                url='media/ar/usuario-producto-orden/usuario-producto-orden'
                smooth="true"
                smoothCount="10"
                smoothTolerance="0.01"
                smoothThreshold="5"
              >
                <a-entity
                  gltf-model="media/ar/scene.gltf"
                  scale="5 5 5"
                  position="50 150 0"
                >
                </a-entity>

              </a-nft>

              <a-entity camera></a-entity>
            </a-scene>
          }
          <footer>

          </footer>
        </div>
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