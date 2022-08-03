/**
 *
 * Asynchronously loads the component for Transaction
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
