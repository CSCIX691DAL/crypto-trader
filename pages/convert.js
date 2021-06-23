import Head from 'next/head'
import Header from '../components/Header'
import { getDashboardInfo } from '../services/coins';
import * as React from 'react'

export default function Convert() {
  const [dropdown, setDropdown] = React.useState([]);
  const [convertFrom, setConvertFrom] = React.useState();
  const [amountOfFirstCurr, setAmountOfFirstCurr] = React.useState(0);
  const [amountOfSecondCurr, setAmountOfSecondCurr] = React.useState(0);
  const [convertTo, setConvertTo] = React.useState();

  React.useEffect(() => {
    const getInfo = async () => {
      const data = await getDashboardInfo();
      setDropdown(data);
    }

    getInfo();
  }, []);


  return (
    <div>
      <Head>
        <title>CryptoTrader</title>
        <meta name="description" content="View prices and trade cryptocurrencies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="m-8 flex font-semibold text-lg text-gray-800 justify-center">

        <div className="w-1/2 h-64 bg-blue-200">
          <select name="currencyFrom" id="currencyFrom" onChange={e => setConvertFrom(e.currentTarget.value)}>
            {dropdown && (
              dropdown.map((item, index) => {
                return (
                  <option key={index} value={item.id}>{item.name}</option>
                )
              })
            )}
          </select>
          <div className="flex">
            <div className="cursor-pointer" onClick={() => setAmountOfFirstCurr(amountOfFirstCurr - 1)}>➖</div>
            {amountOfFirstCurr} 
            <div className="cursor-pointer" onClick={() => setAmountOfFirstCurr(amountOfFirstCurr + 1)}>➕</div>
            {convertFrom}
          </div>
        </div>

        <div className="w-1/2 h-64 bg-green-200">
          <select name="currencyTo" id="currencyTo" onChange={e => setConvertTo(e.currentTarget.value)}>
            {dropdown && (
              dropdown.map((item, index) => {
                return (
                  <option key={index} value={item.id}>{item.name}</option>
                )
              })
            )}
          </select>
          <div className="flex">
            <div className="cursor-pointer" onClick={() => setAmountOfSecondCurr(amountOfSecondCurr - 1)}>➖</div>
            {amountOfSecondCurr} 
            <div className="cursor-pointer" onClick={() => setAmountOfSecondCurr(amountOfSecondCurr + 1)}>➕</div>
            {convertTo}
          </div>
        </div>

      </main>
    </div>
  )
}