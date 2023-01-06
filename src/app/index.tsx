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

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { LoginPage } from './pages/LoginPage/Loadable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Background from '../shapes-background.png';
import styled from 'styled-components';
import useToken from 'useToken';

export function App() {
  const { i18n } = useTranslation();

  const theme = createTheme({
    typography: {
      fontFamily: ['"DM Sans"'].join(','),
    },
  });

  const { token, removeToken, setToken } = useToken();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - PlexTech Finance"
          defaultTitle="PlexTech Finance"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="PlexTech Finance" />
        </Helmet>
        <Div>
          {(!token && token !== '' && token !== undefined) ||
          token === 'undefined' ? (
            <LoginPage setToken={setToken} />
          ) : (
            <Routes>
              <Route path="/" element={<HomePage token={token} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}
        </Div>
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const Div = styled.div`
  background-image: url(${Background});
  height: 100vh;
  background-repeat: repeat;
  overflow-y: scroll;
`;
