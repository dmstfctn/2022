import React, {useState} from "react"

export const DmstfctnContext = React.createContext()

export const DmstfctnProvider = function({ children }){
    const [currentSlide, setCurrentSlide] = useState(0);    
    const [hovered, setHovered] = useState( -1 );
    
    return (
        <DmstfctnContext.Provider
            value={{
                currentSlide,
                setCurrentSlide: ( to ) => setCurrentSlide( to ),
                hovered,
                setHovered: ( to ) => setHovered( to ) 
            }}
        >
            {children}
        </DmstfctnContext.Provider>
    )
}