import React, {useState, useEffect} from "react"

export const DmstfctnContext = React.createContext()

export const DmstfctnProvider = function({ children }){
    const breakpoint = 960;
    const [currentSlide, setCurrentSlide] = useState(0);    
    const [hovered, setHovered] = useState( -1 );
    const [siteWidth, setSiteWidth] = useState((typeof window !== `undefined`) ? window.innerWidth : breakpoint - 10 );
    
    useEffect(() => {
        const handleResizeWindow = () => setSiteWidth((typeof window !== `undefined`) ? window.innerWidth : breakpoint - 10 );   
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        }
    }, [])

    return (
        <DmstfctnContext.Provider
            value={{
                currentSlide,
                setCurrentSlide: ( to ) => setCurrentSlide( to ),
                hovered,
                setHovered: ( to ) => setHovered( to ) ,
                siteWidth,
                breakpoint
            }}
        >
            {children}
        </DmstfctnContext.Provider>
    )
}