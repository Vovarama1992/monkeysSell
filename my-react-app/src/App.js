import { useState, useRef, useEffect, forwardRef } from 'react';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const refFirstRev = useRef(null);
  const refSecondRev = useRef(null);

  useEffect(() => {
    askProducts().then(results => setProducts(results))


  }, [])
  

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
     <OrderList orders={orders}></OrderList>
     {products.map((pr, index) => {
      const {image_url, title, description, price} = pr;
      return (<ProductLook imgUrl={image_url} title={title} 
        description={description} price={price} key={index}/>)
     })}
      
       
    </div>
  );
}

const Rev = forwardRef(({}, ref) => {
  return <div className="rev" ref={ref}></div>;
});
function OrderList({ orders }) {
  return (
    <div className="orderList">
      <div className="orderedText">Добавленные товары</div>
      {orders.length > 0 &&
        orders.map((order, index) => (
          <div key={index} className="order">
            {order.productName} x{order.count} {order.price}P
          </div>
        ))}
        <input className="field" type="tel"
  pattern="[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}"
  placeholder="+7 (___) ___ __-__"
 
  ></input>
  
<button className="field">Заказать</button>
    </div>
  );
}
function ProductLook({ imgUrl, title, description, price}) {
  return (
    <div className="product">
      <img src={imgUrl}></img><br></br>
      {title}<br></br>
      {description}<br></br>
      Цена: {price}P
    </div>
  )
}

async function askRev() {
  try {
    const res = await fetch('http://o-complex.com:1337/reviews', { method: 'GET'});
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

async function askProducts(page = 1, size = 6) {
  const res = await fetch(`http://o-complex.com:1337/products?page=${page}&page_size=${size}`);
  const json = await res.json();
  return json.products;
}



export default App;