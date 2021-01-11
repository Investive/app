import keytar from 'keytar';
import {keytarAccount, keytarService} from '../../../utils/services'

export default async (req, res) => {
    const tokens = await keytar.getPassword(keytarService, keytarAccount);
    if (tokens) {
        res.statusCode = 200
        res.data = tokens
    } else {
        res.statusCode = 400
    }
}
