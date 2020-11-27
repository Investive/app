import React, {useEffect, useState} from 'react';
import axios from "axios";
import ChartComponent from "../Charts";
import Router from "next/router";
import electron from "electron";

// prevent SSR webpacking
const ipcRenderer = electron.ipcRenderer || false;

const StockComponent = ({position}) => {
    const [stockData, setStockData] = useState({});
    let areaSeries = undefined;
    useEffect(() => {
        ipcRenderer.once('stocks-reply', (event, arg) => {
            const stockResp = JSON.parse(arg)
            if (stockResp.statusCode === 200) {
                areaSeries = ChartComponent("stock-chart-" + position.stock.symbol, stockResp.data);
                setStockData(stockResp.data);
            } else {
                console.error(stockResp.statusCode)
                console.error(stockResp.data)
                ipcRenderer.send('stocks', ticker)
            }

        })
        const ticker = {
            ticker: `${position.stock.symbol}${position.stock.primary_exchange === "TSX" ? ".to" : ""}`
        }
        ipcRenderer.send('stocks', ticker)
        const interval = setInterval(() => {
            ipcRenderer.send('stocks', ticker)
        }, 90000);
        return function cleanup() {
            ipcRenderer.removeAllListeners(['stocks', 'stocks-reply'])
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <div id={'stock-chart-' + position.stock.symbol} />
        </div>
    )
}

export default StockComponent;