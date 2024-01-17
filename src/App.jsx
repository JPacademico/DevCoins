import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

// https://coinlib.io/api/v1/coin?key=0d5d528f0ef1ac78&pref=USD&symbol=ETH

function App() {
  const [moeda1, setMoeda1] = useState("")
  const [moeda2, setMoeda2] = useState("")
  const [dataMoeda, setDataMoeda] = useState([])
  const [moedinha, setMoedinha] = useState()
  const [moedao, setMoedao] = useState()

  useEffect(()=>{
    async function getData(){
      const data = await fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=0d5d528f0ef1ac78&pref=USD&symbol=${moedinha}`).then(response => response.json());
      setMoeda1(data)

    }
    if(moedinha){
      getData()
    }
      
  },[moedinha])

  useEffect(()=>{
    async function pegaData(){
      const data = await fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=0d5d528f0ef1ac78&pref=USD&symbol=${moedao}`).then(response => response.json());
      setMoeda2(data)

    }
    if(moedao){
      pegaData()
      
    }

  },[moedao])


  useEffect(() => {
    trocaCor(); 
  }, [moeda2, moeda1, moedinha]);
    
    

  useEffect(()=>{
    async function fetchData(){
      const data = await fetch(`https://sujeitoprogramador.com/api-cripto/?key=0d5d528f0ef1ac78&pref=USD`).then(response => response.json());
  
      let dataCut = data.coins.slice(0, 40);
      setDataMoeda(dataCut)
    }
    fetchData()
  },[])
  
  const listaSymbol = dataMoeda.map(coin => coin.symbol)

  let price = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function trocaCor(){
    let valo = document.getElementById('valor1')
    let valo2 = document.getElementById('valor2')
 

    if(moeda2) {
      let volume2 = Number(moeda2.delta_24h.replace(",", "."))

      if(volume2<0){
        valo2.style.color="red"
        
      }else{
        
        valo2.style.color="limegreen"

    }
  }

  if(moeda1) {
    let volume = Number(moeda1.delta_24h.replace(",", "."))


    if(volume <0) {
      return valo.style.color = "red"
    } else {
      valo.style.color = "limegreen"
    }


  }

   
}



  return (
    <>
      <header>
        <div id="titulo">
          <h1>
            Dev<strong>Coins</strong>
          </h1>
        </div>
        <div id="creditos">
          <p id="liniker">
            Powered by <a href="https://coinlib.io/apidocs" target='_blank'>Coinlib API</a>
          </p>
        </div>
      </header>
      <section className="flex-center main">
        <div className="search-box">
          <select
            name="select"
            onChange={(e) => setMoedinha(e.target.value)}
            id="sel-moedinha"
          >
            {listaSymbol.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
          <img src="\src\assets\moeda.svg" alt="" />
        </div>
        <img id='compare' src="\src\assets\setas.svg" alt="" />
        <div className="search-box">
          <select
            name="select"
            onChange={(e) => setMoedao(e.target.value)}
            id="sel-moedao"
          >
            {listaSymbol.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
          <img src="\src\assets\moeda.svg" alt="" />
        </div>
      </section>
      <div className='table-container'>
      <table id='tab-section'>
        <thead>
          <tr className='tab' >
            <th className='categoria' scope="col">MOEDA</th>
            <th className='categoria' scope="col">VALOR MERCADO</th>
            <th className='categoria' scope="col">PREÇO</th>
            <th className='categoria' scope="col">VOLUME</th>
          </tr>
        </thead>
        <tbody>
          {moeda1 && (
            <tr className='tab'>
              <td className='categoria'>
                <a href="https://www.binance.com/pt-BR/how-to-buy/all-coins" target='_blank' className='off-link'>
                  <span>{moeda1.name}</span> | {moeda1.symbol}
                </a>
              </td>
              <td className='categoria'>{price.format(Number(moeda1.market_cap))}</td>
              <td className='categoria'>{price.format(Number(moeda1.price))}</td>
              <td className='categoria' id='valor1'>{moeda1.delta_24h}</td>
            </tr>
          )}
          {moeda2 && (
            <tr className='tab'>
              <td className='categoria'>
                <a href="https://www.binance.com/pt-BR/how-to-buy/all-coins" target='_blank' className='off-link'>
                  <span>{moeda2.name}</span> | {moeda2.symbol}
                </a>
              </td>
              <td className='categoria'>{price.format(Number(moeda2.market_cap).toFixed(2))}</td>
              <td className='categoria'>{price.format(Number(moeda2.price))}</td>
              <td className='categoria' id='valor2' >{moeda2.delta_24h}</td>
            </tr>
          )}
        </tbody>

      </table>
      </div>
      {moeda1 && moeda2 && (
        <section id='link-container'>
          <div id='redirecionador'>
            <img className='coin' src="\src\assets\coin.svg" alt="" />
            <h2><a href="https://www.binance.com/pt-BR/how-to-buy/all-coins" target='_blank' >COMPRAR</a></h2>
            <img className='coin' src="\src\assets\coin.svg" alt="" />
          </div>
        </section>
      )}
      

    </>
  );
}

export default App;
