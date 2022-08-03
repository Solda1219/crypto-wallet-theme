import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Grid } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import './style.scss'

const Withdraw = () => {
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
            title='Withdraw'
            tabs
            labels={['Day', 'Month', 'Year']}
            value={value}
            handleChange={handleChange}
        >
            <Grid className="depositChart">
                {value === 0 && <ResponsiveContainer>
                    <LineChart
                        data={data}
                    >
                        <defs>
                            <linearGradient
                                id="withdraw"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1">
                                <stop offset="54%"
                                    stopColor="#FC594A"
                                    stopOpacity={.5} />
                                <stop offset="95%"
                                    stopColor="#FF89AB"
                                    stopOpacity={.5} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            stroke="#666"
                            dataKey="name" />
                        <YAxis stroke="#666" />
                        <Tooltip cursor={{ strokeDasharray: '1 1' }} />
                        <Line
                            type="monotone"
                            dataKey="uv"
                            strokeWidth="4"
                            fillOpacity={1}
                            stroke="url(#withdraw)" />
                    </LineChart>
                </ResponsiveContainer>}
                {value === 1 && <ResponsiveContainer>
                    <LineChart
                        data={data}
                    >
                        <defs>
                            <linearGradient
                                id="withdraw"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1">
                                <stop offset="54%"
                                    stopColor="#FC594A"
                                    stopOpacity={.5} />
                                <stop offset="95%"
                                    stopColor="#FF89AB"
                                    stopOpacity={.5} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            stroke="#666"
                            dataKey="name" />
                        <YAxis stroke="#666" />
                        <Tooltip cursor={{ strokeDasharray: '1 1' }} />
                        <Line
                            type="monotone"
                            dataKey="pv"
                            strokeWidth="4"
                            fillOpacity={1}
                            stroke="url(#withdraw)" />
                    </LineChart>
                </ResponsiveContainer>}
                {value === 2 && <ResponsiveContainer>
                    <LineChart
                        data={data}
                    >
                        <defs>
                            <linearGradient
                                id="withdraw"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1">
                                <stop offset="54%"
                                    stopColor="#FC594A"
                                    stopOpacity={.5} />
                                <stop offset="95%"
                                    stopColor="#FF89AB"
                                    stopOpacity={.5} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            stroke="#666"
                            dataKey="name" />
                        <YAxis stroke="#666" />
                        <Tooltip cursor={{ strokeDasharray: '1 1' }} />
                        <Line
                            type="monotone"
                            dataKey="amt"
                            strokeWidth="4"
                            fillOpacity={1}
                            stroke="url(#withdraw)" />
                    </LineChart>
                </ResponsiveContainer>}

            </Grid>

        </Card>
    );
}

export default Withdraw;
