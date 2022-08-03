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




class CustomPageAdd extends Component {
    state = {
        title: '',
        key: '',
        description: '',
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
                        <h3 className="subtitle">Add Page Content</h3>
                        <Grid container spacing={4}>
                            <Grid item lg={6} xs={12}>
                                <FormLabel className="formLabel">Page Title</FormLabel>
                                <TextField
                                    className="inputStyle"
                                    name="title"
                                    fullWidth
                                    placeholder="Text"
                                    value={this.state.title}
                                    variant="outlined"
                                    onChange={this.changeHandler}
                                />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <FormLabel className="formLabel">Key</FormLabel>
                                <TextField
                                    select
                                    className="inputStyle"
                                    value={this.state.language}
                                    onChange={this.changeHandler}
                                    name="language"
                                    variant="outlined"
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="key 1">Key 1</option>
                                    <option value="key 2">Key 2</option>
                                    <option value="key 3">Key 3</option>
                                    <option value="key 4">Key 4</option>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel className="formLabel">Description</FormLabel>
                                <TextField
                                    className="inputStyle"
                                    name="description"
                                    fullWidth
                                    multiline
                                    placeholder="Write here. . ."
                                    value={this.state.description}
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

export default compose(withConnect)(withRouter((CustomPageAdd)));
