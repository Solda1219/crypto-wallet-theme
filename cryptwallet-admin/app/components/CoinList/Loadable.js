/**
 *
 * Asynchronously loads the component for CoinList
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
