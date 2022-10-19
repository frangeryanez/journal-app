import { 
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword, 
  signInWithGoogle 
} from '../../firebase';
import { checkingCredentials, logout, login } from '.';
import { clearNotesLogout } from '../journal';

export const checkingAuthentication = () => async(dispatch) => {
  dispatch(checkingCredentials());
};

export const startGoogleSignIn = () => async(dispatch) => {
  dispatch(checkingCredentials());

  const result = await signInWithGoogle();

  if (!result.ok) return dispatch(logout(result.errorMessage));

  dispatch(login(result));
};

export const startCreatingUserWithEmailPassword = ({ 
  email, 
  password, 
  displayName 
}) => async(dispatch) => {
  dispatch(checkingCredentials());
  const result = await registerUserWithEmailPassword({ 
    email, 
    password, 
    displayName
  });

  if (!result.ok) return dispatch(logout(result.errorMessage));

  dispatch(login(result));
};

export const startLoginWithEmailPassword = ({ 
  email, 
  password 
}) => async(dispatch) => {
  dispatch(checkingCredentials());
  const result = await loginWithEmailPassword({ email, password });
  
  if (!result.ok) return dispatch(logout(result));

  dispatch(login(result));
};

export const startLogout = () => async(dispatch) => {
  await logoutFirebase();
  dispatch(clearNotesLogout());
  dispatch(logout());
};