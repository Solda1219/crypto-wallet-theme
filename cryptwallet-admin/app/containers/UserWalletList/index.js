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
import userList from 'utils/json/userlist'
import wallets from 'utils/json/walletList'

// images 
import deleteUser from 'images/icon/delete-user.svg'
import search from 'images/icon/tabs/search.svg'
import view from 'images/icon/view.svg'

const searchingFor = search => wallet =>
    wallet.wName.toLowerCase().includes(search.toLowerCase()) || !search;

class UserWalletList extends Component {
    state = {
        search: '',
        pageOfItems: [],
        delete: false,
        user: {},
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    deleteCartHandler = (id) => {
        let walletList = this.state.pageOfItems.filter(item => item.id !== id);
        this.setState({
            pageOfItems: walletList,
            delete: false
        });
        toast.success('user delete successfully')
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
                <Grid className="walletTableWrap tablePedingWrap" >
                    <Grid className="tableHeader">
                        <h3 className="title">{`${this.state.user.first_name} ${this.state.user.last_name} Wallet List`}</h3>
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
                                    <TableCell>Wallet Name</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Updated At</TableCell>
                                    <TableCell>Balance</TableCell>
                                    <TableCell>Activity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.pageOfItems.filter(searchingFor(this.state.search)).map((wallet, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{wallet.wName}</TableCell>
                                        <TableCell>{wallet.cAt}</TableCell>
                                        <TableCell>{wallet.uAt}</TableCell>
                                        <TableCell>{wallet.balance}</TableCell>
                                        <TableCell>
                                            <ul className="activityList">
                                                <li><Link to={`user-wallet-transaction/${wallet.id}`}><img src={view} alt="" /></Link></li>
                                                <li onClick={this.deleteModalShow}><img src={deleteUser} alt="" /></li>
                                            </ul>
                                            <SweetAlert
                                                show={this.state.delete}
                                                title="Delete"
                                                html
                                                text="Do you want to delete ?"
                                                type='error'
                                                onConfirm={() => this.deleteCartHandler(wallet.id)}
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
                </Grid>
                <Pagination
                    rowShow={5}
                    items={wallets}
                    onChangePage={this.onChangePage}
                    className="plr-0"
                />

            </Fragment>
        )
    }

}

export default injectIntl(UserWalletList)
