/**
 *
 * TopBar
 *
 */
import { AppBar, Box, Drawer, Toolbar, IconButton, Stack } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components/macro';
import MenuIcon from '@mui/icons-material/Menu';
import PlexTechLogo from '../../../PlexTechLogo.png';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface Props {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
}

export function TopBar(props: Props) {
  return (
    <AppBar position="static" elevation={0}>
      <StyledToolbar>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            aria-label="menu"
            edge="start"
            onClick={() => props.setOpen(true)}
            style={{ zIndex: 999 }}
          >
            <MenuIcon />
          </IconButton>
          <Img src={PlexTechLogo} />

          <Drawer
            anchor="left"
            variant="temporary"
            open={props.open}
            onClose={() => props.setOpen(false)}
          >
            <Box style={{ width: '250px' }}>
              <Stack direction="row" justifyContent="space-between">
                <div />
                <IconButton
                  aria-label="menu"
                  edge="start"
                  onClick={() => props.setOpen(false)}
                >
                  <KeyboardArrowLeftIcon fontSize="large" />
                </IconButton>
              </Stack>
            </Box>
          </Drawer>
        </Stack>
      </StyledToolbar>
    </AppBar>
  );
}

const StyledToolbar = styled(Toolbar)`
  background-color: white;
`;

const Img = styled.img`
  height: 24px;
`;
