import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout'
import { 
  checkingAuthentication, 
  startGoogleSignIn, 
  startLoginWithEmailPassword 
} from '../../store';
import { useForm } from '../../hooks';

const formData = {
  email: '',
  password: ''
};

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.auth);
  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = event => {
    event.preventDefault();
    dispatch(checkingAuthentication());
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form 
      className="animate__animated animate__fadeIn animate__faster"
        onSubmit={ onSubmit }
      >
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              fullWidth
              label="Email"
              name="email"
              onChange={ onInputChange }
              placeholder="email@google.com"
              type="email"
              value={ email }
            />
          </Grid>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              fullWidth
              label="Password"
              name="password"
              onChange={ onInputChange }
              placeholder="Password"
              type="password"
              value={ password }
            />
          </Grid>
          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid 
              item 
              xs={ 12 }
              display={ !!errorMessage ? '' : 'none' }
            >
              <Alert severity="error">{ errorMessage }</Alert>
            </Grid>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
                disabled={ isAuthenticating }
                fullWidth 
                type="submit"
                variant="contained" 
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
                disabled={ isAuthenticating }
                fullWidth 
                onClick={ onGoogleSignIn }
                variant="contained" 
              >
                <Google />
                <Typography sx={{ ml: 1 }}>
                  Google
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid 
            container 
            direction="row" 
            justifyContent="end"
          >
            <Link 
              color="inherit" 
              component={ RouterLink } 
              to="/auth/register"
            >
              Create an Account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};