/**
 *
 * Asynchronously loads the component for AttendancePage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AttendancePage = lazyLoad(
  () => import('./index'),
  module => module.AttendancePage,
);
