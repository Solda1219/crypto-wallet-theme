import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Grid, TextField, FormLabel, Button, InputAdornment, IconButton } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify';
import messages from './messages';
import './style.scss'



class WithdrawalSetting extends Component {
    state = {
        send_limit: '',
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };



    submitHandler = (e) => {
        e.preventDefault()
        toast.success('Fees Setting Successfully')
    }

    handleChange = country => {
        this.setState({
            country
        });
    };
    handleOnChange = (value) => {
        this.setState({ phone: value })
    }
    render() {
        return (
            <form className="p-70" onSubmit={this.submitHandler}>
                <h3 className="subtitle">Send Coin Limit Settings</h3>
                <Grid container spacing={4}>
                    <Grid item lg={6} xs={12}>
                        <FormLabel className="formLabel">Max. Send Limit</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="send_limit"
                            fullWidth
                            placeholder="btctestnet"
                            value={this.state.send_limit}
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button className="btnStyle" type="submit">Save</Button>
                    </Grid>
                </Grid>
            </form>
        )
    }
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

export default compose(withConnect)(withRouter((WithdrawalSetting)));
