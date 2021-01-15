import React, { useState, useEffect, useRef } from 'react';




function Detail({ isLoguin, id, product, materials, categories }) {
    let imageDefault = product.image ? product.image[0] : "";
    const [image, setimage] = useState(imageDefault);
    return (
        <div className="container page-content padding_top_5">
            
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
    )
}

export default Detail;