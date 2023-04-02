/**
 *
 * VenmoCard
 *
 */
import { Stack } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components/macro';
import { VenmoProfile } from 'types/types';

interface Props {
  venmoProfile: VenmoProfile;
}

export function VenmoCard(props: Props) {
  const { profile_picture_url, username, display_name } = props.venmoProfile;

  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <Img src={profile_picture_url} alt={username} />
      <Stack>
        <P>{display_name}</P>
        <P2>@{username}</P2>
      </Stack>
    </Stack>
  );
}

const P = styled.p`
  margin: 0;
`;

const P2 = styled.p`
  margin: 0;
  color: grey;
`;

const Img = styled.img`
  border-radius: 50%;
  width: 64px;
`;
