/* eslint-disable react-hooks/exhaustive-deps */
/**
 *
 * LoginPage
 *
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { styled as muiStyled } from '@mui/system';
import PlexTechLogo from '../../../PlexTechLogo.png';
import {
  Stack,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoginData } from 'types/types';
import { SignUpPage } from '../SignUpPage/Loadable';
import { ErrorModal } from 'app/components/ErrorModal';
import { ForgotPasswordPage } from '../ForgotPasswordPage/Loadable';
import { Error } from 'types/types';
import jwt_decode from 'jwt-decode';
import { apiRequest } from 'utils/apiRequest';
import useToken from 'utils/useToken';

interface Props {}

export function LoginPage(props: Props) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
    google: false,
  });
  const [incorrect, setIncorrect] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [googleResponse, setGoogleResponse] = useState<any>({});

  const theme = useTheme();

  const { token, setToken } = useToken();

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('google-signin'), {
      theme: theme.palette.mode === 'dark' ? 'filled_black' : 'outline',
      size: 'large',
    });
  }, [showSignUp]);

  useEffect(() => {
    const f = async () => {
      if (googleResponse.email) {
        await onSubmit();
      }
    };
    f();
  }, [googleResponse]);

  const handleCallbackResponse = (response: any) => {
    const res = jwt_decode(response.credential) as any;
    setFormData({
      email: res.email,
      google: true,
    });
    setGoogleResponse(res);
  };

  const onForgotPassword = () => {
    setForgotPassword(true);
  };

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSignUpClick = () => {
    setShowSignUp(true);
  };

  const onEmailChange = ({ target }) => {
    setFormData((prevState: LoginData) => ({
      ...prevState,
      email: target.value,
    }));
  };

  const onPasswordChange = ({ target }) => {
    setFormData((prevState: LoginData) => ({
      ...prevState,
      password: target.value,
    }));
  };

  const onSubmit = async (event?: any) => {
    if (event) {
      event.preventDefault();
    }
    if (
      !formData.google &&
      (formData.email === '' || formData.password === '')
    ) {
      setSubmitted(true);
      return;
    }
    setLoading(true);
    const [success, res] = await apiRequest(
      '/users/',
      'POST',
      token,
      () => setIncorrect(true),
      { ...formData, method: 'login' },
    );

    setLoading(false);

    if (!success) {
      if (res.error.errorCode === 404) {
        setShowSignUp(true);
      } else {
        setError(res.error);
      }
      return;
    }
    setIncorrect(false);

    setToken(res.access_token);
    setSubmitted(false);
  };

  if (showSignUp) {
    return <SignUpPage onBack={() => setShowSignUp(false)} />;
  }

  if (forgotPassword) {
    return <ForgotPasswordPage onBack={() => setForgotPassword(false)} />;
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page for PlexTech finance" />
      </Helmet>
      {error ? (
        <ErrorModal open={!!error} error={error} />
      ) : (
        <Div>
          <Form elevation={3}>
            <form>
              <Stack alignItems="center" spacing={4}>
                <Img src={PlexTechLogo} alt="PlexTech logo" />
                <H1>Login</H1>
                <StyledStack>
                  <p>Email Address</p>
                  <TextField
                    variant="outlined"
                    required
                    size="small"
                    value={formData.google ? '' : formData.email}
                    onChange={onEmailChange}
                    error={
                      (submitted && formData.email === '') ||
                      (formData.google && incorrect) ||
                      incorrect
                    }
                    helperText={
                      (submitted && formData.email === '' && 'Required') ||
                      (formData.google &&
                        incorrect &&
                        'You are not registered as a PlexTech member. Contact PlexTech management if this is incorrect.') ||
                      (incorrect && 'Incorrect email or password.')
                    }
                  />
                </StyledStack>
                <StyledStack>
                  <p>Password</p>
                  <TextField
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={onShowPassword}
                            onMouseDown={onShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={formData.google ? '' : formData.password}
                    onChange={onPasswordChange}
                    error={
                      !formData.google &&
                      ((submitted && formData.password === '') || incorrect)
                    }
                    helperText={
                      !formData.google &&
                      ((submitted && formData.password === '' && 'Required') ||
                        (incorrect && 'Incorrect email or password.'))
                    }
                  />
                </StyledStack>
                <Stack direction="row" spacing={3}>
                  <Button variant="contained" onClick={onSubmit} type="submit">
                    {loading ? <StyledCircularProgress size={20} /> : 'Log In'}
                  </Button>
                  <Button variant="text" onClick={onForgotPassword}>
                    Forgot Password?
                  </Button>
                </Stack>

                <StyledDivider variant="middle" light>
                  or
                </StyledDivider>
                <div id="google-signin" />
                <Button variant="contained" onClick={onSignUpClick}>
                  Don't have an account yet?
                </Button>
              </Stack>
            </form>
          </Form>
          <div style={{ height: '5%' }} />
        </Div>
      )}
    </>
  );
}

const Form = muiStyled(Paper)`
  min-height: 95%;
  width: 40%;
  min-width: 500px;
  margin: auto;
  padding: 64px;
  border-radius: 48px;
`;

const StyledStack = styled(Stack)`
  width: 100%;
`;

const StyledDivider = styled(Divider)`
  width: 100%;
`;

const H1 = styled.h1`
  margin: 0px;
  font-size: 3.052rem;
  padding-top: 24px;
`;

const Img = styled.img`
  max-width: 80px;
`;

const Div = styled.div`
  padding-top: 64px;
  height: 100%;
`;

const StyledCircularProgress = muiStyled(CircularProgress)`
  color: rgb(255, 138, 0);
`;
