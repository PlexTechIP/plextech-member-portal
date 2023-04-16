/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/ReimbursementsPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { LoginPage } from './pages/LoginPage/Loadable';
import LightBackground from '../shapes-background.png';
import DarkBackground from '../shapes-background-dark.png';
import styled from 'styled-components';
import useToken from 'useToken';
import { useEffect, useState } from 'react';
import { TopBar } from './components/TopBar';
import { AttendancePage } from './pages/AttendancePage/Loadable';
import { ProfilePage } from './pages/ProfilePage/Loadable';
import { ForumPage } from './pages/ForumPage/Loadable';
import { createTheme, ThemeProvider } from '@mui/material';
import createPalette from '@mui/material/styles/createPalette';

import { Analytics } from '@vercel/analytics/react';

export function App() {
  const { i18n } = useTranslation();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem('isDarkMode') === 'true',
  );

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const palette = createPalette({
    mode: isDarkMode ? 'dark' : 'light',
  });

  const theme = createTheme({
    palette: palette,
    typography: {
      fontFamily: ['"DM Sans"'].join(','),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            backgroundColor: 'transparent',
            color: 'rgb(255, 138, 0)',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: palette.mode === 'dark' ? '#333333' : '#eeeeee',
            },
          },
        },
      },
    },
  });

  const [open, setOpen] = useState<boolean>(false);

  const { token, removeToken, setToken } = useToken();

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Helmet
            titleTemplate="%s - PlexTech Member Portal"
            defaultTitle="PlexTech Member Portal"
            htmlAttributes={{ lang: i18n.language }}
          >
            <meta name="description" content="PlexTech Member Portal" />
          </Helmet>
          <Div
            style={{
              backgroundImage:
                theme.palette.mode === 'dark'
                  ? `url(${DarkBackground})`
                  : `url(${LightBackground})`,
            }}
          >
            {(!token && token !== '' && token !== undefined) ||
            token === 'undefined' ||
            token?.charAt(0) === 'ƒ' ? (
              <LoginPage setToken={setToken} token={token} />
            ) : (
              <>
                <TopBar
                  open={open}
                  setOpen={setOpen}
                  token={token}
                  removeToken={removeToken}
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProfilePage token={token} removeToken={removeToken} />
                    }
                  />
                  <Route
                    path="/reimbursements"
                    element={
                      <HomePage token={token} removeToken={removeToken} />
                    }
                  />
                  <Route
                    path="/attendance"
                    element={
                      <AttendancePage token={token} removeToken={removeToken} />
                    }
                  />
                  <Route
                    path="/forum"
                    element={
                      <ForumPage token={token} removeToken={removeToken} />
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </>
            )}
          </Div>
          <GlobalStyle />
        </BrowserRouter>
      </ThemeProvider>
      <Analytics />
    </>
  );
}

const Div = styled.div`
  background-repeat: repeat;
  min-height: 100vh;
  padding-bottom: 24px;
`;
