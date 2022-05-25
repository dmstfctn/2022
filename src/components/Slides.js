import React, {useState, useContext, useEffect, Children} from "react"
import { GatsbyImage, getImage, withArtDirection } from "gatsby-plugin-image"

import SvgBack from "../svg/back-arrow.svg"
import SvgForward from "../svg/forward-arrow.svg"

import { DmstfctnContext } from "../components/DmstfctnProvider"

const SlideshowControl = ({text, className, onClick, children}) => {
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
                {children}
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
    const [isSmallSite, setIsSmallSite] = useState( context.siteWidth < context.breakpoint );

    useEffect( () => {
        setIsSmallSite( context.siteWidth < context.breakpoint );
    }, [] )

    return (
        <div         
            className="dc-slideshow-slides"
        >
            <SlideshowControl
                className="ctrl-prev"
                onClick={() => onChange( -1 )}
                text=""
            >
                <SvgBack />
            </SlideshowControl>
            <SlideshowControl
                className="ctrl-next"
                onClick={() => onChange( 1 )}
                text=""
            >
                <SvgForward />
            </SlideshowControl>            

            <GatsbyImage 
                className="current"
                image={withArtDirection( 
                    getImage( currentMain.mainImage ),
                    [{
                        media: '(max-width: 960px)',
                        image: getImage( currentSmall.mainImage )
                    }]
                )}
                //objectFit={(isSmallSite) ? "cover" : "contain"}
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
                //objectFit={(isSmallSite) ? "cover" : "contain"}
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
                //objectFit={(isSmallSite) ? "cover" : "contain"}
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
                //objectFit={(isSmallSite) ? "cover" : "contain"}
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
                //objectFit={(isSmallSite) ? "cover" : "contain"}
                loading="lazy"
                alt=""
            />
        </div>
    )
}
