import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Grid, Tabs, Tab, TextField, FormLabel, Button, InputAdornment, IconButton } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import Joi from 'joi-browser'
import { toast } from 'react-toastify';
import messages from './messages';
import './style.scss'
// images 
import eye from 'images/icon/eye.svg'
import eyeSlash from 'images/icon/eye-slash.svg'


class ResetPassword extends Component {
    state = {
        old_pass: '',
        new_pass: '',
        confirm_pass: '',
        oldPassShow: false,
        newPassShow: false,
        confirmPassShow: false,
        error: {}
    }


    schema = {
        new_pass: Joi.string()
            .required()
            .min(8)
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .error(errors => {
                errors.forEach(err => {
                    switch (err.type) {
                        case "string.required":
                            err.message = "Code CAN NOT BE EMPTY";
                            break;
                        case "string.min":
                            err.message = "New Password Minimum 8 Digit";
                            break;
                        default: err.message = "Please Provide a strong password";
                            break;
                    }
                });
                return errors;
            }),
        old_pass: Joi.string()
            .required()
            .min(8)
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .error(errors => {
                errors.forEach(err => {
                    switch (err.type) {
                        case "string.required":
                            err.message = "Code CAN NOT BE EMPTY";
                            break;
                        case "string.min":
                            err.message = "Old Password Minimum 8 Digit";
                            break;
                        default: err.message = "Please Provide a strong password";
                            break;
                    }
                });
                return errors;
            }),
        confirm_pass: Joi.string()
            .required()
            .min(8)
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .error(errors => {
                errors.forEach(err => {
                    switch (err.type) {
                        case "string.required":
                            err.message = "Code CAN NOT BE EMPTY";
                            break;
                        case "string.min":
                            err.message = "Confirm Password Minimum 8 Digit";
                            break;
                        default: err.message = "Please Provide a strong password";
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
            new_pass: this.state.new_pass,
            old_pass: this.state.old_pass,
            confirm_pass: this.state.confirm_pass,

        }
        const { error } = Joi.validate(form, this.schema, options)
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message
        return errors;
    };


    resetPasswordHandler = (e) => {
        e.preventDefault()
        const error = this.validate()
        if (!error) {
            toast.success('Successfully Change')
            this.props.history.push('/')
        } else {
            this.setState({
                error: error || {}
            })
        }
    }

    oldPassowrShowHandler = () => {
        this.setState({
            oldPassShow: !this.state.oldPassShow
        })
    }
    newPassowrShowHandler = () => {
        this.setState({
            newPassShow: !this.state.newPassShow
        })
    }

    confirmPassowrShowHandler = () => {
        this.setState({
            confirmPassShow: !this.state.confirmPassShow
        })
    }

    render() {
        return (
            <Fragment>
                <form className="p-70 resetPasswordWrapper"
                    onSubmit={this.resetPasswordHandler}>
                    <Grid container spacing={4}>
                        <Grid item lg={6} xs={12}>
                            <FormLabel className="formLabel">Email</FormLabel>
                            <TextField
                                className="inputStyle"
                                fullWidth
                                value="johndoe45@gmail.com"
                                variant="outlined"
                                disabled
                            />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <FormLabel className="formLabel">Old Password</FormLabel>
                            <TextField
                                className="inputStyle"
                                name="old_pass"
                                fullWidth
                                type={this.state.oldPassShow ? 'text' : 'password'}
                                value={this.state.old_pass}
                                variant="outlined"
                                onChange={this.changeHandler}
                                error={this.state.error.old_pass && true}
                                helperText={this.state.error.old_pass && this.state.error.old_pass}
                                placeholder="******"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={this.oldPassowrShowHandler}
                                            >
                                                <img src={this.state.oldPassShow ? eye : eyeSlash} alt="" />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <FormLabel className="formLabel">New Password</FormLabel>
                            <TextField
                                className="inputStyle"
                                name="new_pass"
                                fullWidth
                                type={this.state.newPassShow ? 'text' : 'password'}
                                value={this.state.new_pass}
                                variant="outlined"
                                onChange={this.changeHandler}
                                placeholder="******"
                                error={this.state.error.new_pass && true}
                                helperText={this.state.error.new_pass && this.state.error.new_pass}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={this.newPassowrShowHandler}
                                            >
                                                <img src={this.state.newPassShow ? eye : eyeSlash} alt="" />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <FormLabel className="formLabel">Confirm Password</FormLabel>
                            <TextField
                                className="inputStyle"
                                name="confirm_pass"
                                fullWidth
                                value={this.state.confirm_pass}
                                type={this.state.confirmPassShow ? 'text' : 'password'}
                                variant="outlined"
                                placeholder="******"
                                onChange={this.changeHandler}
                                error={this.state.error.confirm_pass && true}
                                helperText={this.state.error.confirm_pass && this.state.error.confirm_pass}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={this.confirmPassowrShowHandler}
                                            >
                                                <img src={this.state.confirmPassShow ? eye : eyeSlash} alt="" />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button className="btnStyle" type="submit">Update</Button>
                        </Grid>
                    </Grid>
                </form>
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

export default compose(withConnect)(withRouter((ResetPassword)));
