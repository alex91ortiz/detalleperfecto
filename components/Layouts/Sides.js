import React, { useState, useEffect, useRef } from 'react';
import IconGlassMartini from '../../assets/img/Icon-awesome-glass-martini-alt.svg';
import IconGlassCheers from '../../assets/img/Icon-awesome-glass-cheers.svg';
import IconUmbrellaBeach from '../../assets/img/Icon-awesome-umbrella-beach.svg';
import IconBirthdayCake from '../../assets/img/Icon-awesome-birthday-cake.svg';
import IconBreadSlice from '../../assets/img/Icon-awesome-bread-slice.svg';
import IconPaw from '../../assets/img/Icon-awesome-paw.svg';
import Link from 'next/link'

export default function Sides(props) {
    const prevScrollY = useRef(0);
    const [goingUp, setGoingUp] = useState(props.scrollinSides);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (prevScrollY.current <= 100) {
                setGoingUp(true);
            }
            if (prevScrollY.current > 100) {
                setGoingUp(false);
            }

            prevScrollY.current = currentScrollY;
        };
        if (props.scrollinSides) {
            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => window.removeEventListener("scroll", handleScroll);
        }

    }, [goingUp])
    return (
        <div className={`container side-menu-container ${!goingUp ? 'slide-in' : ''}`} >
            <ul id="Menu">
                <li>
                    <Link href="/catalogo/kit-romantico" passHref>
                        <a href="#">
                            <img className="icon-sides" src={IconGlassMartini} /><span className="text-sides">Kit Romantico</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/catalogo/kit-cena" passHref>
                        <a href="#">
                            <img className="icon-sides" src={IconGlassCheers} /><span className="text-sides">Kit Cena</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/catalogo/kit-picni" passHref>
                        <a href="#">
                            <img className="icon-sides" src={IconUmbrellaBeach} /><span className="text-sides">Kit Picni</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/catalogo/kit-cumpleanos" passHref>
                        <a href="#">
                            <img className="icon-sides" src={IconBirthdayCake} /><span className="text-sides">Kit Cumpleaños</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/catalogo/kit-mascotas" passHref>
                        <a href="#">
                            <img className="icon-sides" src={IconPaw} /><span className="text-sides">Kit Mascotas</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/catalogo/desayunos" passHref>
                        <a href="#">
                            <img className="icon-sides" src={IconBreadSlice} /><span className="text-sides">Desayunos y Meriendas</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/catalogo/meriendas" passHref>
                        <a href="#">
                            <img className="icon-sides" src={IconBreadSlice} /><span className="text-sides">Desayunos y Meriendas</span>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
