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
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PlexTechLogo } from 'images';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SignUpData } from 'types/types';
import { ErrorModal } from 'app/components/ErrorModal';
import { Error } from 'types/types';
import jwt_decode from 'jwt-decode';
import { apiRequest } from 'utils/apiRequest';
import { setToken } from 'utils/useToken';

interface Props {
  onBack: () => void;
}

export function SignUpPage(props: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignUpData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
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
      first_name: res.given_name,
      last_name: res.family_name,
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
      first_name: target.value,
    }));
  };

  const onLastNameChange = ({ target }) => {
    setFormData((prevState: SignUpData) => ({
      ...prevState,
      last_name: target.value,
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
      (formData.first_name === '' ||
        formData.last_name === '' ||
        formData.email === '' ||
        formData.password.length < 8)
    ) {
      setSubmitted(true);
      return;
    }
    setLoading(true);
    const [success, res] = await apiRequest(
      `/users/`,
      'POST',
      { ...formData, method: 'signup' },
      undefined,
      () => setIncorrect(true),
    );
    setLoading(false);

    if (!success) {
      setError(res.error);
    }

    setToken(res.access_token);

    setSubmitted(false);
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
        <div className="pt-16 h-full">
          <Paper
            className="min-h-[95%] w-2/5 min-w-[500px] mx-auto p-16 !rounded-[48px]"
            elevation={3}
          >
            <form>
              <Stack alignItems="center" spacing={4}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  className="w-full"
                >
                  <Button variant="contained" style={{ visibility: 'hidden' }}>
                    Back to login
                  </Button>
                  <img
                    src={PlexTechLogo}
                    alt="PlexTech logo"
                    className="max-w-[80px]"
                  />
                  <Button variant="contained" onClick={onBackClick}>
                    Back to login
                  </Button>
                </Stack>
                <h1 className="m-0 text-[3.052rem] pt-6">Sign Up</h1>
                {formData.google && <p>Signed in with Google.</p>}
                <Divider className="w-full" variant="middle" light />
                {formData.google ? (
                  <Button variant="contained" onClick={onSubmit}>
                    Sign Up
                  </Button>
                ) : (
                  <>
                    <div id="google-signup" />

                    <Divider className="w-full" variant="middle" light>
                      or
                    </Divider>
                    <Stack className="w-full">
                      <p>First Name</p>
                      <TextField
                        variant="outlined"
                        required
                        size="small"
                        value={formData.first_name}
                        onChange={onFirstNameChange}
                        error={
                          !formData.google! &&
                          submitted &&
                          formData.first_name === ''
                        }
                        helperText={
                          !formData.google! &&
                          submitted &&
                          formData.first_name === '' &&
                          'Required'
                        }
                      />
                    </Stack>
                    <Stack className="w-full">
                      <p>Last Name</p>
                      <TextField
                        variant="outlined"
                        required
                        size="small"
                        value={formData.last_name}
                        onChange={onLastNameChange}
                        error={
                          !formData.google! &&
                          submitted &&
                          formData.last_name === ''
                        }
                        helperText={
                          !formData.google! &&
                          submitted &&
                          formData.last_name === '' &&
                          'Required'
                        }
                      />
                    </Stack>
                    <Stack className="w-full">
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
                    </Stack>
                    <Stack className="w-full">
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
                    </Stack>
                    <div />
                    <Button
                      variant="contained"
                      onClick={onSubmit}
                      type="submit"
                    >
                      {loading ? (
                        <CircularProgress
                          className="text-[rgb(255,138,0)]"
                          size={20}
                        />
                      ) : (
                        'Sign Up'
                      )}
                    </Button>
                  </>
                )}
              </Stack>
            </form>
          </Paper>
          <div className="h-[5%]" />
        </div>
      )}
    </>
  );
}
