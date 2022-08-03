import React from 'react';

import { injectIntl } from 'react-intl';
import messages from './messages';
import { Grid, Tab, Tabs } from '@material-ui/core'
import './style.scss'

const Card = ({
    title,
    children,
    className,
    value,
    handleChange,
    labels,
    tabMenuClassName,
    tabs,
    indicatorClass }) => {
    return (
        <Grid className={!className ? 'cardWrapper' : `cardWrapper ${className}`}>
            {title || tabs && <Grid className="cardHeader">
                <h3>{title}</h3>
                {tabs && <Tabs
                    className={`cartTabs ${tabMenuClassName}`}
                    value={value}
                    classes={{
                        indicator: `noIndigator ${indicatorClass}`,
                    }}
                    onChange={handleChange}>
                    {labels.map((label, i) => (
                        <Tab
                            disableRipple
                            disableFocusRipple
                            disableTouchRipple
                            key={i}
                            label={label}
                        />
                    ))}
                </Tabs>}
            </Grid>}

            {children}
        </Grid>
    );
}

export default injectIntl(Card);
