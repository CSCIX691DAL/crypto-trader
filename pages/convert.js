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

      <div className="flex m-8 flex-col font-semibold text-lg text-gray-800 justify-center items-center">
                              
        <div className=" bg-white shadow overflow-hidden sm:rounded justify-center items-center w-11/12 md:w-1/2" >
          <div className="px-4 py-5 sm:px-6 bg-blue-300">
            <h3 className="text-xl leading-6 font-medium text-gray-900  text-center "> Currency Convert</h3>

          </div>
        <div className="border-t border-gray-200 bg-gray-50">
          <dl>
{/*-----------------Enter First Coin and dropdown and amount-----------------*/}

          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 justify-center items-center">
                            
           <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3 "> Select Currency one: </dd>

            <select name="currencyFrom" id="currencyFrom" onChange={e => setConvertFrom(e.currentTarget.value)}>
              <option disabled defaultValue selected> - Coin 1 - </option>
                {dropdown && (
                  dropdown.map((item, index) => {
                  return (
                   <option key={index} value={index}>{item.name}</option>
                     )
                     })
                     )}
              </select>
              <div className=" justify-center items-center">
                <div className="flex flex-row">
                   <input onChange={e => setAmountOfFirstCurr(e.currentTarget.value)} type="number" name="price" className="bg-grey-lighter text-grey-darker py-2 rounded text-grey-darkest border border-grey-lighter rounded-l-none font-bold" />
                    </div>
              </div>                  
          </div>
 {/*----------------Enter second dropdown and buy button--------------------*/}

          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3 py-2"> Select Currency two: </dd>
                 
            <select name="currencyTo" id="currencyTo" onChange={e => setConvertTo(e.currentTarget.value)}>
            <option disabled defaultValue selected> - Coin 2 - </option>
            {dropdown && (
              dropdown.map((item, index) => {
                return (
                  <option key={index} value={index}>{item.name}</option>
                )
              })
            )}
          </select>
              <div className=" justify-center items-center">
                <div className="flex flex-row">
                {dropdown[convertTo] && (
                  <button className="px-3 py-2 rounded-full bg-blue-300">
                  <Link href={`/coins/${dropdown[convertTo].id}`}><a>Click here to buy {dropdown[convertTo].id}</a></Link>
                  </button>
                  )}
                </div>
              </div>                  
          </div>

 {/*---------------------Convert button & output values---------------------*/}
              <div className="flex m-10 justify-center bg-gray-50">
                               
                <button onClick={() => {
                  setConvertedValue(convertCrypto(dropdown[convertFrom], dropdown[convertTo], amountOfFirstCurr));
                  }} className="px-10 py-2 rounded-full bg-blue-300 shadow">Convert</button>

              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                <dt className=" text-lg text-gray-800 font-semibold text-center"><p>{convertedValue}</p></dt>
                                
              </div>
            </dl>
          </div>
        </div>
      </div>
      

  
    </div>
  )
}