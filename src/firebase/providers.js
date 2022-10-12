import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseAuth } from '.';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName, 
      email, 
      photoURL, 
      uid
    };
  } catch (error) {
    return { 
      ok: false, 
      errorCode: error.code, 
      errorMessage: error.message
    };
  }
};