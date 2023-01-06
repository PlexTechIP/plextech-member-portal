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
} from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GoogleLogin } from 'react-google-login';
import { LoginData } from 'types/types';
import { SignUpPage } from '../SignUpPage/Loadable';
import { ErrorModal } from 'app/components/ErrorModal';
import { ForgotPasswordPage } from '../ForgotPasswordPage/Loadable';

interface Props {
  setToken: (token: string) => void;
}

export function LoginPage(props: Props) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [incorrect, setIncorrect] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);

  const onForgotPassword = () => {};

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

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (formData.email === '' || formData.password === '') {
      setSubmitted(true);
      return;
    }
    setLoading(true);

    const url = `http://localhost:${process.env.PORT || 3000}/users/`;
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ ...formData, method: 'login' }),
    });

    const res = await response.json();
    setLoading(false);

    if (response.status === 401) {
      setIncorrect(true);
      return;
    } else if (!response.ok) {
      setError(true);
    }
    setIncorrect(false);

    props.setToken(res.access_token);
    setSubmitted(false);
  };
  if (showSignUp) {
    return (
      <SignUpPage
        onBack={() => setShowSignUp(false)}
        setToken={props.setToken}
      />
    );
  }
  if (forgotPassword) {
    return <ForgotPasswordPage />;
  }
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page for PlexTech finance" />
      </Helmet>
      {error ? (
        <ErrorModal open={error} />
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
                    value={formData.email}
                    onChange={onEmailChange}
                    error={(submitted && formData.email === '') || incorrect}
                    helperText={
                      (submitted && formData.email === '' && 'Required') ||
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
                    value={formData.password}
                    onChange={onPasswordChange}
                    error={(submitted && formData.password === '') || incorrect}
                    helperText={
                      (submitted && formData.password === '' && 'Required') ||
                      (incorrect && 'Incorrect email or password.')
                    }
                  />
                </StyledStack>
                <Stack direction="row" spacing={3}>
                  <StyledButton
                    variant="contained"
                    onClick={onSubmit}
                    type="submit"
                  >
                    {loading ? <StyledCircularProgress size={20} /> : 'Submit'}
                  </StyledButton>
                  <StyledButton variant="text" onClick={onForgotPassword}>
                    Forgot Password?
                  </StyledButton>
                </Stack>

                <StyledDivider variant="middle" light>
                  or
                </StyledDivider>

                <GoogleLogin clientId="" />
                <StyledButton variant="contained" onClick={onSignUpClick}>
                  Don't have an account yet?
                </StyledButton>
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
  margin: auto;
  padding: 64px;
  border-radius: 5%;
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

const StyledButton = muiStyled(Button)`
  background-color: white;
  color: rgb(255, 138, 0);
  font-weight: bold;
`;

const StyledCircularProgress = muiStyled(CircularProgress)`
  color: rgb(255, 138, 0);
`;
