import * as React from "react"
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import {Layout} from '../components/Layout'
import {Bio} from '../components/Bio'
import {Cv} from '../components/Cv'


const TrackRecordPage = ({data}) => {
  console.log( data );
    return (  
        <Layout
          navLink="/"
        >
          <Helmet bodyAttributes={{ class: 'page--track-record' }} />
          <div className="dc-track-record">
            <Bio />
            <Cv
              data={data.cv}
            />
          </div>
        </Layout>
    )
}


export default TrackRecordPage

export const query = graphql`
query DmstfctnCvQuery {
  cv: allCvYaml(sort: {fields: year, order: DESC}) {
    years: group(field: year) {
      year: fieldValue
      entries: nodes {
        type
        year
        now
        description
        longdescription
        date
        title
        description
        situation
        location
        url
        image
        hideon
        priority
        related
      }
    }
  }
}
`