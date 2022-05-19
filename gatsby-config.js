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
    }
  ]
};