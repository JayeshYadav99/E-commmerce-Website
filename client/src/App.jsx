
import './App.css'
import {Routes,Route} from 'react-router-dom';
import Test from './Test';
import Navbar from './Components/Navbar';
import Homepage from './Pages/Homepage';
import Signup from './Pages/Auth/Signup'
import Login from './Pages/Auth/Login'
import {Dashboard }from "./Pages/Dashboard"
import PrivateRoutes from './Components/Routes/PrivateRoutes';
import Forgotpassword from './Pages/Auth/Forgotpassword';
import AdminRoutes from './Components/Routes/AdminRoutes';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import Users from './Pages/Admin/Users';
import Orders from './Pages/user/Orders';
import Profile from './Pages/user/Profile';
import CategoryForm from './Components/Forms/CategoryForm';
import Product from './Pages/Admin/Products';
import UpdateProduct from "./Pages/Admin/UpdateProduct"
import Drag from './Drag'
import ProductGrid from './Components/Routes/Innovation/Productgrid';
import ProductGallery from './Pages/ProductGallery';
import SearchInput from './Components/Forms/SearchInput';
import SearchPage from './Pages/SearchPage';
import Productdetails from './Pages/Productdetails';
import CartPage from './Pages/CartPage';
import PhoneSignUp from './Pages/UpdatePhoneNumber';
import { useEffect,useState } from 'react';
import Payment from './Pages/Payment';
import PaymentCheckout from './Pages/PaymentCheckout';
import axios from 'axios';
function App() {
const[stripeapikey,setStripeapikey]=useState('');
async function getStripeApiKey(){
  const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/payment/stripeapikey`);
  setStripeapikey(data.stripeapikey);
}

useEffect(()=>{
  getStripeApiKey();
},[])
  return (
    <div className='max-h-screen' >
      




  <Routes>
    <Route path='/Test'element={<Test/>}/>
    <Route path='/Drag'element={<Drag/>}/>
    <Route path='/Test'element={<Test/>}/>
    <Route path='/Search'element={<SearchPage/>}/>
    <Route path='/cart'element={<CartPage/>}/>
    <Route path='/product/:slug'element={<Productdetails/>}/>
  <Route path='/edit-phone' element={<PhoneSignUp/>} />
    <Route path='/Grid'element={<ProductGrid/>}/>
    <Route path='/ProductGallery'element={<ProductGallery/>}/>
    <Route path='/Payment'element={<Payment/>}/>
    <Route path='/PaymentCheckout'element={<PaymentCheckout/>}/>
    <Route path='/'element={<Homepage/>}/>
    <Route path='/Signup'element={<Signup/>}/>
    <Route path='/Login'element={<Login/>}/>
    <Route path='/Form'element={<CategoryForm/>}/>
    <Route path='/forgotpassword'element={<Forgotpassword/>}/>
    <Route path='/Dashboard' element={<PrivateRoutes/>}>
    <Route path="user" element={<Dashboard/>}/>

          <Route path="user/orders" element={<Orders/>} />
          <Route path="user/profile" element={<Profile/>} />
    </Route>
    <Route  path="/Dashboard" element={<AdminRoutes/>}>
    <Route path='admin'element={<AdminDashboard/>}/>
    <Route path="admin/create-category" element={<CreateCategory />} />
    <Route path="admin/product" element={<Product />} />
    <Route path="admin/create-product" element={<CreateProduct />} />
    <Route path="admin/product/:slug" element={<UpdateProduct />} />
    <Route path="admin/users" element={<Users />} />


    </Route>


  
   
  </Routes>
    </div>

  )
}

export default App
