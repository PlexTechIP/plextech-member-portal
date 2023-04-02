/* eslint-disable react-hooks/exhaustive-deps */
/**
 *
 * SignUpPage
 *
 */
import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import PlexTechLogo from '../../../PlexTechLogo.png';
import { styled as muiStyled } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SignUpData } from 'types/types';
import { ErrorModal } from 'app/components/ErrorModal';
import { Error } from 'types/types';
import jwt_decode from 'jwt-decode';

const possibleTeams = [
  'Exec',
  'Zendesk',
  'CFS Energy',
  'Songtradr',
  'Angaza',
  "Jeremy's Curriculum Team",
  "Tommy's Curriculum Team",
];

interface Props {
  onBack: () => void;
  setToken: (token: string) => void;
}

export function SignUpPage(props: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignUpData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    teams: [],
  });
  const [error, setError] = useState<Error>();
  const [incorrect, setIncorrect] = useState<boolean>(false);
  const [googleResponse, setGoogleResponse] = useState<any>({});
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('google-signup'), {
      theme: 'outline',
      size: 'large',
      text: 'signup_with',
    });
  }, []);

  useEffect(() => {
    const f = async () => {
      if (googleResponse.email) {
        await onSubmit({});
      }
    };
    f();
  }, [googleResponse]);

  const handleCallbackResponse = (response: any) => {
    const res = jwt_decode(response.credential) as any;
    setFormData({
      ...formData,
      email: res.email,
      firstName: res.given_name,
      lastName: res.family_name,
      google: true,
    });
    setGoogleResponse(res);
  };

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onBackClick = () => {
    props.onBack();
  };

  const onFirstNameChange = ({ target }) => {
    setFormData((prevState: SignUpData) => ({
      ...prevState,
      firstName: target.value,
    }));
  };

  const onLastNameChange = ({ target }) => {
    setFormData((prevState: SignUpData) => ({
      ...prevState,
      lastName: target.value,
    }));
  };

  const onEmailChange = ({ target }) => {
    setFormData((prevState: SignUpData) => ({
      ...prevState,
      email: target.value,
    }));
  };

  const onPasswordChange = ({ target }) => {
    setFormData((prevState: SignUpData) => ({
      ...prevState,
      password: target.value,
    }));
  };

  const onSubmit = async (event: any) => {
    if (event.preventDefault) {
      event.preventDefault();
    }
    if (
      !formData.google &&
      (formData.firstName === '' ||
        formData.lastName === '' ||
        formData.email === '' ||
        formData.password.length < 8)
    ) {
      setSubmitted(true);
      return;
    }
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_BACKEND_URL}/users/`;
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ ...formData, method: 'signup' }),
      });
      setLoading(false);

      const res = await response.json();

      if (response.status === 401) {
        setIncorrect(true);
        return;
      } else if (!response.ok) {
        setError({
          errorCode: response.status,
          errorMessage: response.statusText,
        });
        console.error(response);
      }

      props.setToken(res.access_token);

      setSubmitted(false);
    } catch (e: any) {
      console.error(e);
      setError({
        errorMessage: e.toString(),
      });
    }
  };

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setFormData((prevState: SignUpData) => ({
      ...prevState,
      teams: value,
    }));
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Signup page for PlexTech finance" />
      </Helmet>
      {error ? (
        <ErrorModal open={!!error} error={error} />
      ) : (
        <Div>
          <Form elevation={3}>
            <form>
              <Stack alignItems="center" spacing={4}>
                <StyledStack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Button variant="contained" style={{ visibility: 'hidden' }}>
                    Back to login
                  </Button>
                  <Img src={PlexTechLogo} alt="PlexTech logo" />
                  <Button variant="contained" onClick={onBackClick}>
                    Back to login
                  </Button>
                </StyledStack>
                <H1>Sign Up</H1>
                {formData.google && <p>Signed in with Google.</p>}
                <StyledStack>
                  <p>Project/Curriculum Team</p>
                  <Select
                    multiple
                    value={formData.teams}
                    onChange={handleChange}
                  >
                    {possibleTeams.map(name => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledStack>
                <StyledDivider variant="middle" light />
                {formData.google ? (
                  <Button variant="contained" onClick={onSubmit}>
                    Sign Up
                  </Button>
                ) : (
                  <>
                    <div id="google-signup" />

                    <StyledDivider variant="middle" light>
                      or
                    </StyledDivider>
                    <StyledStack>
                      <p>First Name</p>
                      <TextField
                        variant="outlined"
                        required
                        size="small"
                        value={formData.firstName}
                        onChange={onFirstNameChange}
                        error={
                          !formData.google! &&
                          submitted &&
                          formData.firstName === ''
                        }
                        helperText={
                          !formData.google! &&
                          submitted &&
                          formData.firstName === '' &&
                          'Required'
                        }
                      />
                    </StyledStack>
                    <StyledStack>
                      <p>Last Name</p>
                      <TextField
                        variant="outlined"
                        required
                        size="small"
                        value={formData.lastName}
                        onChange={onLastNameChange}
                        error={
                          !formData.google! &&
                          submitted &&
                          formData.lastName === ''
                        }
                        helperText={
                          !formData.google! &&
                          submitted &&
                          formData.lastName === '' &&
                          'Required'
                        }
                      />
                    </StyledStack>
                    <StyledStack>
                      <p>Email Address</p>
                      <TextField
                        variant="outlined"
                        required
                        size="small"
                        value={formData.email}
                        onChange={onEmailChange}
                        error={
                          (!formData.google! &&
                            submitted &&
                            formData.email === '') ||
                          incorrect
                        }
                        helperText={
                          (!formData.google! &&
                            submitted &&
                            formData.email === '' &&
                            'Required') ||
                          (incorrect &&
                            'You are not registered as a PlexTech member. Contact PlexTech management if this is incorrect.')
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
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        value={formData.password}
                        onChange={onPasswordChange}
                        error={
                          !formData.google! &&
                          submitted &&
                          formData.password.length < 8
                        }
                        helperText={
                          !formData.google! &&
                          submitted &&
                          formData.password.length < 8 &&
                          'Password must be at least 8 characters long.'
                        }
                      />
                    </StyledStack>
                    <div />
                    <Button
                      variant="contained"
                      onClick={onSubmit}
                      type="submit"
                    >
                      {loading ? (
                        <StyledCircularProgress size={20} />
                      ) : (
                        'Sign Up'
                      )}
                    </Button>
                  </>
                )}
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

const Img = styled.img`
  max-width: 80px;
`;

const Div = styled.div`
  padding-top: 64px;
  height: 100%;
`;

const StyledDivider = styled(Divider)`
  width: 100%;
`;

const H1 = styled.h1`
  margin: 0px;
  font-size: 3.052rem;
  padding-top: 24px;
`;

const StyledCircularProgress = muiStyled(CircularProgress)`
  color: rgb(255, 138, 0);
`;
