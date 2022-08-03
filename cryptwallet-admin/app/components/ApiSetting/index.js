import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Grid, TextField, FormLabel, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify';
import messages from './messages';
import './style.scss'


// images 
import upload from 'images/icon/upload.svg'

class ApiSetting extends Component {
    state = {
        user: '',
        password: '',
        host: '',
        port: '',
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };



    submitHandler = (e) => {
        e.preventDefault()
        toast.success('Api Setting Successfully')
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
                <h3 className="subtitle">BTC</h3>
                <Grid container spacing={4}>
                    <Grid item lg={6} xs={12}>
                        <FormLabel className="formLabel">User</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="user"
                            fullWidth
                            placeholder="btctestnet"
                            value={this.state.user}
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <FormLabel className="formLabel">Password</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="password"
                            type="password"
                            fullWidth
                            placeholder="***********"
                            value={this.state.password}
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <FormLabel className="formLabel">Host Name</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="host"
                            fullWidth
                            placeholder="142.44.244.65"
                            value={this.state.host}
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <FormLabel className="formLabel">Port</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="port"
                            fullWidth
                            placeholder="18332"
                            value={this.state.port}
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

export default compose(withConnect)(withRouter((ApiSetting)));
