import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Grid, FormLabel, TextField, Button } from '@material-ui/core'
import messages from './messages';
import Card from 'components/Card/Loadable'

const NodeHistory = () => {
    const [node, setNode] = useState('')
    return (
        <Fragment>
            <Helmet>
                <title>Node History</title>
            </Helmet>
            <Card className="nodeHistory">
                <Grid container spacing={4}>
                    <Grid item lg={6}>
                        <FormLabel className="formLabel">Node Transaction By Hash</FormLabel>
                        <TextField
                            className="inputStyle"
                            fullWidth
                            value={node}
                            variant="outlined"
                            onChange={e => setNode(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button className="btnStyle" type="submit">Save</Button>
                    </Grid>
                </Grid>
            </Card>
        </Fragment>
    );
}

NodeHistory.propTypes = {
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

export default compose(withConnect)(NodeHistory);
