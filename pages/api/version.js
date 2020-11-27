import axios from "axios";

export default async (req, res) => {
    await axios.get('https://investive.co/api/version')
        .then(function (response) {
            if (process.env.version < response.data) {
                res = "outdated";
            } else {
                res = "latest";
            }
        })
        .catch(function (error) {
            console.error(error);
            res = "unknown";
        })
    return res;
}
