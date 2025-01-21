/**
 *
 * ProfilePage
 *
 */

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Error, User } from 'types/types';
import { Helmet } from 'react-helmet-async';
import { ErrorModal } from 'app/components/ErrorModal';
import {
  Button,
  Card,
  Stack,
  TextField,
  Avatar,
  IconButton,
  Slider,
} from '@mui/material';
import { apiRequest } from 'utils/apiRequest';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SuccessDialog } from 'app/components/SuccessDialog';
import AvatarEditor from 'react-avatar-editor';
import { Dialog, DialogContent, DialogActions } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

interface Props {}

const Editor = AvatarEditor as any;

export function ProfilePage(props: Props) {
  const [error, setError] = useState<Error>();
  const [user, setUser] = useState<User>();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [openCrop, setOpenCrop] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const editorRef = React.useRef<AvatarEditor>(null);

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

  const [scale, setScale] = useState(1.2);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setOpenCrop(true);
    }
  };

  const handleSave = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 500;
      tempCanvas.height = 500;
      const ctx = tempCanvas.getContext('2d');
      ctx?.drawImage(canvas, 0, 0, 500, 500);

      tempCanvas.toBlob(
        async blob => {
          if (!blob) return;

          const formData = new FormData();
          formData.append('image', blob, 'profile.jpg');

          const [success] = await apiRequest(
            '/profile/image/',
            'PUT',
            formData,
          );
          if (success) {
            setImageUrl(
              `${process.env.REACT_APP_BACKEND_URL}/profile/image/${
                user?.id
              }?${new Date().getTime()}`,
            );
            setOpenCrop(false);
            setSuccess(true);
          }
        },
        'image/jpeg',
        0.8,
      );
    }
  };

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
      setImageUrl(
        `${process.env.REACT_APP_BACKEND_URL}/profile/image/${
          res.id
        }?${new Date().getTime()}`,
      );
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
      <div className="min-h-[95%] w-3/4 min-w-[500px] mx-auto px-16 pt-8 !rounded-[48px]">
        <Card className="p-12 w-4/5 !rounded-[32px]">
          <Stack spacing={4}>
            {user && (
              <>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <h1 className="text-2xl m-0">Member Details</h1>
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
                <div className="flex flex-col items-center mb-4">
                  <div className="relative">
                    <div className="flex items-end">
                      <div className="flex flex-col items-center">
                        <h3 className="text-lg mb-2">Profile Picture</h3>
                        <Avatar
                          src={imageUrl}
                          sx={{ width: 150, height: 150 }}
                          className="cursor-pointer"
                        />
                        <input
                          accept="image/*"
                          type="file"
                          id="icon-button-file"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                      <label htmlFor="icon-button-file">
                        <IconButton
                          className="absolute bottom-0 right-0 bg-white shadow-md hover:bg-gray-100"
                          component="span"
                        >
                          <UploadIcon />
                        </IconButton>
                      </label>
                    </div>
                  </div>
                </div>

                <Dialog
                  open={openCrop}
                  onClose={() => setOpenCrop(false)}
                  PaperProps={{
                    style: {
                      borderRadius: '24px',
                      padding: '16px',
                    },
                  }}
                >
                  <DialogContent className="!pb-0">
                    <h2 className="text-xl font-bold mb-4">
                      Edit Profile Picture
                    </h2>
                    {image && (
                      <div className="flex flex-col items-center">
                        <Editor
                          ref={editorRef}
                          image={image}
                          width={250}
                          height={250}
                          border={50}
                          borderRadius={125}
                          color={[0, 0, 0, 0.6]}
                          scale={scale}
                        />
                        <div className="mt-6 w-full">
                          <p className="text-sm text-gray-600 mb-2">Zoom</p>
                          <Slider
                            value={scale}
                            min={1}
                            max={3}
                            step={0.1}
                            onChange={(_, value) => setScale(value as number)}
                          />
                        </div>
                      </div>
                    )}
                  </DialogContent>
                  <DialogActions className="p-6">
                    <Button onClick={() => setOpenCrop(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
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
                  inputProps={{ maxLength: 250 }}
                  helperText={`${profileBlurb.length} / 250`}
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
              </>
            )}
          </Stack>
        </Card>
      </div>
      {user && (
        <div className="min-h-[95%] w-3/4 min-w-[500px] mx-auto px-16 pt-8 !rounded-[48px]">
          <Card className="p-12 w-4/5 !rounded-[32px]">
            <Stack spacing={4}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <h1 className="text-2xl m-0">Bank Details</h1>
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
                <InfoOutlinedIcon className="text-gray-500 text-sm" />
                <p className="m-0 text-gray-500">
                  Your information is securely encrypted with Fernet.
                </p>
              </Stack>
            </Stack>
          </Card>
        </div>
      )}
      {admin && user && (
        <div className="min-h-[95%] w-3/4 min-w-[500px] mx-auto px-16 pt-8 !rounded-[48px]">
          <Card className="p-12 w-4/5 !rounded-[32px]">
            <Stack spacing={4}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <h1 className="text-2xl m-0">Bluevine Details (admin only)</h1>
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
                <InfoOutlinedIcon className="text-gray-500 text-sm" />
                <p className="m-0 text-gray-500">
                  Your information is securely encrypted with Fernet.
                </p>
              </Stack>
            </Stack>
          </Card>
        </div>
      )}
    </>
  );
}
