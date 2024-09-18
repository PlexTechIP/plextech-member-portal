/**
 *
 * Asynchronously loads the component for AttendancePage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const MemberManagement = lazyLoad(
  () => import('./index'),
  module => module.MemberManagement,
);
