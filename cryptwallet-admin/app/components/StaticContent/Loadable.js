/**
 *
 * Asynchronously loads the component for StaticContent
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
