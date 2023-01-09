/**
 *
 * Asynchronously loads the component for PasswordResetPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const PasswordResetPage = lazyLoad(
  () => import('./index'),
  module => module.PasswordResetPage,
);
