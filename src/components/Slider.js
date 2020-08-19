import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'reactstrap';
import { cardElements } from '../cardElement';


export const Slider = () => {

    const [slides] = useState(cardElements);
    const [auto, setAuto] = useState(true)
    const firstSlide = slides[0]
    const secondSlide = slides[1]
    const lastSlide = slides[slides.length - 1]

    //State Variables
    const [state, setState] = useState({
        activeSlide: 0,
        _slides: [lastSlide, firstSlide, secondSlide],
        transition: 0.45,
        translate: -100,
    })

    const { activeSlide, _slides, translate, transition } = state
    const transitionRef = useRef()
    const autoPlay = useRef()

    //Effect Hook
    useEffect(() => {
        transitionRef.current = smoothTransition
        autoPlay.current = goRight
    })

    useEffect(() => {
        const play = () => {
            autoPlay.current()
        }
        const smooth = e => {
            if (e.target.className.includes('slide')) {
                transitionRef.current()
            }
        }
        const transitionEnd = window.addEventListener('transitionend', smooth)
        let interval = null
        interval = setInterval(play, 2500)
        return () => {
            window.removeEventListener('transitionend', transitionEnd)
            clearInterval(interval)

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
        if (activeSlide === slides.length - 1)
            _slides = [slides[slides.length - 2], lastSlide, firstSlide]
        else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide]
        else _slides = slides.slice(activeSlide - 1, activeSlide + 2)
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
            activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1
        })
    }

    const goRight = () => {
        setState({
            ...state,
            translate: -200,
            activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1
        })
    }

    const togglePlay = () => {
        setAuto(!auto);
    }

    return (
        <diV className="page" style={styleContainer}>
            <h1 style={{ marginBottom: 100, paddingTop: 30 }}> Making a smooth slider using React Hooks  </h1>
            <div className="slideParent" style={styleCardParent}>
                {
                    _slides.map((slide) => {
                        return (
                            <div className="row" style={styleCard} >
                                <div key={slide.id} className="slide" style={{ transform: `translateX(${translate}%)`, transition: '0.5s' }}>
                                        <h2> {slide.title} </h2>
                                    <h5> {slide.subtitle} </h5>
                                    <p style={{ marginTop: 20, marginLeft: 55, marginRight: 55, marginBottom: 40 }}> {slide.text} </p>
                                    </div>
                                </div>
                            );
                    })
                }
                <Button className="arrow" onClick={goLeft} style={styleButtonLeft} > <span> <i class="fa fa-arrow-left" aria-hidden="true"></i> </span> </Button>
                <Button className="arrow" onClick={goRight} style={styleButtonRight} > <span> <i class="fa fa-arrow-right" aria-hidden="true"></i> </span> </Button>
                <div className="Dots" style={styleDots}>
                    {
                        slides.map((slide, i) => {
                            return (
                                <span className="Dot" style={{ background: `${(activeSlide === i) ? 'grey' : 'black'}`, padding: 10, borderRadius: '100%', marginRight: 5 }}>  </span>
                            )
                        })
                    }
                </div>
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
    height: '55%',
    overflow: 'hidden',
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: '5%',
    boxShadow: '10px 10px 10px grey'
}

const styleCard = {
    margin: 0, 
    minWidth: '100%',
    maxHeight: '100%',
    color: 'black',
    border: '1px solid white',
}

const styleButtonLeft = {
    position: 'absolute',
    top: '50%',
    left: 10,
    transform: 'translateY(-50%)',
    borderRadius: 100
}

const styleButtonRight = {
    position: 'absolute',
    top: '50%',
    right: 10,
    transform: 'translateY(-50%)',
    borderRadius: 100
}

const styleDots = {
    position: 'absolute',
    bottom: 10,
    left: 0, 
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
}
