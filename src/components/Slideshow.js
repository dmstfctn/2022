import React, {useContext, useEffect}  from "react"
import { DmstfctnContext } from "../components/DmstfctnProvider"
import { Slides } from '../components/Slides'
import { Information } from '../components/Information'
import { Navigation } from '../components/Navigation'
import { Progress } from '../components/Progress'

import "./Slideshow.scss"

export const Slideshow = ({main, small, meta}) => {
  const context = useContext( DmstfctnContext );  
  const length = main.length - 1;

  const currentIndex = context.currentSlide;
  const nextIndex = (context.currentSlide + 1 <= length ) ? context.currentSlide + 1 : 0;
  const nextNextIndex = (context.currentSlide + 2 <= length ) ? context.currentSlide + 2 : (context.currentSlide + 2) - length;
  const prevIndex = (context.currentSlide - 1 >= 0 ) ? context.currentSlide-1 : length;
  const prevPrevIndex = (context.currentSlide - 2 >= 0 ) ? context.currentSlide - 2 : length + (context.currentSlide - 1); 

  const changeSlide = function( by ){ 
    const suggested = context.currentSlide + by;
    const to = (suggested > length) ? 0 : (suggested < 0) ? length : suggested;
    context.setCurrentSlide( to );
  }

  useEffect(()=>{
    const onKey = function( e ){
      if( e.key === 'ArrowRight' ){
        changeSlide( 1 )
      }
      if( e.key === 'ArrowLeft' ){
        changeSlide( -1 );
      }
    }
    window.addEventListener( 'keyup', onKey )
    return () => {
      window.removeEventListener( 'keyup', onKey );
    }
  })

  return(
    <>  
      <Slides        
        currentMain={main[currentIndex]}
        currentSmall={small[currentIndex]}
        currentAlt={(meta[currentIndex]) ? meta[currentIndex].title : ''}
        prevMain={main[prevIndex]}
        prevSmall={small[prevIndex]}
        prevPrevMain={main[prevPrevIndex]}        
        prevPrevSmall={small[prevPrevIndex]}
        nextMain={main[nextIndex]}
        nextSmall={small[nextIndex]}
        nextNextMain={main[nextNextIndex]}
        nextNextSmall={small[nextNextIndex]}
        onChange={ changeSlide }
      /> 
      <Information
        index={(context.hovered > -1) ? context.hovered : context.currentSlide}
        total={length}
        title={(meta[(context.hovered > -1) ? context.hovered : context.currentSlide]) ? meta[(context.hovered > -1) ? context.hovered : context.currentSlide].title : 'UNTITLED'}
        url={ (meta[(context.hovered > -1) ? context.hovered : context.currentSlide]) ? meta[(context.hovered > -1) ? context.hovered : context.currentSlide].url : '#' }
      />      
      <Navigation
        items={main}
      />
      <Progress
        current={context.currentSlide}
        total={length}
      />
    </>
  )
}