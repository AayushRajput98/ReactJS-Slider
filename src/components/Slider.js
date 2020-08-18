import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'reactstrap';
import { cardElements } from '../cardElement';


export const Slider = () => {

    const [cards] = useState(cardElements);
    const firstSlide = cards[0]
    const secondSlide = cards[1]
    const lastSlide = cards[cards.length - 1]

    //State Variables
    const [state, setState] = useState({
        activeSlide: 0,
        _slides: [lastSlide, firstSlide, secondSlide],
        transition: 0.45,
        translate: -100,
    })

    const { activeSlide, _slides, translate, transition } = state
    const transitionRef = useRef()

    //Effect Hook
    useEffect(() => {
        transitionRef.current = smoothTransition
    })

    useEffect(() => {
        console.log('Smooth')
        const smooth = e => {
            if (e.target.className.includes('card')) {
                transitionRef.current()
            }
        }
        const transitionEnd = window.addEventListener('transitionend', smooth)
        return () => {
            window.removeEventListener('transitionend', transitionEnd)
        }
    }, [])

    useEffect(() => {
        if (transition === 0)
            setState({
                ...state,
                transition: 0.45
            })
    }, [transition])

    const smoothTransition = () => {
        let _slides = []
        if (activeSlide === cards.length - 1)
            _slides = [cards[cards.length - 2], lastSlide, firstSlide]
        else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide]
        else _slides = cards.slice(activeSlide - 1, activeSlide + 2)
        setState({
            ...state,
            _slides: _slides,
            translate: -100,
            transition: 0
        })
    }
    console.log(state)

    const goLeft = () => {
        setState({
            ...state,
            translate: 0,
            activeSlide: activeSlide === 0 ? cards.length - 1 : activeSlide - 1
        })
    }

    const goRight = () => {
        setState({
            ...state,
            translate: -200,
            activeSlide: activeSlide === cards.length - 1 ? 0 : activeSlide + 1
        })
    }
    return (
        <diV className="page" style={styleContainer}>
            <h1> Making a smooth slider using React Hooks  </h1>
            <div className="cardParent" style={styleCardParent}>
                {
                    _slides.map((card) => {
                        return (
                            <div className="row" style={styleCard} >
                                <div key={card.id} className="card" style={{ transform: `translateX(${translate}%)`, transition: '0.5s' }}>
                                        <h2> {card.title} </h2>
                                    <h5> {card.subtitle} </h5>
                                    <p style={{ marginTop: 20, marginLeft: 55, marginRight: 55, marginBottom: 40 }}> {card.text} </p>
                                    </div>
                                </div>
                            );
                    })
                }
                <Button className="arrow" onClick={goLeft} style={styleButtonLeft} > <span> <i class="fa fa-arrow-left" aria-hidden="true"></i> </span> </Button>
                <Button className="arrow" onClick={goRight} style={styleButtonRight} > <span> <i class="fa fa-arrow-right" aria-hidden="true"></i> </span> </Button>
            </div>
        </diV>
        );
}



//Styles

const styleContainer = {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'black',
    color: 'white'
}

const styleCardParent = {
    position: 'relative',
    margin: 'auto',
    alignItems: 'center',
    width: '45%',
    height: '70%',
    overflow: 'hidden',
    display: 'flex',
}

const styleCard = {
    backgroundColor: 'white',
    margin: 0, 
    minWidth: '100%',
    maxHeight: '100%',
    color: 'black',
}

const styleButtonLeft = {
    position: 'absolute',
    top: '50%',
    left: 10,
    transform: 'translateY(-50%)',
    borderRadius: 100
}

const styleShadow = {
}

const styleButtonRight = {
    position: 'absolute',
    top: '50%',
    right: 10,
    transform: 'translateY(-50%)',
    borderRadius: 100
}

