/**
 *
 * TopBar
 *
 */
import {
  AppBar,
  Box,
  Drawer,
  Toolbar,
  IconButton,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import * as React from 'react';
import styled from 'styled-components/macro';
import MenuIcon from '@mui/icons-material/Menu';
import PlexTechLogo from '../../../PlexTechLogo.png';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import PersonIcon from '@mui/icons-material/Person';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ForumIcon from '@mui/icons-material/Forum';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  token: string | null;
  removeToken: () => void;
}

const iconMap = {
  Profile: <PersonIcon />,
  Attendance: <RecentActorsIcon />,
  Reimbursements: <AttachMoneyIcon />,
  Forum: <ForumIcon />,
};

const protectedTabs = ['Attendance'];

let page = window.location.href.split('/').slice(-1)[0];
page =
  page.charAt(0).toUpperCase() +
  (page.indexOf('?') === -1 ? page.slice(1) : page.slice(1, page.indexOf('?')));

export function TopBar(props: Props) {
  const [isTreasurer, setIsTreasurer] = useState<boolean>(false);

  useEffect(() => {
    const f = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/profile/`;
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + props.token,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });

      if (response.status === 401 || response.status === 422) {
        props.removeToken();
        return;
      }

      const res = await response.json();

      setIsTreasurer(res.treasurer);
    };

    f();
  }, [props, props.token]);

  return (
    <AppBar position="sticky" elevation={0}>
      <StyledToolbar>
        <StyledStack direction="row" alignItems="center" spacing={2}>
          <IconButton
            aria-label="menu"
            edge="start"
            onClick={() => props.setOpen(true)}
            style={{ zIndex: 999 }}
          >
            <MenuIcon />
          </IconButton>
          <Img src={PlexTechLogo} />
          <StyledStack direction="row" justifyContent="space-between">
            <H1>PlexTech Member Portal</H1>
            <H1>{page || 'Profile'}</H1>
          </StyledStack>
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

              <List>
                {Object.keys(iconMap)
                  .filter(key => !protectedTabs.includes(key))
                  .map((text: string) => (
                    <ListItem key={text}>
                      <ListItemButton
                        href={`/${
                          text !== 'Profile' ? text.toLowerCase() : ''
                        }`}
                      >
                        <ListItemIcon>{iconMap[text]}</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                {isTreasurer && (
                  <>
                    <Divider />
                    {protectedTabs.map((text: string) => (
                      <ListItem key={text}>
                        <ListItemButton href={text.toLowerCase()}>
                          <ListItemIcon>{iconMap[text]}</ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </>
                )}
                <ListItem>
                  <ListItemButton onClick={props.removeToken}>
                    <ListItemIcon>{<LogoutIcon />}</ListItemIcon>
                    <ListItemText primary="Log out" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </StyledStack>
      </StyledToolbar>
    </AppBar>
  );
}

const StyledToolbar = styled(Toolbar)`
  background-color: #eeeeee;
`;

const Img = styled.img`
  height: 24px;
`;

const H1 = styled.h2`
  color: black;
  margin: 0px;
  padding-left: 8px;
`;

const StyledStack = styled(Stack)`
  width: 100%;
`;
