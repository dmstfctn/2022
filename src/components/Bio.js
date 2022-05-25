
import React, {useContext} from "react"

import { DmstfctnContext } from "./DmstfctnProvider"

import "./Bio.scss"

export const Bio = ({large, small, mail, handle}) => {
    const context = useContext( DmstfctnContext ); 
    return(
        <div className="dc-bio">       
            {(context.siteWidth < context.breakpoint )
                ?
                    <>
                        {small}
                        <br/>
                        {mail}, @{handle}
                    </>
                :
                    <>
                    {large}, <a href={`mailto:${mail}`}>{mail}</a>, <a href={`https://instagram.com/${handle}`}>@{handle}</a>
                    </>
                    
            }
        </div>
    )
}