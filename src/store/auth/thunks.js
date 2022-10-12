import { signInWithGoogle } from '../../firebase';
import { checkingCredentials, logout } from '.';

export const checkingAuthentication = (email, password) => async(dispatch) => {
  dispatch(checkingCredentials(email, password));
};

export const startGoogleSignIn = () => async(dispatch) => {
  dispatch(checkingCredentials());

  const result = await signInWithGoogle();

  if (!result.ok) return dispatch(logout(result));

  dispatch(login(result));
};