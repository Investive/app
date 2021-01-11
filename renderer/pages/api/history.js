import keytar from 'keytar';
import {keytarAccount, keytarService} from '../../../utils/services'

function calculations(data) {
    let portfolioData = {}
    portfolioData.percentChange = 0;
    portfolioData.monetaryChange = 0;
    portfolioData.history = data;
    // Calculations the change in the total value of the account. (1monthLaterValue - originalValue)/ original value
    if (portfolioData.history.length > 0) {
        portfolioData.monetaryChange = portfolioData.history[portfolioData.history.length - 1].relative_equity_earnings.amount;
        portfolioData.percentChange = (portfolioData.history[portfolioData.history.length - 1].relative_equity_earnings.percentage * 100).toFixed(2);
    }
    let newTimeSeries = [];
    for (let i = 0; i < portfolioData.history.length; i++) {
        newTimeSeries.push({time: portfolioData.history[i].date, value: portfolioData.history[i].equity_value.amount})
    }
    portfolioData.chart = newTimeSeries;
    return portfolioData;
}

export default async (req, res) => {
    const tokens = await keytar.getPassword(keytarService, keytarAccount);
    let accountId = req.query.accountId.accountId;
    if (process.env.NODE_ENV === "production") {
        //    Add code from brokerage API
    } else {
        const result = {
            results: [
                {
                    date: '2019-01-15',
                    value: {amount: 5064.08, currency: 'CAD'},
                    equity_value: {amount: 2489.96, currency: 'CAD'},
                    net_deposits: {amount: 6005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {currency: 'CAD', amount: 0, percentage: 0}
                },
                {
                    date: '2019-01-16',
                    value: {amount: 6062.89, currency: 'CAD'},
                    equity_value: {amount: 2488.77, currency: 'CAD'},
                    net_deposits: {amount: 6005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {currency: 'CAD', amount: 998.81, percentage: 0.4013267598050443}
                },
                {
                    date: '2019-01-17',
                    value: {amount: 6070.98, currency: 'CAD'},
                    equity_value: {amount: 2496.86, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {currency: 'CAD', amount: 6.9, percentage: 0.0027634709194748605}
                },
                {
                    date: '2019-01-18',
                    value: {amount: 6167.99, currency: 'CAD'},
                    equity_value: {amount: 2593.87, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 103.91,
                        percentage: 0.04005983337638355
                    }
                },
                {
                    date: '2019-01-19',
                    value: {amount: 6195.93, currency: 'CAD'},
                    equity_value: {amount: 2621.81, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 131.85,
                        percentage: 0.050289685370030625
                    }
                },
                {
                    date: '2019-01-20',
                    value: {amount: 6223.97, currency: 'CAD'},
                    equity_value: {amount: 2649.85, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 159.89,
                        percentage: 0.060339264486669056
                    }
                },
                {
                    date: '2019-01-21',
                    value: {amount: 6201.29, currency: 'CAD'},
                    equity_value: {amount: 2627.17, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 137.21,
                        percentage: 0.05222730162113605
                    }
                },
                {
                    date: '2019-01-22',
                    value: {amount: 6201.29, currency: 'CAD'},
                    equity_value: {amount: 2627.17, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 137.21,
                        percentage: 0.05222730162113605
                    }
                },
                {
                    date: '2019-01-23',
                    value: {amount: 6199.9, currency: 'CAD'},
                    equity_value: {amount: 2625.78, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 135.82,
                        percentage: 0.05172558249358286
                    }
                },
                {
                    date: '2019-01-24',
                    value: {amount: 6195.4, currency: 'CAD'},
                    equity_value: {amount: 2621.28, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {currency: 'CAD', amount: 131.32, percentage: 0.0500976622108283}
                },
                {
                    date: '2019-01-25',
                    value: {amount: 6227.13, currency: 'CAD'},
                    equity_value: {amount: 2653.01, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {currency: 'CAD', amount: 163.05, percentage: 0.0614584943140056}
                },
                {
                    date: '2019-01-26',
                    value: {amount: 6173.22, currency: 'CAD'},
                    equity_value: {amount: 2599.1, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 109.14,
                        percentage: 0.041991458581816785
                    }
                },
                {
                    date: '2019-01-27',
                    value: {amount: 6141.2, currency: 'CAD'},
                    equity_value: {amount: 2567.08, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 77.12,
                        percentage: 0.030041915327921217
                    }
                },
                {
                    date: '2019-01-28',
                    value: {amount: 6183.66, currency: 'CAD'},
                    equity_value: {amount: 2609.54, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 119.58,
                        percentage: 0.04582416824421162
                    }
                },
                {
                    date: '2019-01-29',
                    value: {amount: 6183.66, currency: 'CAD'},
                    equity_value: {amount: 2609.54, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 119.58,
                        percentage: 0.04582416824421162
                    }
                },
                {
                    date: '2019-01-30',
                    value: {amount: 6184.16, currency: 'CAD'},
                    equity_value: {amount: 2610.04, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 120.08,
                        percentage: 0.04600695774777398
                    }
                },
                {
                    date: '2019-01-31',
                    value: {amount: 6278.9, currency: 'CAD'},
                    equity_value: {amount: 2704.78, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 214.82,
                        percentage: 0.07942235597719592
                    }
                },
                {
                    date: '2019-02-01',
                    value: {amount: 6259.79, currency: 'CAD'},
                    equity_value: {amount: 2685.67, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 195.71,
                        percentage: 0.07287194629273143
                    }
                },
                {
                    date: '2019-02-02',
                    value: {amount: 6349.48, currency: 'CAD'},
                    equity_value: {amount: 2775.36, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {currency: 'CAD', amount: 285.4, percentage: 0.10283350628386947}
                },
                {
                    date: '2019-02-03',
                    value: {amount: 6367.49, currency: 'CAD'},
                    equity_value: {amount: 2793.37, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 303.41,
                        percentage: 0.10861790597020803
                    }
                },
                {
                    date: '2019-02-04',
                    value: {amount: 6435.05, currency: 'CAD'},
                    equity_value: {amount: 2860.93, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 370.97,
                        percentage: 0.12966762556231715
                    }
                },
                {
                    date: '2019-02-05',
                    value: {amount: 6435.05, currency: 'CAD'},
                    equity_value: {amount: 2860.93, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 370.97,
                        percentage: 0.12966762556231715
                    }
                },
                {
                    date: '2019-02-06',
                    value: {amount: 6432.92, currency: 'CAD'},
                    equity_value: {amount: 2858.8, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 368.84,
                        percentage: 0.12901916888204842
                    }
                },
                {
                    date: '2019-02-07',
                    value: {amount: 8687.25, currency: 'CAD'},
                    equity_value: {amount: 3113.13, currency: 'CAD'},
                    net_deposits: {amount: 7005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 2623.17,
                        percentage: 0.8426149887733567
                    }
                },
                {
                    date: '2019-02-08',
                    value: {amount: 8543.38, currency: 'CAD'},
                    equity_value: {amount: 2969.26, currency: 'CAD'},
                    net_deposits: {amount: 9005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {currency: 'CAD', amount: 479.3, percentage: 0.1614206906771384}
                },
                {
                    date: '2019-02-09',
                    value: {amount: 8587.75, currency: 'CAD'},
                    equity_value: {amount: 3013.63, currency: 'CAD'},
                    net_deposits: {amount: 9005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 523.67,
                        percentage: 0.17376718442542713
                    }
                },
                {
                    date: '2019-02-10',
                    value: {amount: 8437.47, currency: 'CAD'},
                    equity_value: {amount: 2863.35, currency: 'CAD'},
                    net_deposits: {amount: 9005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 373.39,
                        percentage: 0.13040319905006373
                    }
                },
                {
                    date: '2019-02-11',
                    value: {amount: 8449.57, currency: 'CAD'},
                    equity_value: {amount: 2875.45, currency: 'CAD'},
                    net_deposits: {amount: 9005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 385.49,
                        percentage: 0.13406249456606792
                    }
                },
                {
                    date: '2019-02-12',
                    value: {amount: 8449.57, currency: 'CAD'},
                    equity_value: {amount: 2875.45, currency: 'CAD'},
                    net_deposits: {amount: 9005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 385.49,
                        percentage: 0.13406249456606792
                    }
                },
                {
                    date: '2019-02-13',
                    value: {amount: 8449.57, currency: 'CAD'},
                    equity_value: {amount: 2875.45, currency: 'CAD'},
                    net_deposits: {amount: 9005, currency: 'CAD'},
                    withdrawn_earnings: {amount: 0, currency: 'CAD'},
                    relative_equity_earnings: {
                        currency: 'CAD',
                        amount: 385.49,
                        percentage: 0.13406249456606792
                    }
                }
            ],
            start_earnings: {amount: 900.00, currency: 'CAD'}
        }
        res.statusCode = 200;
        res.data = calculations(result.results);
    }
    return res;
}
