/*
 * HeaderComponent Messages
 *
 * This contains all the text for the HeaderComponent container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HeaderComponent';

export default defineMessages({
    notification: {
        id: `${scope}.notification`,
        defaultMessage: 'Notification',
    },
    clearAll: {
        id: `${scope}.clearAll`,
        defaultMessage: 'Clear all',
    },
    profile: {
        id: `${scope}.profile`,
        defaultMessage: 'Profile',
    },
    settings: {
        id: `${scope}.settings`,
        defaultMessage: 'Settings',
    },
    logout: {
        id: `${scope}.logout`,
        defaultMessage: 'Logout',
    },
    seeAll: {
        id: `${scope}.seeAll`,
        defaultMessage: 'See All',
    },
});
