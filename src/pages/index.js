import React, {useContext, useEffect}  from "react"
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { DmstfctnContext } from "../components/DmstfctnProvider"

import { Layout } from '../components/Layout'
import { Slideshow } from "../components/Slideshow"

import slideshowMeta from "../showcase/meta.yaml"

const IndexPage = ({data}) => {
  const context = useContext( DmstfctnContext );  
  
  useEffect(()=>{
    const hashToNum = (typeof window !== 'undefined') ? parseInt( window.location.hash.replace('#','')) : false;
    const startPoint = (hashToNum) ? hashToNum - 1 : 0;
    context.setCurrentSlide( startPoint );
    window.location.hash = '';
  },[])

  return (  
    <Layout
      navLink="/track-record"
    >
      <Helmet bodyAttributes={{ class: 'page--index' }} />
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
  small: allFile(
    filter: { 
      sourceInstanceName: { eq: "showcase" }, 
      relativeDirectory: {eq: "small"} 
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
          height: 1200
          placeholder: NONE
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
}`