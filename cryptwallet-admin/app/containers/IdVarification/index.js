import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';
import SweetAlert from 'sweetalert-react';
import { toast } from 'react-toastify'
import { Grid, Button, Dialog, TextField, FormLabel } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import Joi from 'joi-browser'
import 'sweetalert/dist/sweetalert.css';
import './style.scss'
// json data 
import userList from 'utils/json/userlist'

// images 
import close from 'images/close.svg'

class IdVarification extends Component {
    state = {
        user: {},
        active: false,
        reject: false,
        causeofRejection: '',
        error: {}
    }


    schema = {
        causeofRejection: Joi.string().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    default: err.message = "cause of rejection can not be empty";
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
            causeofRejection: this.state.causeofRejection,
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
            this.setState({
                reject: false
            })
            this.props.history.push('/pending-id-varification')
            toast.success('Successfully Rejected')
        } else {
            this.setState({
                error: error || {}
            })
        }
    }

    activeModalShow = () => {
        this.setState({
            active: true
        })
    }
    activedModalClose = () => {
        this.setState({
            active: false
        })
    }
    confirmHandler = () => {
        this.setState({
            active: false
        })
        this.props.history.push('/pending-id-varification')
        toast.success('user id approve successfully')
    }

    modalOpen = () => {
        this.setState({
            reject: true
        })
    }

    modalClose = () => {
        this.setState({
            reject: false
        })
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
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Id Varification</title>
                </Helmet>
                <Grid className="idvarificationWrapper">
                    <h3 className="title">Pending ID Varification</h3>
                    <Grid container spacing={6}>
                        <Grid item lg={6} sm={12} xs={12}>
                            <Grid className="idWrapper">
                                <Grid className="idImg">
                                    <img src={this.state.user.front} alt="" />
                                </Grid>
                                <h3>NID Front Side</h3>
                            </Grid>
                        </Grid>
                        <Grid item lg={6} sm={12} xs={12}>
                            <Grid className="idWrapper">
                                <Grid className="idImg">
                                    <img src={this.state.user.back} alt="" />
                                </Grid>
                                <h3>NID Front Side</h3>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <ul className="idVBtn">
                                <li><Button onClick={this.activeModalShow} className="approve btn">Approve</Button></li>
                                <li><Button onClick={this.modalOpen} className="reject btn">Reject</Button></li>
                            </ul>
                        </Grid>
                    </Grid>
                    <Dialog
                        open={this.state.reject}
                        onClose={this.modalClose}
                        classes={{
                            root: 'modalWrapper rejectModal',
                            paper: 'modalPaper',
                            container: 'modalContainer'
                        }}
                    >
                        <Grid className="modalTitle">
                            <h3>Rejected Cause</h3>
                            <span onClick={this.modalClose}><img src={close} alt="" /></span>
                        </Grid>
                        <Grid className="modalBody">
                            <form onSubmit={this.submitHandler}>
                                <FormLabel>Cause of  Rejection</FormLabel>
                                <TextField
                                    multiline
                                    rowsMax="4"
                                    value={this.state.causeofRejection}
                                    onChange={this.changeHandler}
                                    variant="outlined"
                                    fullWidth
                                    className="inputStyle"
                                    name="causeofRejection"
                                    error={this.state.error.causeofRejection && true}
                                    helperText={this.state.error.causeofRejection && this.state.error.causeofRejection}
                                />

                                <Button type="submit" className="btn">Send </Button>
                            </form>
                        </Grid>
                    </Dialog>
                    <SweetAlert
                        show={this.state.active}
                        title="Active"
                        showCancelButton={true}
                        text="Do you want to active ?"
                        type='success'
                        onConfirm={this.confirmHandler}
                        onCancel={this.activedModalClose}
                        showLoaderOnConfirm={true}
                        confirmButtonText="Active"
                    />
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

export default compose(withConnect)(withRouter((IdVarification)));
