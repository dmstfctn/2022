import React, {useState} from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const SlideshowControl = ({text, className, onClick}) => {
    const [mousePos, setMousePos] = useState({x: 0, y: 0});
    return (
        <button 
            className={`slideshow-ctrl ${className}`}
            onClick={onClick}
            onMouseMove={(e) => {
                setMousePos({
                    x: e.pageX,
                    y: e.pageY
                });
            }}
        >
            <span 
                className="ctrl-text"
                style={{
                    left: mousePos.x + 'px',
                    top: mousePos.y + 'px'
                }}
            >
                {text}
            </span>
    </button>
    )
}

export const Slides = ({current, currentAlt, prev, next, onChange}) => {
    return (
        <div         
            className="dc-slideshow-slides"
        >
            <SlideshowControl
                className="ctrl-prev"
                onClick={() => onChange( -1 )}
                text="&larr;"
            />
            <SlideshowControl
                className="ctrl-next"
                onClick={() => onChange( 1 )}
                text="&rarr;"
            />
                 
            <GatsbyImage 
                className="prev"
                image={getImage( prev.mainImage )} 
                loading="lazy"
                alt=""          
            />  
            <GatsbyImage 
                className="current"
                image={getImage( current.mainImage )}
                objectFit="contain"                
                loading="eager"
                alt={currentAlt}
            />
            <GatsbyImage 
                className="next"
                image={getImage( next.mainImage )} 
                loading="lazy"
                alt=""
            /> 
        </div>
    )
}