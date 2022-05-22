import React, {useState, useEffect} from "react"

export const DmstfctnContext = React.createContext()

export const DmstfctnProvider = function({ children }){
    const breakpoint = 960;
    const [currentSlide, setCurrentSlide] = useState(0);    
    const [hovered, setHovered] = useState( -1 );
    const [justUnhovered, setJustUnhovered] = useState( false );    
    const [siteWidth, setSiteWidth] = useState((typeof window !== `undefined`) ? window.innerWidth : breakpoint + 10 );

    useEffect(() => {
        const handleResizeWindow = () => setSiteWidth((typeof window !== `undefined`) ? window.innerWidth : breakpoint + 10 );   
        window.addEventListener( "resize", handleResizeWindow );
        return () => {
            window.removeEventListener( "resize", handleResizeWindow );
        }
    }, []);

    useEffect(() => {       
        const timerHandler = setTimeout( () => {
            setJustUnhovered( false );
        }, 1000 );
        return () => {
            clearTimeout( timerHandler );
        }
    }, [justUnhovered])

    return (
        <DmstfctnContext.Provider
            value={{
                currentSlide,
                setCurrentSlide: ( to ) => setCurrentSlide( to ),
                hovered,                
                setHovered: ( to ) => setHovered( to ) ,
                justUnhovered,
                setJustUnhovered: () => setJustUnhovered( true ),
                siteWidth,
                breakpoint
            }}
        >
            {children}
        </DmstfctnContext.Provider>
    )
}