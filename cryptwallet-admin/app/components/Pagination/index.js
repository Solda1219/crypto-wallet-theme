import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import './style.scss'

import left from 'images/icon//tabs/left.svg'
import right from 'images/icon//tabs/right.svg'


class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        let items = this.props.items;
        let pager = this.state.pager;
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        pager = this.getPager(items.length, page);
        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        this.setState({ pager: pager });
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;

        pageSize = pageSize || this.props.rowShow;

        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
        if (totalPages <= this.props.rowShow) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = this.props.rowShow;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        let pager = this.state.pager;
        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }

        return (
            <ul className={this.props.className ? `${this.props.className} paginationWrapper` : 'paginationWrapper'}>

                <li className={pager.currentPage === 1 ? 'disabled paginat' : 'paginat'}>
                    <Button disabled={pager.currentPage === 1 ? true : false} onClick={() => this.setPage(pager.currentPage - 1)}>
                        <i className="fa fa-angle-left"></i>
                    </Button>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <Button onClick={() => this.setPage(page)}>{page}</Button>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled paginat' : 'paginat'}>
                    <Button disabled={pager.currentPage === pager.totalPages ? true : false} onClick={() => this.setPage(pager.currentPage + 1)}>
                        <i className="fa fa-angle-right"></i>
                    </Button>
                </li>
            </ul>
        );
    }
}
export default Pagination