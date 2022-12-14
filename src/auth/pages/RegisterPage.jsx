import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Alert,
  Button, 
  Grid, 
  Link, 
  TextField, 
  Typography 
} from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: '',
  displayName: ''
};

const formValidations = {
  // this field is required
  email: [value => value.includes('@'), 'The email must have an @'],
  password: [value => value.length >= 6, 'The password must have more than 6 letters'],
  displayName: [value => value.length >= 1, 'The name is required'],
}

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === 'checking', [status]);

  const { 
    displayName, 
    displayNameValid, 
    email, 
    emailValid, 
    formState,
    isFormValid, 
    onInputChange,
    password, 
    passwordValid
  } = useForm(formData, formValidations);

  const onSubmit = event => {
    event.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Register">
      <form 
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={ onSubmit } 
      >
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              error={ !!displayNameValid && formSubmitted }
              fullWidth
              helperText={ displayNameValid }
              label="Full Name"
              name="displayName"
              onChange={ onInputChange }
              placeholder="Full Name"
              type="text"
              value={ displayName }
            />
          </Grid>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              error={ !!emailValid && formSubmitted }
              fullWidth
              helperText={ emailValid }
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
              error={ !!passwordValid && formSubmitted }
              fullWidth
              helperText={ passwordValid }
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
            <Grid item xs={ 12 }>
              <Button 
                disabled={ isCheckingAuthentication }
                fullWidth
                type="submit"
                variant="contained" 
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
          <Grid 
            container 
            direction="row" 
            justifyContent="end"
          >
            <Typography sx={{ mr: 1 }}>
              Do you already have an account?
            </Typography>
            <Link 
              component={ RouterLink } 
              color="inherit" 
              to="/auth/login"
            >
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};