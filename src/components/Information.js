import * as React from "react"

export const Information = function({index, total, title, url}){
    return (
        <div className="dc-slideshow-info">
            <div className="numbers">
                {index+1}/{total+1}
            </div>
            <h2 className="title">
                <a 
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                >
                    {title}
                </a>
            </h2>
        </div>
    )
}