import * as React from "react"
import { Helmet } from 'react-helmet'

import { DmstfctnProvider } from "./src/components/DmstfctnProvider"



export const wrapRootElement = ({ element, props }) => {
  return (
    <DmstfctnProvider {...props}>
      { element }
    </DmstfctnProvider>
  )
}

export const wrapPageElement = ({ element, props }) => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet preload" href="https://use.typekit.net/wzu6tbi.css"></link>
      </Helmet>
      { element }
    </>
  )
}