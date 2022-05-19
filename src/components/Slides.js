import React, {useState, useContext} from "react"
import { GatsbyImage, getImage, withArtDirection } from "gatsby-plugin-image"

import { DmstfctnContext } from "../components/DmstfctnProvider"

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

export const Slides = ({
    currentMain, 
    currentSmall, 
    currentAlt, 
    prevMain,
    prevSmall,
    prevPrevMain,
    prevPrevSmall,
    nextMain,
    nextSmall,
    nextNextMain,
    nextNextSmall,
    onChange
}) => {
    const context = useContext( DmstfctnContext );  

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
                className="current"
                image={withArtDirection( 
                    getImage( currentMain.mainImage ),
                    [{
                        media: '(max-width: 960px)',
                        image: getImage( currentSmall.mainImage )
                    }]
                )}
                objectFit={(context.siteWidth >= context.breakpoint) ? "contain" : "cover"}
                loading="eager"
                alt={currentAlt}
            />

            <GatsbyImage 
                className="prev"
                image={withArtDirection( 
                    getImage( prevMain.mainImage ),
                    [{
                        media: '(max-width: 960px)',
                        image: getImage( prevSmall.mainImage )
                    }]
                )}
                objectFit={(context.siteWidth >= context.breakpoint) ? "contain" : "cover"}
                loading="lazy"
                alt=""
            />
             <GatsbyImage 
                className="prev prev-prev"
                image={withArtDirection( 
                    getImage( prevPrevMain.mainImage ),
                    [{
                        media: '(max-width: 960px)',
                        image: getImage( prevPrevSmall.mainImage )
                    }]
                )}
                objectFit={(context.siteWidth >= context.breakpoint) ? "contain" : "cover"}
                loading="lazy"
                alt=""
            />
            <GatsbyImage 
                className="next"
                image={withArtDirection( 
                    getImage( nextMain.mainImage ),
                    [{
                        media: '(max-width: 960px)',
                        image: getImage( nextSmall.mainImage )
                    }]
                )}
                objectFit={(context.siteWidth >= context.breakpoint) ? "contain" : "cover"}
                loading="lazy"
                alt=""
            />
             <GatsbyImage 
                className="next next-next"
                image={withArtDirection( 
                    getImage( nextNextMain.mainImage ),
                    [{
                        media: '(max-width: 960px)',
                        image: getImage( nextNextSmall.mainImage )
                    }]
                )}
                objectFit={(context.siteWidth >= context.breakpoint) ? "contain" : "cover"}
                loading="lazy"
                alt=""
            />
        </div>
    )
}
