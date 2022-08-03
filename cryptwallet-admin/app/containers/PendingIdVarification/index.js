import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';
import { Grid, Table, TableBody, TableRow, TableHead, TableCell, TextField, InputAdornment, IconButton } from '@material-ui/core'
import Pagination from 'components/Pagination'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import './style.scss'
// json data 
import userList from 'utils/json/userlist'

// images 
import search from 'images/icon/tabs/search.svg'
import view from 'images/icon/view.svg'


const searchingFor = search => user =>
    user.first_name.toLowerCase().includes(search.toLowerCase()) || !search;

class PendingIdVarification extends Component {
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
                <Helmet>
                    <title>Pending Id Varification</title>
                </Helmet>
                <Grid className="pendingWraper" >
                    <Grid className="tableHeader">
                        <h3 className="title">Pending ID Varification</h3>
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
                                                <li>
                                                    <Link to={`/id-varification/${item.id}`}><img src={view} alt="" /></Link>
                                                </li>
                                            </ul>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                    <Pagination
                        rowShow={5}
                        items={userList}
                        onChangePage={this.onChangePage}
                    />
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

export default compose(withConnect)(PendingIdVarification);
