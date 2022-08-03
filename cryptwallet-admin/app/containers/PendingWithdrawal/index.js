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
// json data 
import userList from 'utils/json/userlist'
import transactions from 'utils/json/transaction'

// images 
import blockUser from 'images/icon/block-user.svg'
import search from 'images/icon/tabs/search.svg'
import active from 'images/icon/tabs/active.svg'

const searchingFor = search => transaction =>
    transaction.address.toLowerCase().includes(search.toLowerCase()) || !search;

class PendingWithdrawal extends Component {
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
                    <title>Pending Withdrawal</title>
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
                                label="Pending Withdrawal"
                            />
                            <Tab
                                disableRipple
                                label="Rejected Withdrawal"
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.pageOfItems.filter(searchingFor(this.state.search)).map((transaction, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{transaction.address}</TableCell>
                                            <TableCell>{transaction.amount}</TableCell>
                                            <TableCell>{transaction.transaction_id}</TableCell>
                                            <TableCell>{transaction.updateAt}</TableCell>
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.pageOfItems.filter(searchingFor(this.state.search)).map((transaction, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{transaction.address}</TableCell>
                                            <TableCell>{transaction.amount}</TableCell>
                                            <TableCell>{transaction.transaction_id}</TableCell>
                                            <TableCell>{transaction.updateAt}</TableCell>
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

export default injectIntl(PendingWithdrawal)
