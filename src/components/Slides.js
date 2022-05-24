import React, {useState, useContext, useEffect} from "react"
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
                text="prev"
            />
            <SlideshowControl
                className="ctrl-next"
                onClick={() => onChange( 1 )}
                text="next"
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
