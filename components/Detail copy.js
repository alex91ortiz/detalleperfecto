import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle, faShoppingCart, faDollarSign, faPlus, faMinus, faCheckCircle, faMotorcycle, faBoxOpen, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Tabs from './Tabs/Tabs';
import { useRouter } from 'next/router';
import loadDB from '../firebase.config'
import { useModal, Modal } from 'react-morphing-modal';
import ZoomImg from './ZoomImg';
import 'react-morphing-modal/dist/ReactMorphingModal.css';
import Options from './Product/Options';

function ListItems({ list, open, setSuggestion, setCurrentMaterial, materials, isAdd, setQuantity, setCurrentMaterialChanged }) {
    const Button = ({ openModal, material }) => {
        const btnRef = useRef(null);
        function handleClick() {
            // do some complicated stuff
            if (materials) {
                let suggestionCategoria = materials.filter(m => m.categoria == material.categoria);
                let suggestionSubCategoria = suggestionCategoria.filter(m => m.subcategoria == material.subcategoria);
                setSuggestion(suggestionSubCategoria);
                material.isnew = isAdd ? true : false;
                setCurrentMaterial(material);
                material.isnew ? setQuantity(1) : setQuantity(material.cantidad);
                setCurrentMaterialChanged(material);
            }
            openModal(btnRef);
        }
        const tittle = isAdd ? "Ver" : "Cambiar";
        return (

            <button ref={btnRef} className="btn panel-card-button-plus-noicon custom" onClick={handleClick}>
                {tittle}
            </button>
        );
    };
    const precio = isAdd ? true : false;
    return <div>
        {
            list.map(material => {
                return <div className="panel-card-container container_row container__col-md-2 container__col-xs-5" key={material.id}>
                    <div className="panel-card">
                        <img className="panel-card-img container__col-md-2" src={material.image} />
                        <div className="panel-card-text container__col-md-2"><p>{material.nombre}</p></div>
                        <div className="panel-card-text container__col-md-2"><p>{material.categoria}</p></div>
                        <div className="panel-card-text container__col-md-2"><p>{(!precio) ? material.cantidad : null}</p></div>
                        <div className="panel-card-text container__col-md-2"><p>${(precio) ? material.precio : material.precio * material.cantidad}</p></div>
                        <Button openModal={open} material={material} />
                    </div>
                </div>
            })
        }
    </div>
}

