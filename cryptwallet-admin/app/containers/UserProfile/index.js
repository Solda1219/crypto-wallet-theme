import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Grid } from '@material-ui/core'
import messages from './messages';
import './style.scss'

// json data 
import userList from 'utils/json/userlist'

class UserProfile extends Component {
    state = {
        user: {}
    }


    componentDidMount() {
        const id = parseInt(this.props.match.params.id);
        let user = userList.filter(u => u.id === id);
        if (user.length >= 0) {
            this.setState({
                user: user[0]
            })
        }
    }
    render() {
        const { first_name, last_name, email, email_v, role, contact, mobile_v, status, country, deposit, withdrawal, avatar } = this.state.user
        return (
            <Fragment>
                <Helmet>
                    <title>User Profile</title>
                    <meta name="description" content="Description of UserProfile" />
                </Helmet>
                <Grid className="userProfile">
                    <Grid container spacing={5}>
                        <Grid item lg={5} xs={12}>
                            <Grid className="profileImage">
                                <img src={avatar} alt="" />
                                <h2>{first_name} {last_name}</h2>
                                <p>{email}</p>
                                <span>{country}</span>
                            </Grid>
                            <ul className="balanceWrap">
                                <li>
                                    <h4>Total Deposit</h4>
                                    <h3>{deposit}</h3>
                                </li>
                                <li>
                                    <h4>Total Withdrawal</h4>
                                    <h3>{withdrawal}</h3>
                                </li>
                            </ul>
                        </Grid>
                        <Grid item lg={7} xs={12}>
                            <ul className="userInfo">
                                <li>
                                    <span>Name</span>
                                    <strong>{first_name} {last_name}</strong>
                                </li>
                                <li>
                                    <span>Role</span>
                                    <strong>{role}</strong>
                                </li>
                                <li>
                                    <span>Email</span>
                                    <strong>{email}</strong>
                                </li>
                                <li>
                                    <span>Email varification</span>
                                    <strong
                                        className={email_v === 0 ? 'pending' : 'active'}>
                                        {email_v === 0 ? 'Pending' : 'Active'}
                                    </strong>
                                </li>
                                <li>
                                    <span>Contact</span>
                                    <strong>{contact}</strong>
                                </li>
                                <li>
                                    <span>Mobile varification</span>
                                    <strong
                                        className={mobile_v === 0 ? 'pending' : 'active'}>
                                        {mobile_v === 0 ? 'Pending' : 'Active'}
                                    </strong>
                                </li>
                                <li>
                                    <span>Status</span>
                                    <strong
                                        className={status === 0 ? 'inactive' : 'active'}>
                                        {status === 0 ? 'Inactive' : 'Active'}
                                    </strong>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </Grid>

            </Fragment >
        )
    }
}

UserProfile.propTypes = {
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

export default compose(withConnect)(UserProfile);
