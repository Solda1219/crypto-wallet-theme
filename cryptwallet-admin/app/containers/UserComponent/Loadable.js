/**
 *
 * Asynchronously loads the component for UserComponent
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
