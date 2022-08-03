import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import messages from './messages';
import { Grid } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import { Tooltip, Area, ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import './style.scss'

const UserChart = (props) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const data = [
        { name: 'Jan', uv: 2000, pv: 3000, amt: 2400, },
        { name: 'Feb', uv: 4800, pv: 3800, amt: 2210, },
        { name: 'Mar', uv: 6500, pv: 4500, amt: 2290, },
        { name: 'Apr', uv: 4000, pv: 3000, amt: 2000, },
        { name: 'May', uv: 3800, pv: 5000, amt: 2181, },
        { name: 'Jun', uv: 6000, pv: 2500, amt: 2500, },
        { name: 'Jul', uv: 3000, pv: 2000, amt: 2100, },
        { name: 'Aug', uv: 5800, pv: 1800, amt: 8100, },
        { name: 'Sep', uv: 2500, pv: 6800, amt: 2100, },
        { name: 'Oct', uv: 2200, pv: 1200, amt: 2100, },
        { name: 'Nov', uv: 3700, pv: 1000, amt: 2100, },
        { name: 'Dec', uv: 1500, pv: 5000, amt: 2100, },
    ];
    return (
        <Card
            title={props.intl.formatMessage({ ...messages.user })}
            tabs
            labels={['Day', 'Month', 'Year']}
            value={value}
            handleChange={handleChange}
        >
            <Grid className="userChart">
                {value === 0 && <ResponsiveContainer>
                    <AreaChart
                        data={data}
                    >
                        <defs>
                            <linearGradient
                                id="rate"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1">
                                <stop offset="0.48%"
                                    stopColor="rgba(94, 85, 230, 0.7)"
                                    stopOpacity={1} />
                                <stop offset="90.46%"
                                    stopColor="rgba(255, 255, 255, .1)"
                                    stopOpacity={1} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            stroke="#666"
                            dataKey="name" />
                        <YAxis stroke="#666" />
                        <Tooltip cursor={{ strokeDasharray: '1 1' }} />
                        <Area type="monotone"
                            dataKey="pv"
                            stroke="#5E55E6"
                            strokeWidth="4"
                            fillOpacity={.5}
                            fill="url(#rate)" />
                    </AreaChart>
                </ResponsiveContainer>}
                {value === 1 && <ResponsiveContainer>
                    <AreaChart
                        data={data}
                    >
                        <defs>
                            <linearGradient
                                id="rate"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1">
                                <stop offset="0.48%"
                                    stopColor="rgba(94, 85, 230, 0.7)"
                                    stopOpacity={1} />
                                <stop offset="90.46%"
                                    stopColor="rgba(255, 255, 255, .1)"
                                    stopOpacity={1} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            stroke="#666"
                            dataKey="name" />
                        <YAxis stroke="#666" />
                        <Tooltip cursor={{ strokeDasharray: '1 1' }} />
                        <Area
                            dataKey="uv"
                            stroke="#5E55E6"
                            strokeWidth="4"
                            fillOpacity={.5}
                            fill="url(#rate)" />
                    </AreaChart>
                </ResponsiveContainer>}
                {value === 2 && <ResponsiveContainer>
                    <AreaChart
                        data={data}
                    >
                        <defs>
                            <linearGradient
                                id="rate"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1">
                                <stop offset="0.48%"
                                    stopColor="rgba(94, 85, 230, 0.7)"
                                    stopOpacity={1} />
                                <stop offset="90.46%"
                                    stopColor="rgba(255, 255, 255, .1)"
                                    stopOpacity={1} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            stroke="#666"
                            dataKey="name" />
                        <YAxis stroke="#666" />
                        <Tooltip cursor={{ strokeDasharray: '1 1' }} />
                        <Area type="monotone"
                            dataKey="amt"
                            stroke="#5E55E6"
                            strokeWidth="4"
                            fillOpacity={.5}
                            fill="url(#rate)" />
                    </AreaChart>
                </ResponsiveContainer>}

            </Grid>
        </Card>
    );
}

export default injectIntl(UserChart);
