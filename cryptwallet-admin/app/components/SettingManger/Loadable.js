/**
 *
 * Asynchronously loads the component for SettingManger
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
