import React from "react"
import {ThemeProvider} from "styled-components"
import Theme from "./src/theme"

function wrapWithProvider({element}) {
  /*// Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = createStore()

  const firebaseConfig = {
    apiKey: "AIzaSyDiTbXJBmmovvups_xcTVp5DD3hS_SGfRs",
    authDomain: "nice-prototypes.firebaseapp.com",
    databaseURL: "https://nice-prototypes.firebaseio.com",
    projectId: "nice-prototypes",
    storageBucket: "nice-prototypes.appspot.com",
    messagingSenderId: "659929839839",
  }

  const rrfConfig = {
    userProfile: "users",
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }
OV
  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance, // <- needed if using firestore
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }*/

  // return <ThemeProvider theme={Theme}>{element}</ThemeProvider>

  return element
}

export default wrapWithProvider
