import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Grid } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import Chart from 'react-apexcharts'
class DeleteUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -135,
                        endAngle: 225,
                        hollow: {
                            margin: 0,
                            size: '55%',
                            background: '#fff',
                            position: 'front',
                            dropShadow: {
                                enabled: true,
                                top: 3,
                                left: 0,
                                blur: 4,
                                opacity: 0.24
                            }
                        },
                        track: {
                            background: '#FCF4DF',
                            strokeWidth: '45%',
                            margin: 0, // margin is in pixels
                            dropShadow: {
                                enabled: true,
                                top: -3,
                                left: 0,
                                blur: 4,
                                opacity: 0.15
                            }
                        },

                        dataLabels: {
                            name: {
                                offsetY: -10,
                                show: false,
                                color: '#666',
                                fontSize: '17px'
                            },
                            value: {
                                formatter: function (val) {
                                    return parseInt(val);
                                },
                                color: '#666',
                                fontSize: '20px',
                                show: true,
                            }
                        }
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: 'verticale',
                        shadeIntensity: 0.9,
                        gradientToColors: ['#EB690E'],
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100]
                    }
                },
            },
            series: [60],
        }
    }
    render() {
        return (
            <Card
                title="Delete User"
            >
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="radialBar"
                    height="330" />
            </Card>
        )
    }
}

export default DeleteUser;
