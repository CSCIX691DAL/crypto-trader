import Head from 'next/head'
import Header from '../components/Header'
import { getDashboardInfo } from '../services/coins'
import * as React from 'react'
import { convertCrypto } from '../services/conversion'
import Link from 'next/link'

export default function Convert() {
  const [dropdown, setDropdown] = React.useState([]);
  const [convertFrom, setConvertFrom] = React.useState();
  const [amountOfFirstCurr, setAmountOfFirstCurr] = React.useState(1);
  const [convertTo, setConvertTo] = React.useState();
  const [convertedValue, setConvertedValue] = React.useState();

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
            <option disabled defaultValue selected> -- select an option -- </option>
            {dropdown && (
              dropdown.map((item, index) => {
                return (
                  <option key={index} value={index}>{item.name}</option>
                )
              })
            )}
          </select>
            <div class="flex flex-col">
              <div class="flex flex-row">
                <input onChange={e => setAmountOfFirstCurr(e.currentTarget.value)} type="number" name="price" class="bg-grey-lighter text-grey-darker py-2 rounded text-grey-darkest border border-grey-lighter rounded-l-none font-bold"/>
              </div>
            </div>
        </div>

        <div className="w-1/2 h-64 bg-green-200">
          <select name="currencyTo" id="currencyTo" onChange={e => setConvertTo(e.currentTarget.value)}>
            <option disabled defaultValue selected> -- select an option -- </option>
            {dropdown && (
              dropdown.map((item, index) => {
                return (
                  <option key={index} value={index}>{item.name}</option>
                )
              })
            )}
          </select>

        </div>


      </main>
      <button onClick={() => {
        setConvertedValue(convertCrypto(dropdown[convertFrom], dropdown[convertTo], amountOfFirstCurr));
      }} className="px-4 py-2 rounded-full bg-green-200">Convert</button>

      <p>{convertedValue}</p>

      {dropdown[convertTo] && (
        <button className="px-4 py-2 rounded-full bg-indigo-100">
          Buy {dropdown[convertTo].id}
        <Link href={`/coins/${dropdown[convertTo].name}`}> here!</Link>
        </button>
      )}
      
    </div>
  )
}