import React, {useState, useEffect, useLayoutEffect, useRef} from "react"

import "./Cv.scss"

const CvEntry = React.forwardRef( ({data}, ref) => {
    return (
        <li 
            style={{
                display: "table-row"
            }}
            ref={ref}
        >
            <span 
                className="dctxt--date"
                style={{
                    display: "table-cell"
                }}
            >
                {data.year}
            </span>             
            <span 
                className="dc-cv--type dc-cv--type__live"
                style={{
                    display: "table-cell"
                }}
            >
                ({data.type})
            </span>
            <div 
                className="dc-cv--entry dc-cv-type__live dc-list-hoverimg"
                style={{
                    display: "table-cell"
                }}
            >
                <span 
                    className="dc-cv--linewrap"
                    style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <div className="dc-cv--name">
                        {data.title}
                    </div>
                    <div className="dc-cv--location">
                        {data.situation}, {data.location}
                    </div>
                    <img 
                        src={data.image} 
                        style={{
                            display: "none"
                        }}
                    />
                </span>
            </div>
        </li>
    )
})

export const Cv = ({data}) => {
    //const [lineOffset, setLineOffset] = useState(0);
    const [prevTouchY, setPrevTouchY] = useState(0);
    const [scrollAmount, setScrollAmount] = useState(0);
    const panelHeight = useRef(0);
    const lineHeight = useRef(0);
    const minmaxOffset = useRef({min: 0, max: 0});
    const minmaxScroll = useRef({min: 0, max: 0});
    const oneRow = useRef();
    const cvPanel = useRef();
    const cvContents = useRef();
    const lines = (() => {
        const lines = [];
        data.years.forEach( ( yearData ) => {
            yearData.types.forEach( (typeData ) => {
                typeData.entries.forEach( (entry) => {
                    lines.push( entry );
                })
            })
        });       
        return lines.reverse();
    })();
    
    useLayoutEffect(() => {
        if( !oneRow.current ){ return }
        const _panelHeight = cvPanel.current.getBoundingClientRect().height;
        const _lineHeight = oneRow.current.getBoundingClientRect().height;
        const maxVisible = Math.floor( _panelHeight / _lineHeight );                
        const maxOffset = lines.length - maxVisible;
        const minOffset = 0;
        panelHeight.current = _panelHeight;
        lineHeight.current = _lineHeight;
        minmaxOffset.current = { min: minOffset, max: maxOffset };
        minmaxScroll.current = {min: minOffset * _lineHeight, max: maxOffset * _lineHeight };
    });

    useEffect(()=>{        
        let offset = Math.floor( scrollAmount / lineHeight.current );
        
        if( offset >= minmaxOffset.current.max ){
            offset = minmaxOffset.current.max;
        } else if( offset < minmaxOffset.current.min ){
            offset = minmaxOffset.current.min;            
        }
        
        cvContents.current.style.transform = `translateY(-${offset * lineHeight.current}px)`;
    }, [scrollAmount, lines, panelHeight.current, lineHeight.current, minmaxOffset.current] )

    return(
        <div 
            className="dc-cv"
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
            <ul
                className="cv-contents"
                ref={cvContents}
            >
               {lines.map( ( entry ) => {                   
                    return (<CvEntry 
                        data={entry}
                        ref={oneRow}
                        key={entry.name}
                    />)
               })}
            </ul>          
        </div>
    )
}