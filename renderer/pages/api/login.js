import keytar from 'keytar';
import {keytarAccount, keytarService} from '../../../utils/services'

export default async (req, res) => {
    const {email, password, otp} = req.body;
    if (validateEmail(email)) {
        if (process.env.NODE_ENV === "production") {
            //    Add code from brokerage API
        } else {
            if (!otp) {
                res.status = 400;
                res.data = "Failed";
            } else {
                await keytar.setPassword(keytarService, keytarAccount, JSON.stringify("test token placeholder"));
            let result = {
                tokens: {
                    access: 'aaaaaaaaaaaaaaa111111aaaaaaaaaaaaaaaaaaaaaa',
                    refresh: 'aaaaaaaaaaaaaaa111111aaaaaaaaaaaaaaaaaaaaaa'
                },
                accountInfo: {
                    object: 'user',
                    created_at: '2020-01-01T00:00:00.000Z',
                    updated_at: '2020-01-01T00:00:00.000Z',
                    canonical_id: 'user-12341111-aaaa-1111-aaaa-a1a1a1a1a1a',
                    email_subscription_token: '1a',
                    email: 'test@test.com',
                    first_name: 'First',
                    last_name: 'Last',
                    id: 'user-12341111-aaaa-1111-aaaa-a1a1a1a1a1a',
                }
            };
            res.status = 200;
            const name = result.accountInfo.first_name + " " + result.accountInfo.last_name;
            const email = result.accountInfo.email;
            res.data = {name: name, email: email, tokens: result.token};
            }
        }
    }
    return res;
}


function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}