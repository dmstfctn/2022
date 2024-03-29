import React from "react"
import { Link } from 'gatsby'

import "./Layout.scss"

export const Layout = ({children, navLink}) => {
    return (           
        <>
        <title>DMSTFCTN</title>
        <div className="dc-site">            
            <nav className="dc-nav">                
                <Link 
                    to={navLink}
                    state={{ prevPath: (typeof window !== 'undefined' ) ? window.location.pathname : false }}
                >
                    <h1>DMSTFCTN</h1>
                </Link>
            </nav>
            {children}
        </div>  
        </>    
    )
}