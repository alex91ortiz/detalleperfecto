
import React, { useEffect, useState } from 'react';

import Head from 'next/head'
import Layout from '../components/Layouts/Layout'
import Main from '../components/Main'
import loadDB from '../firebase.config';
import Splash from '../components/Layouts/Splash'
function Home({ products, categories}) {
  const [readyDp, setReadyDp] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setReadyDp(true)
    }, 6000);
    return () => clearTimeout(timer);
  }, [readyDp]);
  return (
    <div>
      {readyDp ? (
        <Layout gotocat={true}>
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <Main products={products} categories={categories} />
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
    db.collection('dp_products')
      .get()
      .then(snapshot => {
        let data = [];
        snapshot.forEach(doc => {
          let dataSerialize = doc.data();
          dataSerialize.fecha = JSON.stringify(dataSerialize.fecha);

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

  let categories = await new Promise((resolve, reject) => {
    db.collection('dp_categories')
      .get()
      .then(snapshot => {
        let data = [];
        snapshot.forEach(doc => {
          let dataSerialize = doc.data();

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
      products: result,
      categories: categories
    },
  }
}

export default Home;