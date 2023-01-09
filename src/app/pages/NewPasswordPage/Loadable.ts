/**
 *
 * Asynchronously loads the component for NewPasswordPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const NewPasswordPage = lazyLoad(
  () => import('./index'),
  module => module.NewPasswordPage,
);
