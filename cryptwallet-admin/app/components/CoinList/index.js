import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import messages from './messages';
import { Grid, Table, TableBody, TableRow, TableHead, TableCell, TextField, InputAdornment, IconButton } from '@material-ui/core'
import Pagination from 'components/Pagination'
// json data 
import coinlist from 'utils/json/coinlist'

// images 
import search from 'images/icon/tabs/search.svg'

const searchingFor = search => coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) || !search;

class CoinList extends Component {
    state = {
        search: '',
        pageOfItems: [],
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        return (
            <Fragment>
                <Grid className="userTableWrap tablePedingWrap" >
                    <Grid className="tableHeader">
                        <h3 className="title">User List</h3>
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
                                    <TableCell>Name</TableCell>
                                    <TableCell>Is Promary ?</TableCell>
                                    <TableCell>Updated At</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.pageOfItems.filter(searchingFor(this.state.search)).map((coin, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{coin.name}</TableCell>
                                        <TableCell>{coin.promary}</TableCell>
                                        <TableCell>{coin.updated}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <Pagination
                    rowShow={5}
                    items={coinlist}
                    className="pb-30"
                    onChangePage={this.onChangePage}
                />

            </Fragment>
        )
    }

}

export default injectIntl(CoinList)
