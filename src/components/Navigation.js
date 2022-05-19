import React, {useContext, useState} from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { DmstfctnContext } from "../components/DmstfctnProvider"

export const Navigation = ({items}) => {
  const context = useContext( DmstfctnContext );

	return (
		<nav className="dc-slideshow-navigation">
			{items.map( (item, i) => {
				return (
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
			})}
		</nav>
	)
}