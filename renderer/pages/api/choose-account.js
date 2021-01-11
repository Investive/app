import keytar from 'keytar';
import {keytarAccount, keytarService} from '../../../utils/services'

export default async (req, res) => {
    const tokens = await keytar.getPassword(keytarService, keytarAccount);
    if (process.env.NODE_ENV === "production") {
        //    Add code from brokerage API
    } else {
        // Testing Code
        let portfolioData = [
            {
                object: 'account',
                id: 'non-registered-11aaaaaa',
                created_at: '2020-01-01T00:00:00.000Z',
                updated_at: '2020-01-01T00:00:00.000Z',
                opened_at: '2020-01-01T00:00:00.000Z',
                deleted_at: null,
                buying_power: {
                    amount: 0,
                    currency: "CAD"
                },
                current_balance: {
                    amount: 0,
                    currency: "CAD"
                },
                base_currency: 'CAD',
                custodian_account_number: 'H11111111CAD',
                status: 'open',
                last_synced_at: '2020-01-01T00:00:00.000Z',
                last_partial_synced_at: '2020-01-01T00:00:00.000Z',
                account_type: 'ca_non_registered',
                position_quantities: {}
            },
            {
                object: 'account',
                id: 'tfsa-aaaaaaaa',
                created_at: '2020-01-01T00:00:00.000Z',
                updated_at: '2020-01-01T00:00:00.000Z',
                opened_at: '2020-01-01T00:00:00.000Z',
                deleted_at: null,
                buying_power: {
                    amount: 100,
                    currency: "CAD"
                },
                current_balance: {
                    amount: 100,
                    currency: "CAD"
                },
                base_currency: 'CAD',
                custodian_account_number: 'H011111a1CAD',
                status: 'open',
                last_synced_at: '2020-01-01T00:00:00.000Z',
                last_partial_synced_at: '2020-01-01T00:00:00.000Z',
                account_type: 'ca_tfsa',
                position_quantities: [Object]
            },
            {
                object: 'account',
                id: 'rrsp-aaaaaaaa',
                created_at: '2020-01-01T00:00:00.000Z',
                updated_at: '2020-01-01T00:00:00.000Z',
                opened_at: '2020-01-01T00:00:00.000Z',
                deleted_at: null,
                buying_power: {
                    amount: 100,
                    currency: "CAD"
                },
                current_balance: {
                    amount: 100,
                    currency: "CAD"
                },
                base_currency: 'CAD',
                custodian_account_number: 'H111112K7CAD',
                status: 'open',
                last_synced_at: '2020-01-01T00:00:00.000Z',
                last_partial_synced_at: '2020-01-01T00:00:00.000Z',
                account_type: 'ca_rrsp',
            }
        ]
        res.status = 200;
        res.data = portfolioData;
    }
    return res;
}
