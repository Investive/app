import React from 'react';

const ChartComponent = (containerId, data) => {
    const lightweightCharts = require('lightweight-charts');
    const chart = lightweightCharts.createChart(containerId, {
        height: 300,
        priceScale: {
            borderVisible: false,
        },
        timeScale: {
            borderVisible: false,
        },
    });
    chart.timeScale().fitContent();
    let areaSeries = chart.addAreaSeries({
        lineWidth: 2,
    });
    const lightTheme = {
        chart: {
            layout: {
                backgroundColor: '#ffffff',
                lineColor: '#8f5d67',
                textColor: '#191919',
            },
            watermark: {
                color: 'rgba(0, 0, 0, 0)',
            },
            grid: {
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    color: '#f0f3fa',
                },
            },
        },
        series: {
            topColor: 'rgba(119, 91, 104, 0.56)',
            bottomColor: 'rgba(119, 91, 104,0.14)',
            lineColor: 'rgb(143, 93, 103)',
        }
    };
    chart.applyOptions(lightTheme.chart);
    chart.applyOptions({
        handleScroll: false,
        handleScale: false
    })
    areaSeries.applyOptions(lightTheme.series)
    areaSeries.setData(data);

    return areaSeries;
}

export default ChartComponent;
