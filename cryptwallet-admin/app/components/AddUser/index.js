import React, { Component } from 'react';
import { Grid, TextField, FormLabel, Button } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom'
import Joi from 'joi-browser'
import { ToastContainer, toast } from 'react-toastify';
import messages from './messages';
import commonMessage from 'containers/App/messages'
import './style.scss'

class AddUser extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        role: '',
        error: {},
        value: 0
    }


    schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "string.email":
                        err.message = "Email Mast be a Valid email";
                        break;
                    default: err.message = "email can not be empty";
                        break;
                }
            });
            return errors;
        }),
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
        role: Joi.string().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    default: err.message = "role can not be empty";
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
            email: this.state.email,
            phone: this.state.phone,
            role: this.state.role
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
        } else {
            this.setState({
                error: error || {}
            })
        }
    }
    t(msg, values) {
        return this.props.intl.formatMessage(msg, values);
    }
    render() {
        return (
            <Grid className="adduserWrap">
                <h3 className="title">Add user</h3>
                <form onSubmit={this.submitHandler}>
                    <Grid container spacing={4}>
                        <Grid item sm={6} xs={12}>
                            <FormLabel className="formLabel">{this.t({ ...commonMessage.firstName })}</FormLabel>
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
                        <Grid item sm={6} xs={12}>
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
                        <Grid item sm={6} xs={12}>
                            <FormLabel className="formLabel">Email</FormLabel>
                            <TextField
                                className="inputStyle"
                                name="email"
                                fullWidth
                                type="email"
                                value={this.state.email}
                                variant="outlined"
                                onChange={this.changeHandler}
                                error={this.state.error.email && true}
                                helperText={this.state.error.email && this.state.error.email}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
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
                        <Grid item sm={6} xs={12}>
                            <FormLabel className="formLabel">Role</FormLabel>
                            <TextField
                                className="inputStyle"
                                select
                                value={this.state.role}
                                onChange={this.changeHandler}
                                name="role"
                                fullWidth
                                SelectProps={{
                                    native: true,
                                }}
                                error={this.state.error.role && true}
                                helperText={this.state.error.role && this.state.error.role}
                                variant="outlined"
                            >
                                <option value="user">user</option>
                                <option value="admin">Admin</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Button className="btnStyle" type="submit">Save</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        );
    }

}

export default withRouter(injectIntl(AddUser));
