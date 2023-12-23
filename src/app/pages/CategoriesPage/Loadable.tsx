/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const CategoriesPage = lazyLoad(
  () => import('./index'),
  module => module.CategoriesPage,
);
