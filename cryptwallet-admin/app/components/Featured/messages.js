/*
 * Featured Messages
 *
 * This contains all the text for the Featured component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Featured';

export default defineMessages({
    todaysFee: {
        id: `${scope}.todaysFee`,
        defaultMessage: 'Todays Fee',
    },
    todaysSale: {
        id: `${scope}.todaysSale`,
        defaultMessage: 'Todays Sale',
    },
    todaysUser: {
        id: `${scope}.todaysUser`,
        defaultMessage: 'Todays User',
    },
});
