/**
 *
 * Asynchronously loads the component for AllTransaction
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
