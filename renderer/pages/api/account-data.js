import keytar from 'keytar';
import {keytarAccount, keytarService} from '../../../utils/services'

export default async (req, res) => {
    const tokens = await keytar.getPassword(keytarService, keytarAccount);
    let accountId = req.query.accountId;
    // PROD Code
    if (process.env.NODE_ENV === "production") {
        let portfolioData = {};
        //    Add code from brokerage API
    } else {
        // Testing Code
        let portfolioData = {
            object: 'account',
            id: 'tfsa-aaaaaaaa',
            created_at: '2020-01-01T00:00:00.000Z',
            updated_at: '2020-01-01T00:00:00.000ZZ',
            opened_at: '2020-01-01T00:00:00.000Z',
            deleted_at: null,
            buying_power: {amount: 10000.00, currency: 'CAD'},
            current_balance: {amount: 10000.00, currency: 'CAD'},
            withdrawn_earnings: {amount: 0, currency: 'CAD'},
            net_deposits: {amount: 7000, currency: 'CAD'},
            available_to_withdraw: {amount: 7000.00, currency: 'CAD'},
            base_currency: 'CAD',
            custodian_account_number: 'A111111A1CAD',
            status: 'open',
            last_synced_at: '2020-01-01T00:00:00.000Z',
            last_partial_synced_at: '2020-01-01T00:00:00.000Z',
            read_only: null,
            account_type: 'ca_tfsa',
            position_quantities: {
                'sec-s-1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a': 10,
                'sec-s-1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1b': 1000,
                'sec-s-1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1c': 10,
                'sec-s-1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1d': 1,
                'sec-s-1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1e': 50
            }
        }
        portfolioData.history = {
            "results": [
                {
                    "value": {
                        "amount": 1000,
                        "currency": "CAD"
                    },
                    "net_deposits": {
                        "amount": 1000,
                        "currency": "CAD"
                    },
                    "equity_value": {
                        "amount": 0,
                        "currency": "CAD"
                    },
                    "withdrawn_earnings": {
                        "amount": 0,
                        "currency": "CAD"
                    },
                    "date": "2020-01-28",
                    "relative_equity_earnings": {
                        "currency": "CAD",
                        "amount": 0,
                        "percentage": 0
                    },
                    "lastCloseDataPointEquityValue": {
                        "amount": 0,
                        "currency": "CAD"
                    },
                    "dataPointEquityValue": {
                        "amount": 0,
                        "currency": "CAD"
                    }
                }
            ],
            "live_relative_equity_earnings_baseline": {
                "amount": 1234.56,
                "currency": "CAD"
            },
            "live_earnings_baseline": {
                "amount": 0,
                "currency": "CAD"
            },
            "start_earnings": {
                "amount": 0,
                "currency": "CAD"
            }
        }
        res.statusCode = 200
        res.data = portfolioData
    }
    return res;
}
