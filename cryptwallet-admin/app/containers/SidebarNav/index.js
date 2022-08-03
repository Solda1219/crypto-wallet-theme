import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Grid, ExpansionPanel, ExpansionPanelSummary } from '@material-ui/core'
import messages from './messages';
import { NavLink } from 'react-router-dom'
import ScrollArea from 'react-scrollbar'
import './style.scss'


// images 
import dashboard from 'images/sidebar/dashboard.svg'
import coin from 'images/sidebar/coin.svg'
import profile from 'images/sidebar/profile.svg'
import setting from 'images/sidebar/setting.svg'
import report from 'images/sidebar/report.svg'
import user from 'images/sidebar/user.svg'
import wallet from 'images/sidebar/wallet.svg'
import arrow from 'images/icon/arrow.svg'
import logo from 'images/logo.svg'


const SidebarNav = (props) => {
    const navigations = [
        {
            name: `${props.intl.formatMessage({ ...messages.dashboard })}`,
            icon: dashboard,
            id: '1',
            link: '/'
        },
        {
            name: 'Financial Reports',
            icon: report,
            id: '15',
            submenus: [
                {
                    name: 'Orders',
                    link: '/order-list',
                },
                {
                    name: 'Withdrawal History',
                    link: '/withdrawal-history',
                },
                {
                    name: 'KYC Pending',
                    link: '/pending-id-varification',
                },
                {
                    name: 'All Transaction',
                    link: '/transaction',
                },
            ]
        },
        {
            name: 'Wallets',
            icon: wallet,
            id: '3',
            submenus: [
                {
                    name: `${props.intl.formatMessage({ ...messages.UserWallets })}`,
                    link: '/user-wallets',
                },
                {
                    name: `${props.intl.formatMessage({ ...messages.Pendingwithdrawal })}`,
                    link: '/pending-withdrawal',
                },
            ]
        },
        {
            name: `${props.intl.formatMessage({ ...messages.Profile })}`,
            icon: profile,
            id: '5',
            link: '/profile'
        },
        {
            name: `${props.intl.formatMessage({ ...messages.userManagemert })}`,
            icon: user,
            id: '2',
            link: '/user',
        },
        {
            name: `${props.intl.formatMessage({ ...messages.Settings })}`,
            icon: setting,
            id: '6',
            submenus: [
                {
                    name: `${props.intl.formatMessage({ ...messages.GeneralSettings })}`,
                    link: '/general-settings',
                },
                {
                    name: `${props.intl.formatMessage({ ...messages.Landingpage })}`,
                    link: '/landing-page',
                },
                {
                    name: `${props.intl.formatMessage({ ...messages.Custompage })}`,
                    link: '/custom-page',
                },
                {
                    name: `${props.intl.formatMessage({ ...messages.FAQs })}`,
                    link: '/faqs',
                },
                {
                    name: 'Broadcast Email',
                    link: '/bulk-email',
                },
            ]
        }
    ]

    const [expanded, setExpanded] = useState(0);

    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <Fragment>
            <Grid className='sidebarMainWrapper' >
                <ul onClick={props.colupsMenuHandler} className="menuTrigger">
                    <li className="first"></li>
                    <li className="second"></li>
                    <li className="third"></li>
                </ul>
                <div className="logoSlidebar">
                    <NavLink to="/">
                        <img src={logo} alt="" />
                    </NavLink>
                </div>
                <ScrollArea
                    speed={1}
                    className="scrollBar"
                    contentClassName='scrollBarContent'
                    horizontal={false}
                >
                    {navigations.map(nav => (
                        <Fragment
                            key={nav.id}
                        >
                            {nav.submenus ?
                                <ExpansionPanel
                                    classes={{
                                        root: 'navItems',
                                        expanded: 'navItemsExpanded',
                                    }}
                                    square
                                    expanded={expanded === nav.id}
                                    onChange={handleChange(nav.id)}>
                                    <ExpansionPanelSummary
                                        classes={{
                                            root: 'navItemsText',
                                            expanded: 'navItemsTextExpanded',
                                            expandIcon: 'navItemsTextIcon',
                                            content: 'navItemsTextContent'
                                        }}
                                        expandIcon={<img src={arrow} />}
                                    >
                                        <img src={nav.icon} alt="" />
                                        <span>{nav.name}</span>
                                    </ExpansionPanelSummary>
                                    <ul className="submenuItems">
                                        {nav.submenus.map((submenu, i) => (
                                            <li key={i}>
                                                <NavLink
                                                    activeClassName="active"
                                                    exact
                                                    to={submenu.link}>
                                                    {submenu.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </ExpansionPanel> : <Grid className="navItem">
                                    <NavLink
                                        activeClassName="active"
                                        exact
                                        onClick={() => setExpanded(0)}
                                        to={nav.link}>
                                        <img src={nav.icon} alt="" />
                                        {nav.name}
                                    </NavLink>
                                </Grid>
                            }
                        </Fragment>
                    ))}
                </ScrollArea>
            </Grid >
        </Fragment>
    );
}

SidebarNav.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(SidebarNav));
