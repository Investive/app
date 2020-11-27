import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import * as Store from 'electron-store';
import login from "../renderer/pages/api/login";
import chooseAccount from "../renderer/pages/api/choose-account";
import positions from "../renderer/pages/api/positions";
import accountData from "../renderer/pages/api/account-data";
import history from "../renderer/pages/api/history";
import version from "../renderer/pages/api/version";
import stocks from "../renderer/pages/api/stocks";
import keytar from "keytar";
import {keytarAccount, keytarService, logout} from "../utils/services";
import activities from "../renderer/pages/api/activities";

require('dotenv').config()

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1500,
    height: 1080,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

const store = new Store({ name: 'messages' });

ipcMain.on('get-messages', (event, arg) => {
  event.returnValue = store.get(arg) || [];
});

ipcMain.on('add-message', (event, arg, value) => {
  store.set(arg, value);
});

ipcMain.on('login', async (event, arg) => {
  await login({'body': arg}, {})
      .then(r => {
          event.reply('login-reply', JSON.stringify(r))
      }).catch((reason) => {
          console.log(`Trouble with login data: ${reason}`);
      })
})

ipcMain.on('logout', (event) => {
    logout()
    store.set("accountId", null);
    event.returnValue = "success";
});


ipcMain.on('version', async (event) => {
  await version({}, {})
      .then(r => {
          event.reply('version-reply', r)
      }).catch((reason) => {
          console.log(`Trouble with version data: ${reason}`);
      })
})

ipcMain.on('ping', async (event) => {
    const tokens = await keytar.getPassword(keytarService, keytarAccount);
    if (tokens) {
        event.reply('ping-reply', tokens)
    } else {
        event.reply('ping-reply', "false")
    }

})

ipcMain.on('choose-account', async (event) => {
  await chooseAccount({}, {})
      .then(r => event.reply('choose-account-reply', JSON.stringify(r)))
      .catch((reason) => {
        console.log(`Trouble with choose account data: ${reason}`);
       })

})

ipcMain.on('positions', async (event, arg) => {
  await positions({'query': arg}, {})
      .then(r => {
          event.reply('positions-reply', JSON.stringify(r))
      })
      .catch((reason) => {
        console.log(`Trouble with positions data: ${reason}`);
       })
})

ipcMain.on('account-data', async (event, arg) => {
  await accountData( {'query': arg}, {})
      .then(r => event.reply('account-data-reply', JSON.stringify(r)))
      .catch((reason) => {
        console.log(`Trouble with account data: ${reason}`);
       })
})

ipcMain.on('history', async (event, arg) => {
  await history( {'query': arg}, {})
      .then(r => event.reply('history-reply', JSON.stringify(r)))
      .catch((reason) => {
        console.log(`Trouble with history data: ${reason}`);
       })
})

ipcMain.on('stocks', async (event, arg) => {
  await stocks( {'query': arg}, {})
      .then(r => event.reply('stocks-reply', JSON.stringify(r)))
      .catch((reason) => {
        console.log(`Trouble with stocks data: ${reason}`);
       })
})

ipcMain.on('activities', async (event) => {
  await activities( {}, {})
      .then(r => event.reply('activities-reply', JSON.stringify(r)))
      .catch((reason) => {
        console.log(`Trouble with activities data: ${reason}`);
       })
})