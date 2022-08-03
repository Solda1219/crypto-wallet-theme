import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import messages from './messages';
import { Grid, Table, TableBody, TableRow, TableHead, TableCell, TextField, InputAdornment, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
import SweetAlert from 'sweetalert-react';
import { toast } from 'react-toastify'
import 'sweetalert/dist/sweetalert.css';
import './style.scss'
// json data 
import contents from 'utils/json/content'

// images 
import deleteUser from 'images/icon/delete.svg'
import search from 'images/icon/tabs/search.svg'
import edit from 'images/icon/edit2.svg'

const searchingFor = search => content =>
    content.title.toLowerCase().includes(search.toLowerCase()) || !search;

class StaticContent extends Component {
    state = {
        search: '',
        pageOfItems: [],
        delete: false,
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    deleteCartHandler = (id) => {
        let userList = this.state.pageOfItems.filter(item => item.id !== id);
        this.setState({
            pageOfItems: userList,
            delete: false
        });
        toast.success('Successfully delete')
    };
    onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems: pageOfItems });
    }

    deleteModalShow = () => {
        this.setState({
            delete: true
        })
    }
    deleteModalClose = () => {
        this.setState({
            delete: false
        })
    }


    render() {
        return (
            <Fragment>
                <Grid className="userTableWrap tablePedingWrap">
                    <Grid className="tableHeader">
                        <h3 className="title">Static Content</h3>
                        <TextField
                            variant="outlined"
                            name="search"
                            label="Search"
                            className="searchInput"
                            value={this.state.search}
                            onChange={this.changeHandler}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                        >
                                            <img src={search} alt="" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid className="tableResponsive">
                        <Table className="tableStyle contentTableStyle">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Priority</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.pageOfItems.filter(searchingFor(this.state.search)).map((content, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <img src={content.image} alt="" />
                                        </TableCell>
                                        <TableCell>{content.title}</TableCell>
                                        <TableCell>{content.priority}</TableCell>
                                        <TableCell>
                                            <ul className="activityList">
                                                <li onClick={this.activeModalShow}>
                                                    <Link to={`static-content-edit/${content.id}`}>
                                                        <img src={edit} alt="" />
                                                    </Link>
                                                </li>
                                                <li onClick={this.deleteModalShow}><img src={deleteUser} alt="" /></li>
                                            </ul>
                                            <SweetAlert
                                                show={this.state.delete}
                                                title="Delete"
                                                html
                                                text="Do you want to delete ?"
                                                type='error'
                                                onConfirm={() => this.deleteCartHandler(content.id)}
                                                onCancel={this.deleteModalClose}
                                                showCancelButton={true}
                                                showLoaderOnConfirm={true}
                                                confirmButtonText="Delete"
                                            />
                                            <SweetAlert
                                                show={this.state.active}
                                                title="User Active"
                                                html
                                                text="Do you want to  active ?"
                                                type='success'
                                                onConfirm={() => this.activeCartHandler(content.id)}
                                                onCancel={this.activeModalClose}
                                                showCancelButton={true}
                                                showLoaderOnConfirm={true}
                                                confirmButtonText="Active"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <Pagination
                    className="pb-30"
                    rowShow={3}
                    items={contents}
                    onChangePage={this.onChangePage}
                />

            </Fragment>
        )
    }

}

export default injectIntl(StaticContent)
