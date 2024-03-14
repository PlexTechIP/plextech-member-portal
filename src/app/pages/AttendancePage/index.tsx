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
  Checkbox,
  CircularProgress,
  FormControlLabel,
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
import { Error, User } from 'types/types';
// import AddIcon from '@mui/icons-material/Add';
import { QRCodeCanvas } from 'qrcode.react';
import { apiRequest } from 'utils/apiRequest';
import jwt_decode from 'jwt-decode';
import { AttendeesDisplay } from './AttendeesDisplay';
import { QRLandingPage } from './QRLandingPage';
import { getToken } from 'utils/useToken';
import { AbsentDisplay } from './AbsentDisplay';
import { v4 as uuidv4 } from 'uuid';

const TIME_TO_REFRESH = 300;

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
  const [sessions, setSessions] = useState<{ name: string; _id: string }[]>();

  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(TIME_TO_REFRESH);
  const [manualAttendee, setManualAttendee] = useState<string>('');
  const [isLate, setIsLate] = useState<boolean>(false);

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
        set: true,
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
  const attendancetime = searchParams.get('attendancetime');
  const starttime = searchParams.get('starttime');
  const meetingIdUrl = searchParams.get('meetingid');

  const [returnValue, setReturnValue] = useState<any>({});

  useEffect(() => {
    if (attendancetime) {
      setReturnValue({ attendanceTime: attendancetime, startTime: starttime });
      return;
    }
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
      if (res.redirect) {
        window.location = res.redirect;
      } else {
        setIsLoading(false);
        setReturnValue(res);
      }
    };
    f(); // heli says he is sad
  }, [attendancecode, meetingIdUrl, props, attendancetime]);

  useEffect(() => {
    let qrCodeUpdateInterval: NodeJS.Timeout | null = null;
    let attendanceUpdateInterval: NodeJS.Timeout | null = null;
    let timerUpdateInterval: NodeJS.Timeout | null = null;

    if (!isSessionActive || !meetingId) return;

    const updateQRCode = async (set: boolean) => {
      if (set) setIsLoading(true);
      const [success, res] = await apiRequest('/attendance/', 'POST', {
        id: meetingId,
        set,
      });

      if (!success) {
        setError(res.error);
        setIsSessionActive(false);
        clearInterval(qrCodeUpdateInterval!);
        return;
      }
      setAttendees(res.attendees);
      setAbsent(res.absent);

      if (set) {
        setCode(res.code);
        setRemainingTime(TIME_TO_REFRESH);
        setIsLoading(false);

        console.log(
          `${window.location}/?attendancecode=${res.code}&meetingid=${meetingId}`,
        );
      }
    };

    if (isSessionActive) {
      updateQRCode(true);
      qrCodeUpdateInterval = setInterval(
        () => updateQRCode(true),
        TIME_TO_REFRESH * 1000,
      );
      attendanceUpdateInterval = setInterval(() => updateQRCode(false), 1000);
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
      clearInterval(attendanceUpdateInterval!);
      clearInterval(timerUpdateInterval!);
    };
  }, [isSessionActive, meetingId, props]);

  const handlePreviousSessionClick = async () => {
    setIsLoading(true);

    const [success, res] = await apiRequest(
      '/attendance/?query=sessions',
      'GET',
    );

    if (!success) {
      setError(res.error);
      setIsLoading(false);
      return;
    }

    setSessions(res.sessions);
    setIsLoading(false);
  };

  const handleBackButtonClick = () => {
    setSessions(undefined);
    setAttendees([]);
    setAbsent([]);
  };

  const handleGetAttendees = async (id: string) => {
    setIsLoading(true);
    const [success, res] = await apiRequest(`/attendance/?query=${id}`, 'GET');

    if (!success) {
      setError(res.error);
      return;
    }
    setAttendees(res.attendees);
    setAbsent(res.absent);
    setIsLoading(false);
  };

  const handleAddAttendeeManually = async () => {
    const id = uuidv4();
    const data = ['Manual', manualAttendee, isLate];

    setAttendees(prevState => ({
      ...prevState,
      [id]: data,
    }));

    setManualAttendee('');
    setIsLate(false);

    setIsLoading(true);
    const [success, res] = await apiRequest('/attendance/', 'PUT', {
      meetingId,
      attendee: data,
      attendeeId: id,
    });

    setIsLoading(false);
    if (!success) {
      setError(res.error);
      return;
    }
  };

  return (
    <>
      <Helmet>
        <title>Attendance</title>
        <meta name="description" content="Take attendance here" />
      </Helmet>
      {(returnValue.attendanceTime && returnValue.startTime) ||
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
              {!isSessionActive && !sessions ? (
                <StyledStack
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    onClick={handleSessionButtonClick}
                  >
                    Start Session
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handlePreviousSessionClick}
                  >
                    View Previous Sessions
                  </Button>
                </StyledStack>
              ) : !sessions ? (
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
                  <Stack direction="row" gap={4} alignItems="center">
                    <TextField
                      label="Add Attendee Manually"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      onChange={e => setManualAttendee(e.target.value)}
                      value={manualAttendee}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          handleAddAttendeeManually();
                        }
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isLate}
                          onChange={e => setIsLate(e.target.checked)}
                          name="late"
                        />
                      }
                      label="Late"
                    />
                  </Stack>
                  <Button
                    variant="contained"
                    onClick={handleAddAttendeeManually}
                  >
                    Add Attendee
                  </Button>
                </>
              ) : (
                <>
                  {sessions.length === 0 ? (
                    <p>No sessions found</p>
                  ) : (
                    sessions.map(({ _id, name }) => (
                      <Button onClick={() => handleGetAttendees(_id)}>
                        {name}
                      </Button>
                    ))
                  )}
                  <Button variant="contained" onClick={handleBackButtonClick}>
                    Back
                  </Button>
                </>
              )}
            </Stack>
          </Form>
          <div />
          {isSessionActive && startTime && (
            <AttendeesDisplay attendees={attendees} startTime={startTime!} />
          )}
          {isSessionActive && startTime && <AbsentDisplay absent={absent} />}
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
