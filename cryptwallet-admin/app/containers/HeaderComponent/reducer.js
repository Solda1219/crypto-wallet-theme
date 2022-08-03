/*
 *
 * HeaderComponent reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
    items: [
        {
            title: 'It is a long',
            text: 'It is a long established fact that a reader will be distracted',
        },
        {
            title: 'There are many',
            text: 'There are many variations of passages of Lorem Ipsum available',
        },
        {
            title: 'There are many',
            text: 'There are many variations of passages of Lorem Ipsum available',
        },
        {
            title: 'Contrary to popular',
            text: 'Contrary to popular belief, Lorem Ipsum is not simply random text',
        },
        {
            title: 'The standard chunk',
            text: 'The standard chunk of Lorem Ipsum used since the 1500s',
        },
    ],
};

/* eslint-disable default-case, no-param-reassign */
const headerComponentReducer = (state = initialState, action) =>
    produce(state, (/* draft */) => {
        switch (action.type) {
            case DEFAULT_ACTION:
                break;
        }
    });

export default headerComponentReducer;
