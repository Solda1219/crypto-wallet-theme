import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import messages from './messages';
import { Helmet } from 'react-helmet';

import { Grid, Table, TableBody, TableRow, TableHead, TableCell, TextField, InputAdornment, IconButton, Tab, Tabs } from '@material-ui/core'

import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
import SweetAlert from 'sweetalert-react';
import { toast } from 'react-toastify'
import 'sweetalert/dist/sweetalert.css';
import './style.scss'

import transactions from 'utils/json/transaction'

// images 
import blockUser from 'images/icon/block-user.svg'
import search from 'images/icon/tabs/search.svg'
import active from 'images/icon/tabs/active.svg'

const searchingFor = search => transaction =>
    transaction.address.toLowerCase().includes(search.toLowerCase()) || !search;

class Transaction extends Component {
    state = {
        search: '',
        pageOfItems: [],
        delete: false,
        active: false,
        user: {},
        value: 0
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems: pageOfItems });
    }
    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    }
    deleteCartHandler = (id) => {
        let transactions = this.state.pageOfItems.filter(item => item.id !== id);
        this.setState({
            pageOfItems: transactions,
            delete: false
        });
        toast.success('user delete successfully')
    };
    activeCartHandler = (id) => {
        let transactions = this.state.pageOfItems.filter(item => item.id !== id);
        this.setState({
            pageOfItems: transactions,
            active: false
        });
        toast.success('user active successfully')
    };

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
                <Helmet>
                    <title>All Transaction</title>
                    <meta
                        name="description"
                        content="Description of UserWalletTransaction"
                    />
                </Helmet>
                <Grid className="cartStyle pb-30 tablePedingWrap" >
                    <Grid className="tableHeader">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            classes={{
                                root: 'transactionTabs',
                                scrollable: 'transactionTabsScrollable',
                                scroller: 'transactionTabsScroller',
                                indicator: 'transactionTabsIndicator',
                                flexContainer: 'transactionTabsFlexContainer'
                            }}
                        >
                            <Tab
                                disableRipple
                                label="Deposit"
                            />
                            <Tab
                                disableRipple
                                label="Withdraw"
                            />
                        </Tabs>
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
                    {this.state.value === 0 && <Fragment>
                        <Grid className="tableResponsive">
                            <Table className="tableStyle">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Transaction ID</TableCell>
                                        <TableCell>Update At</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.pageOfItems.filter(searchingFor(this.state.search)).map((transaction, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{transaction.address}</TableCell>
                                            <TableCell>{transaction.amount}</TableCell>
                                            <TableCell>{transaction.transaction_id}</TableCell>
                                            <TableCell>{transaction.updateAt}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={
                                                        transaction.status === 1 && 'text-success' ||
                                                        transaction.status === 0 && 'text-warning' ||
                                                        transaction.status === 2 && 'text-danger'
                                                    }
                                                >
                                                    {
                                                        transaction.status === 1 && 'Successfull' ||
                                                        transaction.status === 0 && 'Pending' ||
                                                        transaction.status === 2 && 'Cancel'
                                                    }
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                        <Pagination
                            rowShow={5}
                            items={transactions}
                            onChangePage={this.onChangePage}
                        />
                    </Fragment>}
                    {this.state.value === 1 && <Fragment>
                        <Grid className="tableResponsive">
                            <Table className="tableStyle">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Transaction ID</TableCell>
                                        <TableCell>Update At</TableCell>
                                        <TableCell>Activity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.pageOfItems.filter(searchingFor(this.state.search)).map((transaction, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{transaction.address}</TableCell>
                                            <TableCell>{transaction.amount}</TableCell>
                                            <TableCell>{transaction.transaction_id}</TableCell>
                                            <TableCell>{transaction.updateAt}</TableCell>
                                            <TableCell>
                                                {transaction.status === 0 && <ul className="activityList">
                                                    <li onClick={this.activeModalShow}><img src={active} alt="" /></li>
                                                    <li onClick={this.deleteModalShow}><img src={blockUser} alt="" /></li>
                                                </ul>}

                                                <SweetAlert
                                                    show={this.state.delete}
                                                    title="Denial Withdraw"
                                                    html
                                                    text="Do you want to Denial ?"
                                                    type='warning'
                                                    onConfirm={() => this.deleteCartHandler(transaction.id)}
                                                    onCancel={this.deleteModalClose}
                                                    showCancelButton={true}
                                                    showLoaderOnConfirm={true}
                                                    confirmButtonText="Delete"
                                                />
                                                <SweetAlert
                                                    show={this.state.active}
                                                    title="Withdraw Active"
                                                    html
                                                    text="Do you want to  active ?"
                                                    type='success'
                                                    onConfirm={() => this.activeCartHandler(transaction.id)}
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
                        <Pagination
                            rowShow={5}
                            items={transactions}
                            onChangePage={this.onChangePage}
                        />
                    </Fragment>}
                </Grid>
            </Fragment >
        )
    }

}

export default injectIntl(Transaction)
