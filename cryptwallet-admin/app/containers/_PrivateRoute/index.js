import React, { useState, Fragment } from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core'
import SidebarNav from 'containers/SidebarNav/Loadable'
import HeaderComponent from 'containers/HeaderComponent/Loadable'
import './style.scss'


const PrivateRoute = (props) => {
    const [colupsMenu, setColupsMenu] = useState(false)

    const colupsMenuHandler = () => {
        setColupsMenu(!colupsMenu)
    }

    return (
        <Fragment>
            <Grid className={colupsMenu ? 'mainContainerArea mainContainerAreaColups' : 'mainContainerArea'}>
                <SidebarNav
                    colupsMenuHandler={colupsMenuHandler}
                />
                <Grid className="mainContainer">
                    <HeaderComponent
                        colupsMenuHandler={colupsMenuHandler}
                    />

                    <Grid className="mainContentRouter">
                        {props.titles && <ul className="breadCumbWrap">
                            {props.titles.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>}

                        <Route
                            {...props}
                            exact
                            render={props =>
                                <Component {...props} />
                            }
                        />
                    </Grid>

                </Grid>
            </Grid>
        </Fragment >
    );
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

const mapStateToProps = createStructuredSelector({

});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(PrivateRoute);
