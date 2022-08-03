/*
 * UserComponent Messages
 *
 * This contains all the text for the UserComponent container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserComponent';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the UserComponent container!',
  },
});
