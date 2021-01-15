import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/img/logo_Dp_Extend.png';

import giff2 from '../assets/img/muestras/Giff_2_main_page.png';

import IconGlassMartini from '../assets/img/Icon-awesome-glass-martini-alt.svg';
import IconDollarSing from '../assets/img/Icon-awesome-dollar-sign.svg';

import 'react-morphing-modal/dist/ReactMorphingModal.css';
import Page from './Page'
function Main({products, categories}) {

    // scroll menu
    const prevScrollY = useRef(0);
    const [goingUp, setGoingUp] = useState(true);
    const [currentProduct, setCurrentProduct] = useState(null);
    
    // state global
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heightWin = window.innerHeight - 150;
            if (prevScrollY.current <= 100) {
                setGoingUp(true);
            }
            if (prevScrollY.current > 100) {
                setGoingUp(false);
            }

            prevScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);

    }, [goingUp])

    return (
        <div>
            {/*<div className={`container page-content ${!goingUp ? ' slide-content' : ''}`} >*/}
            <div className={`container  `} >
                <div className="container--fliud">
                    <div className="container__row">

                        <div className="container__col-lg-12 container__col-md-12 brand">
                            <img src={require('../assets/img/logo_Dp_Extend.png')} alt='Detalle perfecto' />
                        </div>

                    </div>
                    
                    <div className="container__row">
           
                        <Page products={products} categories={categories} />

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Main;