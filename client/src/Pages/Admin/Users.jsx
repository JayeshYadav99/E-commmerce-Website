import React from 'react'

import AdminMenu from "../../Components/Menu/AdminMenu";
import { NavLink,Link } from 'react-router-dom'
import Layout from '../../Components/Layout/Layout'
const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
  <div className="flex">
        {/* AdminMenu */}
        <AdminMenu />

        {/* AdminDashboard */}
        <div className="flex-1 p-12">

            <h3 className="text-base font-semibold leading-7 text-gray-900">Manage Users</h3>
          
      

          {/* Rest of your AdminDashboard content */}
        </div>
      </div>
  </Layout>
  )
}

export default Users