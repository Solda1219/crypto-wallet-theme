import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import messages from './messages';
import { Grid, Table, TableBody, TableRow, TableHead, TableCell, TextField, InputAdornment, IconButton, Button } from '@material-ui/core'
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
import plus from 'images/icon/plus.svg'
import edit from 'images/icon/edit2.svg'

const searchingFor = search => content =>
    content.title.toLowerCase().includes(search.toLowerCase()) || !search;

class CustomPage extends Component {
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
                <Button component={Link} to="/custom-page-add" className="addBtn"><img src={plus} alt="" /> Add</Button>
                <Grid className="cartStyle tablePedingWrap" >
                    <Grid className="tableHeader">
                        <h3 className="title">Custom Content</h3>
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
                                    <TableCell>Title</TableCell>
                                    <TableCell>Page  Type</TableCell>
                                    <TableCell>Updated At</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.pageOfItems.filter(searchingFor(this.state.search)).map((content, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{content.title}</TableCell>
                                        <TableCell>{content.page_type}</TableCell>
                                        <TableCell>{content.update_at}</TableCell>
                                        <TableCell>
                                            <ul className="activityList">
                                                <li onClick={this.activeModalShow}>
                                                    <Link to="/custom-page-add">
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
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                    <Pagination
                        className="pb-30"
                        rowShow={5}
                        items={contents}
                        onChangePage={this.onChangePage}
                    />
                </Grid>


            </Fragment>
        )
    }

}

export default injectIntl(CustomPage)
