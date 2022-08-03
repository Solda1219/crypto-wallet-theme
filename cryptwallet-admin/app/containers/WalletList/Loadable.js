/**
 *
 * Asynchronously loads the component for WalletList
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
