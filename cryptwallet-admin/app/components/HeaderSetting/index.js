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

class HeaderSetting extends Component {
    state = {
        page_title: '',
        androin_app: '',
        ios_app: '',
        button_link: '',
        description: '',
        logo: '',
        landingImg: '',
    }


    logoImageChange = e => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file,
                logo: reader.result,
            });
        };
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append('avatar', file);
    };

    landingImgImageChange = e => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file,
                landingImg: reader.result,
            });
        };
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append('avatar', file);
    };

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
            <form className="p-70" onSubmit={this.submitHandler}>
                <h3 className="subtitle">Settings Manager</h3>
                <Grid container spacing={4}>
                    <Grid item lg={6} xs={12}>
                        <FormLabel className="formLabel">Landing Page Title</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="page_title"
                            fullWidth
                            placeholder="The Secure, Shared Bitcoin Wallet"
                            value={this.state.page_title}
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <FormLabel className="formLabel">Landing Page Android App Link</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="androin_app"
                            fullWidth
                            placeholder="Type Android App link"
                            value={this.state.androin_app}
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <FormLabel className="formLabel">Landing Page iOS App Link</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="ios_app"
                            fullWidth
                            placeholder="Type iOS App link"
                            value={this.state.ios_app}
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <FormLabel className="formLabel">Landing Page Button Link</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="button_link"
                            fullWidth
                            placeholder="Type button link"
                            value={this.state.button_link}
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormLabel className="formLabel">Landing Page Description</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="description"
                            fullWidth
                            placeholder="Type Description"
                            multiline
                            value={this.state.description}
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <FormLabel className="formLabel">Landing Page Logo</FormLabel>
                        <Grid className="logoImg">
                            <img src={this.state.logo ? this.state.logo : upload} alt="Edit Profile" />
                        </Grid>
                        <Grid component="label" className="inputFileButton">
                            Upload Image
                            <input onChange={this.logoImageChange} type="file" />
                        </Grid>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <FormLabel className="formLabel">Landing Page Image</FormLabel>
                        <Grid className="logoImg">
                            <img src={this.state.landingImg ? this.state.landingImg : upload} alt="Edit Profile" />
                        </Grid>
                        <Grid component="label" className="inputFileButton">
                            Upload Image
                            <input onChange={this.landingImgImageChange} type="file" />
                        </Grid>
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

export default compose(withConnect)(withRouter((HeaderSetting)));
