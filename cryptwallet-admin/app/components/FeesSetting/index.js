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



class FeesSetting extends Component {
    state = {
        fees_method: '',
        fixed_fees: '',
        fees_percent: '',
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
                <h3 className="subtitle">Fees Settings</h3>
                <Grid container spacing={4}>
                    <Grid item lg={6} xs={12}>
                        <FormLabel className="formLabel">Withdrawal Fees Method</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="fees_method"
                            fullWidth
                            placeholder="btctestnet"
                            value={this.state.fees_method}
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <FormLabel className="formLabel">Withdrawal Fixed Fees</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="fixed_fees"
                            fullWidth
                            value={this.state.fixed_fees}
                            placeholder="1"
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <FormLabel className="formLabel">Withdrawal Fees Percent</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="host"
                            fullWidth
                            placeholder="0.8"
                            value={this.state.fees_percent}
                            variant="outlined"
                            onChange={this.changeHandler}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <span className="percent">%</span>
                                    </InputAdornment>
                                ),
                            }}
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

export default compose(withConnect)(withRouter((FeesSetting)));
