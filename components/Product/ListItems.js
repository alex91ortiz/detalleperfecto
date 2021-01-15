import React, { useRef } from 'react';
import 'react-morphing-modal/dist/ReactMorphingModal.css';


function ListItems({ list, open, setSuggestion, setCurrentMaterial, materials, isAdd, setQuantity, setCurrentMaterialChanged, setAddProduct }) {
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
            if (isAdd) {
                setAddProduct(false);

            } else {
                openModal(btnRef);
            }

        }
        const tittle = isAdd ? "Ver" : "Cambiar";
        const buttonAction = (isAdd ?
            <button className="btn panel-card-button-plus-noicon custom" onClick={handleClick}>
                {tittle}
            </button> :
            <button ref={btnRef} className="btn panel-card-button-plus-noicon custom" onClick={handleClick}>
                {tittle}
            </button>)
        return (
            buttonAction
        );
    };
    const precio = isAdd ? true : false;
    return <div className="container__row container__col-md-12 container__col-lg-12">
        {
            list.map(material => {
                return <div className="panel-card-container-custom  container__col-md-al-4 container__col-lg-al-4" key={material.id}>
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

export default ListItems;