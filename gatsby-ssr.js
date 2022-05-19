import * as React from "react"
import { DmstfctnProvider } from "./src/components/DmstfctnProvider"



export const wrapRootElement = ({ element, props }) => {
  return (
    <DmstfctnProvider {...props}>
      { element }
    </DmstfctnProvider>
  )
}