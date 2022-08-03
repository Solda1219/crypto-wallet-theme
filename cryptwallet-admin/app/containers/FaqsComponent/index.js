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
import faqs from 'utils/json/faqs'

// images 
import deleteUser from 'images/icon/delete.svg'
import search from 'images/icon/tabs/search.svg'
import plus from 'images/icon/plus.svg'
import edit from 'images/icon/edit2.svg'

const searchingFor = search => faq =>
    faq.title.toLowerCase().includes(search.toLowerCase()) || !search;

class FaqsComponent extends Component {
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
        let faqs = this.state.pageOfItems.filter(item => item.id !== id);
        this.setState({
            pageOfItems: faqs,
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
                <Button component={Link} to="/add-faqs" className="addBtn"><img src={plus} alt="" /> Add</Button>
                <Grid className="cartStyle tablePedingWrap" >
                    <Grid className="tableHeader">
                        <h3 className="title">FAQs</h3>
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
                                    <TableCell>Question</TableCell>
                                    <TableCell>Priority</TableCell>
                                    <TableCell>Updated At</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.pageOfItems.filter(searchingFor(this.state.search)).map((faq, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{faq.title}</TableCell>
                                        <TableCell>{faq.priority}</TableCell>
                                        <TableCell>{faq.update_at}</TableCell>
                                        <TableCell>
                                            <ul className="activityList">
                                                <li onClick={this.activeModalShow}>
                                                    <Link to="/add-faqs">
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
                                                onConfirm={() => this.deleteCartHandler(faq.id)}
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
                        rowShow={7}
                        items={faqs}
                        onChangePage={this.onChangePage}
                    />
                </Grid>
            </Fragment>
        )
    }

}

export default injectIntl(FaqsComponent)
