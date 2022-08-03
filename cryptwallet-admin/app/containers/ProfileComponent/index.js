import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Grid, Tabs, Tab, TextField, FormLabel, Button } from '@material-ui/core'
import ResetPassword from '../../components/ResetPassword/Loadable'
import Joi from 'joi-browser'
import { toast } from 'react-toastify';
import Select from 'react-select';
import messages from './messages';
import './style.scss'
// images 
import user from 'images/icon/tabs/user.png'
import edit from 'images/icon/eidt2.svg'
import resetPass from 'images/icon/reset-pass.svg'
import avatar from 'images/user/user1.jpg'
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
class ProfileComponent extends Component {
    state = {
        value: 0,
        imagePreviewUrl: '',
        changed: false,
        first_name: '',
        first_name: '',
        last_name: '',
        phone: '',
        country: null,
        error: {}
    }

    andleImageChange = e => {
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
    handleChange = country => {
        this.setState({
            country
        });
    };

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    }

    render() {
        const { value } = this.state
        return (
            <Fragment>
                <Helmet>
                    <title>Profile</title>
                </Helmet>
                <Grid className="profileWrapper">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        classes={{
                            root: 'tabsWrap',
                            scrollable: 'tabsScrollable',
                            scroller: 'tabsScroller',
                            indicator: 'tabsIndicator',
                            flexContainer: 'tabsFlexContainer'
                        }}
                    >
                        <Tab
                            disableRipple
                            label="Profile"
                            icon={<img src={user} alt="" />}
                        />
                        <Tab
                            disableRipple
                            label="Edit Profile"
                            icon={<img src={edit} alt="" />}
                        />
                        <Tab
                            disableRipple
                            label="Reset Password"
                            icon={<img src={resetPass} alt="" />}
                        />
                    </Tabs>

                    {value === 0 && <Grid className="userProfile p-70">
                        <Grid container spacing={5}>
                            <Grid item lg={5} xs={12}>
                                <Grid className="profileImage">
                                    <img src={avatar} alt="" />
                                    <h2>John Doe</h2>
                                    <p>jon.doe@gmail.com</p>
                                    <span>United State</span>
                                </Grid>
                            </Grid>
                            <Grid item lg={7} xs={12}>
                                <ul className="userInfo">
                                    <li>
                                        <span>First Name</span>
                                        <strong>John</strong>
                                    </li>
                                    <li>
                                        <span>Last Name</span>
                                        <strong>Doe</strong>
                                    </li>
                                    <li>
                                        <span>Role</span>
                                        <strong>Admin</strong>
                                    </li>
                                    <li>
                                        <span>Email</span>
                                        <strong>jon.doe@gmail.com</strong>
                                    </li>
                                    <li>
                                        <span>Contact</span>
                                        <strong>+145 54545 8445</strong>
                                    </li>
                                    <li>
                                        <span>Status</span>
                                        <strong>Active</strong>
                                    </li>
                                </ul>
                            </Grid>
                        </Grid>
                    </Grid>}
                    {value === 1 && <Grid className="editUserProfile p-70">
                        <Grid container spacing={5}>
                            <Grid item lg={5} xs={12}>
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
                            <Grid item lg={7} xs={12}>
                                <form onSubmit={this.submitHandler}>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12}>
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
                                        <Grid item xs={12}>
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
                                        <Grid item xs={12}>
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
                                        <Grid item xs={12}>
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
                    </Grid>}
                    {value === 2 && <ResetPassword />}
                </Grid>
            </Fragment>
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

export default compose(withConnect)(ProfileComponent);
