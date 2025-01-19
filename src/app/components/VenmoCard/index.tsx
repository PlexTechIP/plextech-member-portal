/**
 *
 * VenmoCard
 *
 */
import { Stack } from '@mui/material';
import * as React from 'react';
import { VenmoProfile } from 'types/types';

interface Props {
  venmoProfile: VenmoProfile;
}

export function VenmoCard(props: Props) {
  const { profile_picture_url, username, display_name } = props.venmoProfile;

  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <img
        src={profile_picture_url}
        alt={username}
        className="!rounded-full w-16"
      />
      <Stack>
        <p className="m-0">{display_name}</p>
        <p className="m-0 text-gray-500">@{username}</p>
      </Stack>
    </Stack>
  );
}
