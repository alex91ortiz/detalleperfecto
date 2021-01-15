import Head from 'next/head'
import { useRouter } from 'next/router'
import LayoutNoSides from '../../../components/Layouts/LayoutNotSides';
import Link from 'next/link';
const Payment = ({ article, invoice }) => {
    const router = useRouter()
    return (
        <LayoutNoSides >
            <Head>
                <title>Factura - Detalle Perfecto</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="container padding_top_4">
                <div className="container__col-md-al-12">
                    <div className="logo-screen-round">
                        <img src={require('../../../assets/img/logo_Dp_Extend.png')} alt='Detalle perfecto' />
                    </div>
                </div>

                <div className="container__row">
                    <div className="container__col-md-12 container__col-lg-12">
                        <div className="order-container">
                        
                            <p>
                                Hola! Nombre usuario Ralizaste el pedido : Kit - Romantico Noche perfecta, nuestro asesor
                                te contactara via Whatsapp en breve para indicarte el procedimiento de pago y el
                                tiempo de entrega de tu pedido.
                                </p>
                            <h1 >Gracias por comprar en Detalle perfecto.</h1>
                        </div>
                    </div>
                </div>


                <div className="container__row">
                    <div className="container__col-md-al-6 container__col-lg-al-12">
                        <Link href='/' >
                            <a className="btn purple panel-button-general">Continuar Comprando</a>
                        </Link>
                    </div>
                    <div className="container__col-md-al-6 container__col-lg-al-12">
                        <Link href={`/payment/[article]/[invoice]`} as={`/payment/numero-kit-romantico-noche-perfecta/45545454`}>
                            <a className="panel-button-general">Estado de mis pedidos</a>
                        </Link>
                    </div>
                </div>
            </div>

            <footer>

            </footer>
        </LayoutNoSides >
    )
}

Payment.getInitialProps = async ({ query }) => {
    return { article: query.invoice, invoice: query.invoice }
}

export default Payment;