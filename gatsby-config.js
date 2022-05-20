module.exports = {
  siteMetadata: {
    title: `dmstfctn`,
    siteUrl: `https://dmstfctn.net`
  },
  plugins: [
    "gatsby-plugin-sass", 
    "gatsby-plugin-image", 
    "gatsby-plugin-sharp", 
    "gatsby-transformer-sharp", 
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-yaml",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/",
        ignore: [`**/\.*`],
      },
      __key: "images"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "showcase",
        "path": "./src/showcase",
        ignore: [`**/\.*`],
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "track-record",
        "path": "./src/track-record",
        ignore: [`**/\.*`],
      }
    }
  ]
};