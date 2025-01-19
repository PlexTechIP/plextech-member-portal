/**
 *
 * NewPasswordPage
 *
 */
import * as React from 'react';
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
      { password },
      getToken()!.substring(1, getToken()!.length),
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
        <div className="pt-16 h-full">
          <Paper
            className="min-h-[95%] max-w-[600px] min-w-[500px] mx-auto p-16 !rounded-[48px]"
            elevation={3}
          >
            <form>
              <Stack alignItems="center" spacing={4}>
                <img
                  src={PlexTechLogo}
                  alt="PlexTech logo"
                  className="max-w-[80px]"
                />
                <h1 className="m-0 text-[3.052rem] pt-6">Reset Password</h1>
                <Stack className="w-full">
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
                </Stack>
                <Button variant="contained" onClick={onSubmit} type="submit">
                  {loading ? (
                    <CircularProgress
                      className="text-[rgb(255,138,0)]"
                      size={20}
                    />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Stack>
            </form>
          </Paper>
          <div className="h-[5%]" />
        </div>
      )}
    </>
  );
}
