import { Card, Grid, Paper, Stack, Grow } from '@mui/material';
import React from 'react';

interface Props {
  absent: string[];
}

export function AbsentDisplay(props: Props) {
  const { absent } = props;

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
          <h1 className="m-0">Absent</h1>
        </Stack>

        <Grid container spacing={1}>
          {absent.map(name => (
            <Grow in={true} key={name}>
              <Grid item xs={6}>
                <Card className="p-6 !rounded-[24px] w-full text-center">
                  <h3 className="m-0">{name}</h3>
                </Card>
              </Grid>
            </Grow>
          ))}
        </Grid>
      </Stack>
    </Paper>
  );
}
