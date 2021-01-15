import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faDollarSign,
  faArrowLeft,
  faArrowRight,
  faMotorcycle,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import { CSSTransitionGroup } from "react-transition-group";
import ListContent from "./ListContent";
import { useRouter } from "next/router";
import Options from "../Options";
import cookies from 'next-cookies'
function Box({
  product,
  isLoguin,
  id,
  materials,
  oncustomsection,
  categories,
}) {
  const [indeximage, setIndexImage] = useState(0);
  let imageDefault = product.image ? product.image[indeximage] : "";
  let contenido = product.contenido ? product.contenido : [];
  let nombre = product.nombre ? product.nombre : "";
  const valortamano = product.tamano ? product.tamano.valor : 0;
  const valorenvio = product.envio ? product.envio.valor : 0;
  const [image, setimage] = useState(imageDefault);
  const router = useRouter();
  const [currentSelectedList, setCurrentSelectedList] = useState(contenido);

  const containerTabs = useRef();
  let totaldefault = 0;

  currentSelectedList.forEach((es) => {
    totaldefault += es.cantidad * es.precio;
  });
  totaldefault += valortamano + valorenvio;
  const [total, setTotal] = useState(totaldefault);

  const onTabRight = () => {
    if (indeximage < product.image.length - 1) {
      let indeximg = indeximage + 1;
      setIndexImage(indeximg);
      setimage(product.image[indeximg]);
    }
  };

  const onTabLeft = () => {
    if (indeximage > 0) {
      let indeximg = indeximage - 1;
      setIndexImage(indeximg);
      setimage(product.image[indeximg]);
    }
  };

  const handleSubmit = () => {
    let path = "";
    if (isLoguin) {
      path = "/account-users/information";
    } else {
      path = "/checkout/buy";
    }
    router.push({
      pathname: path,
      query: { producto: id },
    });
    product.id = id;
    document.cookie = `p_s=${JSON.stringify(product)}; path=/`;

    /*const firebase = loadDB();
        const db = firebase.firestore();

        db.collection('dp_orders').add({ product: firebase.firestore().doc(`/dp_products/${id}`) }).then(snapshot => {


      
        });*/
  };

  return (
    <div className="container padding_top_5">
      <div className="container__row">
        <div className="container__col-md-al-12">
          <div className="logo-screen-round">
            <img
              src={require("../../assets/img/logo_Dp_Extend.png")}
              alt="Detalle perfecto"
            />
          </div>
        </div>
        {materials && (
          <div>
            <h3> {nombre} </h3>
            <div className="container__col-md-12 container__col-lg-12">
              <div className="panel panel-screen-height-1">
                <div className="container__row">
                  <div className="container__col-md-al-12 container__col-lg-al-12">
                    {product.image &&
                      product.image.map((imgurl, index) => {
                        return index == indeximage ? (
                          <img className="panel-primary-img" src={imgurl} />
                        ) : null;
                      })}
                  </div>
                  <div className="container__row panel-pagination">
                    {product.image &&
                      product.image.map((imgurl, index) => {
                        return (
                          <div className="container__col-md-al-1 container__col-lg-al-1">

                            {index == indeximage ? (
                              <div className="panel-pagination-selected">
                                &nbsp;
                              </div>
                            ) : (
                                <div className="panel-pagination-unselected">
                                  &nbsp;
                                </div>
                              )}
                          </div>
                        );
                      })}
                  </div>
                  {indeximage > 0 && (
                    <button onClick={onTabLeft} className="slideLeft" type="button" >
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        color="white"
                        className="icon-button-panel-card"
                        width="20"
                        height="20"
                      />
                    </button>
                  )}
                  <button onClick={onTabRight} className="slideRight" type="button">
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      color="white"
                      className="icon-button-panel-card"
                      width="20"
                      height="20"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="container__col-md-12 container__col-lg-12">
              <div className="panel panel-screen-height-2">
                <div className="container__row panel-section-info">
                  <div className="container__col-lg-12 container__col-md-al-4">
                    <div className="panel-section-info-conent">
                      <img
                        className="panel-section-info-img"
                        src={
                          product.ocasion
                            ? Options.Ocations.find(
                              (le) => le.value == product.ocasion.id
                            ).img
                            : ""
                        }
                      />
                      <span className="panel-section-info-text">

                        {product.ocasion ? product.ocasion.nombre : ""}
                      </span>
                    </div>
                  </div>
                  <div className="container__col-lg-12 container__col-md-4">
                    <div className="panel-section-info-conent">
                      <FontAwesomeIcon icon={faMotorcycle} color="purple" className="icon-button-panel-card"  />
                      <span className="panel-section-info-text">

                        Envio incluido
                      </span>
                    </div>
                  </div>
                  <div className="container__col-lg-12 container__col-md-4">
                    <div className="panel-section-info-conent">
                      <FontAwesomeIcon icon={faBoxOpen} color="purple" className="icon-button-panel-card"  />
                      <span className="panel-section-info-text">

                        Caja pequeña con marco decorado $20000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container__col-md-12 container__col-lg-12">
              <div className="container__col-md-12 container__col-lg-12">
                <div className="panel panel-screen-height-2">
                  <div className="panel-divider-header">
                    <div className="container__row">
                      <div className="container__col-lg-al-1 container__col-md-al-2">
                        <FontAwesomeIcon
                          className="panel-icon-button-card"
                          icon={faShoppingCart}
                          color="white"
                        />
                      </div>
                      <div className="container__col-lg-5 container__col-md-6">
                        <h1> Contenido </h1>
                      </div>
                      <div className="container__col-lg-al-3 container__col-md-al-4">
                        <button
                          className="btn custom"
                          onClick={() => oncustomsection(2)}
                        >
                          Personalizar
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="panel-section">
                    <div className="container__row">

                      {currentSelectedList && (
                        <ListContent content={currentSelectedList} />
                      )}
                    </div>
                  </div>
                  <div className="panel-divider-footer">
                    <div className="container__row">
                      <div className="container__col-lg-al-1 container__col-md-al-1">
                        <FontAwesomeIcon
                          className="panel-icon-button-card"
                          icon={faDollarSign}
                          color="white"
                        />
                      </div>
                      <div className="container__col-lg-5 container__col-md-6">
                        <h1> {total} </h1>
                      </div>
                      <div className="container__col-lg-al-3 container__col-md-al-5">
                        <button className="btn custom" onClick={handleSubmit}>
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Box;
