import React, { useState, useEffect, useRef } from 'react';
import {CSSTransitionGroup}  from 'react-transition-group';


function History({ current, items, changeSilde }) {


    
    let itemsFinal = items.map((el, index) => {
        let name = (index == current) ? 'active' : '';
        return (
            <li key={index}>
                <button
                    className={name}
                    onClick={() => changeSilde(current, index)}
                ></button>
            </li>
        )
    });

    return (
        <ul>{itemsFinal}</ul>
    )

}


export default function Carousel() {

    const items = [
        'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/HA1RQCRQJ7.jpg',
        'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/EVHXF4MUT6.jpg',
        'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/D7VE3SK3RD.jpg',
        'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/0XRFUE80AZ.jpg',
        'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/2DQJJ9RLVD.jpg'
    ];
    const [current, setCurrent] = useState(0);
    const [isNext, setIsNext] = useState(true);




    const handlerPrev = () => {
        let index = current,
            length = items.length;

        if (index < 1) {
            index = length;
        }

        index = index - 1;
        setCurrent(index);
        setIsNext(false);

    }

    const handlerNext = () => {
        let index = current,
            length = items.length - 1;

        if (index == length) {
            index = -1;
        }

        index = index + 1;
        setCurrent(index);
        setIsNext(true);

    }

    const goToHistoryClick = (curIndex, index) => {
        let next = (curIndex < index);
        setCurrent(index);
        setIsNext(next);

    }


    let index = current,
        isnext = isNext,
        src = items[index];

    return (
        <div className="app-carousel">
            <div className="carousel">
                
                    <div className="carousel_slide" key={index}>
                        <img src={src} />
                    </div>
                
                <button className="carousel_control carousel_control__prev" onClick={handlerPrev}><span></span></button>
                <button className="carousel_control carousel_control__next" onClick={handlerNext}><span></span></button>
                <div className="carousel_history">
                    <History
                        current={current}
                        items={items}
                        changeSilde={goToHistoryClick}
                    />
                </div>
            </div>
        </div>
    )

}
