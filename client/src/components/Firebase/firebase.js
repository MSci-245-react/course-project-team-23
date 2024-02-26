// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithCredential,
  fetchSignInMethodsForEmail,
  getAdditionalUserInfo,
  deleteUser,
} from 'firebase/auth';
import {getAnalytics} from 'firebase/analytics';

class Firebase {
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDZd8efKLf0fx8j7uii2t2k_wMsJmPKrYo',
      authDomain: 'fir-auth-meal-stream.firebaseapp.com',
      projectId: 'fir-auth-meal-stream',
      storageBucket: 'fir-auth-meal-stream.appspot.com',
      messagingSenderId: '1021544741305',
      appId: '1:1021544741305:web:da9f258932f79489af9e68',
      measurementId: 'G-CP1TXLWXS2',
    };

    // const firebaseConfig = {
    //   apiKey: process.env.REACT_APP_API_KEY,
    //   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    //   projectId: process.env.REACT_APP_PROJECT_ID,
    //   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    //   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    //   appId: process.env.REACT_APP_APP_ID,
    //   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    // };

    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.analytics = getAnalytics(this.app);
    this.googleProvider = new GoogleAuthProvider();
  }

  signUpOrInWithPopupGoogle = method => {
    // Return a new Promise
    return new Promise((resolve, reject) => {
      signInWithPopup(this.auth, this.googleProvider)
        .then(result => {
          // Determine if the user exists
          const userExists = this.doesUserExist(result);
          console.log('User exists:', userExists);

          if (method === 'SignUp' && userExists) {
            console.log('User already exists, cannot sign up.');
            reject(new Error('User already exists'));
          } else if (method === 'SignIn' && !userExists) {
            console.log('Could not find user, sign-in failed.');
            this.deleteUser(result.user);
            reject(new Error('Could not find user'));
          } else {
            console.log(
              method === 'SignUp' ? 'Signing up user' : 'Signing in user',
            );
            // Resolve with user data and existence flag
            resolve({user: result.user, userExists});
          }
        })
        .catch(error => {
          console.error('Error during sign-up/sign-in:', error);
          reject(error);
        });
    });
  };

  doesUserExist = result => {
    const additionalInfo = getAdditionalUserInfo(result);
    return !additionalInfo.isNewUser;
  };

  deleteUser = user => {
    deleteUser(user)
      .then(() => {
        console.log('User deleted');
      })
      .catch(error => {
        console.log('Error occurred when deleting user', error);
      });
  };

  // Add more methods as needed
}

// Export a single instance
const firebaseInstance = new Firebase();
export default firebaseInstance;
