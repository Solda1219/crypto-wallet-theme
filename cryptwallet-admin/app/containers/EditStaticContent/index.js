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
import Select from 'react-select';
import messages from './messages';
import './style.scss'

// json data 
import contents from 'utils/json/content'



class EditStaticContent extends Component {
    state = {
        content: {},
        imagePreviewUrl: '',
        title: '',
        priority: '',
        description: '',
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

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };



    submitHandler = (e) => {
        e.preventDefault()
        toast.success('General Setting Successfully')
    }

    componentDidMount() {
        const id = parseInt(this.props.match.params.id);
        let content = contents.filter(u => u.id === id);
        if (content.length >= 0) {
            this.setState({
                content: content[0]
            })
        }
    }

    render() {
        const { image } = this.state.content
        return (
            <Fragment>
                <Helmet>
                    <title>Static Content Edit</title>
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
                                <FormLabel className="formLabel">Priority</FormLabel>
                                <TextField
                                    className="inputStyle"
                                    name="priority"
                                    fullWidth
                                    placeholder="Text"
                                    value={this.state.priority}
                                    variant="outlined"
                                    onChange={this.changeHandler}
                                />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <FormLabel className="formLabel">Image</FormLabel>
                                <Grid className="logoImg">
                                    <img src={this.state.imagePreviewUrl ? this.state.imagePreviewUrl : image} alt="Edit Profile" />
                                </Grid>
                                <Grid component="label" className="inputFileButton">
                                    Upload Image
                                <input onChange={this.handleImageChange} type="file" />
                                </Grid>
                            </Grid>
                            <Grid item lg={6} xs={12}>
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

export default compose(withConnect)(withRouter((EditStaticContent)));
