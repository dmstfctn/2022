import React, {useState, useEffect, useLayoutEffect, useRef, useContext, useCallback} from "react"
import SvgExternalLink from "../svg/rightArrow.svg"


import { DmstfctnContext } from "./DmstfctnProvider"

import "./Cv.scss"

const dots = (()=>{
    let str = '';
    for( let i = 0; i < 500; i++ ){
        str += '.';
    }
    return str;
})();

const ConditionalCvLink = ({url, children }) => (url) ? <a href={url} target="_blank" rel="noreferrer" >{children}</a> : children;


const CvEntry = React.forwardRef( ({data, year, type, inLowerThird, useImage }, ref) => {
    const [isHovered, setIsHovered] = useState(false);    

    return (
        <li 
            className={`cv-entry${(data.now) ? ' now' : ''}`}
            ref={ref}
        >            
            <span className={`dc-cv--date${(year) ? ' visible' : ' hidden'}`}>
                {year}
                {(data.now) ? `.${data.date}` : ''}
            </span>             
            <span className={`dc-cv--type dc-cv--type__${type}${(type) ? ' visible' : ' hidden'}`}>
                {(type) ? `(${type})` : '' }
            </span>
            <div 
                className="dc-cv--entry"
                onMouseEnter={(useImage) ? () => setIsHovered(true) : () => {}}
                onMouseLeave={(useImage) ? () => setIsHovered(false) : () => {}}
            >
                <ConditionalCvLink url={data.url}>
                    <span className="dc-cv--linewrap">
                        <div 
                            className="dc-cv--name"
                            dangerouslySetInnerHTML={{__html: data.title}}
                        />
                        <span className="dc-cv--dots">
                            {dots}
                        </span>
                        <div className="dc-cv--location">
                            {data.situation}
                            {(data.location) ? `, ${data.location}` : ''}
                        </div>
                        {(data.url) ? <SvgExternalLink className="svg-external-link"/> : false }
                        {(useImage && data.image) ? 
                            <img 
                                className={`dc-cv--img${(inLowerThird) ? ' offset-top' : ''}`}
                                src={data.image.publicURL} 
                                loading="lazy"
                                style={{
                                    pointerEvents: 'none',
                                    opacity: (isHovered) ? 1 : 0
                                }}
                                alt=""
                            />
                           : false
                        }
                    </span>
                </ConditionalCvLink>
            </div>
        </li>
    )
})

