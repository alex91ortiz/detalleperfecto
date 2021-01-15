const express = require('express');
const next = require('next');
require('dotenv').config();
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);
const cookieParser = require('cookie-parser');
const port = parseInt(process.env.PORT, 10) || 8080
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const firebase = require('@firebase/app').default;
require('@firebase/firestore');
const loadDB = () => {
    try {
        const config = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.FIREBASE_DATABASE,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_PROJECT_ID,
            messagingSenderId: process.env.FIREBASE_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    } catch (error) {

        if (!/alaready exist/.test(error.message)) {
            console.error('Firebase initialization error', error.stack);
        }
    }

    return firebase;
};

app.prepare().then(() => {
    const server = express();
    server.use(cookieParser());
    server.get("api/shows", (req, res) => {
        return res.end("Whsddks");
    });
    server.get('/payment/envio/:order', (req, res) => {

        console.log("asasa", req.params.order);
        const order = req.params.order;
        const firebase = loadDB();
        const db = firebase.firestore();
        db.collection('dp_orders').doc(order)
            .get()
            .then(snapshot => {
                if (snapshot.exists) {
                    console.log(snapshot.data())
                    let data = snapshot.data();
                    twilio.messages.create({
                        from: 'whatsapp:+14155238886',
                        to: 'whatsapp:+573154040333',
                        body: 'el numero de contacto ' + data.user.contact + ' ubicado en ' + data.user.user + ' ' + data.user.location +  ' realizo el pedido para el ' + data.product.categoria + '-' + data.product.nombre
                    }).then(message => console.log(message.sid));
                    res.json("ok");
                }
            }).catch(error => {
                console.log(error)
                res.json(error);
            });
        //app.render(req, res, '/payment', { article: req.params.article, invoice: req.params.invoice });
    });
    server.post('/send-data-cloud', (req, res) => {
        let dbname = req.params.db;

        let firebase = loadDB();
        const db = firebase.firestore();
        let product = {
            ocasion: { nombre: 'Cumpleaños', id: 5 },
            contenido: [
                {
                    id: 'I21CQsaN7UVKIOrXMNqM',
                    precio: '2000',
                    cantidad: 1,
                    categoria: 'Dulces',
                    image: 'https://firebasestorage.googleapis.com/v0/b/revol-bb930.appspot.com/o/materiales%2Fdulces%2Fgomas_circulo_pequeno_vidrio.jpg?alt=media&token=05e18ca2-2585-4a1a-8710-d644ba66c90b',
                    nombre: 'Gomas circulo envace de vidrio',
                    subcategoria: 'Gomas'
                },
                {
                    id: 'KZkKlKJlLhyOwhsaYSZK',
                    image: 'https://firebasestorage.googleapis.com/v0/b/revol-bb930.appspot.com/o/materiales%2FBebidas%2Fchocolate_caliente_plastico.jpg?alt=media&token=190ea0ed-8243-44a1-8a02-b95ad4ea4ec0',
                    cantidad: 1,
                    subcategoria: 'Chocolate',
                    categoria: 'Bebidas',
                    nombre: 'Chocolate caliente envace plastico',
                    precio: 1900
                },
                {
                    id: 'LOiQzulc0pNZpx38V4lV',
                    categoria: 'Snacks',
                    image: 'https://firebasestorage.googleapis.com/v0/b/revol-bb930.appspot.com/o/materiales%2FSnacks%2Fmani_grande_vidrio.jpg?alt=media&token=4ae040ff-e099-42cf-af8b-c72227c97712',
                    cantidad: 1,
                    subcategoria: 'Mani',
                    precio: 2300,
                    nombre: 'Mani grande envace de vidrio'
                },
                {
                    id: 'QJbYTwuuSG2Avaa4a8gB',
                    precio: 2000,
                    nombre: 'Gomas gusanito en bolsa',
                    cantidad: 1,
                    image: 'https://firebasestorage.googleapis.com/v0/b/revol-bb930.appspot.com/o/materiales%2Fdulces%2Fgomas_gusanito_bolsa.jpg?alt=media&token=abc7c61e-a3b4-4c3f-ba14-db820e169085',
                    subcategoria: 'Gomas',
                    categoria: 'Dulces'
                },
                {
                    id: 'VhNcMmKxyU6buCFcE49o',
                    precio: 3500,
                    image: 'https://firebasestorage.googleapis.com/v0/b/revol-bb930.appspot.com/o/materiales%2Fdulces%2Fmasmelos_grandes_vidrio.jpg?alt=media&token=338e5405-e472-4bcf-982a-3269dd53a376',
                    nombre: 'Masmelos grandes envace de vidrio',
                    cantidad: 1,
                    subcategoria: 'Gomas',
                    categoria: 'Dulces'
                },
                {
                    id: 'capYlkm2Ct6O9CmU9FG1',
                    image: 'https://firebasestorage.googleapis.com/v0/b/revol-bb930.appspot.com/o/materiales%2FGlobo%2FMetalizado%2Fglobo_corazon_metalizado_blanco_estampado.jpg?alt=media&token=90db2f78-6eff-44e2-9399-c93d1ee24589',
                    subcategoria: 'Metalizado',
                    nombre: 'Globo corazon metalizado blanco estampado',
                    cantidad: 1,
                    categoria: 'Globos',
                    precio: 3000
                },
                {
                    id: 'lHw3yYupgY75cUYi0c0v',
                    nombre: 'Sandwich',
                    image: 'https://firebasestorage.googleapis.com/v0/b/revol-bb930.appspot.com/o/materiales%2FComidas%2FSal%2Fsandwich.jpg?alt=media&token=25498d86-cbee-466a-8557-b0ecdd3f2709',
                    cantidad: 0,
                    precio: 2300,
                    subcategoria: 'Sal',
                    categoria: 'Comidas'
                },
                {
                    id: 'lzhcKK7m3ZG4doECmwKX',
                    nombre: 'Globo cromado rosa',
                    image: 'https://firebasestorage.googleapis.com/v0/b/revol-bb930.appspot.com/o/materiales%2FGlobo%2FCromado%2Fglobo_cromado_rosa.jpg?alt=media&token=142dc280-9a90-4d62-aef4-189b79223c7f',
                    precio: 2000,
                    categoria: 'Globos',
                    cantidad: '2',
                    subcategoria: 'Cromado'
                },
                {
                    id: 'rdvsTL9Vj5B7h6ipyo8s',
                    categoria: 'Globos',
                    image: 'https://firebasestorage.googleapis.com/v0/b/revol-bb930.appspot.com/o/materiales%2FGlobo%2FMetalizado%2Fglobo_corazon_metalizado_blanco.jpg?alt=media&token=8ada46fe-6067-4ccf-a4bf-3e47e1918325',
                    precio: 3000,
                    subcategoria: 'Metalizado',
                    cantidad: 1,
                    nombre: 'Globo coranzon metalizado blanco'
                },
            ],
            fecha: { seconds: 1595494800, nanoseconds: 0 },
            nombre: 'Feliz cumpleaños rosa',
            tamano: {
                id: 3,
                nombre: 'Caja mediana',
                valor: 20000
            },
            envio: {
                tipo: 'gratis',
                valor: 0
            },
            image: [
                'https://firebasestorage.googleapis.com/v0/b/revol-bb930.appspot.com/o/desayunos%2F00000001-20200723-DSDP.JPG?alt=media&token=882ab6a4-bb76-4e24-a6e4-8c3feb2b4592',
                'https://firebasestorage.googleapis.com/v0/b/revol-bb930.appspot.com/o/desayunos%2F00000001-20200723-DSDP-1.JPG?alt=media&token=d736fc5e-9885-4b53-847c-96e036be9b3a',
                'https://firebasestorage.googleapis.com/v0/b/revol-bb930.appspot.com/o/desayunos%2F00000001-20200723-DSDP-2.JPG?alt=media&token=4fc93477-fb65-422b-b967-88cd89584b7e'
            ],
            numeroimagen: '2',
            precio: 0,
            categoria: 'desayunos',
            seo: 'feliz-cumpleaños-rosa'
        };
        db.collection('dp_products').doc('0000000120200723DSDP').update(product).then(snapshot => {
            res.json(snapshot);
        });
        res.json("ok");
    });
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
}).catch(ex => {
    console.error(ex.stack);
    process.exit(1)
});


