/**
 *
 * AttendancePage
 *
 */
import { ErrorModal } from 'app/components/ErrorModal';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  // Button,
  // InputAdornment,
  // IconButton,
} from '@mui/material';
import { styled as muiStyled } from '@mui/system';
import { Error } from 'types/types';
// import AddIcon from '@mui/icons-material/Add';
import { QRCodeCanvas } from 'qrcode.react';
import { apiRequest } from 'utils/apiRequest';
import jwt_decode from 'jwt-decode';
import { AttendeesDisplay } from './AttendeesDisplay';
import { QRLandingPage } from './QRLandingPage';
import { getToken } from 'utils/useToken';
import { AbsentDisplay } from './AbsentDisplay';

const TIME_TO_REFRESH = 60;

interface Props {}

export function AttendancePage(props: Props) {
  const [code, setCode] = useState<string>('hi');
  const [meetingId, setMeetingId] = useState<string>('');
  const [attendees, setAttendees] = useState<any>({});
  const [absent, setAbsent] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
  const [meetingName, setMeetingName] = useState<string>('');

  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(TIME_TO_REFRESH);

  const handleSessionButtonClick = async () => {
    setIsLoading(true);
    if (!isSessionActive) {
      // Start session
      setIsSessionActive(true);

      // Make a POST request to /attendance to start the session
      const [success, res] = await apiRequest('/attendance/', 'POST', {
        name: meetingName,
        meetingLeader: (jwt_decode(getToken()!) as { sub: string }).sub,
        startTime: startTime?.format('h:mm:ss A'),
      });
      if (!success) {
        setError(res.error);
        setIsSessionActive(false);
        return;
      }

      setCode(res.code);
      setMeetingId(res.id);
      setAttendees(res.attendees);
      setAbsent(res.absent);
    } else {
      // Stop session
      setIsSessionActive(false);

      // Make a DELETE request to /attendance to stop the session
      const [success, res] = await apiRequest('/attendance/', 'DELETE', {
        id: meetingId,
      });

      if (!success) {
        setError(res.error);
        setIsSessionActive(true);
        return;
      }

      // Copy attendees and absent list to clipboard
      const clipboardData = {
        attendees: Object.values(attendees).map((item: any) => item[1]),
        absent: absent,
      };
      await navigator.clipboard.writeText(JSON.stringify(clipboardData));

      // Show popup that says copied attendance data to clipboard
      // const showCopiedPopup = () => {
      //   alert('Attendance data copied to clipboard');
      // };
      // showCopiedPopup();

      setCode('');
      setMeetingId('');
      setAttendees([]);
      setAbsent([]);
    }
    setIsLoading(false);
  };

  const handleExportToCSV = () => {
    const csvContent =
      'Name,Arrival Time\n' +
      Object.values(attendees)
        .map((attendee: any) => {
          const arrivalTime = attendee[0];
          const name = attendee[1];
          return `${name},${arrivalTime}`;
        })
        .join('\n');

    const absentList = 'Name/Email\n' + absent.join('\n');

    const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const absentBlob = new Blob([absentList], {
      type: 'text/csv;charset=utf-8',
    });

    const linkAbsent = document.createElement('a');
    linkAbsent.href = URL.createObjectURL(absentBlob);
    linkAbsent.download = 'absent.csv';
    document.body.appendChild(linkAbsent);
    linkAbsent.click();
    document.body.removeChild(linkAbsent);

    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvBlob);
    link.download = 'attendees.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const searchParams = new URLSearchParams(window.location.search);
  const attendancecode = searchParams.get('attendancecode');
  const meetingIdUrl = searchParams.get('meetingid');

  const [returnValue, setReturnValue] = useState<any>({});

  useEffect(() => {
    if (!attendancecode) return;
    const f = async () => {
      setIsLoading(true);
      const [success, res] = await apiRequest('/attendance/', 'PUT', {
        attendancecode,
        meetingId: meetingIdUrl,
        time: dayjs().format('h:mm:ss A'),
      });

      if (!success && res.error.errorCode !== 402) {
        setError(res.error);
        return;
      }
      setIsLoading(false);
      setReturnValue(res);
    };
    f();
  }, [attendancecode, meetingIdUrl, props]);

  useEffect(() => {
    let qrCodeUpdateInterval: NodeJS.Timeout | null = null;
    let timerUpdateInterval: NodeJS.Timeout | null = null;

    if (!isSessionActive || !meetingId) return;

    const updateQRCode = async () => {
      setIsLoading(true);
      const [success, res] = await apiRequest('/attendance/', 'POST', {
        id: meetingId,
      });

      if (!success) {
        setError(res.error);
        setIsSessionActive(false);
        clearInterval(qrCodeUpdateInterval!);
        return;
      }

      setCode(res.code);
      setAttendees(res.attendees);
      setAbsent(res.absent);
      setRemainingTime(TIME_TO_REFRESH);
      setIsLoading(false);
    };

    if (isSessionActive) {
      updateQRCode();
      qrCodeUpdateInterval = setInterval(updateQRCode, TIME_TO_REFRESH * 1000);
      timerUpdateInterval = setInterval(
        () =>
          setRemainingTime((prevTime: number) =>
            prevTime ? prevTime - 1 : prevTime,
          ),
        1000,
      );
    }

    return () => {
      clearInterval(qrCodeUpdateInterval!);
      clearInterval(timerUpdateInterval!);
    };
  }, [isSessionActive, meetingId, props]);

  return (
    <>
      <Helmet>
        <title>Attendance</title>
        <meta name="description" content="Take attendance here" />
      </Helmet>
      {(attendancecode &&
        returnValue.attendanceTime &&
        returnValue.startTime) ||
      (returnValue && returnValue.error) ? (
        <QRLandingPage {...returnValue} />
      ) : (
        <Stack spacing={2} alignItems="center">
          <Form>
            <Stack spacing={3} alignItems="center">
              <StyledStack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
              >
                <TextField
                  label="Meeting Name"
                  disabled={isSessionActive}
                  value={meetingName}
                  onChange={(e: any) => {
                    setMeetingName(e.target.value);
                  }}
                  error={!meetingName}
                  required
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Meeting Start Time"
                    value={startTime}
                    onChange={(newValue: Dayjs | null) => {
                      setStartTime(newValue);
                    }}
                    renderInput={(params: any) => <TextField {...params} />}
                    disabled={isSessionActive}
                  />
                </LocalizationProvider>
              </StyledStack>
              {!isSessionActive ? (
                <Button variant="contained" onClick={handleSessionButtonClick}>
                  Start Session
                </Button>
              ) : (
                <>
                  <P>
                    Code will change in {remainingTime} second
                    {remainingTime !== 1 ? 's' : ''}
                  </P>
                  <div
                    style={{
                      position: 'relative',
                      width: '300px',
                      height: '300px',
                    }}
                  >
                    <QRCodeCanvas
                      id="qrCode"
                      value={`${window.location}/?attendancecode=${code}&meetingid=${meetingId}`}
                      size={300}
                      bgColor="#ffffff"
                      level="H"
                      style={{
                        opacity: isLoading ? 0.5 : 1,
                        transition: 'opacity 0.3s ease-in-out',
                      }}
                    />
                    {isLoading && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <StyledCircularProgress />
                      </div>
                    )}
                  </div>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                      variant="contained"
                      onClick={handleSessionButtonClick}
                    >
                      Stop Session
                    </Button>
                    <Button variant="contained" onClick={handleExportToCSV}>
                      Export to CSV
                    </Button>
                  </Stack>
                </>
              )}
            </Stack>
          </Form>
          <div />
          {startTime && (
            <AttendeesDisplay attendees={attendees} startTime={startTime!} />
          )}
          {startTime && <AbsentDisplay absent={absent} />}
        </Stack>
      )}
      {error && <ErrorModal open={!!error} error={error} />}
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
  margin-top: 32px;
`;

const StyledStack = styled(Stack)`
  width: 100%;
`;

const StyledCircularProgress = muiStyled(CircularProgress)`
  color: rgb(255, 138, 0);
  width: 50px !important;
  height: 50px !important;
  `;

const P = styled.p`
  margin: 0;
  color: grey;
`;
