/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const ReimbursementsPage = lazyLoad(
  () => import('./index'),
  module => module.ReimbursementsPage,
);
