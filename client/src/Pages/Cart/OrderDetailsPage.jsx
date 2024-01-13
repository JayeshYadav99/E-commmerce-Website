import React from 'react'
import Layout from '../../Components/Layout/Layout'
import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { useAuth } from '../../Context/Auth'

import { Stepper } from 'react-form-stepper';

import { Link } from 'react-router-dom'
const OrderDetailsPage = () => {
  const steps = [
    { label: 'Ordered'},
    { label: 'Under process' },
    { label: 'Shipped'},
    { label: 'Delivered' }
  ];
  const activeStep = 2;
  const {orderId} = useParams()
  const [auth,setAuth] = useAuth()

const[orderData,setOrderData] = useState([])
const[orderDates,SetDates]=useState({
  paidAt:""
})




function formatDateToString(date) {
  const dateObj = new Date(date);
  const dateString = dateObj.toString();
  const dateFirst = dateString.slice(4, 8);
  const dateMiddle = dateString.slice(8, 10);
  const dateLast = dateString.slice(10, 16);
  const formattedString = `${dateMiddle} ${dateFirst} ${dateLast}`;
  return formattedString;
}


const FetchOrder= async()=>{

  try {
    const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/order/get-order-by-id/${orderId}`);
    if(response.data){
      setOrderData(response.data.order)
      console.log(response.data.order.cart)

      const formattedDate = formatDateToString(response.data.order.paidAt);
      SetDates({
        ...orderDates,  
        paidAt:formattedDate
      })
    }
  } catch (error) {
    console.log(error)

    
  }
}

useEffect(()=>{ 
  FetchOrder()  
},[])
  return (
    <Layout title={"Order Details"}>
      <div className="px-8 mx-auto my-10 p-6 bg-white shadow rounded-lg">
        <div className="flex items-center justify-between">
          <Link to={'/Dashboard/user/orders'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          </Link>
     
          {/* <h1 className="text-2xl  font-semibold">Order Details</h1> */}
          
         
          <div />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-10">
          <div>
            <h2 className="text-lg font-semibold">Order Status</h2>
            <p className="text-sm text-gray-600">Delivered on Mar 23</p>
            <button className="inline-flex items-center bg-gray-200  justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 mt-4">
              Need Help
            </button>
            <button className="inline-flex items-center  bg-blue-500 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4 ml-4">
              Reorder
            </button>
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Delivery Address</h3>
              <p className="text-sm">
              43/A, NILKANTH PARK SOCIETY,
                DANTESHWAR,VADODARA DANTEHSWAR,Vadodara,Gujarat,390004
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm">Name</p>
                  <p className="text-sm font-bold">{auth?.user?.name}  </p>
                </div>
                <hr class="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                <div className="flex justify-between">
                  <p className="text-sm">Order Number</p>
                  <p className="text-sm font-bold">{orderData._id}</p>
                </div>
                <hr class="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                <div className="flex justify-between">
                  <p className="text-sm">Shipment Number</p>
                  <p className="text-sm">16479599880229538M-01</p>
                </div>
                <hr class="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                <div className="flex justify-between">
                  <p className="text-sm">Order Date</p>
                  <p className="text-sm">{orderDates.paidAt}</p>
                </div>
                <hr class="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                <div className="flex justify-between">
                  <p className="text-sm">Product Total</p>
                  <p className="text-sm">{orderData.totalPrice}</p>
                </div>
                <hr class="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                <div className="flex ">
                  <p className="text-sm">Delivery Fee</p>
                  <p className="text-sm   ml-auto line-through ">₹40.00</p>
                  <p className="text-sm   ml-3 text-green-600 ">FREE</p>
               
                  
                </div>
                <hr class="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                <div className="flex justify-between">
                  <p className="text-sm">Order Amount</p>
                  <p className="text-sm font-bold">{orderData.totalPrice}</p>
                </div>
                <hr class="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                <div className="flex justify-between">
                  <p className="text-sm">Invoice Number</p>
                  <p className="text-sm">TP7410622100579</p>
                </div>
                <hr class="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                <div className="flex justify-between">
                  <p className="text-sm">Invoice Amount</p>
                  <p className="text-sm">{orderData.totalPrice}</p>
                </div>
                <hr class="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                <div className="flex justify-between">
                  <p className="text-sm">Payment Mode</p>
                  <p className="text-sm font-bold">{orderData?.paymentInfo?.type?.toUpperCase()}</p>
                </div>
              
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 ">Track Order</h3>
            {/* <div className="mt-4 grid grid-cols-4 gap-4">
              <div className="text-center col-span-1 relative">
        
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-500 mx-auto"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>

           
                <p className="text-xs mt-2">Ordered</p>
                <p className="text-xs text-gray-500">Tue, 22 Mar 08:08 PM</p>
              </div>
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-500 mx-auto"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p className="text-xs mt-2">Under process</p>
                <p className="text-xs text-gray-500">Wed, 23 Mar 02:11 PM</p>
              </div>
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-500 mx-auto"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p className="text-xs mt-2">Shipped</p>
                <p className="text-xs text-gray-500">Wed, 23 Mar 05:18 PM</p>
              </div>
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-500 mx-auto"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p className="text-xs mt-2">Delivered</p>
                <p className="text-xs text-gray-500">Wed, 23 Mar 08:49 PM</p>
              </div>
            </div> */}
             {/* <CheckoutSteps active={1} /> */}
             



{/* <ol className="flex items-center w-full">
  <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
    <div>
      <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
        <svg className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5.917 5.724 10.5 15 1.5" />
        </svg>
      </span>
    </div>
  </li>
  <li className="flex w-full items-center active-step after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
    <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
      <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
      </svg>
    </span>
  </li>
  <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
    <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
      <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
      </svg>
    </span>
  </li>
  <li className="flex items-center w-full">
    <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
      <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
      </svg>
    </span>
  </li>
</ol> */}


<Stepper
  steps={steps}
  activeStep={1}
  connectorStateColors={true}
/>
<ol  class=" ml-12 flex items-center max-w-5xl">
  <li className='flex w-full items-center text-blue-600'>
  <p className="text-sm  ">      Tue, 22 Mar 08:08 PM</p> 
  </li>
  <li className='flex w-full items-center text-blue-600'>
  <p className="text-sm   ">Wed, 23 Mar 02:11 PM</p> 
  </li>
  <li className='flex w-full items-center text-blue-600'>
  <p className="text-sm   ">Wed, 23 Mar 05:18 PM</p> 
  </li>
  <li className='lex w-full items-center text-blue-600'>
  <p className="text-sm    flex items-center w-full">Wed, 23 Mar 08:49 PM</p> 
  </li>
</ol>
{/* <Stepper steps={ [{title: 'Step One'}, {title: 'Step Two'}, {title: 'Step Three'}, {title: 'Step Four'}] } activeStep={ 1 } />
<Stepper
        steps={steps}
        activeStep={activeStep}

        activeColor={"#5096FF"}

          
         /> */}




            <div className="mt-6">
              <h3 className="text-lg font-semibold">Order Items ({orderData?.cart?.length})</h3>

{orderData.cart && orderData.cart.map((item) => (
  <div key={item._id} className="mt-4">
    <div className="flex items-center justify-between">
      <img
        src={item.image}
        alt="Product"
        className="h-12 w-12"
        width={50}
        height={50}
        style={{ aspectRatio: "50 / 50", objectFit: "cover" }}
      />
      <p className="text-sm">{item.name}</p>
      <p className="text-sm">₹{item.price}</p>
      <p className="text-sm">Qty: {item.quantity}</p>
    </div>
    <hr className="my-4" />
  </div>
))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OrderDetailsPage