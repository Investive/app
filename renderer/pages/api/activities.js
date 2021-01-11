import keytar from 'keytar';
import {keytarAccount, keytarService} from '../../../utils/services'

export default async (req, res) => {
    const tokens = await keytar.getPassword(keytarService, keytarAccount);

    if (process.env.NODE_ENV === "production") {
        //    Add code from brokerage API
    } else {
        let results = [
            {
                id: 'funds_transfer-aaaaaa111aaaaaaaaaaaaaaa',
                created_at: '2020-01-01T00:00:00.000Z',
                updated_at: '2020-01-01T00:00:00.000Z',
                accepted_at: '2020-01-01T00:00:00.000Z',
                status: 'accepted',
                value: {amount: 2000, currency: 'CAD'},
                object: 'deposit',
                account_id: 'tfsa-vfchxlaq'
            },
            {
                object: 'order',
                created_at: '2020-01-01T00:00:00.000Z',
                updated_at: '2020-01-01T00:00:00.000Z',
                filled_at: '2020-01-01T00:00:00.000Z',
                perceived_filled_at: '2020-01-01T00:00:00.000Z',
                user_id: 1691,
                account_id: 'tfsa-aaaaaaaa',
                order_type: 'sell_quantity',
                order_sub_type: 'market',
                status: 'posted',
                quantity: 20,
                fill_quantity: 20,
                symbol: 'SHOP',
                security_name: 'Shopify Inc (Class A)',
                time_in_force: 'day',
                limit_price: null,
                stop_price: null,
                account_value: {amount: 1000.00, currency: 'CAD'},
                account_currency: 'CAD',
                market_value: {amount: 1000.00, currency: 'CAD'},
                market_currency: 'CAD',
                account_hold_value: {amount: 1000.00, currency: 'CAD'},
                fill_fx_rate: null,
                settled: true,
                order_id: 'order-a1a1a1a1a-1111-1111-aaaa-a1a1a1a1a1a1',
                security_id: 'sec-s-1a1a1a1a1aaa1aaaaaaaaaaa1a1a1a1'
            },
            {
                object: 'dividend',
                id: 'custodian_account_activity-aaaaaaaaaaaaaaaaaaa_aaaa',
                type: 'dividend',
                account_id: 'tfsa-aaaaaa',
                symbol: 'VGRO',
                country_code: 'CA',
                effective_date: '2020-04-01',
                process_date: '2020-04-01',
                quantity: '0.0',
                market_price: {amount: '1.0', currency: 'CAD'},
                market_value: {amount: 0.94, currency: 'CAD'},
                book_value: {amount: '0.0', currency: 'CAD'},
                net_cash: {amount: '0.94', currency: 'CAD'},
                fx_rate: '1.0',
                order_id: null
            },
            {
                object: 'order',
                created_at: '2020-01-01T00:00:00.000Z',
                updated_at: '2020-01-01T00:00:00.000Z',
                filled_at: '2020-01-01T00:00:00.000Z',
                perceived_filled_at: '2020-01-01T00:00:00.000Z',
                completed_at: null,
                user_id: 1111,
                account_id: 'tfsa-aaaaaaa',
                order_type: 'buy_quantity',
                order_sub_type: 'market',
                status: 'posted',
                quantity: 1,
                fill_quantity: 1,
                symbol: 'TSLA',
                security_name: 'Tesla Inc',
                time_in_force: 'day',
                limit_price: {amount: 500.00, currency: 'USD'},
                stop_price: null,
                account_value: {amount: 1000.00, currency: 'CAD'},
                account_currency: 'CAD',
                market_value: {amount: 1500.00, currency: 'USD'},
                market_currency: 'USD',
                account_hold_value: {amount: 1000.00, currency: 'CAD'},
                fill_fx_rate: 1.350102,
                settled: true,
                order_id: 'order-a1a1a1a1-111a-11a1-a111-a11111111111a1',
                security_id: 'sec-s-a11111111111111a1a1aaaaaaa1111111'
            },
            {
                object: 'order',
                created_at: '2020-01-01T00:00:00.000Z',
                updated_at: '2020-01-01T00:00:00.000Z',
                filled_at: '2020-01-01T00:00:00.000Z',
                perceived_filled_at: '2020-01-01T00:00:00.000Z',
                completed_at: null,
                user_id: 1111,
                account_id: 'tfsa-aaaaaaaa',
                order_type: 'sell_quantity',
                order_sub_type: 'market',
                status: 'posted',
                quantity: 150,
                fill_quantity: 150,
                symbol: 'BOB',
                security_name: 'Bobs Burgers Corp',
                time_in_force: 'day',
                limit_price: null,
                stop_price: null,
                account_value: {amount: 300.00, currency: 'CAD'},
                account_currency: 'CAD',
                market_value: {amount: 300.00, currency: 'CAD'},
                market_currency: 'CAD',
                account_hold_value: {amount: 300.00, currency: 'CAD'},
                fill_fx_rate: null,
                settled: true,
                order_id: 'order-a1a1a1a1-111a-11a1-a111-a11111aa11111a1',
                security_id: 'sec-s-a111111aaa111111a1a1aa1aaa1111111'
            }
        ]

        res.statusCode = 200;
        res.data = results;
    }
    return res;
}
