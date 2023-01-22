/**
 *
 * NewPasswordPage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { styled as muiStyled } from '@mui/system';
import PlexTechLogo from '../../../PlexTechLogo.png';
import {
  Stack,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ErrorModal } from 'app/components/ErrorModal';
import { Helmet } from 'react-helmet-async';

interface Props {
  setToken: (newToken: string) => void;
  token: string | null;
}

export function NewPasswordPage(props: Props) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onPasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (password.length < 8) {
      setSubmitted(true);
      return;
    }
    setLoading(true);

    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/profile/`;
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' + props.token!.substring(1, props.token!.length),
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ password }),
      });
      setLoading(false);

      if (!response.ok) {
        setError(true);
      }
      props.setToken(props.token!.substring(1, props.token!.length));
      setSubmitted(false);
    } catch (e) {
      console.error(e);
      setError(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta
          name="description"
          content="Reset Password page for PlexTech finance"
        />
      </Helmet>
      {error ? (
        <ErrorModal open={error} />
      ) : (
        <Div>
          <Form elevation={3}>
            <form>
              <Stack alignItems="center" spacing={4}>
                <Img src={PlexTechLogo} alt="PlexTech logo" />
                <H1>Reset Password</H1>
                <StyledStack>
                  <p>New Password</p>
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
                    value={password}
                    onChange={onPasswordChange}
                    error={submitted && password.length < 8}
                    helperText={
                      submitted &&
                      password.length < 8 &&
                      'Password must be at least 8 characters long.'
                    }
                  />
                </StyledStack>
                <StyledButton
                  variant="contained"
                  onClick={onSubmit}
                  type="submit"
                >
                  {loading ? <StyledCircularProgress size={20} /> : 'Submit'}
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
  min-height: 65%;
  width: 40%;
  margin: auto;
  padding: 64px;
  border-radius: 48px;
`;

const StyledStack = styled(Stack)`
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
