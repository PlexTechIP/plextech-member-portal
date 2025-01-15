/**
 *
 * ProfilePage
 *
 */

import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Error, User } from 'types/types';
import { Helmet } from 'react-helmet-async';
import { ErrorModal } from 'app/components/ErrorModal';
import { styled as muiStyled } from '@mui/system';
// import { AttendanceCard } from 'app/components/AttendanceCard';
import { Button, Card, Stack, TextField } from '@mui/material';
import { apiRequest } from 'utils/apiRequest';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SuccessDialog } from 'app/components/SuccessDialog';

interface Props {}

export function ProfilePage(props: Props) {
  const [error, setError] = useState<Error>();
  const [user, setUser] = useState<User>();

  const [admin, setAdmin] = useState<boolean>(false);

  const [accountNumber, setAccountNumber] = useState<string>('');
  const [routingNumber, setRoutingNumber] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');

  const [success, setSuccess] = useState<boolean>(false);

  const [bluevineEmail, setBluevineEmail] = useState<string>('');
  const [bluevinePassword, setBluevinePassword] = useState<string>('');

  const [currentPosition, setCurrentPosition] = useState<string>('');
  const [profileBlurb, setProfileBlurb] = useState<string>('');
  const [linkedinUsername, setLinkedinUsername] = useState<string>('');
  const [instagramUsername, setInstagramUsername] = useState<string>('');
  const [calendlyUsername, setCalendlyUsername] = useState<string>('');
  const [currentCompany, setCurrentCompany] = useState<string>('');

  useEffect(() => {
    const f = async () => {
      const [success, res] = await apiRequest('/profile/', 'GET');

      if (!success) {
        setError(res.error);
        return;
      }

      setUser(res);
      setAdmin(res.treasurer);
      setBluevineEmail(res.bluevine_email);
      setBluevinePassword(res.bluevine_password);
      setCurrentPosition(res.current_position || '');
      setProfileBlurb(res.profile_blurb || '');
      setLinkedinUsername(res.linkedin_username || '');
      setInstagramUsername(res.instagram_username || '');
      setCalendlyUsername(res.calendly_username || '');
      setCurrentCompany(res.current_company || '');
      if (res.bank) {
        setAccountNumber(res.bank.account_number);
        setRoutingNumber(res.bank.routing_number);
        setBankName(res.bank.bank_name);
      }
    };
    f();
  }, [props]);

  const bankSubmit = async () => {
    const bodyData = { bankName };
    if (accountNumber !== user?.bank?.account_number) {
      bodyData['account_number'] = accountNumber;
    }
    if (routingNumber !== user?.bank?.routing_number) {
      bodyData['routing_number'] = routingNumber;
    }

    const [success, res] = await apiRequest('/bank/', 'PUT', bodyData);

    if (!success) {
      setError(res.error);
      return;
    }

    setUser((prevUser: User | undefined) => ({
      ...prevUser!,
      bank: {
        ...prevUser!.bank,
        ...bodyData,
      },
    }));

    setSuccess(true);
  };

  const bluevineSubmit = async () => {
    const bodyData = { bluevineEmail };
    if (bluevinePassword && bluevinePassword !== user?.bluevinePassword) {
      bodyData['bluevinePassword'] = bluevinePassword;
    }

    const [success, res] = await apiRequest('/bluevine/', 'PUT', bodyData);

    if (!success) {
      setError(res.error);
      return;
    }

    setUser((prevUser: User | undefined) => ({
      ...prevUser!,
      bodyData,
    }));

    setSuccess(true);
  };

  const profileSubmit = async () => {
    const [success, res] = await apiRequest('/profile/', 'PUT', {
      current_position: currentPosition,
      profile_blurb: profileBlurb,
      linkedin_username: linkedinUsername,
      instagram_username: instagramUsername,
      calendly_username: calendlyUsername,
      current_company: currentCompany,
    });

    if (!success) {
      setError(res.error);
      return;
    }

    setSuccess(true);
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Profile information" />
      </Helmet>
      {error && <ErrorModal open={!!error} error={error} />}
      <Div />
      {user && (
        <>
          <Div>
            <Form>
              <Stack spacing={4}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <H1>Member Details</H1>
                  <Button
                    onClick={profileSubmit}
                    variant="contained"
                    disabled={
                      (profileBlurb === user.profile_blurb &&
                        linkedinUsername === user.linkedin_username &&
                        instagramUsername === user.instagram_username &&
                        calendlyUsername === user.calendly_username &&
                        currentCompany === user.current_company) ||
                      (linkedinUsername !== '' &&
                        !linkedinUsername.startsWith(
                          'https://www.linkedin.com/',
                        )) ||
                      (instagramUsername !== '' &&
                        !instagramUsername.startsWith(
                          'https://www.instagram.com/',
                        )) ||
                      (calendlyUsername !== '' &&
                        !calendlyUsername.startsWith(
                          'https://calendly.com/',
                        )) ||
                      profileBlurb === ''
                    }
                  >
                    Update
                  </Button>
                </Stack>
                <TextField
                  fullWidth
                  label="Current Position (admin only)"
                  value={currentPosition}
                  onChange={e => setCurrentPosition(e.target.value)}
                  InputProps={{
                    readOnly: !admin,
                  }}
                  disabled={!admin}
                />
                <TextField
                  fullWidth
                  label="Profile Blurb"
                  value={profileBlurb}
                  onChange={e => setProfileBlurb(e.target.value)}
                  multiline
                  rows={4}
                  required
                />
                <TextField
                  fullWidth
                  label="LinkedIn URL"
                  value={linkedinUsername}
                  onChange={e => setLinkedinUsername(e.target.value)}
                  error={
                    (linkedinUsername !== '' &&
                      !linkedinUsername.startsWith(
                        'https://www.linkedin.com/',
                      )) ||
                    (linkedinUsername === '' &&
                      linkedinUsername !== user.linkedin_username)
                  }
                  helperText={
                    linkedinUsername !== '' &&
                    !linkedinUsername.startsWith('https://www.linkedin.com/')
                      ? 'Must be a valid LinkedIn URL'
                      : ''
                  }
                  required
                />
                <TextField
                  fullWidth
                  label="Instagram URL"
                  value={instagramUsername}
                  onChange={e => setInstagramUsername(e.target.value)}
                  error={
                    (instagramUsername !== '' &&
                      !instagramUsername.startsWith(
                        'https://www.instagram.com/',
                      )) ||
                    (instagramUsername === '' &&
                      instagramUsername !== user.instagram_username)
                  }
                  helperText={
                    instagramUsername !== '' &&
                    !instagramUsername.startsWith('https://www.instagram.com/')
                      ? 'Must be a valid Instagram URL'
                      : ''
                  }
                  required
                />
                <TextField
                  fullWidth
                  label="Calendly URL"
                  value={calendlyUsername}
                  onChange={e => setCalendlyUsername(e.target.value)}
                  error={
                    (calendlyUsername !== '' &&
                      !calendlyUsername.startsWith('https://calendly.com/')) ||
                    (calendlyUsername === '' &&
                      calendlyUsername !== user.calendly_username)
                  }
                  helperText={
                    calendlyUsername !== '' &&
                    !calendlyUsername.startsWith('https://calendly.com/')
                      ? 'Must be a valid Calendly URL'
                      : ''
                  }
                  required
                />
                <TextField
                  fullWidth
                  label="Current Company"
                  value={currentCompany}
                  onChange={e => setCurrentCompany(e.target.value)}
                />
              </Stack>
            </Form>
          </Div>
          <Div>
            <Form>
              <Stack spacing={4}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <H1>Bank Details</H1>
                  <Button
                    onClick={bankSubmit}
                    variant="contained"
                    disabled={
                      !accountNumber ||
                      !routingNumber ||
                      (accountNumber === user.bank?.account_number &&
                        routingNumber === user.bank?.routing_number &&
                        bankName === user.bank?.bank_name) ||
                      !bankName
                    }
                  >
                    {user.bank ? 'Update' : 'Submit'}
                  </Button>
                </Stack>
                <>
                  <TextField
                    fullWidth
                    label="Account Number"
                    onChange={e => setAccountNumber(e.target.value)}
                    required
                    error={
                      !(
                        (accountNumber && /^\d+$/.test(accountNumber)) ||
                        accountNumber === user.bank?.account_number
                      )
                    }
                    value={accountNumber}
                    type="password"
                  />
                  <TextField
                    fullWidth
                    label="Routing Number"
                    value={routingNumber}
                    onChange={e => setRoutingNumber(e.target.value)}
                    required
                    error={
                      !(
                        (routingNumber && /^\d+$/.test(routingNumber)) ||
                        routingNumber === user.bank?.routing_number
                      )
                    }
                    type="password"
                  />
                </>
                <>
                  <TextField
                    fullWidth
                    label="Bank Name"
                    value={bankName}
                    onChange={e => setBankName(e.target.value)}
                    required
                    error={!(bankName || bankName === user.bank?.bank_name)}
                  />
                  <SuccessDialog
                    open={success}
                    onClose={() => setSuccess(false)}
                  />
                </>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  justifyContent="flex-end"
                >
                  <StyledInfoOutlinedIcon />
                  <P>Your information is securely encrypted with Fernet.</P>
                </Stack>
              </Stack>
            </Form>
          </Div>
          {admin && (
            <Div>
              <Form>
                <Stack spacing={4}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <H1>Bluevine Details (admin only)</H1>
                    <Button
                      onClick={bluevineSubmit}
                      variant="contained"
                      disabled={
                        !bluevineEmail ||
                        !bluevinePassword ||
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bluevineEmail) ||
                        (bluevinePassword === user.bluevinePassword &&
                          bluevineEmail === user.bluevineEmail)
                      }
                    >
                      {user.bank ? 'Update' : 'Submit'}
                    </Button>
                  </Stack>
                  <>
                    <TextField
                      fullWidth
                      label="Bluevine Email"
                      onChange={e => setBluevineEmail(e.target.value)}
                      required
                      error={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bluevineEmail)}
                      value={bluevineEmail}
                    />
                    <TextField
                      fullWidth
                      label="Bluevine Password"
                      value={bluevinePassword}
                      onChange={e => setBluevinePassword(e.target.value)}
                      error={!bluevinePassword}
                      required
                      type="password"
                    />
                  </>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    justifyContent="flex-end"
                  >
                    <StyledInfoOutlinedIcon />
                    <P>Your information is securely encrypted with Fernet.</P>
                  </Stack>
                </Stack>
              </Form>
            </Div>
          )}
        </>
      )}
    </>
  );
}

const Form = muiStyled(Card)`
  padding: 48px;
  width: 80%;
  border-radius: 32px;
`;

const Div = styled.div`
  min-height: 95%;
  width: 75%;
  min-width: 500px;
  margin: auto;
  padding-left: 64px;
  padding-right: 64px;
  padding-top: 32px;
  border-radius: 48px;
`;

const H1 = styled.h1`
  margin: 0;
`;

const P = styled.p`
  margin: 0;
  color: grey;
`;

const StyledInfoOutlinedIcon = muiStyled(InfoOutlinedIcon)`
  color: grey;
  font-size: small;
`;
