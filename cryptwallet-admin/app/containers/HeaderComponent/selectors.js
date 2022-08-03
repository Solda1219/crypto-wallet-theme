import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the headerComponent state domain
 */

const selectHeaderComponentDomain = state =>
  state.headerComponent || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HeaderComponent
 */

const makeSelectHeaderComponent = () =>
  createSelector(
    selectHeaderComponentDomain,
    substate => substate,
  );

export default makeSelectHeaderComponent;
export { selectHeaderComponentDomain };
