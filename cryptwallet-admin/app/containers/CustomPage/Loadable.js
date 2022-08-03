/**
 *
 * Asynchronously loads the component for CustomPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
