import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import messages from './messages';
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './style.scss'

// images 
import featured1 from 'images/icon/featured/icon1.svg'
import featured2 from 'images/icon/featured/icon2.svg'
import featured3 from 'images/icon/featured/icon3.svg'


const Featured = (props) => {
    const featureds = [
        {
            icon: featured1,
            title: 'Company Profit',
            value: '254548.15 $',
            percent: '80',
            bgColor: 'linear-gradient(240.95deg, #7BEAFE 0%, #1C8CFA 100%)',
            link: '/withdrawal-history'
        },
        {
            icon: featured2,
            title: 'Total Coin Sale',
            value: '14525.15 $',
            percent: '50',
            bgColor: 'linear-gradient(60.95deg, #3ADF9E 0%, #B3FB5B 100%)',
            link: '/order-list'
        },
        {
            icon: featured3,
            title: 'Total User',
            value: '8751',
            bgColor: 'linear-gradient(360deg, rgba(98, 88, 251, 0.9) 0.75%, rgba(134, 126, 255, 0.9) 100%)',
            link: '/user'
        },
    ]
    return (

        <Fragment>
            {featureds.map((featured, i) => (
                <Grid key={i} item lg={4} sm={6} xs={12}>
                    <Grid
                        style={{ background: `${featured.bgColor}` }}
                        className="featuredItem">
                        <div className="featuredContent">
                            <span>{featured.title}</span>
                            <h3>{featured.value}
                                {featured.percent && <span className="percentValue">{`${featured.percent}%`}</span>}
                            </h3>
                        </div>
                        <div className="featuredIcon">
                            <img src={featured.icon} alt="" />
                        </div>
                        <Link to={featured.link} className="viewBtn">View</Link>
                    </Grid>
                </Grid>
            ))}
        </Fragment>
    );
}

export default injectIntl(Featured);
