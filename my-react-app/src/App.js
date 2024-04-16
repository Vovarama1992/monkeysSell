import { useState, useRef, useEffect, forwardRef } from 'react';
import './App.css';

function App() {
  const refFirstRev = useRef(null);
  const refSecondRev = useRef(null);
  

  useEffect(() => {
    askRev().then(result => {
      
      if (refFirstRev.current && refSecondRev.current) {
        refFirstRev.current.innerHTML = result[0];
        refSecondRev.current.innerHTML = result[1];
      }
    });
  }, []);

  return (
    <div className="container">
      <header>тестовое задание</header>
      <div className="reviewLevel">
        <Rev ref={refFirstRev} />
        <Rev ref={refSecondRev} />
      </div>
     <OrderList></OrderList>
      
       
    </div>
  );
}

const Rev = forwardRef(({}, ref) => {
  return <div className="rev" ref={ref}></div>;
});
function  OrderList() {
  return (
    <div className="orderList"></div>
  )
}

async function askRev() {
  try {
    const res = await fetch('http://o-complex.com:1337/reviews', { method: 'GET' });
    if (!res.ok) {
      throw new Error("Fetch error");
    }
    const json = await res.json();
    let jsons = [];
    for (let j of json) {
      jsons.push(j.text);
    }
    return jsons;
  } catch (err) {
    return "not Found";
  }
}

export default App;