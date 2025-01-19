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
  useTheme,
} from '@mui/material';
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { PlexTechLogo } from 'images';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import PersonIcon from '@mui/icons-material/Person';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BallotIcon from '@mui/icons-material/Ballot';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import { apiRequest } from 'utils/apiRequest';
import { removeToken } from 'utils/useToken';

interface Props {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (newMode: boolean) => void;
}

const iconMap = {
  Profile: <PersonIcon />,
  Reimbursements: <AttachMoneyIcon />,
  Members: <RecentActorsIcon />,
  Categories: <AttachMoneyIcon />,
  Attendance: <BallotIcon />,
};

const protectedTabs = ['Members', 'Attendance', 'Categories'];

let page = window.location.href.split('/').slice(-1)[0];
page =
  page.charAt(0).toUpperCase() +
  (page.indexOf('?') === -1 ? page.slice(1) : page.slice(1, page.indexOf('?')));

if (page === '?' || !(page in iconMap)) page = '';

export function TopBar(props: Props) {
  const [isTreasurer, setIsTreasurer] = useState<boolean>(false);

  useEffect(() => {
    const f = async () => {
      const [, res] = await apiRequest('/profile/', 'GET');
      setIsTreasurer(res.treasurer);
    };

    f();
  }, [props]);

  const theme = useTheme();

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar
        style={{
          backgroundColor:
            theme.palette.mode === 'dark' ? '#333333' : '#cccccc',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          className="w-full"
        >
          <IconButton
            aria-label="menu"
            edge="start"
            onClick={() => props.setOpen(true)}
            style={{ zIndex: 999 }}
          >
            <MenuIcon />
          </IconButton>
          <img src={PlexTechLogo} className="h-6" alt="PlexTech Logo" />
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="w-full"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              className="w-full"
            >
              <a href="/" className="no-underline text-inherit text-2xl">
                <h2
                  className="m-0 pl-2"
                  style={{ color: theme.palette.text.primary }}
                >
                  PlexTech Member Portal
                </h2>
              </a>
              <h2
                className="m-0 pl-2 text-2xl"
                style={{ color: theme.palette.text.primary }}
              >
                {page || 'Profile'}
              </h2>
            </Stack>
            <IconButton onClick={() => props.setIsDarkMode(!props.isDarkMode)}>
              {props.isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Stack>
          <Drawer
            anchor="left"
            variant="temporary"
            open={props.open}
            onClose={() => props.setOpen(false)}
          >
            <Box className="w-[250px]">
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
                        href={`/members/${
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
                        <ListItemButton
                          href={`/members/${
                            text !== 'Profile' ? text.toLowerCase() : ''
                          }`}
                        >
                          <ListItemIcon>{iconMap[text]}</ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </>
                )}
                <ListItem>
                  <ListItemButton onClick={removeToken}>
                    <ListItemIcon>{<LogoutIcon />}</ListItemIcon>
                    <ListItemText primary="Log out" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
