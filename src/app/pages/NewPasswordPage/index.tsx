/**
 *
 * NewPasswordPage
 *
 */
import * as React from 'react';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/system';
import { PlexTechLogo } from 'images';
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
import { Error } from 'types/types';
import { apiRequest } from 'utils/apiRequest';
import { getToken, setToken } from 'utils/useToken';

interface Props {}

export function NewPasswordPage(props: Props) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<Error>();
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

    const [success, res] = await apiRequest(
      '/profile/',
      'PUT',
      getToken()!.substring(1, getToken()!.length),
      undefined,
      { password },
    );

    setLoading(false);

    if (!success) {
      setError(res.error);
    }
    setToken(getToken()!.substring(1, getToken()!.length));
    setSubmitted(false);
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
        <ErrorModal open={!!error} error={error} />
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
                <Button variant="contained" onClick={onSubmit} type="submit">
                  {loading ? <StyledCircularProgress size={20} /> : 'Submit'}
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
  max-width: 600px;
  min-width: 500px;
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

const StyledCircularProgress = muiStyled(CircularProgress)`
  color: rgb(255, 138, 0);
`;
