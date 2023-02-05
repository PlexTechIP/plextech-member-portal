/**
 *
 * Asynchronously loads the component for ForumPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ForumPage = lazyLoad(
  () => import('./index'),
  module => module.ForumPage,
);
