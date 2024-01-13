import React ,{useState,useEffect} from 'react'
import UserMenu from '../../Components/UserMenu'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios'
import { useAuth } from '../../Context/Auth'
import { Link } from 'react-router-dom'
const Orders = () => {
const[auth,setAuth]=useAuth();
const[orders,setOrders]=useState([]);

const fetchOrders=async()=>{
  try {
    const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/order/get-order/${auth?.user?._id}`);
    if(response.data)
    {
      setOrders(response.data.orders);
      console.log(response.data.orders);
    }

  } catch (error) {
    console.log(error);

    
  }
}

useEffect(()=>{
  fetchOrders();
},[])



  return (
    <Layout title={"Orders"}>
       <div>
      <div className="bg-gray-100">
        <div className="flex flex-col md:flex-row py-4 px-8">
          <aside className="w-full md:w-80 p-4 border-r">
          
          <div class="flex">
      <div class="w-full pr-6">
        <div class="bg-white p-6">
          <h3 class="text-lg font-bold mb-4">Filters</h3>
          <div class="mb-4">
            <h4 class="font-bold mb-2">ORDER STATUS</h4>
            <div class="flex flex-col">
              <label class="inline-flex items-center">
                <input class="form-checkbox" type="checkbox" />
                <span class="ml-2">Proccessing</span>
              </label>
              <label class="inline-flex items-center">
                <input class="form-checkbox" type="checkbox" />
                <span class="ml-2">Delivered</span>
              </label>
              <label class="inline-flex items-center">
                <input class="form-checkbox" type="checkbox" />
                <span class="ml-2">Cancelled</span>
              </label>
              <label class="inline-flex items-center">
                <input class="form-checkbox" type="checkbox" />
                <span class="ml-2">Returned</span>
              </label>
            </div>
          </div>
          <div>
            <h4 class="font-bold mb-2">ORDER TIME</h4>
            <div class="flex flex-col">
              <label class="inline-flex items-center">
                <input class="form-checkbox" type="checkbox" />
                <span class="ml-2">Last 30 days</span>
              </label>
              <label class="inline-flex items-center">
                <input class="form-checkbox" type="checkbox" />
                <span class="ml-2">2023</span>
              </label>
              <label class="inline-flex items-center">
                <input class="form-checkbox" type="checkbox" />
                <span class="ml-2">2022</span>
              </label>
              <label class="inline-flex items-center">
                <input class="form-checkbox" type="checkbox" />
                <span class="ml-2">2021</span>
              </label>
              <label class="inline-flex items-center">
                <input class="form-checkbox" type="checkbox" />
                <span class="ml-2">2020</span>
              </label>
              <label class="inline-flex items-center">
                <input class="form-checkbox" type="checkbox" />
                <span class="ml-2">Older</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      </div>
      
    
          </aside>
          <main className="flex-1 p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                  placeholder="Search your orders here"
                />
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-blue-500-foreground hover:bg-blue-500/90 h-10 px-4 py-2">
                  Search Orders
                </button>
              </div>
              <div className="space-y-4">

              {orders.map((order) => (

                <Link to={`/Dashboard/orderDetails/${order._id}`} key={order._id}>
                  <div  className="flex flex-col p-4 border rounded">
          <div className="flex justify-between items-start">
            <div className="flex space-x-4">
              <img
                src={order.cart[0]?.image}
                alt="Product"
                className="h-24 w-24"
                width={100}
                height={100}
                style={{ aspectRatio: "100 / 100", objectFit: "cover" }}
              />
              <div>
                <h5 className="text-lg font-semibold">{order.cart[0].name}</h5>
                {/* <p className="text-sm text-gray-600">Color: {order.color}</p> */}
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">₹{order?.totalPrice}</p>


              
              {/* <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mt-2">
                Delivered on {order.deliveryDate}
              </div> */}
              <p className="text-sm text-gray-600 mt-1">{`Your item has been ${order?.status}`}</p>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-2">
                Rate &amp; Review Product
              </button>
            </div>
          </div>
        </div>
                </Link>
      
      ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
    </Layout>
   
  );
}

export default Orders