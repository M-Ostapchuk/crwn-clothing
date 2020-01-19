import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCbLsP1YCTbKNlOodsZx_Ow-DI6C7MoER4",
    authDomain: "crwn-db-ead4f.firebaseapp.com",
    databaseURL: "https://crwn-db-ead4f.firebaseio.com",
    projectId: "crwn-db-ead4f",
    storageBucket: "crwn-db-ead4f.appspot.com",
    messagingSenderId: "1094169162500",
    appId: "1:1094169162500:web:fae3ecdf124fa81dd71651",
    measurementId: "G-SMJSZDVK2Z"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const createUserProfileDocument = async (authUser, additionalData) => {
    if(!authUser) return;

    const userRef = firestore.doc(`users/${authUser.uid}`);
    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
      const {displayName, email} = authUser;
      const createdAt = new Date();

      try {
        await  userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('Error creating user', error.message);
        
      }
    }

    return userRef;
  }

  export const signInWithGoogle = () => {auth.signInWithPopup(provider)};
  export default firebase;