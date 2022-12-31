import { Button, Card, Grid } from '@material-ui/core';
import { Stack } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components/macro';
import { Request } from './types';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  request: Request;
  showModal: () => void;
  status: string;
}

export function RequestCard(props: Props) {
  return (
    <StyledCard elevation={3} key={props.request.id}>
      <Stack spacing={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ width: '100%' }}
        >
          <H3>{props.request.itemDescription}</H3>
          <H3>${props.request.amount}</H3>
        </Stack>
        <p>Receipts:</p>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid>
            {props.request.images.map(image => (
              <StyledButton variant="outlined">
                {image.name.length < 20
                  ? image.name
                  : `${image.name.substring(0, 20)}...`}
              </StyledButton>
            ))}
          </Grid>
          <Button
            size="small"
            startIcon={React.cloneElement(<EditIcon />)}
            onClick={props.showModal}
            disabled={
              props.status === 'underReview' || props.status === 'approved'
            }
          >
            Edit
          </Button>
        </Stack>
      </Stack>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  padding: 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const H3 = styled.h3`
  margin: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledButton = styled(Button)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
