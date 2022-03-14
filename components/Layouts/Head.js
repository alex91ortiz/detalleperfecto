import React, { useState, useEffect, useRef } from 'react';

import logo from '../../assets/img/logodp.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'
import Select, { components } from 'react-select';
import useAutocomplete from 'use-autocomplete';
import Options from '../Options';
import { useRouter } from 'next/router'

const MultiValueLabel = ({ children, ...props }) => {
    return (
        <components.MultiValueContainer {...props} >
            {children}
        </components.MultiValueContainer>
    );
};
export default function Head({ filters, gotocat }) {
    const [search, setSearch] = useState('');
    let [completions, setCompletions] = useState([]);
    const prevScrollY = useRef(0);
    const [goingUp, setGoingUp] = useState(false);
    const router = useRouter();
    const selectedText = (value) => {

        setSearch(value);
        setCompletions([]);
        (gotocat) ? router.push({ pathname: '/catalogo/' + value, query: router.query }) : null;

    }

    const onTextChange = (e) => {
        const value = e.target.value;
        let completions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            completions = Options.OcationsArr.sort().filter(v => regex.test(v))
        }
        setCompletions(completions);
        setSearch(value);

    }
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (prevScrollY.current <= 100) {
                setGoingUp(false);
            }
            if (prevScrollY.current > 100) {
                setGoingUp(true);
            }

            prevScrollY.current = currentScrollY;
        };
        if (filters) {
            /*window.addEventListener("scroll", handleScroll, { passive: true });
            return () => window.removeEventListener("scroll", handleScroll);*/
        }
        function onScroll() {
            console.log("scroll!");
        }

        window.addEventListener("scroll", onScroll);

    }, [goingUp])

    return (
        <header>
            <div className="container--fluid">
                <div className="Bar_be Bar_be_scroll">
                    <div className="container__row">
                        <div className="container__col-lg-al-2 container__col-md-al-2">
                            <img src={logo} className="Logo_Brand" alt="Detalle perfecto" />
                        </div>
                        <div className="container__col-lg-al-7 container__col-md-al-8">
                            <div className="has-search" >
                                <FontAwesomeIcon icon={faSearch} className="form-control-feedback" />
                                <input type="text" className="form-control-dp" placeholder="Encuentra lo que deseas" value={search} onChange={() => onTextChange(event)} />
                            </div>
                        </div>

                        {completions.length > 0 &&
                            <div className="notebooks">
                                <ul>
                                    {completions.map((val, index) => (
                                        <li key={index} onClick={() => selectedText(val)}>{val}</li>
                                    ))}
                                </ul>
                            </div>
                        }

                        <div className="container__col-al-lg-3 container__col-md-al-2">
                            <button className="btn custom Button_Personalizado">
                                <div className="Texto_Personalizalo_Class">
                                    <FontAwesomeIcon icon={faShoppingBag} className="icon-button-personalizado" width="40" height="50" />&nbsp;
                                    <span className="Button_Personalizado__texto_fade Button_Personalizado__texto_fade_xs">Pedidos</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    {/*goingUp &&
                        <div className="container__row">

                            <div className="container__col-lg-al-12 container__col-md-al-6">
                                <Select placeholder="Filtra por ocasiones" components={{ MultiValueLabel }} isMulti className="Bar_be_category" options={Options.Ocations} />
                            </div>
                            <div className="container__col-lg-al-12 container__col-md-al-6">
                                <Select components={{ MultiValueLabel }} placeholder="Filtra por tamaño" isMulti className="Bar_be_category" options={Options.weigths} />
                            </div>
                            {/* <div className="Bar_be_category">        
                                <img src={require('../../assets/img/categorias/icons_cat_dp/kids.png')} />
                                <img src={require('../../assets/img/categorias/icons_cat_dp/aniversario.png')} />
                                <img src={require('../../assets/img/categorias/icons_cat_dp/cumpleanos.png')} />
                                <img src={require('../../assets/img/categorias/icons_cat_dp/diamadre.png')} />
                                <img src={require('../../assets/img/categorias/icons_cat_dp/hombres.png')} />
                                <img src={require('../../assets/img/categorias/icons_cat_dp/mujeres.png')} />
                        </div>
                        </div>
                    }*/}
                </div>
            </div>
        </header>
    );
}