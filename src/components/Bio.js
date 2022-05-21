
import React, {useContext} from "react"

import { DmstfctnContext } from "./DmstfctnProvider"

import "./Bio.scss"

export const Bio = () => {
    const context = useContext( DmstfctnContext ); 
    return(
        <div className="dc-bio">       
            {(context.siteWidth < context.breakpoint )
                ?
                    <>
                        London, Berlin
                        <br/>
                        <a href="mailto:mail@dmstfctn.net">mail@dmstfctn.net</a>, <a href="https://instagram.com/dmstfctn">@dmstfctn</a>
                    </>
                :
                    <>
                    Artist duo based in London and Berlin, currently working with virtual simulations, <a href="mailto:mail@dmstfctn.net">mail@dmstfctn.net</a>, <a href="https://instagram.com/dmstfctn">@dmstfctn</a>
                    </>
                    
            }
        </div>
    )
}