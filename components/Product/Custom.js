import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faDollarSign, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ListItems from './ListItems';
import { useRouter } from 'next/router';
import { useModal, Modal } from 'react-morphing-modal';
import CustomModel from '../Product/CustomModel';
import { CSSTransitionGroup } from 'react-transition-group'
import cookies from 'next-cookies';
function Custom({ product, isLoguin, id, materials, oncustomsection, categories }) {
    const [indeximage, setIndexImage] = useState(0);
    let imageDefault = product.image ? product.image[indeximage] : "";
    let contenido = product.contenido ? product.contenido : [];
    let nombre = product.nombre ? product.nombre : "";
    const valortamano = product.tamano ? product.tamano.valor : 0;
    const valorenvio = product.envio ? product.envio.valor : 0;
    const [image, setimage] = useState(imageDefault);
    const router = useRouter();
    const [suggestion, setSuggestion] = useState(null);
    const [currentMaterial, setCurrentMaterial] = useState(null);
    const [currentMaterialChanged, setCurrentMaterialChanged] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [currentSelectedList, setCurrentSelectedList] = useState(contenido);
    const [listMaterials, setListMaterials] = useState(materials);
    const [addProduct, setAddProduct] = useState(false);
    const containerTabs = useRef();
    let totaldefault = 0;

    currentSelectedList.forEach(es => {
        totaldefault += es.cantidad * es.precio;
    });

    const { modalProps, open, close } = useModal({
        background: '#82409d',
        onClose() {
            setAddProduct(false);
        },
    });



    totaldefault += valortamano + valorenvio;
    const [total, setTotal] = useState(totaldefault);

    const onTabRight = () => {
        if (indeximage < product.image.length - 1) {
            let indeximg = indeximage + 1;
            setIndexImage(indeximg)
            setimage(product.image[indeximg])
        }

    }

    const onTabLeft = () => {
        if (indeximage > 0) {
            let indeximg = indeximage - 1;
            setIndexImage(indeximg)
            setimage(product.image[indeximg])
        }
    }

    const ButtonAdd = ({ openModal }) => {
        const btnRef = useRef(null);
        function handleClick() {
            
            setAddProduct(true);
            openModal(btnRef);
        }
        return (

            <button ref={btnRef} className="btn custom" onClick={handleClick}>
                Añadir mas...
            </button>
        );
    };

    const handlSelected = () => {
        let total = 0;
        if (!currentSelectedList.find(selected => selected.id == currentMaterial.id)) {
            if (currentMaterial) {
                if (currentMaterial.isnew) {

                    currentMaterial.cantidad = quantity;
                    currentMaterial.isnew = false;
                    let currentSelectedListFinal = [...currentSelectedList, currentMaterial];
                    setCurrentSelectedList(currentSelectedListFinal);
                    currentSelectedListFinal.forEach(es => {
                        total += es.cantidad * es.precio;
                    });

                } else {
                    let indexMaterial = currentSelectedList.findIndex(selected => selected.id == currentMaterialChanged.id);
                    currentMaterial.cantidad = quantity;
                    currentSelectedList[indexMaterial] = currentMaterial;
                    setCurrentSelectedList(currentSelectedList);

                    currentSelectedList.forEach(es => {
                        total += es.cantidad * es.precio;
                    });
                }
            }
        } else {

            let indexMaterial = currentSelectedList.findIndex(selected => selected.id == currentMaterial.id);
            currentMaterial.cantidad = quantity;
            currentSelectedList[indexMaterial] = currentMaterial;
            setCurrentSelectedList(currentSelectedList);

            currentSelectedList.forEach(es => {
                total += es.cantidad * es.precio;
            });
        }

        let newlistMaterials = listMaterials.map(el => {
            if (el.id == currentMaterialChanged.id && currentMaterial.id != currentMaterialChanged.id) {
                return Object.assign({}, el, { currentSelected: false })
            } else if (el.id == currentMaterial.id) {
                return Object.assign({}, el, { currentSelected: true })
            }
            return el
        });


        total += valortamano + valorenvio;
        setTotal(total);
        setListMaterials(newlistMaterials);
        setQuantity(1);
        close();

    }


    const handleSubmit = () => {

        let path = '';
        if (isLoguin) {
            path = '/account-users/information';
        } else {
            path = '/checkout/buy';
        }
        router.push({
            pathname: path,
            query: { producto: id }
        });
        product.id = id;
        document.cookie = `p_s=${JSON.stringify(product)}; path=/`;

        /*const firebase = loadDB();
        const db = firebase.firestore();

        db.collection('dp_orders').add({ product: firebase.firestore().doc(`/dp_products/${id}`) }).then(snapshot => {


      
        });*/
    }


    return (
        <div>
            <div className="container padding_top_5">
                <div className="container__row">
                    <div className="container__col-md-al-12">
                        <div className="logo-screen-round">
                            <img src={require('../../assets/img/logo_Dp_Extend.png')} alt='Detalle perfecto' />
                        </div>
                    </div>
                    {materials &&
                        <div>
                            <h3>{nombre}</h3>
                            <div className="container__col-md-12 container__col-lg-12">
                                <div className="panel panel-screen-height-1">
                                    <div className="container__row">
                                        <div className="container__col-md-al-12 container__col-lg-al-12">

                                            {product.image &&
                                                product.image.map((imgurl, index) => {
                                                    return (index == indeximage) ? (<img className="panel-primary-img" src={imgurl} />) : (null)
                                                })
                                            }

                                        </div>
                                        <div className="container__row panel-pagination">

                                            {product.image &&
                                                product.image.map((imgurl, index) => {
                                                    return <div className="container__col-md-al-1 container__col-lg-al-1">
                                                        {index == indeximage ? (<div className="panel-pagination-selected">&nbsp;</div>) : (<div className="panel-pagination-unselected">&nbsp;</div>)}
                                                    </div>
                                                })
                                            }

                                        </div>
                                        {indeximage > 0 &&
                                            <button onClick={onTabLeft} className="slideLeft" type="button">
                                                <FontAwesomeIcon icon={faArrowLeft} color="white" className="icon-button-panel-card" width="20" height="20" />
                                            </button>
                                        }

                                        <button onClick={onTabRight} className="slideRight" type="button">
                                            <FontAwesomeIcon icon={faArrowRight} color="white" className="icon-button-panel-card" width="20" height="20" />
                                        </button>

                                    </div>
                                </div>
                            </div>
                            <div className="container__col-md-12 container__col-lg-12">
                                <div className="container__col-md-12 container__col-lg-12">
                                    <div className="panel panel-screen-height-2">
                                        <div className="panel-divider-header">
                                            <div className="container__row">
                                                <div className="container__col-lg-al-1 container__col-md-al-2">
                                                    <FontAwesomeIcon className="panel-icon-button-card" icon={faShoppingCart} color="white" />
                                                </div>
                                                <div className="container__col-lg-5 container__col-md-6">
                                                    <h1>Contenido</h1>
                                                </div>
                                                <div className="container__col-lg-al-3 container__col-md-al-4">
                                                    <ButtonAdd openModal={open} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel-section">
                                            <div className="container__row">
                                                {currentSelectedList &&
                                                    <ListItems list={currentSelectedList} setSuggestion={setSuggestion} setCurrentMaterial={setCurrentMaterial} open={open} materials={materials} isAdd={false} setQuantity={setQuantity} setCurrentMaterialChanged={setCurrentMaterialChanged} />
                                                }
                                            </div>
                                        </div>
                                        <div className="panel-divider-footer">
                                            <div className="container__row">
                                                <div className="container__col-lg-al-1 container__col-md-al-1">
                                                    <FontAwesomeIcon className="panel-icon-button-card" icon={faDollarSign} color="white" />
                                                </div>
                                                <div className="container__col-lg-5 container__col-md-6">
                                                    <h1>{total}</h1>
                                                </div>
                                                <div className="container__col-lg-al-3 container__col-md-al-5">

                                                    <button className="btn custom" onClick={handleSubmit}>Comprar</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <CustomModel modalProps={modalProps} Modal={Modal} currentMaterial={currentMaterial} setCurrentMaterial={setCurrentMaterial} quantity={quantity} handlSelected={handlSelected} close={close} setQuantity={setQuantity} isAdd={addProduct} categories={categories} listMaterials={listMaterials} setCurrentMaterialChanged={setCurrentMaterialChanged} setAddProduct={setAddProduct} setSuggestion={setSuggestion} suggestion={suggestion} />
        </div>

    )
}

export default Custom;