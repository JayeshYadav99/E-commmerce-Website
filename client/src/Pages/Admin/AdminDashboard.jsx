import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { NavLink,Link } from 'react-router-dom'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import {useAuth} from '../../Context/Auth'
import AdminMenu from '../../Components/Menu/AdminMenu'
const AdminDashboard = () => {
  const [auth]=useAuth();
  console.log(auth)
  return (
    <Layout>
    <div className="flex">
        {/* AdminMenu */}
        <AdminMenu />

        {/* AdminDashboard */}
        <div className="flex-1 p-12">
     
     <div className="px-4 sm:px-0">
   

       <h3 className="text-base font-semibold leading-7 text-gray-900">Admin Info</h3>
       <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details</p>
     </div>
     <div className="mt-6 border-t border-gray-100">
       <dl className="divide-y divide-gray-100">
         <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
           <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
           <dt className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{auth?.user?.name}</dt>
         </div>
        
         <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
           <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{auth?.user?.email}</dd>
         </div>
      
         <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
           <dt className="text-sm font-medium leading-6 text-gray-900">About Business</dt>
           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
           We Specialize In Delivering Premium Soft Drinks And Delicious Biscuits That Bring Joy To Every Moment. Our Curated Selection Features Both Classic Favorites And Exciting New Flavors, All Crafted With The Finest Ingredients. Experience The Perfect Blend Of Taste And Quality With Every Purchase From Our Online Store
           </dd>
         </div>
         <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
           <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
           <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
             <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
               <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                 <div className="flex w-0 flex-1 items-center">
                   <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                   <div className="ml-4 flex min-w-0 flex-1 gap-2">
                     <span className="truncate font-medium">Business_stats.pdf</span>
                     <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                   </div>
                 </div>
                 <div className="ml-4 flex-shrink-0">
                   <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                     Download
                   </a>
                 </div>
               </li>
               <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                 <div className="flex w-0 flex-1 items-center">
                   <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                   <div className="ml-4 flex min-w-0 flex-1 gap-2">
                     <span className="truncate font-medium">shipping_stats.pdf</span>
                     <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                   </div>
                 </div>
                 <div className="ml-4 flex-shrink-0">
                   <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                     Download
                   </a>
                 </div>
               </li>
             </ul>
           </dd>
         </div>
       </dl>
     </div>
   </div>
      </div>

  

  



    </Layout>
   
  )
}

export default AdminDashboard