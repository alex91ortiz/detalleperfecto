import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/Layouts/SubLayout';
import List from '../../components/List';
import loadDB from '../../firebase.config';
const Category = ({products, categories}) => {
    const router = useRouter()
    return (
        <Layout gotocat={false}>
            <Head>
                <title>Factura - Detalle Perfecto</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="page-content slide-content padding_top_5">
                <List products={products} categories={categories} />
            </div>
            <footer>

            </footer>
        </Layout>
    )
}

export async function getServerSideProps(context) {

    const firebase = loadDB();
    const db = await firebase.firestore();
    const category = context.params.category;
    let result = await new Promise((resolve, reject) => {
        db.collection('dp_products')
            .where("categoria", "==", category)
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

export default Category;