import {history} from 'yahoo-stocks';

const StockComponent = async (req, res) => {
    let ticker = req.query.ticker;
    await history(ticker, {range: '2y', interval: '1d'}).then(data => {
        let newTimeSeries = [];
        for (let i = 0; i < data.records.length; i++) {
            newTimeSeries.push({time: data.records[i].time, value: data.records[i].close})
        }
        res.data = newTimeSeries
        res.statusCode = 200
    }, function (error) {
        console.error(error)
        res.statusCode = 400;
        res.data = "Could not get stock data from Yahoo";
    });
    return res;
}

export default StockComponent;