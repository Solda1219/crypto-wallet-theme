/*
 * StaticContent Messages
 *
 * This contains all the text for the StaticContent component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.StaticContent';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the StaticContent component!',
  },
});
