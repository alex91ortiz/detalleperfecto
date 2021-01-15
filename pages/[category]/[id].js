import React, { useEffect, useState } from 'react';

import Box from '../../components/Product/Box';
import Custom from '../../components/Product/Custom';

import cookies from 'next-cookies'
import LayoutNoSides from '../../components/Layouts/LayoutNotSides';
import loadDB from '../../firebase.config';
import Splash from '../../components/Layouts/Splash'
function ProductDetail({ product, materials, categories, isLoguin, idproduc }) {

  const [customsection, setCustomSection] = useState(1)
  const [readyDp, setReadyDp] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setReadyDp(true)
    }, 6000);
    return () => clearTimeout(timer);
  }, [readyDp]);
  return (
    <div>

      <div className={!readyDp ? ("section-hide") : ""}>
        <LayoutNoSides >
          <div id="Group_14">
            {customsection == 1 ? (
                <Box product={product} materials={materials} isLoguin={isLoguin} id={idproduc} oncustomsection={setCustomSection} categories={categories} />
            ) : (
                <Custom product={product} materials={materials} isLoguin={isLoguin} id={idproduc} oncustomsection={setCustomSection}  categories={categories}/>
            )}
          </div>
        </LayoutNoSides>
      </div>

      <div className={readyDp ? ("section-hide") : ""}>
        <Splash />
      </div>

    </div>
  )
}
// This function gets called at build time
/*export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true
  }
}*/
export async function getServerSideProps(context) {


  let isLoguin = false;
  const auth = cookies(context).authsession || '';
  console.log("SAUH", cookies(context));
  if (auth != '') {
    isLoguin = true;
  }

  const firebase = loadDB();
  const db = await firebase.firestore();
  let id = context.params.id.split('-');

  const idproduc = id.length > 0 ? id[0] : id


  let product = await new Promise((resolve, reject) => {
    db.collection('dp_products').doc(idproduc)
      .get()
      .then(snapshot => {
        let data = {};

        if (snapshot.exists) {
          data = snapshot.data();
          data.fecha = JSON.stringify(data.fecha);
        }
        resolve(data);
      })
      .catch(error => {
        console.log(error)
        reject([]);
      });
  });
  let materials = await new Promise((resolve, reject) => {
    db.collection('dp_materials')
      .orderBy("subcategoria", "asc")
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

  let categories = await new Promise((resolve, reject) => {
    db.collection('dp_parameters').doc('categories_desayunos')
      .get()
      .then(snapshot => {

        let data = {};
        if (snapshot.exists) {
          data = snapshot.data();
        };
        resolve(data);
      })
      .catch(error => {
        console.log(error)
        reject([]);
      });
  });
  return {
    props: {
      product,
      materials,
      categories,
      isLoguin,
      idproduc
    },
  }
}
export default ProductDetail;
