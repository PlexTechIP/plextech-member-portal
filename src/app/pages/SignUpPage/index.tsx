/**
 *
 * SignUpPage
 *
 */
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import PlexTechLogo from '../../../PlexTechLogo.png';
import { styled as muiStyled } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GoogleLogin } from 'react-google-login';
import { SignUpData } from 'types/types';

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
    PIC: '',
    venmo: '',
  });

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

  const onPICChange = ({ target }) => {
    setFormData((prevState: SignUpData) => ({
      ...prevState,
      PIC: target.value,
    }));
  };

  const onVenmoChange = ({ target }) => {
    setFormData((prevState: SignUpData) => ({
      ...prevState,
      venmo: target.value,
    }));
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (
      formData.firstName === '' ||
      formData.lastName === '' ||
      formData.email === '' ||
      formData.venmo === '' ||
      formData.PIC.length !== 5 ||
      formData.password.length < 8
    ) {
      setSubmitted(true);
      return;
    }

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
      body: JSON.stringify({ ...formData, method: 'signup' }),
    });

    const res = await response.json();

    if (response.status === 401) {
      return;
    }

    props.setToken(res.access_token);

    setSubmitted(false);
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Signup page for PlexTech finance" />
      </Helmet>
      <Div>
        <Form elevation={3}>
          <form>
            <Stack alignItems="center" spacing={4}>
              <StyledStack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <StyledButton
                  variant="contained"
                  style={{ visibility: 'hidden' }}
                >
                  Back to login
                </StyledButton>
                <Img src={PlexTechLogo} alt="PlexTech logo" />
                <StyledButton variant="contained" onClick={onBackClick}>
                  Back to login
                </StyledButton>
              </StyledStack>
              <H1>Sign Up</H1>
              <GoogleLogin clientId="" />
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
                  error={submitted && formData.firstName === ''}
                  helperText={
                    submitted && formData.firstName === '' && 'Required'
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
                  error={submitted && formData.lastName === ''}
                  helperText={
                    submitted && formData.lastName === '' && 'Required'
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
                  error={submitted && formData.email === ''}
                  helperText={submitted && formData.email === '' && 'Required'}
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
                  error={submitted && formData.password.length < 8}
                  helperText={
                    submitted &&
                    formData.password.length < 8 &&
                    'Password must be at least 8 characters long.'
                  }
                />
              </StyledStack>
              <StyledStack>
                <p>PIC (contact PlexTech management if you don't have one)</p>
                <TextField
                  variant="outlined"
                  required
                  size="small"
                  type="number"
                  value={formData.PIC}
                  onChange={onPICChange}
                  error={submitted && formData.PIC.length !== 5}
                  helperText={
                    submitted &&
                    formData.PIC.length !== 5 &&
                    'PIC must be a 5-digit integer'
                  }
                />
              </StyledStack>
              <StyledStack>
                <p>Venmo Username</p>
                <TextField
                  variant="outlined"
                  required
                  size="small"
                  value={formData.venmo}
                  onChange={onVenmoChange}
                  error={submitted && formData.password === ''}
                  helperText={
                    submitted && formData.password === '' && 'Required'
                  }
                />
              </StyledStack>
              <div />
              <StyledButton
                variant="contained"
                onClick={onSubmit}
                type="submit"
              >
                Submit
              </StyledButton>
            </Stack>
          </form>
        </Form>
        <div style={{ height: '5%' }} />
      </Div>
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

const StyledButton = muiStyled(Button)`
  background-color: white;
  color: rgb(255, 138, 0);
  font-weight: bold;
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
