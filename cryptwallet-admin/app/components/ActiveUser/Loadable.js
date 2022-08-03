/**
 *
 * Asynchronously loads the component for ActiveUser
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
