/**
 *
 * BackToTopButton
 *
 */
import * as React from 'react';
// import styled from 'styled-components/macro';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled as muiStyled } from '@mui/system';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

interface Props {}

export function BackToTopButton(props: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <StyledButton
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      startIcon={<KeyboardArrowUpIcon />}
      disableElevation
      disableFocusRipple
      disableRipple
      TouchRippleProps={{ style: { display: 'none' } }}
      sx={{
        transform: `translateX(-50%) ${
          isVisible ? 'translateY(0%)' : 'translateY(100%)'
        }`,
        transition: isVisible
          ? 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          : 'transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)',
        '&:hover': {
          background: 'transparent',
        },
      }}
    >
      Back to Top
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
