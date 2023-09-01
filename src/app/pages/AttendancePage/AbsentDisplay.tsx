import { Card, Grid, Paper, Stack, Grow } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material';

interface Props {
  absent: string[];
}

export function AbsentDisplay(props: Props) {
  const { absent } = props;

  return (
    <Form>
      <Stack spacing={3} alignItems="center">
        <StyledStack
          spacing={1}
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <H1>Absent</H1>
        </StyledStack>

        <Grid container spacing={1}>
          {absent.map(name => (
            <Grow in={true} key={name}>
              <Grid item xs={6}>
                <StyledCard>
                  <H3>{name}</H3>
                </StyledCard>
              </Grid>
            </Grow>
          ))}
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
