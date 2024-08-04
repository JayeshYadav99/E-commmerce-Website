
import './App.css'
import {Routes,Route} from 'react-router-dom';
import Test from './Components/Utility/Test';
import Navbar from './Components/Layout/Navbar';
import Homepage from './Pages/Home/Homepage';
import Signup from './Pages/Auth/Signup'
import Login from './Pages/Auth/Login'

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

import ProductGrid from './Components/Routes/Innovation/Productgrid';
import ProductGallery from './Pages/Product/ProductGallery';
import SearchInput from './Components/Forms/SearchInput';
import SearchPage from './Pages/Product/SearchPage';
import Productdetails from './Pages/Product/Productdetails';
import CartPage from './Pages/Cart/CartPage';
import PhoneSignUp from './Pages/user/UpdatePhoneNumber';
import { useEffect,useState } from 'react';
import PaymentCheckout from './Pages/Cart/PaymentCheckout';
import axios from 'axios';
import OrderSuccessPage from './Pages/Cart/OrderSuccessPage';
import UserMenu from './Components/Menu/UserMenu';
import OrderDetailsPage from './Pages/Cart/OrderDetailsPage';
import Budget from './Pages/Personalized/Budget';
import ProductCategory from './Pages/Product/ProductCategory';
import PrivateRoute from './Components/Routes/PrivateRoute';
function App() {

  return (
    <div className='max-h-screen' >
      




  <Routes>


  //Checking Component Routes
  <Route path='/UserMenu'element={<UserMenu/>}/>
    <Route path='/Test'element={<Test/>}/>
    <Route path="/category/:categoryId" element={<ProductCategory />} />
   
    <Route path='/Test'element={<Test/>}/>
    <Route path='/Search'element={<SearchPage/>}/>
    <Route path='/cart'element={<PrivateRoute> <CartPage/></PrivateRoute>}/>
    <Route path='/product/:slug'element={<Productdetails/>}/>
    <Route path="/order-success" element={<OrderSuccessPage/>} />
  <Route path='/edit-phone' element={<PhoneSignUp/>} />
    <Route path='/Grid'element={<ProductGrid/>}/>
    <Route path='/ProductGallery'element={<ProductGallery/>}/>
    <Route path='/Budget'  element={<PrivateRoute><Budget/></PrivateRoute>}/>
    <Route path='/PaymentCheckout'element={<PaymentCheckout/>}/>
    <Route path='/'element={<Homepage/>}/>
    <Route path='/Signup'element={<Signup/>}/>
    <Route path='/Login'element={<Login/>}/>
    <Route path='/Form'element={<CategoryForm/>}/>
    <Route path='/forgotpassword'element={<Forgotpassword/>}/>
    <Route path='/Dashboard' element={<PrivateRoutes/>}>
      <Route path="orderDetails/:orderId" element={<OrderDetailsPage/>} />
    <Route path="user" element={<UserMenu/>}>


          <Route path="profile" element={<Profile/>} />
          </Route>
          <Route path="user/orders" element={<Orders/>} />

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
