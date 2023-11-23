import React, { useState ,useEffect} from 'react';
import { FiEdit } from 'react-icons/fi';
import UserMenu from '../../Components/UserMenu';
import Layout from '../../Components/Layout';
import { useAuth } from '../../Context/Auth';
import { Link,useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; 
const Profile = () => {
  const location = useLocation();
  
  const navigate=useNavigate();
  const [auth, setAuth] = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState(auth.user);
const[phone,setPhone]=useState(auth.user.phone);
useEffect(() => {
  console.log("Called");
  console.log(location)
  console.log(userDetails)
  setPhone(userDetails.phone);
}, [userDetails]);

// Check if there's updated user details in the location state
useEffect(() => {
  console.log("only for phonenumber change")
  if (location.state && location.state.updatedUserDetails) {
    const { phone: updatedPhone } = location.state.updatedUserDetails;
    if (updatedPhone) {
      setPhone(updatedPhone);
    }
    // Clear the state to avoid unnecessary updates
    location.state = null;
  }
}, [location.state]);


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async() => {
    // Save the updated user details
    try {
      // Assuming userDetails contains the updated user details
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/editprofile`, userDetails);
  
      if (response.data.success) {
        // If the API call is successful, update the state and UI accordingly
        console.log(response.data.user)
        setAuth({ ...auth, user: response.data.user });
        setIsEditing(false);
        const updatedAuth = { ...auth, user: response.data.user };
        localStorage.setItem('auth', JSON.stringify(updatedAuth));
        // Optionally, show a success message or perform additional actions
      } else {
        // Handle the case where the API call is not successful
        // You can show an error message or take appropriate action
        console.error(response.data.message);
      }
    } catch (error) {
      // Handle any network or server errors
      console.error('Error updating profile:', error);
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  return (
    <Layout title={'Your Profile'}>
      <div className="flex">
            <UserMenu />
          </div>
          <div className="flex-1 p-12">
            <h1>Your Profile</h1>
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold">Personal Information</h2>
              {!isEditing && (
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={handleEdit}
                >
                  <FiEdit />
                </button>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={userDetails.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p>{userDetails.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Email</label>
              {isEditing ? (
               <p>{userDetails.email}</p>
              ) : (
                <p>{userDetails.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Address</label>
              {isEditing ? (
                <input
                  type="address"
                  name="address"
                  value={userDetails.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p>{userDetails.address}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Phone Number</label>
              {isEditing ? (<>
                <p>{phone}</p>
                <Link  className="text-red-700" to='/edit-phone' state={ { oldPhone: userDetails.phone } }>
            Edit Phone Number
          </Link></>
                
 ) : (
  <p>{phone}</p>
)}
</div>
            {isEditing && (
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </button>
            )}
          </div>
     
    </Layout>
  );
};

export default Profile;
