/**
 *
 * QrLandingPage
 *
 */
import * as React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

interface Props {
  token: string | null;
  removeToken: () => void;
}

export function QrLandingPage(props: Props) {
  const { attendanceCode } = useParams();

  return <Div></Div>;
}

const Div = styled.div``;
