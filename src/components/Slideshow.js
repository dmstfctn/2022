import React, {useContext, useState}  from "react"
import { DmstfctnContext } from "../components/DmstfctnProvider"
import { Slides } from '../components/Slides'
import { Information } from '../components/Information'
import { Navigation } from '../components/Navigation'

import "./Slideshow.scss"

export const Slideshow = ({main, small, meta}) => {
  const context = useContext( DmstfctnContext );
  const slides = main;//(window.innerWidth > 800) ? main : small;
  const length = slides.length - 1; 

   
  const changeSlide = function( by ){ 
    const suggested = context.currentSlide + by;
    const to = (suggested > length) ? 0 : (suggested < 0) ? length : suggested;
    context.setCurrentSlide( to );
  }
    return(
      <>  
        <Slides        
          current={main[context.currentSlide]}
          currentAlt={(meta[context.currentSlide]) ? meta[context.currentSlide].title : ''}
          prev={main[ (context.currentSlide - 1 >= 0 ) ? context.currentSlide-1 : length ]}
          next={main[(context.currentSlide + 1 <= length ) ? context.currentSlide+1 : 0 ]}
          onChange={ changeSlide }
        /> 
        <Information
          index={(context.hovered > -1) ? context.hovered : context.currentSlide}
          total={length}
          title={(meta[(context.hovered > -1) ? context.hovered : context.currentSlide]) ? meta[(context.hovered > -1) ? context.hovered : context.currentSlide].title : 'UNTITLED'}
          url={ (meta[(context.hovered > -1) ? context.hovered : context.currentSlide]) ? meta[(context.hovered > -1) ? context.hovered : context.currentSlide].url : '#' }
        />
        <Navigation
          items={slides}
        />
      </>
    )
}