import React, {useEffect} from 'react';
import Router from "next/router";
import electron from "electron";

let tokens = "";

// prevent SSR webpacking
const ipcRenderer = electron.ipcRenderer || false;

const Home = () => {

    useEffect(() => {
        if (ipcRenderer) {
            ipcRenderer.on('ping-reply', (event, response) => {
                if (response !== "false") {
                    tokens = response
                    const accountId = ipcRenderer.sendSync('get-messages', 'accountId');
                    if (accountId.length > 0) {
                        Router.push('/positions');
                    } else {
                        Router.push('/choose-account');
                    }
                } else {
                    Router.push('/login');
                }
            })
        }
        ipcRenderer.send('ping')


    }, []);

    return (
        <React.Fragment>
        </React.Fragment>
    );
};

export default Home;
