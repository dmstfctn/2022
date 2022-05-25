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
            <Bio 
              large={data.bio.nodes[0].frontmatter.largeBio}
              small={data.bio.nodes[0].frontmatter.smallBio}
              mail={data.bio.nodes[0].frontmatter.mail}
              handle={data.bio.nodes[0].frontmatter.handle}
            />
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
        image{
          publicURL          
        }
        hideon
        priority
        related
      }
    }
  }
  bio: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/track-record/"}}) {
    nodes {
      html
      frontmatter {
        mail
        handle
        smallBio
        largeBio
      }
    }
  }
}
`

// childImageSharp {
//   gatsbyImageData(
//     width: 400
//     placeholder: NONE
//     formats: [AUTO, WEBP, AVIF]             
//   )
// }