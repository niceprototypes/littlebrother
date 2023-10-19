module.exports = {
  siteMetadata: {
    title: ``,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "static/icon.svg",
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyDw-myTZo8ENMpYP6EhkEYFCKnwYrfObBA",
          authDomain: "little-brother-beta.firebaseapp.com",
          databaseURL: "https://little-brother-beta.firebaseio.com",
          projectId: "little-brother-beta",
          storageBucket: "little-brother-beta.appspot.com",
          messagingSenderId: "20381070352",
        },
      },
    },
  ],
}
