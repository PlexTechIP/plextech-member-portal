/**
 *
 * BottomButton
 *
 */
import * as React from 'react';
// import styled from 'styled-components';
import { styled as muiStyled } from '@mui/system';
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
    <StyledButton
      onClick={onClick}
      startIcon={icon}
      disableElevation
      disableFocusRipple
      disableRipple
      TouchRippleProps={{ style: { display: 'none' } }}
      sx={sx}
    >
      {text}
    </StyledButton>
  );
}

const StyledButton = muiStyled(Button)`
  position: fixed;
  bottom: 8px;
  margin: auto;
  left: 50%;
  transition: transform 0.3s ease-in-out;
`;
