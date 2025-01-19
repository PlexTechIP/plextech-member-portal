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

import { ReimbursementsPage } from './pages/ReimbursementsPage/Loadable';
import { CategoriesPage } from './pages/CategoriesPage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { LoginPage } from './pages/LoginPage/Loadable';
import { shapesBackground } from 'images';
import { shapesBackgroundDark } from 'images';
import { onTokenChange } from 'utils/useToken';
import { useEffect, useState } from 'react';
import { TopBar } from './components/TopBar';
import { AttendancePage } from './pages/AttendancePage/Loadable';
import { ProfilePage } from './pages/ProfilePage/Loadable';
import { ForumPage } from './pages/ForumPage/Loadable';
import { createTheme, ThemeProvider } from '@mui/material';
import createPalette from '@mui/material/styles/createPalette';
import { apiRequest } from 'utils/apiRequest';
import Cookies from 'js-cookie';
import { MemberManagement } from './pages/MemberManagement/Loadable';

export function App() {
  const { i18n } = useTranslation();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    Cookies.get('isDarkMode') === 'true',
  );

  useEffect(() => {
    Cookies.set('isDarkMode', isDarkMode.toString());
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
          root: {
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
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>(Cookies.get('token'));

  setTimeout(() => {
    apiRequest('/ping/', 'GET', undefined, undefined, () =>
      setSessionExpired(true),
    );
  }, 1000 * 60 * 30);

  useEffect(() => {
    if (
      (!token && token !== '' && token !== undefined) ||
      token === 'undefined' ||
      token?.charAt(0) === 'ƒ'
    ) {
      setSessionExpired(true);
    } else {
      setSessionExpired(false);
    }

    const unsubscribe = onTokenChange(setToken);
    return unsubscribe;
  }, [token]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename="/members">
          <Helmet
            titleTemplate="%s - PlexTech Member Portal"
            defaultTitle="PlexTech Member Portal"
            htmlAttributes={{ lang: i18n.language }}
          >
            <meta name="description" content="PlexTech Member Portal" />
          </Helmet>
          <div
            className="bg-repeat min-h-screen pb-6"
            style={{
              backgroundImage:
                theme.palette.mode === 'dark'
                  ? `url(${shapesBackgroundDark})`
                  : `url(${shapesBackground})`,
            }}
          >
            {sessionExpired &&
            !window.location.pathname.startsWith('/members/attendance/') ? (
              <LoginPage />
            ) : (
              <>
                <TopBar
                  open={open}
                  setOpen={setOpen}
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                />
                <Routes>
                  <Route path="/" element={<ProfilePage />} />
                  <Route
                    path="/reimbursements"
                    element={<ReimbursementsPage />}
                  />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/attendance" element={<AttendancePage />} />
                  <Route path="/members" element={<MemberManagement />} />
                  <Route path="/forum" element={<ForumPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </>
            )}
          </div>
          <GlobalStyle />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
