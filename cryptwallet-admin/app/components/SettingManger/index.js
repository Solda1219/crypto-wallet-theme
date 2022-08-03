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

class SettingManger extends Component {
    state = {
        user: {},
        twilo_sid: '',
        phone: '',
        company: '',
        language: '',
        twilo_token: '',
        copyright: '',
        ssl: '',
        error: {},
        logo: '',
        loginLogo: '',
        fevicon: '',
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

    loginLogoImageChange = e => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file,
                loginLogo: reader.result,
            });
        };
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append('avatar', file);
    };

    feviconImageChange = e => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file,
                fevicon: reader.result,
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
                <h3 className="subtitle">Settings Manager</h3>
                <Grid container spacing={4}>
                    <Grid item lg={6} sm={6} xs={12}>
                        <FormLabel className="formLabel">Language</FormLabel>
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
                            <option value="English">English</option>
                            <option value="Bangla">Bangla</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Urdu">Urdu</option>
                        </TextField>
                    </Grid>
                    <Grid item lg={6} sm={6} xs={12}>
                        <FormLabel className="formLabel">Twilo Sid</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="twilo_sid"
                            fullWidth
                            placeholder="AC4eaae36a0417646f205a430d8bc70fab"
                            value={this.state.twilo_sid}
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>
                    <Grid item lg={6} sm={6} xs={12}>
                        <FormLabel className="formLabel">Company Name</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="company"
                            fullWidth
                            placeholder="Crypt Wallet"
                            value={this.state.company}
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>
                    <Grid item lg={6} sm={6} xs={12}>
                        <FormLabel className="formLabel">Twilo Token</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="twilo_token"
                            fullWidth
                            placeholder="8dc65b17f6d2d842726b46662d5d449b"
                            value={this.state.twilo_token}
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>
                    <Grid item lg={6} sm={6} xs={12}>
                        <FormLabel className="formLabel">Copyright Text</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="copyright"
                            fullWidth
                            placeholder="Copyright 2019 Crypt Wallet"
                            value={this.state.copyright}
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>
                    <Grid item lg={6} sm={6} xs={12} className="phoneInput">
                        <FormLabel className="formLabel">Phone</FormLabel>
                        <TextField
                            className="inputStyle"
                            name="phone"
                            fullWidth
                            placeholder="Phone Number"
                            value={this.state.phone}
                            variant="outlined"
                            onChange={this.changeHandler}
                        />
                    </Grid>
                    <Grid item lg={6} sm={6} xs={12}>
                        <FormLabel className="formLabel">Primary Email</FormLabel>
                        <TextField
                            className="inputStyle"
                            fullWidth
                            value="test@email.com"
                            variant="outlined"
                            disabled
                        />
                    </Grid>
                    <Grid item lg={6} sm={6} xs={12}>
                        <FormLabel className="formLabel">SSl</FormLabel>
                        <TextField
                            select
                            className="inputStyle"
                            value={this.state.ssl}
                            onChange={this.changeHandler}
                            name="ssl"
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </TextField>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <FormLabel className="formLabel">Logo</FormLabel>
                        <Grid className="logoImg">
                            <img src={this.state.logo ? this.state.logo : upload} alt="Edit Profile" />
                        </Grid>
                        <Grid component="label" className="inputFileButton">
                            Upload Image
                            <input onChange={this.logoImageChange} type="file" />
                        </Grid>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <FormLabel className="formLabel">Logo In Login</FormLabel>
                        <Grid className="logoImg">
                            <img src={this.state.loginLogo ? this.state.loginLogo : upload} alt="Edit Profile" />
                        </Grid>
                        <Grid component="label" className="inputFileButton">
                            Upload Image
                            <input onChange={this.loginLogoImageChange} type="file" />
                        </Grid>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <FormLabel className="formLabel">Fevicon</FormLabel>
                        <Grid className="logoImg">
                            <img src={this.state.fevicon ? this.state.fevicon : upload} alt="Edit Profile" />
                        </Grid>
                        <Grid component="label" className="inputFileButton">
                            Upload Image
                            <input onChange={this.feviconImageChange} type="file" />
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

export default compose(withConnect)(withRouter((SettingManger)));
