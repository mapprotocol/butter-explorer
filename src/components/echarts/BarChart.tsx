import React from 'react';

import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';







const BarChart = ({ data = [], type = "Source Chain Messages" }) => {

    const getOption = () => {

        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: params => {
                    const { name, value } = params[0];
                    return `${name}<br /><span style="font-size: 14px; font-weight: bold;">${type}: ${value}</span>`;
                },
            },
            xAxis: {

                type: 'category',

                data: data.map(item => item.chainName),

                axisLabel: {

                    interval: 0,
                    rotate: 45,
                    formatter: function (value, index) {

                        const item = data[index];

                        return `{img${index}|}\n{label|${item.chainName}}`;

                    },

                    rich: data.reduce((rich, item, index) => ({

                        ...rich,

                        // [`img${index}`]: {
                        //     height: 20,
                        //     align: "center",
                        //     backgroundColor: {
                        //         image: item.icon
                        //     }
                        // },
                        [`label${index}`]: {
                            align: 'center',
                            lineHeight: 40,
                            fontSize: 10,
                            rotate: 45,
                            verticalAlign: 'middle'
                        },

                    }), {})

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
                    name: 'Transaction Count',
                    type: 'bar',
                    barWidth: '30%',
                    data: data.map(item => item.transCount),
                    itemStyle: {

                        normal: {

                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [

                                { offset: 0.2, color: '#fef7d3' },

                                { offset: 1, color: '#ffeb79' }

                            ])

                        },

                        emphasis: {

                            color: '#FFD700'

                        }
                    }
                }
            ]
        };
    };


    return <div style={{ position: 'relative' }}>

        <ReactEcharts option={getOption()} style={{ height: '400px', width: '100%' }} />


    </div>;

};



export default BarChart;