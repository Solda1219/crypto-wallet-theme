import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import messages from './messages';
import { Grid, Table, TableBody, TableRow, TableHead, TableCell, TextField, InputAdornment, IconButton } from '@material-ui/core'
import Pagination from 'components/Pagination'
import { Link } from 'react-router-dom'
import SweetAlert from 'sweetalert-react';
import { toast } from 'react-toastify'
import 'sweetalert/dist/sweetalert.css';
// json data 
import userList from 'utils/json/userlist'

// images 
import deleteUser from 'images/icon/delete-user.svg'
import search from 'images/icon/tabs/search.svg'
import view from 'images/icon/view.svg'
import edit from 'images/icon/edit.svg'
import blockUser from 'images/icon/block-user.svg'
import active from 'images/icon/tabs/active.svg'

const searchingFor = search => user =>
    user.first_name.toLowerCase().includes(search.toLowerCase()) || !search;

class EmailPending extends Component {
    state = {
        search: '',
        pageOfItems: [],
        delete: false,
        active: false
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
        toast.success('user delete successfully')
    };
    activeCartHandler = (id) => {
        let userList = this.state.pageOfItems.filter(item => item.id !== id);
        this.setState({
            pageOfItems: userList,
            active: false
        });
        toast.success('user active successfully')
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

    activeModalShow = () => {
        this.setState({
            active: true
        })
    }
    activeModalClose = () => {
        this.setState({
            active: false
        })
    }

    render() {
        return (
            <Fragment>
                <Grid className="userTableWrap" >
                    <Grid className="tableHeader">
                        <h3 className="title">Email Pending</h3>
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
                        <Table className="tableStyle">
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email ID</TableCell>
                                    <TableCell>Updated At</TableCell>
                                    <TableCell>Activity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.pageOfItems.filter(searchingFor(this.state.search)).map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{item.first_name}</TableCell>
                                        <TableCell>{item.last_name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.updatedAt}</TableCell>
                                        <TableCell>
                                            <ul className="activityList">
                                                <li><Link to={`/user-profile/${item.id}`}><img src={view} alt="" /></Link></li>
                                                <li><Link to={`/user-profile-edit/${item.id}`}><img src={edit} alt="" /></Link></li>
                                                <li onClick={this.activeModalShow}><img src={active} alt="" /></li>
                                                <li onClick={this.deleteModalShow}><img src={deleteUser} alt="" /></li>
                                            </ul>
                                            <SweetAlert
                                                show={this.state.delete}
                                                title="Delete"
                                                html
                                                text="Do you want to delete ?"
                                                type='error'
                                                onConfirm={() => this.deleteCartHandler(item.id)}
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
                                                onConfirm={() => this.activeCartHandler(item.id)}
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
                    rowShow={5}
                    items={userList}
                    onChangePage={this.onChangePage}
                />

            </Fragment>
        )
    }

}

export default injectIntl(EmailPending)
