import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Grid, Tabs, Tab } from '@material-ui/core'
import UserList from 'components/UserList/Loadable'
import SuspenedUserList from 'components/SuspenedUserList/Loadable'
import DeletedUserList from 'components/DeletedUserList/Loadable'
import EmailPending from 'components/EmailPending/Loadable'
import AddUser from 'components/AddUser/Loadable'
import messages from './messages';
import './style.scss'

// images 
import deleteUser from 'images/icon/delete-user.svg'
import user from 'images/icon/tabs/user.png'
import addUser from 'images/icon/tabs/add-user.svg'
import block from 'images/icon/tabs/block-user.svg'
import email from 'images/icon/tabs/email.svg'




const UserComponent = () => {
    const [value, setValue] = useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }
    return (
        <Fragment>
            <Helmet>
                <title>User</title>
            </Helmet>
            <Grid className="userArea">
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
                        label="User list"
                        icon={<img src={user} alt="" />}
                    />
                    <Tab
                        disableRipple
                        label="Add user"
                        icon={<img src={addUser} alt="" />}
                    />
                    <Tab
                        disableRipple
                        label="Suspended user"
                        icon={<img src={block} alt="" />}
                    />
                    <Tab
                        disableRipple
                        label="Deleted user"
                        icon={<img src={deleteUser} alt="" />}
                    />
                    <Tab
                        disableRipple
                        label="Email pending"
                        icon={<img src={email} alt="" />}
                    />
                </Tabs>

                {value === 0 && <UserList />}
                {value === 1 && <AddUser />}
                {value === 2 && <SuspenedUserList />}
                {value === 3 && <DeletedUserList />}
                {value === 4 && <EmailPending />}
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

export default compose(withConnect)(injectIntl(UserComponent));
