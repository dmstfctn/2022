import * as React from "react"
import { Helmet } from 'react-helmet'

import {Layout} from '../components/Layout'
import {Cv} from '../components/Cv'

import cvData from "../cv.yaml"

const TrackRecordPage = () => {
    return (  
        <Layout
          navLink="/"
        >
          <Helmet bodyAttributes={{ class: 'page--track-record' }} />
          <Cv
            data={cvData}
          />
        </Layout>
    )
}


export default TrackRecordPage