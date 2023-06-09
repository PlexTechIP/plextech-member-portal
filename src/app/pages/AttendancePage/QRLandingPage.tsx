import { Paper, Stack } from '@mui/material';
import React from 'react';
import styled from 'styled-components/macro';
import { styled as muiStyled } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import PErrorImage from './PError.png';
import PRegularImage from './PRegular.png';
import PColdImage from './PCold.png';
import { Error } from 'types/types';

interface Props {
  attendanceTime: string;
  startTime: string;
  error?: Error;
}

export function QRLandingPage(props: Props) {
  if (props.error?.errorCode === 402) {
    return (
      <Form>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <H2>Sorry! This code is invalid, please try scanning it again.</H2>
          <Img src={PColdImage} alt="Plexie cold" />
        </Stack>
      </Form>
    );
  }

  const parseTime = (time: string): Dayjs => {
    const [hours, minutes, seconds] = time.split(':');
    const isPM = time.includes('PM');

    return dayjs()
      .hour((parseInt(hours) % 12) + (isPM ? 12 : 0))
      .minute(parseInt(minutes))
      .second(parseInt(seconds));
  };

  const isLate = parseTime(props.attendanceTime).isAfter(
    parseTime(props.startTime),
  );

  return (
    <Form>
      <Stack spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack spacing={1}>
            {isLate ? (
              <H2 style={{ color: 'red' }}>You are late!</H2>
            ) : (
              <H2 style={{ color: 'green' }}>You are on time!</H2>
            )}

            <H2>Code scanned at: {props.attendanceTime}</H2>
            <H2>Meeting start time: {props.startTime}</H2>
          </Stack>
          {isLate ? (
            <Img src={PErrorImage} alt="Plexie sad" />
          ) : (
            <Img src={PRegularImage} alt="Plexie happy" />
          )}
        </Stack>
      </Stack>
    </Form>
  );
}
const Img = styled.img`
  max-height: 200px;
`;

const H2 = styled.h2`
  margin: 0;
`;

const Form = muiStyled(Paper)`
  min-height: 95%;
  width: 50%;
  min-width: 700px;
  margin: auto;
  padding: 64px;
  border-radius: 48px;
  margin-top: 32px;
`;
