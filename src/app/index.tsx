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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Background from '../shapes-background.png';
import styled from 'styled-components';
import useToken from 'useToken';
import { useState } from 'react';
import { TopBar } from './components/TopBar';
import { AttendancePage } from './pages/AttendancePage/Loadable';
import { ProfilePage } from './pages/ProfilePage/Loadable';

export function App() {
  const { i18n } = useTranslation();

  const theme = createTheme({
    typography: {
      fontFamily: ['"DM Sans"'].join(','),
    },
  });

  const [open, setOpen] = useState<boolean>(false);

  const { token, removeToken, setToken } = useToken();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - PlexTech Member Portal"
          defaultTitle="PlexTech Member Portal"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="PlexTech Member Portal" />
        </Helmet>
        <Div>
          {(!token && token !== '' && token !== undefined) ||
          token === 'undefined' ||
          token?.charAt(0) === 'ƒ' ? (
            <LoginPage setToken={setToken} token={token} />
          ) : (
            <>
              <TopBar open={open} setOpen={setOpen} token={token} />
              <Routes>
                <Route path="/" element={<ProfilePage />} />
                <Route
                  path="/reimbursements"
                  element={<HomePage token={token} removeToken={removeToken} />}
                />
                <Route
                  path="/attendance"
                  element={
                    <AttendancePage token={token} removeToken={removeToken} />
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
  );
}

const Div = styled.div`
  background-image: url(${Background});
  background-repeat: repeat;
  min-height: 100vh;
  padding-bottom: 24px;
`;
