import React, {useContext, useState} from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { DmstfctnContext } from "./DmstfctnProvider"

export const Progress = ({current, total}) => {
 
	return (
		<div 
      className="dc-slideshow-progress"
      style={{
        width: `${(current + 1)/(total+1) * 100}%`
      }}
    />
	)
}