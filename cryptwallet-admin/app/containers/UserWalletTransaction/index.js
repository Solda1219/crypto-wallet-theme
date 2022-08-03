import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Grid, Table, TableBody, TableRow, TableHead, TableCell, TextField, InputAdornment, IconButton, Tab, Tabs } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
import messages from './messages';
import './style.scss'
// json data 
import transactions from 'utils/json/transaction'

// images 
import search from 'images/icon/tabs/search.svg'

const searchingFor = search => transaction =>
    transaction.address.toLowerCase().includes(search.toLowerCase()) || !search;

class UserWalletTransaction extends Component {
    state = {
        search: '',
        pageOfItems: [],
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
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>User Wallet Transaction</title>
                    <meta
                        name="description"
                        content="Description of UserWalletTransaction"
                    />
                </Helmet>
                <Grid className="transactionTableWrap tablePedingWrap" >
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

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(withConnect)(UserWalletTransaction);