export const Cv = ({data}) => {
    const context = useContext( DmstfctnContext ); 
    const [prevTouchY, setPrevTouchY] = useState(0);
    const [scrollAmount, setScrollAmount] = useState(0);
    const [hasBeenScrolled, setHasBeenScrolled] = useState( false );
    const [alignImageAboveThresh, setAlignImageAboveThresh] = useState( 0 )
    const [offsetLineCount, setOffsetLineCount] = useState(0);
    const [maxVisibleLines, setMaxVisibleLines] = useState(0);
    const panelHeight = useRef( 0 );
    const lineHeight = useRef( 1 );
    const minmaxOffset = useRef({min: 0, max: 0});
    const minmaxScroll = useRef({min: 0, max: 0});
    const oneRow = useRef();
    const cvPanel = useRef();
    const cvContents = useRef();    
    const cvCrop = useRef();

    const [lines, setLines] = useState([]);    
    const mobileGapCount = useRef( data.years.length - 1 );


    const calculateLines = useCallback(() => {
        let currentLines = [];
        data.years.forEach( ( yearData ) => {
            const yearLines = [];
            yearData.entries.forEach( (entry) => {
                if( typeof window === 'undefined' ){
                    yearLines.push( entry );
                    return;
                }
                if( entry.hideon === "mobile" || entry.hideon === "desktop" ){
                    if(context.siteWidth < context.breakpoint && entry.hideon !== "mobile" ){
                        yearLines.push( entry );
                    }
                    if(context.siteWidth >= context.breakpoint && entry.hideon !== "desktop" ){
                        yearLines.push( entry );
                    }
                } else {
                    yearLines.push( entry );
                } 
            });            
            currentLines = currentLines.concat( yearLines.reverse() );
        });       
        return currentLines.reverse();
    }, [data, context] );
     

    useEffect(() => {
        if( !oneRow.current ){ return }
        if( !cvPanel.current ){ return }
        const _panelHeight = cvPanel.current.getBoundingClientRect().height;
        const _lineHeight = oneRow.current.getBoundingClientRect().height;
        const _maxVisible = Math.floor( _panelHeight / _lineHeight );
        const totalLines = (context.siteWidth < context.breakpoint ) ? lines.length + mobileGapCount.current : lines.length;
        const maxOffset = totalLines - _maxVisible;
        const minOffset = 0;
        setMaxVisibleLines( _maxVisible );
        panelHeight.current = _panelHeight;
        lineHeight.current = _lineHeight;
        minmaxOffset.current = { min: minOffset, max: maxOffset };
        minmaxScroll.current = {min: minOffset * _lineHeight, max: maxOffset * _lineHeight };
    }, [oneRow, cvPanel, lines, context]);

    useEffect(() => {
        const handleResizeWindow = () =>{
            setLines( calculateLines() );                      
        }
        window.addEventListener( "resize", handleResizeWindow );
        handleResizeWindow();
        return () => {
            window.removeEventListener( "resize", handleResizeWindow );
        }
    }, [calculateLines]);


    useEffect(()=>{       
        if( !cvContents.current ){ return } 
        let offset = Math.floor( scrollAmount / lineHeight.current );
        
        if( offset >= minmaxOffset.current.max ){
            offset = minmaxOffset.current.max;
        } else if( offset < minmaxOffset.current.min ){
            offset = minmaxOffset.current.min;            
        }
        
        if( offset > minmaxOffset.current.min ){
            setHasBeenScrolled( true );
        }

        setOffsetLineCount( offset );      

        cvContents.current.style.transform = `translateY(-${offset * lineHeight.current}px)`;
        cvCrop.current.style.height =  maxVisibleLines * lineHeight.current + 1 + 'px';  

    }, [scrollAmount, cvContents, cvCrop, context.siteWidth, maxVisibleLines] )

    useEffect(() =>{        
        setAlignImageAboveThresh( offsetLineCount + (maxVisibleLines * 0.6) );
    })

    return(
        <div 
            className={`dc-cv${(hasBeenScrolled) ? '' : ' unscrolled'}`}
            onWheel={ (e) => {
                setScrollAmount( ( prev ) => Math.min( Math.max( prev + e.deltaY, minmaxScroll.current.min ), minmaxScroll.current.max ) );
            }}
            onTouchStart={ (e) => {
                setPrevTouchY( e.changedTouches[0].pageY )
            }}
            onTouchMove={ (e) => {
                const deltaY = prevTouchY - e.changedTouches[0].pageY;                
                setScrollAmount( (prev) => Math.min( Math.max( prev + deltaY, minmaxScroll.current.min ), minmaxScroll.current.max ) );
                setPrevTouchY( e.changedTouches[0].pageY )
            }}
            ref={cvPanel}
        >
            <div className="cv-cropper" 
                ref={cvCrop}
                style={{ 
                    overflow: 'hidden',
                    position: 'relative',
                    height: '100%'
                }}>
            <ul
                className="cv-contents"
                ref={cvContents}
            >
               {lines.map( ( entry, i ) => {
                    return (
                        <CvEntry                       
                            year={( (lines[i-1] && entry.year !== lines[i-1].year) || !lines[i-1]) ? entry.year : ''}
                            type={( (lines[i-1] && entry.type !== lines[i-1].type) || !lines[i-1]) ? entry.type : ''}
                            data={entry}
                            ref={oneRow}
                            key={entry.id}
                            inLowerThird={(i > alignImageAboveThresh ) ? true : false }
                            useImage={(context.siteWidth >= context.breakpoint )}
                        />
                    )
               })}
            </ul>      
            </div>    
        </div>
    )
}