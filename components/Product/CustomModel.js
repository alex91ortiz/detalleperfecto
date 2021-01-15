import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Tabs from '../Tabs/Tabs';
import ListItems from './ListItems';
function CustomModel({ modalProps, Modal, currentMaterial, setCurrentMaterial, quantity, setQuantity, handlSelected, close, isAdd, categories, listMaterials, setCurrentMaterialChanged, setAddProduct, setSuggestion, suggestion }) {
    const containerTabsAdd = useRef();
    const onTabRightAdd = () => {
        containerTabsAdd.current.scrollLeft += 150;
    }


    const onTabLeftAdd = () => {
        containerTabsAdd.current.scrollLeft -= 150;
    }

    return (
        <div><Modal {...modalProps} closeButton={false} padding={true} className="modal-body">
            <div className="modal container__row">
                {isAdd ? (
                    <div>
                        <h3>Puedes agregar mas productos!</h3>
                        <div className="container__row">
                            <div className="container__col-md-12 container__col-lg-al-12">
                                <Tabs>
                                    {categories.listado.map(categoria => {
                                        let list = listMaterials.filter(lism => lism.categoria == categoria);
                                        return <div label={categoria}>
                                            <ol ref={containerTabsAdd} className="pill no-scrollbar">
                                                <ListItems list={list} setSuggestion={setSuggestion} setCurrentMaterial={setCurrentMaterial} open={open} materials={listMaterials} isAdd={isAdd} setQuantity={setQuantity} setCurrentMaterialChanged={setCurrentMaterialChanged} setAddProduct={setAddProduct} />
                                            </ol>
                                        </div>
                                    })}
                                </Tabs>
                            </div>
                            <div className="container__col-12">
                                <div className="container__row">
                                    <div className="container__col-md-al-6 container__col-lg-al-6">
                                        <a onClick={close} className="modal-button-general">Salir</a>
                                    </div>
                                    <div className="container__col-md-al-6 container__col-lg-al-6">
                                        <button onClick={handlSelected} className="btn purple modal-button-general">
                                            {isAdd ? ("Añadir") : ("Guardar")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            &nbsp;
                        </div>
                    </div>
                ) : (
                        currentMaterial ? (
                            <div className="modal-body">
                                <h3>Puedes agregar o cambiar tus prodcutos!</h3>
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
                                                                return <img key={material.id} onClick={() => {
                                                                    material['isnew'] = false;
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
                                                                    <input type="radio" name="tipo" id="tipo1" onChange={() => {
                                                                        let newCurrentMaterial = currentMaterial;
                                                                        newCurrentMaterial.tipo = 'Aire'
                                                                        setCurrentMaterial(newCurrentMaterial);
                                                                    }} defaultChecked={currentMaterial.tipo == 'Aire'} />
                                                                    <label className="tipo-label four col" htmlFor="tipo1">Sin helio</label>
                                                                </div>
                                                                <div className="container__col-md-6 container__col-lg-6" >
                                                                    <input type="radio" id="tipo2" name="tipo" onChange={() => {
                                                                        let newCurrentMaterial = currentMaterial;
                                                                        newCurrentMaterial.tamano = 'Helio'
                                                                        setCurrentMaterial(newCurrentMaterial);
                                                                    }} defaultChecked={currentMaterial.tipo == 'Helio'} />
                                                                    <label className="tipo-label four col" htmlFor="tipo2">Con helio</label>
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
                                                                    <input type="radio" name="tamano" onChange={() => {
                                                                        let newCurrentMaterial = currentMaterial;
                                                                        newCurrentMaterial.tamano = 1
                                                                        setCurrentMaterial(newCurrentMaterial);
                                                                    }} id="tamano1" defaultChecked={currentMaterial.tamano == 1} />
                                                                    <label className="tipo-label four col" htmlFor="tamano1">
                                                                        pequeño
                                                        </label>
                                                                </div>
                                                                <div className="container__col-md-6 container__col-lg-6" >
                                                                    <input type="radio" onChange={() => {
                                                                        let newCurrentMaterial = currentMaterial;
                                                                        newCurrentMaterial.tamano = 3
                                                                        setCurrentMaterial(newCurrentMaterial);
                                                                    }} id="tamano2" name="tamano" defaultChecked={currentMaterial.tamano == 3} />
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
                                            {currentMaterial.isnew ?
                                                (
                                                    <a onClick={() => setAddProduct(true)} className="modal-button-general">Volver</a>
                                                ) :
                                                (
                                                    <a onClick={close} className="modal-button-general">Salir</a>
                                                )
                                            }

                                        </div>
                                        <div className="container__col-md-al-6 container__col-lg-al-6">
                                            <button onClick={handlSelected} className="btn purple modal-button-general">
                                                {currentMaterial.isnew ? ("Añadir") : ("Guardar")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                &nbsp;
                            </div>
                        ) : null
                    )}
            </div>
        </Modal>
        </div>
    );
}

export default CustomModel;