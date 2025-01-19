import { Card, Grid, Paper, Stack, Grow } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  attendees: any;
  startTime: Dayjs;
}

export function AttendeesDisplay(props: Props) {
  const { attendees, startTime } = props;

  return (
    <Paper className="min-h-[95%] w-[60%] min-w-[500px] mx-auto p-16 !rounded-[48px]">
      <Stack spacing={3} alignItems="center">
        <Stack
          spacing={1}
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          className="w-full"
        >
          <h1 className="m-0">Attendees</h1>
          <Stack spacing={1} direction="row" alignItems="center">
            <InfoOutlinedIcon className="text-gray-500 text-sm" />
            <p className="m-0 text-gray-500">
              Scan the QR code and log in to mark yourself present.
            </p>
          </Stack>
        </Stack>

        <Grid container spacing={1}>
          {Object.keys(attendees).map(id => {
            if (attendees[id][0] === 'Manual') {
              return (
                <Grow in={true} key={id}>
                  <Grid item xs={6}>
                    <Card
                      className={`p-6 !rounded-[24px] w-full text-center ${
                        attendees[id][2] ? 'bg-[rgba(255,138,0,0.3)]' : ''
                      }`}
                    >
                      <h3 className="m-0">{attendees[id][1]}</h3>
                    </Card>
                  </Grid>
                </Grow>
              );
            } else {
              const [hours, minutes, seconds] = attendees[id][0].split(':');
              const isPM = attendees[id][0].includes('PM');

              const dayjsObj = dayjs()
                .hour((parseInt(hours) % 12) + (isPM ? 12 : 0))
                .minute(parseInt(minutes))
                .second(parseInt(seconds));

              return (
                <Grow in={true} key={id}>
                  <Grid item xs={6}>
                    <Card
                      className={`p-6 !rounded-[24px] w-full text-center ${
                        dayjsObj > startTime ? 'bg-[rgba(255,138,0,0.3)]' : ''
                      }`}
                    >
                      <h3 className="m-0">
                        {attendees[id][1]} - {attendees[id][0]}
                      </h3>
                    </Card>
                  </Grid>
                </Grow>
              );
            }
          })}
        </Grid>
      </Stack>
    </Paper>
  );
}
