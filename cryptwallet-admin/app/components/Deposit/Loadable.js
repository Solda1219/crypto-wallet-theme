/**
 *
 * Asynchronously loads the component for Deposit
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
