
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx';
import Register from './pages/register.jsx';
import Info from './pages/Info.jsx';
import Products from './pages/Products.jsx';
import Allpropducts from './pages/Allproducts.jsx';
import EditProduct from './pages/EditProduct.jsx';
import OrderDetails from './pages/Orders/OrderDetails.jsx';
import OrderList from './pages/Orders/OrderList.jsx';
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={ <Register />}/>
      <Route path="/register" element={ <Register />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/info" element={<Info/>}/>
      <Route path='/products/add' element={<Products/>}/>
      <Route path="/products/all" element={<Allpropducts/>} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
      <Route path='/Order/OrderList' element={<OrderList/>} />
      <Route path='/Order/OrderDetails' element={<OrderDetails/>} />
      <Route path="/Order/OrderDetails/:id" element={<OrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;

