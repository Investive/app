# Investive :bank:
A finance app template built with Electron, Next.js and Material UI. 

![Investive GIF](https://investive.co/investive.gif)

## Application
To run the electron app
```bash
npm install
npm run dev
```
you can also use yarn!

To create an executable:
```bash
npm run build
```
The app just uses hardcoded information for now, to login you can just enter any valid looking email and password, same
with the OTP.
The stock information is retrieved from Yahoo Stocks on click.

## Directories
### Pages
This is where the main application code is located and it's pretty close to pure Next.js with one big change.
Instead of using HTTP calls to the backend, we use Electrons built in IPCRenderer. You can easily change all them
back to something like Axios and have a regular Next.js web application.

### IPCRenderer
To change the API endpoints you need to edit the `main/background.js` file.

## What's Included
We have a login, choose account and view stocks/investment page. 

## Learn More about Next JS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out the [the Next.js GitHub repository](https://github.com/zeit/next.js/)

For the desktop app, we use [Nextron](https://www.npmjs.com/package/nextron)

## Style
You can find out colour palette here https://coolors.co/775b68-8f5d67-fbb276-f48268-d76562-faf8fb-2d2c2f

# License
GNU Affero General Public License v3.0
A better explanation can be found [here](https://choosealicense.com/licenses/agpl-3.0/)

The images located in `renderer/public/images` are the property of [Murphs Draw](https://www.instagram.com/murphs_draw/).
You cannot use them for profit, and you cannot post them as your own.
