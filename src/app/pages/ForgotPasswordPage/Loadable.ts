/**
 *
 * Asynchronously loads the component for ForgotPasswordPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ForgotPasswordPage = lazyLoad(
  () => import('./index'),
  module => module.ForgotPasswordPage,
);
