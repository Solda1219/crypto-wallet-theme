import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Grid, TextField, FormLabel, Button } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import { withRouter } from 'react-router-dom'
import Joi from 'joi-browser'
import { toast } from 'react-toastify';
import messages from './messages';
import './style.scss'




class BulkEmail extends Component {
    state = {
        email_type: '',
        role: '',
        header_text: '',
        description: '',
        subject: '',
        footer_text: '',
        message: '',
        error: {}
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };



    submitHandler = (e) => {
        e.preventDefault()
        toast.success('General Setting Successfully')
    }


    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Custom Page Add</title>
                    <meta name="description" content="Description of UserProfile" />
                </Helmet>
                <form onSubmit={this.submitHandler}>
                    <Card className="staticContentEdit generalSettingWrap">
                        <h3 className="subtitle">Bulk Email</h3>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <FormLabel className="formLabel">Header Text</FormLabel>
                                <TextField
                                    className="inputStyle"
                                    name="header_text"
                                    fullWidth
                                    multiline
                                    placeholder="Write here. . ."
                                    value={this.state.header_text}
                                    variant="outlined"
                                    onChange={this.changeHandler}
                                />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <FormLabel className="formLabel">Role</FormLabel>
                                <TextField
                                    select
                                    className="inputStyle"
                                    value={this.state.role}
                                    onChange={this.changeHandler}
                                    name="role"
                                    variant="outlined"
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </TextField>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <FormLabel className="formLabel">Email Type</FormLabel>
                                <TextField
                                    className="inputStyle"
                                    name="email_type"
                                    fullWidth
                                    placeholder="Text"
                                    value={this.state.email_type}
                                    variant="outlined"
                                    onChange={this.changeHandler}
                                />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <FormLabel className="formLabel">Footer text</FormLabel>
                                <TextField
                                    className="inputStyle"
                                    name="footer_text"
                                    fullWidth
                                    multiline
                                    placeholder="Write here. . ."
                                    value={this.state.footer_text}
                                    variant="outlined"
                                    onChange={this.changeHandler}
                                />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <FormLabel className="formLabel">Message</FormLabel>
                                <TextField
                                    className="inputStyle"
                                    name="message"
                                    fullWidth
                                    multiline
                                    placeholder="Write here. . ."
                                    value={this.state.message}
                                    variant="outlined"
                                    onChange={this.changeHandler}
                                />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <FormLabel className="formLabel">Subject</FormLabel>
                                <TextField
                                    className="inputStyle"
                                    name="subject"
                                    fullWidth
                                    placeholder="Text"
                                    value={this.state.subject}
                                    variant="outlined"
                                    onChange={this.changeHandler}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button className="btnStyle" type="submit">Save</Button>
                            </Grid>
                        </Grid>
                    </Card>
                </form>
            </Fragment >
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

export default compose(withConnect)(withRouter((BulkEmail)));