function Detail({ isLoguin, id, product, materials, categories }) {
    let imageDefault = product.image ? product.image[0] : "";
    let contenido = product.contenido ? product.contenido : [];
    const valortamano = product.tamano ? product.tamano.valor : 0;
    const valorenvio = product.envio ? product.envio.valor : 0;
    const [collapse, setCollapse] = useState(false);
    const [suggestion, setSuggestion] = useState(null);
    const [currentMaterial, setCurrentMaterial] = useState(null);
    const [currentMaterialChanged, setCurrentMaterialChanged] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [image, setimage] = useState(imageDefault);
    const [currentSelectedList, setCurrentSelectedList] = useState(contenido);
    const [listMaterials, setListMaterials] = useState(materials);
    const router = useRouter()
    const containerTabs = useRef();
    const containerTabsAdd = useRef();
    let totaldefault = 0;

    currentSelectedList.forEach(es => {
        totaldefault += es.cantidad * es.precio;
    });
    totaldefault += valortamano + valorenvio;
    const [total, setTotal] = useState(totaldefault);


    const { modalProps, open, close } = useModal({
        background: '#82409d',
    });

    const onTabRight = () => {
        containerTabs.current.scrollLeft += 150;
    }

    const onTabLeft = () => {
        containerTabs.current.scrollLeft -= 150;
    }

    const onTabRightAdd = () => {
        containerTabsAdd.current.scrollLeft += 150;
    }

    const onTabLeftAdd = () => {
        containerTabsAdd.current.scrollLeft -= 150;
    }

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
                    currentMaterial.cantidad =  quantity;
                    currentSelectedList[indexMaterial] = currentMaterial;
                    setCurrentSelectedList(currentSelectedList);

                    currentSelectedList.forEach(es => {
                        total += es.cantidad * es.precio;
                    });
                }
            }
        } else {

            let indexMaterial = currentSelectedList.findIndex(selected => selected.id == currentMaterial.id);
            currentMaterial.cantidad =  quantity;
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
        const firebase = loadDB();
        const db = firebase.firestore();

        db.collection('dp_orders').add({ product: firebase.firestore().doc(`/dp_products/${id}`) }).then(snapshot => {

            let path = '';
            if (isLoguin) {
                path = '/account-users/information';
            } else {
                path = '/checkout/buy';
            }
            router.push({
                pathname: path,
                query: { order: snapshot.id }
            });
        });
    }



    return (
        <div>
            <div className="container page-content padding_top_5">
                <div className="container__row">
                    <div className="container__col-md-12 container__col-lg-12">
                        <div className="panel panel-screen-height-1">
                            <div className="container__row">
                                <div className="container__col-md-12 container__col-12">
                                    <div className="panel-gallery">
                                        {product.image &&

                                            product.image.map((imgurl, index) => {
                                                return <img key={index} onClick={() => {
                                                    setimage(imgurl)
                                                }} className="panel-img-subcategory" src={imgurl} />
                                            })

                                        }

                                    </div>
                                </div>
                                <div className="container__col-md-al-12 container__col-lg-al-12">
                                    
                                        <img className="panel-primary-img" src={image} />
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="container__col-md-12 container__col-lg-12">
                        <div className="container__col-md-12 container__col-lg-12">
                            <div className="panel panel-screen-height-2">
                                <div className="panel-divider-header">
                                    <div className="container__row">
                                        <div className="container__col-al-2 container__col-sm-3">
                                            <FontAwesomeIcon icon={faShoppingCart} color="white" className="icon-button-panel-card" width="40" height="50" />
                                        </div>
                                        <div className="container__col-10 container__col-sm-9">
                                            <h1>Contenido</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-section">
                                    <div className="pill_container">
                                        <ol ref={containerTabs} className="pill no-scrollbar">
                                            {currentSelectedList &&
                                                <ListItems list={currentSelectedList} setSuggestion={setSuggestion} setCurrentMaterial={setCurrentMaterial} open={open} materials={materials} isAdd={false} setQuantity={setQuantity} setCurrentMaterialChanged={setCurrentMaterialChanged} />
                                            }
                                        </ol>
                                        <button onClick={onTabLeft} className="pill-slideLeft" type="button">
                                            <FontAwesomeIcon icon={faArrowLeft} color="white" className="icon-button-panel-card" width="20" height="20" />
                                        </button>
                                        <button onClick={onTabRight} className="pill-slideRight_expand" type="button">
                                            <FontAwesomeIcon icon={faArrowRight} color="white" className="icon-button-panel-card" width="20" height="20" />
                                        </button>
                                    </div>
                                    
                                    <br/>
                                    <div className="container__row panel-section-info">
                                        <div className="container__col-lg-12 container__col-md-al-4">
                                            <div className="panel-section-info-conent">
                                                <img className="panel-section-info-img" src={(product.ocasion) ? Options.Ocations.find(le => le.value == product.ocasion.id).img: ""} />
                                                <span className="panel-section-info-text">{(product.ocasion) ? product.ocasion.nombre: ""}</span>
                                            </div>
                                        </div>
                                        <div className="container__col-lg-12 container__col-md-4">
                                            <div className="panel-section-info-conent">
                                                <FontAwesomeIcon icon={faMotorcycle} color="purple" className="icon-button-panel-card" width="30" height="30" />
                                                <span className="panel-section-info-text">Envio incluido</span>
                                            </div>
                                        </div>
                                        <div className="container__col-lg-12 container__col-md-4">
                                            <div className="panel-section-info-conent">
                                                <FontAwesomeIcon icon={faBoxOpen} color="purple" className="icon-button-panel-card" width="30" height="30" />
                                                <span className="panel-section-info-text">Caja pequeña con marco decorado $20000</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="container__col-md-12 container__col-lg-12">
                        <div className="panel">
                            <div className="panel-divider-header">
                                <div className="container__row">
                                    <div className="container__col-al-1 container__col-sm-3">
                                        <button className="btn custom collapsible" onClick={() => setCollapse(!collapse)}>
                                            <div className="Texto_Personalizalo_Class">
                                                <FontAwesomeIcon icon={(collapse) ? faMinusCircle : faPlusCircle} className="icon-button-panel-card" width="30" height="30" />
                                            </div>
                                        </button>
                                    </div>
                                    <div className="container__col-11 container__col-sm-9">
                                        <h1>Agrega mas..</h1>
                                    </div>
                                </div>
                            </div>
                            <div className={`panel-section ${(collapse) ? 'collapsible_content_open' : 'collapsible_content_close'}`}>
                                <Tabs>
                                    {categories.listado.map(categoria => {
                                        let list = listMaterials.filter(lism => lism.categoria == categoria);
                                        return <div label={categoria}>
                                            <ol ref={containerTabsAdd} className="pill no-scrollbar">
                                                <ListItems list={list} setSuggestion={setSuggestion} setCurrentMaterial={setCurrentMaterial} open={open} materials={listMaterials} isAdd={true} setQuantity={setQuantity} setCurrentMaterialChanged={setCurrentMaterialChanged} />
                                            </ol>
                                            {list.length > 5 ? (
                                                <div>
                                                    <button onClick={onTabLeftAdd} className="pill-slideLeft" type="button">
                                                        <FontAwesomeIcon icon={faArrowLeft} color="white" className="icon-button-panel-card" width="20" height="20" />
                                                    </button>
                                                    <button onClick={onTabRightAdd} className="pill-slideRight_expand" type="button">
                                                        <FontAwesomeIcon icon={faArrowRight} color="white" className="icon-button-panel-card" width="20" height="20" />
                                                    </button>
                                                </div>
                                            ) : null}
                                        </div>
                                    })}


                                </Tabs>
                            </div>

                            <div className="panel-divider-footer">
                                <div className="container__row">
                                    <div className="container__col-al-1 container__col-sm-2">
                                        <FontAwesomeIcon icon={faDollarSign} color="white" className="icon-button-panel-card" width="40" height="50" />
                                    </div>
                                    <div className="container__col-8 container__col-sm-4">
                                        <h1>{total}</h1>
                                    </div>
                                    <div className="container__col-al-3 container__col-sm-3">

                                        <button className="btn purple panel-divider-footer-button-check" onClick={handleSubmit}>Comprar</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal {...modalProps} closeButton={false} padding={true} className="modal-body">
                {currentMaterial ? (
                    <div className="modal container__row">

                        <h3>
                            Puedes agregar las caracteristicas que deseas!
                        </h3>


                        <div className="container__row">
                            <div className="container__col-md-al-6 container__col-lg-al-12">
                                <img className="modal-img" src={currentMaterial.image} />
                            </div>

                            <div className="container__col-md-6 container__col-lg-12">
                                <div className="modal-summary">
                                    {!currentMaterial.isnew &&
                                        <div className="pill_container">
                                            <ol className="pill">

                                                {suggestion ? (
                                                    suggestion.map(material => {
                                                        return <img onClick={() => {
                                                            setCurrentMaterial(material);
                                                        }} className="modal-img-subcategory" src={material.image} />
                                                    })
                                                ) : null
                                                }

                                            </ol>
                                        </div>}

                                    <p>{currentMaterial.categoria} - {currentMaterial.nombre}</p>
                                    <h2>{currentMaterial.precio}</h2>

                                    {currentMaterial.tipo &&
                                        <div>
                                            <p>Elije como lo quieres:</p>
                                            <div className="modal-summary-content-types">

                                                <div className="plan">
                                                    <div className="container__row">
                                                        <div className="container__col-md-6 container__col-lg-6">
                                                            <input type="radio" name="tipo" id="tipo1" onChange={()=>{
                                                                let newCurrentMaterial = currentMaterial;
                                                                newCurrentMaterial.tipo = 'Aire'
                                                                setCurrentMaterial(newCurrentMaterial);
                                                            }} defaultChecked={currentMaterial.tipo == 'Aire'} />
                                                            <label className="tipo-label four col" htmlFor="tipo1">
                                                                Sin helio
                                                    </label>
                                                        </div>
                                                        <div className="container__col-md-6 container__col-lg-6" >
                                                            <input type="radio" id="tipo2" name="tipo" onChange={()=>{
                                                                let newCurrentMaterial = currentMaterial;
                                                                newCurrentMaterial.tamano = 'Helio'
                                                                setCurrentMaterial(newCurrentMaterial);
                                                            }} defaultChecked={currentMaterial.tipo == 'Helio'} />
                                                            <label className="tipo-label four col" htmlFor="tipo2">
                                                                Con helio
                                                    </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {currentMaterial.tamano &&
                                        <div>
                                            <p>En que tamaño lo quieres:</p>
                                            <div className="modal-summary-content-types">
                                                <div className="plan">
                                                    <div className="container__row">
                                                        <div className="container__col-md-6 container__col-lg-6">
                                                            <input type="radio" name="tamano" onChange={()=>{
                                                                let newCurrentMaterial = currentMaterial;
                                                                newCurrentMaterial.tamano = 1
                                                                setCurrentMaterial(newCurrentMaterial);
                                                            }} id="tamano1" defaultChecked={currentMaterial.tamano == 1 } />
                                                            <label className="tipo-label four col" htmlFor="tamano1">
                                                                pequeño
                                                    </label>
                                                        </div>
                                                        <div className="container__col-md-6 container__col-lg-6" >
                                                            <input type="radio" onChange={()=>{
                                                                let newCurrentMaterial = currentMaterial;
                                                                newCurrentMaterial.tamano = 3
                                                                setCurrentMaterial(newCurrentMaterial);
                                                            }}  id="tamano2" name="tamano" defaultChecked={currentMaterial.tamano == 3 } />
                                                            <label className="tipo-label four col" htmlFor="tamano2">
                                                                Grande
                                                    </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <p>Cuantos deseas:</p>
                                    <div className="modal-summary-content-buttons">
                                        <button onClick={() => {
                                            let newQuantitty = quantity - 1;
                                            setQuantity(newQuantitty)
                                            if (!currentMaterial.new && newQuantitty == 0) {
                                                let currentSelectedListDelete = currentSelectedList.filter(cld => cld.id != currentMaterial.id);
                                                setCurrentSelectedList(currentSelectedListDelete);
                                                close();
                                            }
                                        }} className="btn panel-card-button-plus custom">
                                            <FontAwesomeIcon icon={faMinus} width="20" height="20" />
                                        </button>
                                        <div>
                                            <input type="text" name="quantity" onChange={e => e.target.value != "" ? setQuantity(parseInt(e.target.value)) : 0} value={quantity} id="quantity" />
                                        </div>
                                        <button onClick={() => {
                                            setQuantity(quantity + 1)
                                        }} className="btn panel-card-button-minus custom">
                                            <FontAwesomeIcon icon={faPlus} width="20" height="20" />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="container__col-12">
                            <div className="container__row">
                                <div className="container__col-md-al-6 container__col-lg-al-6">
                                    <a onClick={close} className="modal-button-general">Salir</a>
                                </div>
                                <div className="container__col-md-al-6 container__col-lg-al-6">
                                    <button onClick={handlSelected} className="btn purple modal-button-general">
                                        {currentMaterial.isnew ? ("Añadir") : ("Guardar")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </Modal>  
        </div>
    )
}



export default Detail;