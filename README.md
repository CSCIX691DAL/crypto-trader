# CryptoTrader

CryptoTrader is a NextJS website that allows users to explore, buy, and sell cryptocurrencies. All currency data is pulled from the [CoinGecko Crypto API](https://www.coingecko.com/en/api).

## Installing Dependencies

CryptoTrader requires a number of React components to run. You can install them by running `npm install` in the root directory of the project. In case you want to install the dependencies manually, you will need the following (from `package.json`):

```json
"axios": "^0.21.1",
"chart.js": "^2.9.4",
"crypto-js": "^4.0.0",
"firebase": "^8.6.3",
"firebase-admin": "^9.9.0",
"next": "10.2.3",
"next-auth": "^3.23.3",
"react": "17.0.2",
"react-chartjs-2": "^3.0.3",
"react-dom": "17.0.2",
"autoprefixer": "^10.2.5",
"tailwindcss": "^2.1.2"
```

### Firestore

In order to access the database, you must have the credentials to authenticate yourself. You can do so by creating a `.env` file in the root directory, and a `serviceAccountKey.json` file in `/utils/db/`. These files can be populated from information from Firestore after logging into the Google account associated with this project.

## Running a Development Server

Once you have the dependencies installed, you can start a development server by running `npm run dev` in a termainal. The development server will be accessible at `http://localhost:3000`. If you make changes to the code while the server is running, the site will automatically reload itself. This does not apply to API items in the `/pages/api/` folder.

## Building and Production

To run the buiild, run `npm run build` in your terminal.

## Extra Help with React and NextJS

If you need extra info about developing React or NextJS apps, check out [React](https://reactjs.org/docs/getting-started.html) and [NextJS's](https://nextjs.org/docs/getting-started) documentation.
