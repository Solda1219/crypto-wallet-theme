import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Grid, Tabs, Tab } from '@material-ui/core'
import HeaderSetting from 'components/HeaderSetting/Loadable'
import StaticContent from 'components/StaticContent/Loadable'
import messages from './messages';
import './style.scss'


const LandingPageSetting = () => {
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
                        label="Header Settings"
                    />
                    <Tab
                        disableRipple
                        label="Static Content"
                    />
                </Tabs>

                {value === 0 && <HeaderSetting />}
                {value === 1 && <StaticContent />}
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

export default compose(withConnect)(injectIntl(LandingPageSetting));
