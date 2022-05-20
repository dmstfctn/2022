import React, {useContext, useRef, useEffect} from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { DmstfctnContext } from "../components/DmstfctnProvider"

const NavigationItems = React.forwardRef( ({items}, ref) => {
  const context = useContext( DmstfctnContext ); 
  
  return (
    (context.siteWidth >= context.breakpoint ) 
      ? items.map( (item, i) => {
        console.log( i === context.currentSlide );
        return (
          ( (context.hovered > -1) ? i === context.hovered : i === context.currentSlide ) ? 
            <div 
              className={`item${(context.hovered === -1 && i === context.currentSlide) ? ' current' : ''}`}
              key={item.name}
              onClick={() => {            
                context.setCurrentSlide( i )
              }}
              onMouseEnter={()=>{
                context.setHovered( i );
              }}
              onMouseLeave={()=>{
                context.setHovered( -1 );
              }}
              ref={ref}            
            >
              <GatsbyImage
                alt=""
                image={getImage( item.thumbImage )} 
                objectFit="cover"
                loading="lazy"        
              />
            </div>
          :
          <div 
              className={`item${(context.hovered === -1 && i === context.currentSlide) ? ' current' : ''}`}
              key={item.name}
              onClick={() => {            
                context.setCurrentSlide( i )
              }}
              onMouseEnter={()=>{
                context.setHovered( i );
              }}
              onMouseLeave={()=>{
                context.setHovered( -1 );
              }}                  
            >
              <GatsbyImage
                alt=""
                image={getImage( item.thumbImage )} 
                objectFit="cover"
                loading="lazy"        
              />
            </div>
        )
      }) 
      : false 
  )
})

export const Navigation = ({items}) => {
  const context = useContext( DmstfctnContext );  
  const indicatorIndex = (context.hovered === -1) ? context.currentSlide : context.hovered;
  const currentItem = useRef();
  const indicator = useRef();

  useEffect(() => {
    if( context.hovered === -1 ){
      indicator.current.style.transition = 'transform .3s .2s ease-in-out';
    } else {
      indicator.current.style.transition = 'none';
    }
    if( currentItem.current ){
      const currentBounds = currentItem.current.getBoundingClientRect();
      console.log( `${currentBounds.x}px)` );
      indicator.current.style.display = 'block';
      indicator.current.style.transform = `translateX(${currentBounds.x}px)`;
      //indicator.current.style.left = `${currentBounds.x}px`;
      indicator.current.style.width = `${currentBounds.width}px`;
      indicator.current.style.height = `${currentBounds.height}px`;

    } else {
      indicator.current.style.display = 'none';
    }  
  }, [currentItem.current] );

	return (
		<nav className="dc-slideshow-navigation">
      <div 
        className="indicator"
        ref={indicator}
      />             
      <NavigationItems items={items} ref={currentItem} />			
		</nav>
	)
}