import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { createTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { RequestsBoard } from 'app/components/RequestsBoard';

export function HomePage() {
  const darkTheme = createTheme({
    palette: {
      type: 'dark',
    },
  });

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
          <RequestsBoard
            requests={{
              pendingReview: [
                {
                  id: 'hi',
                  itemDescription: '',
                  amount: 0,
                  teamBudget: '',
                  isFood: false,
                  images: [],
                  status: '',
                },
              ],
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
  width: 50%;
  height: 75%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;
