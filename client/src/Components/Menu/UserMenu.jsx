import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Profileimg from '../../assets/profile.png';
import Profile from '../../Pages/user/Profile';
import  Layout from "../Layout/Layout"
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const UserMenu = () => {
  const location = useLocation();
  const routeParts = location.pathname.split('/');
  const lastRoute = routeParts[routeParts.length - 1];

  return (

    <Layout  title={lastRoute}>
      <div className="bg-gray-100 p-8">
      <div className="container mx-auto bg-white p-6 rounded-md shadow-md">
        <div className="flex gap-6">
          <div className="w-1/4 bg-gray-50 p-4 rounded-md">
            <div className="flex items-center space-x-4 mb-6">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img
                  className="aspect-square h-full w-full"
                  alt="Jayesh Yadav"
                  src={Profileimg}
                />
                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                  JD
                </span>
              </span>
              <div>
                <div className="font-semibold">Hello,</div>
                <div className="font-bold">Jayesh Yadav</div>
              </div>
            </div>
            <nav className="space-y-1">
              <NavLink
                to="/Dashboard/user/orders"
                activeClassName="bg-blue-500 text-white"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700"
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : '#545e6f',
                  background: isActive  && '#7600dc',
                })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="blue"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>MY ORDERS</span>
              </NavLink>
              <NavLink
                to="/account-settings"
                activeClassName="bg-blue-500 text-white"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700"
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : '#545e6f',
                  background: isActive  && '#7600dc',
                })}
              >
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
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx={12} cy={7} r={4} />
                </svg>
                <span>ACCOUNT SETTINGS</span>
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
                  className="ml-auto text-gray-400"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </NavLink>
              <div className="pl-6">
                <NavLink
                  to="/Dashboard/user/profile"
                  activeClassName="bg-blue-500 text-red-700"
                  activeStyle={{ color:'#5754a8' }}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  style={({ isActive }) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#7600dc' : '#f0f0f0',
                  })}
                >
                  Profile Information
                </NavLink>
                <NavLink
                  to="/manage-addresses"
                  activeClassName="bg-blue-500 text-gray-700"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  style={({ isActive }) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive && '#7600dc' ,
                  })}
                >
                  Manage Addresses
                </NavLink>
                <NavLink
                  to="/pan-card-information"
                  activeClassName="bg-blue-500 text-gray-700"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  style={({ isActive }) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive && '#7600dc' ,
                  })}
                >
                  PAN Card Information
                </NavLink>
              </div>
              <NavLink
                to="/payments"
                activeClassName="bg-blue-500 "
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700"
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : '#545e6f',
                  background: isActive && '#7600dc' ,
                })}
              >
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
                  <rect width={20} height={14} x={2} y={5} rx={2} />
                  <line x1={2} x2={22} y1={10} y2={10} />
                </svg>
                <span>PAYMENTS</span>
              </NavLink>
              <div className="pl-6">
                <NavLink
                  to="/gift-cards"
                  activeClassName="bg-blue-500 text-gray-700"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Gift Cards
                </NavLink>
                <NavLink
                  to="/saved-upi"
                  activeClassName="bg-blue-500 text-gray-700"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Saved UPI
                </NavLink>
                <NavLink
                  to="/saved-cards"
                  activeClassName="bg-blue-500 text-gray-700"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Saved Cards
                </NavLink>
              </div>
            </nav>
          </div>

     
          <Outlet/>
        </div>
      </div>
    </div>
    </Layout>
    
  );
};

export default UserMenu;
