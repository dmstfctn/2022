import * as React from "react"
import {Layout} from '../components/Layout'
import {Cv} from '../components/Cv'

import cvData from "../cv.yaml"

const CvPage = () => {
    return (  
        <Layout
          navLink="/"
        >
          <Cv
            data={cvData}
          />
        </Layout>
    )
}


export default CvPage