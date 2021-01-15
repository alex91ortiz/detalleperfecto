import Head from 'next/head'
import LayoutNoSides from '../../components/Layouts/LayoutNotSides';
import Link from 'next/link'
import { useRouter } from 'next/router'
function Buy() {
    const router = useRouter()
    return (

        <LayoutNoSides >
            <Head>
                <title>Comprar - detalle perfecto</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="container padding_top_8">

                <div className="container__row">
                    <div className="container__col-md-al-12">
                        <div className="logo-screen-round">
                            <img src={require('../../assets/img/logo_Dp_Extend.png')} alt='Detalle perfecto' />
                        </div>
                    </div>
                    
                    <div className="container__col-al-12">
                        <div className="panel-screen-height-2">

                            <div className="container__row">
                                <div className="panel-info container__col-md-al-12 container__col-lg-al-12">
                                    <p><b>!Hola¡</b> Ingresa a tu cuenta para adquirir nuestros productos </p>
                                </div>
                                <div className="container__col-md-al-12 container__col-sm-al-12">
                                    <Link href={{ pathname: "/account-users/register", query: { producto: router.query.producto } }}>
                                        <a className="btn purple panel-button-general">Soy Nuevo</a>
                                    </Link>
                                </div>

                                <div className="container__col-md-al-12 container__col-lg-al-12">
                                    <Link href={{ pathname: "/account-users/login", query: { producto: router.query.producto } }}>

                                        <a className="panel-button-general">Ya tengo cuenta</a>
                                    </Link>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <footer>

            </footer>
        </LayoutNoSides>
    )
}


export default Buy;