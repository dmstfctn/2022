import * as React from "react"

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