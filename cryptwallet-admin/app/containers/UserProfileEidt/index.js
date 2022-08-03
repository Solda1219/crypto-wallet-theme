import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Grid, TextField, FormLabel, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import Joi from 'joi-browser'
import { toast } from 'react-toastify';
import Select from 'react-select';
import messages from './messages';
import './style.scss'

// json data 
import userList from 'utils/json/userlist'

// images 
import camera from 'images/icon/camera.svg'

const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
}));

class UserProfileEdit extends Component {
    state = {
        user: {},
        imagePreviewUrl: '',
        changed: false,
        first_name: '',
        first_name: '',
        last_name: '',
        phone: '',
        country: null,
        error: {}
    }

    handleImageChange = e => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file,
                imagePreviewUrl: reader.result,
            });
        };
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append('avatar', file);
    };


    schema = {
        first_name: Joi.string().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    default: err.message = "first name can not be empty";
                        break;
                }
            });
            return errors;
        }),
        last_name: Joi.string().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    default: err.message = "last name can not be empty";
                        break;
                }
            });
            return errors;
        }),
        phone: Joi.number().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    default: err.message = "phone can not be empty";
                        break;
                }
            });
            return errors;
        }),
    }
    changeHandler = event => {
        const error = { ...this.state.error };
        const errorMassage = this.validationProperty(event);
        if (errorMassage) {
            error[event.target.name] = errorMassage;
        } else {
            delete error[event.target.name];
        }
        this.setState({
            [event.target.name]: event.target.value,
            error
        })
    };

    validationProperty = event => {
        const Obj = { [event.target.name]: event.target.value };
        const schema = { [event.target.name]: this.schema[event.target.name] }
        const { error } = Joi.validate(Obj, schema);
        return error ? error.details[0].message : null
    };

    validate = () => {
        const options = { abortEarly: false }
        const form = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone,
        }
        const { error } = Joi.validate(form, this.schema, options)
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message
        return errors;
    };

    submitHandler = (e) => {
        e.preventDefault()
        const error = this.validate()
        if (!error) {
            toast.success('Successfully add user')
            this.props.history.push('/user')
        } else {
            this.setState({
                error: error || {}
            })
        }
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
    handleChange = country => {
        this.setState({
            country
        });
    };
    render() {
        const { email, role, avatar } = this.state.user
        return (
            <Fragment>
                <Helmet>
                    <title>User Profile Edit</title>
                    <meta name="description" content="Description of UserProfile" />
                </Helmet>
                <Grid className="editUserProfile">
                    <Grid container spacing={5}>
                        <Grid item lg={4} xs={12}>
                            <Grid className="editProfileImages">
                                <Grid className="editImages">
                                    <img src={this.state.imagePreviewUrl ? this.state.imagePreviewUrl : avatar} alt="Edit Profile" />
                                    <Grid
                                        component="label"
                                        className="inputFile"
                                        htmlFor="test">
                                        <span className="camera"><img src={camera} alt="camear" /> </span>
                                        <input onChange={this.handleImageChange} type="file" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={8}>
                            <form onSubmit={this.submitHandler}>
                                <Grid container spacing={4}>
                                    <Grid item lg={6} xs={12}>
                                        <FormLabel className="formLabel">Frist Naame</FormLabel>
                                        <TextField
                                            className="inputStyle"
                                            name="first_name"
                                            fullWidth
                                            value={this.state.first_name}
                                            variant="outlined"
                                            onChange={this.changeHandler}
                                            error={this.state.error.first_name && true}
                                            helperText={this.state.error.first_name && this.state.error.first_name}
                                        />
                                    </Grid>
                                    <Grid item lg={6} xs={12}>
                                        <FormLabel className="formLabel">Last Naame</FormLabel>
                                        <TextField
                                            className="inputStyle"
                                            name="last_name"
                                            fullWidth
                                            value={this.state.last_name}
                                            variant="outlined"
                                            onChange={this.changeHandler}
                                            error={this.state.error.last_name && true}
                                            helperText={this.state.error.last_name && this.state.error.last_name}
                                        />
                                    </Grid>
                                    <Grid item lg={6} xs={12}>
                                        <FormLabel className="formLabel">Email</FormLabel>
                                        <TextField
                                            className="inputStyle"
                                            fullWidth
                                            value={email}
                                            variant="outlined"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item lg={6} xs={12}>
                                        <FormLabel className="formLabel">Phone</FormLabel>
                                        <TextField
                                            className="inputStyle"
                                            name="phone"
                                            fullWidth
                                            value={this.state.phone}
                                            variant="outlined"
                                            onChange={this.changeHandler}
                                            error={this.state.error.phone && true}
                                            helperText={this.state.error.phone && this.state.error.phone}
                                        />
                                    </Grid>
                                    <Grid item lg={6} xs={12}>
                                        <FormLabel className="formLabel">Role</FormLabel>
                                        <TextField
                                            className="inputStyle"
                                            fullWidth
                                            value={role}
                                            variant="outlined"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item lg={6} xs={12}>
                                        <FormLabel className="formLabel">Country</FormLabel>
                                        <Select
                                            options={suggestions}
                                            value={this.state.country}
                                            onChange={this.handleChange}
                                            className={this.state.error.country ? 'selectInput error' : 'selectInput'}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button className="btnStyle" type="submit">Save</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
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

export default compose(withConnect)(withRouter((UserProfileEdit)));
