import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { createTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { RequestsBoard } from 'app/components/RequestsBoard';
import { useState } from 'react';
import { ReimbursementForm } from 'app/components/ReimbursementForm';
import { Request } from 'app/components/RequestsBoard/types';

export function HomePage() {
  const darkTheme = createTheme({
    palette: {
      type: 'dark',
    },
  });

  const [requests, setRequests] = useState<Request[]>([]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Helmet>
          <title>HomePage</title>
          <meta
            name="description"
            content="A Boilerplate application homepage"
          />
        </Helmet>
        <Div>
          <ReimbursementForm teams={['Exec']} setRequests={setRequests} />

          <RequestsBoard
            requests={{
              pendingReview: requests,
              underReview: [],
              errors: [],
              approved: [],
              declined: [],
            }}
          />
        </Div>
      </CssBaseline>
    </ThemeProvider>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 64px;
`;
