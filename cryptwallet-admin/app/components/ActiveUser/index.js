import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import messages from './messages';
import { Grid } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import Chart from 'react-apexcharts'
class ActiveUser extends Component {
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
                            background: '#E9F7FF',
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
                        shade: 'dark',
                        type: 'horizontal',
                        shadeIntensity: 0.5,
                        gradientToColors: ['#5E55E6'],
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100]
                    }
                },
            },
            series: [75],
        }
    }
    t(msg, values) {
        return this.props.intl.formatMessage(msg, values);
    }
    render() {
        return (
            <Card
                title={this.t({ ...messages.activeUser })}
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

export default injectIntl(ActiveUser);
