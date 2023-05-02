/**
 *
 * Asynchronously loads the component for QrLandingPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const QrLandingPage = lazyLoad(
  () => import('./index'),
  module => module.QrLandingPage,
);
