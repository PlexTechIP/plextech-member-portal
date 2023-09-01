import { Card, Grid, Paper, Stack, Grow } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React from 'react';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  attendees: any;
  startTime: Dayjs;
}

export function AttendeesDisplay(props: Props) {
  const { attendees, startTime } = props;

  return (
    <Form>
      <Stack spacing={3} alignItems="center">
        <StyledStack
          spacing={1}
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <H1>Attendees</H1>
          <Stack spacing={1} direction="row" alignItems="center">
            <StyledInfoOutlinedIcon />
            <P>Scan the QR code and log in to mark yourself present.</P>
          </Stack>
        </StyledStack>

        <Grid container spacing={1}>
          {Object.keys(attendees).map(id => {
            const [hours, minutes, seconds] = attendees[id][0].split(':');
            const isPM = attendees[id][0].includes('PM');

            const dayjsObj = dayjs()
              .hour((parseInt(hours) % 12) + (isPM ? 12 : 0))
              .minute(parseInt(minutes))
              .second(parseInt(seconds));

            return (
              <Grow in={true} key={id}>
                <Grid item xs={6}>
                  <StyledCard
                    style={
                      dayjsObj > startTime
                        ? { backgroundColor: 'rgba(255, 138, 0, 0.3)' }
                        : {}
                    }
                  >
                    <H3>
                      {attendees[id][1]} - {attendees[id][0]}
                    </H3>
                  </StyledCard>
                </Grid>
              </Grow>
            );
          })}
        </Grid>
      </Stack>
    </Form>
  );
}

const Form = muiStyled(Paper)`
  min-height: 95%;
  width: 60%;
  min-width: 500px;
  margin: auto;
  padding: 64px;
  border-radius: 48px;
`;

const StyledStack = styled(Stack)`
  width: 100%;
`;

const StyledInfoOutlinedIcon = muiStyled(InfoOutlinedIcon)`
  color: grey;
  font-size: small;
`;

const P = styled.p`
  margin: 0;
  color: grey;
`;

const H1 = styled.h1`
  margin: 0;
`;

const H3 = styled.h3`
  margin: 0;
`;

const StyledCard = muiStyled(Card)`
  padding: 24px;
  border-radius: 24px;
  width: 100%;
  text-align: center;
`;
