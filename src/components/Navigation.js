import React, {useContext, useRef, useEffect} from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { DmstfctnContext } from "../components/DmstfctnProvider"

const NavigationItems = React.forwardRef( ({items}, ref) => {
  const context = useContext( DmstfctnContext ); 
  
  return (
    (context.siteWidth >= context.breakpoint ) 
      ? items.map( (item, i) => {        
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
    if( context.justUnhovered ){
      //indicator.current.style.transition = 'transform .5s ease-out, width .5s ease-out';
      indicator.current.style.transition = 'none';
    } else {
      indicator.current.style.transition = 'none';
    }
    if( currentItem.current ){
      const currentBounds = currentItem.current.getBoundingClientRect();
      indicator.current.style.display = 'block';
      indicator.current.style.transform = `translateX(${currentBounds.x}px)`;      
      indicator.current.style.width = `${currentBounds.width}px`;
      indicator.current.style.height = `${currentBounds.height}px`;

    } else {
      indicator.current.style.display = 'none';
    }  
  }, [currentItem.current, context.hovered] );

	return (
		<nav 
      className="dc-slideshow-navigation"      
      onMouseLeave={()=>{      
        context.setJustUnhovered();
      }}  
    >
      <div 
        className="indicator"
        ref={indicator}
      />             
      <NavigationItems items={items} ref={currentItem} />			
		</nav>
	)
}