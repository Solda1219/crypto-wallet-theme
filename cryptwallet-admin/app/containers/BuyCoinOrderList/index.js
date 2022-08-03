import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import messages from './messages';
import { Grid, Table, TableBody, TableRow, TableHead, TableCell, TextField, InputAdornment, IconButton, Dialog } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
import SweetAlert from 'sweetalert-react';
import { toast } from 'react-toastify'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import 'sweetalert/dist/sweetalert.css';
import './style.scss'
// json data 
import orderlist from 'utils/json/orderlist'

// images 
import deleteUser from 'images/icon/delete.svg'
import search from 'images/icon/tabs/search.svg'
import active from 'images/icon/active.svg'
import close from 'images/close.svg'

const searchingFor = search => order =>
    order.email.toLowerCase().includes(search.toLowerCase()) || !search;

class BuyCoinOrderList extends Component {
    state = {
        search: '',
        pageOfItems: [],
        delete: false,
        active: false,
        isOpen: false,
        modalOpen: false,
        photoIndex: 0,
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
        toast.success('Delete successfully')
    };
    activeCartHandler = (id) => {
        let userList = this.state.pageOfItems.filter(item => item.id !== id);
        this.setState({
            pageOfItems: userList,
            active: false
        });
        toast.success('Active successfully')
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

    imageModalOpen = (id) => {
        this.setState({
            isOpen: true,
            photoIndex: id - 1
        })
    }

    modalOpen = () => {
        this.setState({
            modalOpen: true
        })
    }

    modalClose = () => {
        this.setState({
            modalOpen: false
        })
    }
    render() {
        return (
            <Fragment>
                <Grid className="cartStyle pb-30 tablePedingWrap" >
                    <Grid className="tableHeader">
                        <h3 className="title">Order List</h3>
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
                                    <TableCell>Email</TableCell>
                                    <TableCell>Coin amount</TableCell>
                                    <TableCell>Paymeny Type</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.pageOfItems.filter(searchingFor(this.state.search)).map((order, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{order.email}</TableCell>
                                        <TableCell>{order.balance}</TableCell>
                                        <TableCell>
                                            {
                                                order.paymenyType === "credit_card" && <span onClick={(id) => this.modalOpen(order.id)} className="creditCard">Credit Card</span> ||
                                                order.paymenyType === "bank_deposit" && <span onClick={() => this.imageModalOpen(order.id)} className="bankDeposit">Bank Deposit</span>
                                            }
                                        </TableCell>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>
                                            <ul className="activityList">
                                                <li onClick={this.activeModalShow}><img src={active} alt="" /></li>
                                                <li onClick={this.deleteModalShow}><img src={deleteUser} alt="" /></li>
                                            </ul>
                                            <SweetAlert
                                                show={this.state.delete}
                                                title="Delete"
                                                html
                                                text="Do you want to delete ?"
                                                type='error'
                                                onConfirm={() => this.deleteCartHandler(order.id)}
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
                                                onConfirm={() => this.activeCartHandler(order.id)}
                                                onCancel={this.activeModalClose}
                                                showCancelButton={true}
                                                showLoaderOnConfirm={true}
                                                confirmButtonText="Active"
                                            />
                                            {order.paymenyType === "bank_deposit" && <Fragment>
                                                {this.state.isOpen && (
                                                    <Lightbox
                                                        mainSrc={orderlist[this.state.photoIndex].image}
                                                        onCloseRequest={() => this.setState({ isOpen: false })}
                                                    />
                                                )}
                                            </Fragment>}

                                            <Dialog
                                                open={this.state.modalOpen}
                                                onClose={this.modalClose}
                                                classes={{
                                                    root: 'modalWrapper craditCardModal',
                                                    paper: 'modalPaper',
                                                    container: 'modalContainer',
                                                }}
                                            >
                                                <Grid className="modalTitle">
                                                    <h3>Card Name</h3>
                                                    <span onClick={this.modalClose}><img src={close} alt="" /></span>
                                                </Grid>
                                                <Grid className="modalBody">
                                                    <ul className="cardList">
                                                        <li><span>Card Holder Name</span> <strong>{order.first_name} {order.last_name}</strong></li>
                                                        <li><span>Card Number</span> <strong>0987 5678 9876 1234 + {i}</strong></li>
                                                        <li><span>Expaire Date</span> <strong>02 - 12- 2022</strong></li>
                                                        <li><span>CVV Number</span> <strong>****</strong></li>
                                                    </ul>
                                                </Grid>
                                            </Dialog>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <Pagination
                    rowShow={5}
                    items={orderlist}
                    onChangePage={this.onChangePage}
                    className="plr-0"
                />
            </Fragment>
        )
    }

}

export default injectIntl(BuyCoinOrderList)
