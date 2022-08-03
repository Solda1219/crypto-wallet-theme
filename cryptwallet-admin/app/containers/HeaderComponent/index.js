import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import cookie from 'js-cookie';
import { Link } from 'react-router-dom'
import ScrollArea from 'react-scrollbar'
import { Grid, List, ListItem, Typography, Button, Menu, Popper, Grow, Paper, ClickAwayListener, } from '@material-ui/core'

import LanguageSwitcher from 'components/LanguageSwitcher'
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { changeLocale } from '../LanguageProvider/actions';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHeaderComponent from './selectors';
import reducer from './reducer';
import messages from './messages';

// images 
import notificationIcon from 'images/icon/notification.svg'
import user from 'images/user/user1.jpg'

import './style.scss'

const HeaderComponent = (props) => {


    const notfications = [
        {
            title: 'It is a long',
            text: 'It is a long established fact that a reader will be distracted'
        },
        {
            title: 'will be distracted',
            text: 'It is a long established fact that a reader will be distracted'
        },
        {
            title: 'established fact that',
            text: 'It is a long established fact that a reader will be distracted'
        },
        {
            title: 'reader will be',
            text: 'It is a long established fact that a reader will be distracted'
        },
        {
            title: 'It is a long',
            text: 'It is a long established fact that a reader will be distracted'
        },
        {
            title: 'will be distracted',
            text: 'It is a long established fact that a reader will be distracted'
        },
        {
            title: 'established fact that',
            text: 'It is a long established fact that a reader will be distracted'
        },
        {
            title: 'reader will be',
            text: 'It is a long established fact that a reader will be distracted'
        },
        {
            title: 'It is a long',
            text: 'It is a long established fact that a reader will be distracted'
        },
        {
            title: 'will be distracted',
            text: 'It is a long established fact that a reader will be distracted'
        },
        {
            title: 'established fact that',
            text: 'It is a long established fact that a reader will be distracted'
        },
        {
            title: 'reader will be',
            text: 'It is a long established fact that a reader will be distracted'
        },
    ]

    const [profile, setProfile] = useState(false)
    const [open, setOpen] = React.useState(false);
    const profileAnchorRef = React.useRef(null);

    function handleNotifyToggle(event) {
        setOpen(event.currentTarget);
    }

    function handleNotifyClose() {
        setOpen(null);
    }

    function profileHandleClose(event) {
        if (profileAnchorRef.current && profileAnchorRef.current.contains(event.target)) {
            return;
        }
        setProfile(false);
    }
    function profileHandleToggle() {
        setProfile(prevOpen => !prevOpen);
    }
    const onChangeLocale = (locale) => {
        cookie.set('bigornaLab_lang', locale);
        props.changeLocale(locale);
    }
    return (
        <Fragment>
            <header className="headerArea">
                <div className="headerLeft">
                    <ul onClick={props.colupsMenuHandler} className="menuTrigger">
                        <li className="first"></li>
                        <li className="second"></li>
                        <li className="third"></li>
                    </ul>
                </div>
                <div className="headerRight">
                    <div className="notification">
                        <span
                            onClick={handleNotifyToggle}
                            className="notificationWrap"
                        >
                            <img src={notificationIcon} alt="Notification" />
                            <span component="span" className="popupShow">{notfications.length}</span>
                        </span>
                        <Menu
                            anchorEl={open}
                            keepMounted
                            open={Boolean(open)}
                            onClose={handleNotifyClose}
                            className="dropdownWrapper"
                        >
                            <li className="notificationList">
                                <h5>{props.intl.formatMessage({ ...messages.notification })}
                                    <span>{props.intl.formatMessage({ ...messages.clearAll })}</span>
                                </h5>
                                <ScrollArea
                                    speed={1}
                                    className="scrollbarArea"
                                    contentClassName="scrollbarContent"
                                    horizontal={false}
                                >
                                    <ul className="notificationItems">
                                        {notfications.map((item, i) => (
                                            <li key={i}>
                                                <Button component={Link} to="/">
                                                    <i className="fa fa-bell-o"></i>
                                                    {item.title}
                                                    <span>{item.text}</span>
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                                <Button className="seeAll" component={Link} to="/">{props.intl.formatMessage({ ...messages.seeAll })}</Button>
                            </li>
                        </Menu>
                    </div>
                    <LanguageSwitcher
                        className="languageSwitcher"
                        onChange={onChangeLocale}
                        locale={props.locale}
                    />
                    <div className="shortProfile">
                        <span
                            className="profile"
                            ref={profileAnchorRef}
                            aria-haspopup="true"
                            onClick={profileHandleToggle}
                        >
                            <img src={user} alt="" />
                            <span>John Dao</span>
                            <i className={profile ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
                        </span>
                        <Popper
                            className="profileDropdownWrapper"
                            open={profile}
                            anchorEl={profileAnchorRef.current}
                            keepMounted
                            transition
                            disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    className="dropDown"
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={profileHandleClose}>
                                            <ul className="profileManu">
                                                <li><Button component={Link} to="/profile">{props.intl.formatMessage({ ...messages.profile })}</Button> </li>
                                                <li><Button component={Link} to="/general-settings">{props.intl.formatMessage({ ...messages.settings })}</Button> </li>
                                                <li><Button component={Link} to="/">{props.intl.formatMessage({ ...messages.logout })}</Button> </li>
                                            </ul>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </div>
            </header >
        </Fragment>
    );
}

const mapStateToProps = createStructuredSelector({
    headerComponent: makeSelectHeaderComponent(),
    locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
    return {
        changeLocale: locale => dispatch(changeLocale(locale)),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(HeaderComponent));
