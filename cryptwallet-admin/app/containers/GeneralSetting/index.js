import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Grid, Tabs, Tab } from '@material-ui/core'
import SettingManger from 'components/SettingManger/Loadable'
import ApiSetting from 'components/ApiSetting/Loadable'
import FeesSetting from 'components/FeesSetting/Loadable'
import WithdrawalSetting from 'components/WithdrawalSetting/Loadable'
import CoinList from 'components/CoinList/Loadable'
import messages from './messages';
import './style.scss'


const GeneralSetting = () => {
    const [value, setValue] = useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }
    return (
        <Fragment>
            <Helmet>
                <title>User</title>
            </Helmet>
            <Grid className="cartStyle generalSettingWrap">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    classes={{
                        root: 'tabsWrap',
                        scrollable: 'tabsScrollable',
                        scroller: 'tabsScroller',
                        indicator: 'tabsIndicator',
                        flexContainer: 'tabsFlexContainer'
                    }}
                >
                    <Tab
                        disableRipple
                        label="General Settings"
                    />
                    <Tab
                        disableRipple
                        label="API Settings"
                    />
                    <Tab
                        disableRipple
                        label="Fee Settings"
                    />
                    <Tab
                        disableRipple
                        label="Withdrawal Settings"
                    />
                    <Tab
                        disableRipple
                        label="Coin"
                    />
                </Tabs>

                {value === 0 && <SettingManger />}
                {value === 1 && <ApiSetting />}
                {value === 2 && <FeesSetting />}
                {value === 3 && <WithdrawalSetting />}
                {value === 4 && <CoinList />}
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

export default compose(withConnect)(injectIntl(GeneralSetting));
