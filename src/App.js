import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import Coin from './components/Coin';
import Navbar from './components/Navbar';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [coins,setCoins] = useState([])
  const [search,setSearch] = useState('')

  useEffect(()=>{
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false")
    .then(res =>{
      setCoins(res.data)
    }).catch(err =>{
      console.log(err.message)
    })
  },[])

  const handleChange = e =>{
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())
    )

  return (
   
    <div className="coin-app">
       <Navbar/>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input type='text' placeholder='Search' className='coin-input' onChange={handleChange}></input>
        </form>
      </div>
      {filteredCoins.map(coin =>{
        return (<Coin key={coin.id} image={coin.image} name={coin.name} symbol={coin.symbol} price={coin.current_price}/>)
      })}
    </div>
  );
}

export default App;
