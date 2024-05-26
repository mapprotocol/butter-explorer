import React from 'react';

import ReactECharts from 'echarts-for-react';





const LineChart = ({ data = [], type = 'Active Users' }) => {
    const sortedData = data?.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));

    const option = {

        tooltip: {
            trigger: 'axis',
            formatter: params => {
                const { name, value } = params[0];
                return `${name}<br /><span style="font-size: 14px; font-weight: bold;">${type}: ${value}</span>`;
            },
            axisPointer: {
                type: 'line'
            }
        },
        xAxis: {
            type: 'category',
            data: sortedData.map(item => item.date),
            axisLine: {
                show: false
            },
            axisLabel: {
                rotate: 45
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false

            }
        },
        yAxis: {
            type: 'value',
            position: 'right',
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLabel: {
                formatter: value => `${value / 1000}k`
            }
        },
        series: [
            {
                name: 'Acitive Users',
                type: 'line',
                data: sortedData.map(item => item.count),
                lineStyle: {
                    color: '#FFDF78'

                },
                smooth: true,
                showSymbol: false,
                emphasis: {
                    itemStyle: {
                        color: '#fff',
                        borderColor: '#FFDF78',
                    },
                    lineStyle: {
                        color: '#FFDF78'
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: '#FFDF78' },
                                { offset: 1, color: '#fff' },
                            ]
                        }
                    }
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: '#FFDF78' },
                            { offset: 1, color: '#fff' },
                        ]
                    }
                }
            }
        ],

    };


    return (

        <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />

    );

};



export default LineChart;