import { checkingCredentials } from './authSlice';

export const checkingAuthentication = (email, password) => async(dispatch) => {
  dispatch(checkingCredentials(email, password));
};

export const startGoogleSignIn = () => async(dispatch) => {
  dispatch(checkingCredentials());
};