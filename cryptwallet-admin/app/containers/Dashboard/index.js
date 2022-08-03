import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';
import { Grid } from '@material-ui/core'

import Featured from 'components/Featured/Loadable'
import UserChart from 'components/UserChart/Loadable'
import ActiveUser from 'components/ActiveUser/Loadable'
import DeleteUser from 'components/DeleteUser/Loadable'
import Deposit from 'components/Deposit/Loadable'
import Withdraw from 'components/Withdraw/Loadable'
import './style.scss'

const Dashboard = (props) => {
    return (
        <Fragment>
            <Helmet>
                <title>{props.intl.formatMessage({ ...messages.dashboard })}</title>
            </Helmet>
            <Grid container spacing={4}>
                <Featured />
                <Grid item xs={12}>
                    <UserChart />
                </Grid>
                <Grid item lg={6} xs={12}>
                    <ActiveUser />
                </Grid>
                <Grid item lg={6} xs={12}>
                    <DeleteUser />
                </Grid>
                <Grid item xs={12}>
                    <Deposit />
                </Grid>
                <Grid item xs={12}>
                    <Withdraw />
                </Grid>
            </Grid>
        </Fragment>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(withConnect)(injectIntl((Dashboard)));
