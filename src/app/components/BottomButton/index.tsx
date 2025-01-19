/**
 *
 * BottomButton
 *
 */
import * as React from 'react';
import { Button } from '@mui/material';

interface Props {
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  sx?: any;
}

export function BottomButton(props: Props) {
  const { text, onClick, icon, sx } = props;

  return (
    <Button
      onClick={onClick}
      startIcon={icon}
      disableElevation
      disableFocusRipple
      disableRipple
      TouchRippleProps={{ style: { display: 'none' } }}
      sx={sx}
      className="fixed bottom-2 left-1/2 m-auto transition-transform duration-300 ease-in-out"
    >
      {text}
    </Button>
  );
}
