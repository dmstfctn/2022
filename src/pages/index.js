import * as React from "react"
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { Slideshow } from "../components/Slideshow"

import slideshowMeta from "../showcase/meta.yaml"

const IndexPage = ({data}) => {
  
  return (  
    <Layout
      navLink="/cv"
    >
      <Slideshow
        main={data.main.nodes}
        small={data.small.nodes}
        meta={slideshowMeta}
      />
    </Layout>   
  )
}

export default IndexPage

export const query = graphql`
query DmstfctnShowcaseQuery{
  main: allFile(
    filter: { 
      sourceInstanceName: { eq: "showcase" }, 
      relativeDirectory: {eq: "main"},
    }
    sort: {
      order: ASC, 
      fields: name
    }
  ) {
    nodes {
      name
      publicURL
      mainImage: childImageSharp {
        gatsbyImageData(
          height: 2000
          placeholder: NONE
          formats: [AUTO, WEBP, AVIF]
        )
      }
      thumbImage: childImageSharp {
        gatsbyImageData(
          height: 16
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
  small: allFile(filter: { sourceInstanceName: { eq: "showcase" }, relativeDirectory: {eq: "small"} }) {
    nodes {
      name
      publicURL
      childImageSharp {
        gatsbyImageData(
          height: 2000
          placeholder: NONE
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
}`