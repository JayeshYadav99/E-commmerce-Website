import React, { useState ,useEffect} from 'react';
import { FiEdit } from 'react-icons/fi';
import UserMenu from '../../Components/Menu/UserMenu';
import Layout from '../../Components/Layout/Layout';
import { useAuth } from '../../Context/Auth';
import { Link,useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; 
const Profile = () => {
  const location = useLocation();
  
  const navigate=useNavigate();
  const [auth, setAuth] = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState();
const[phone,setPhone]=useState(auth?.user?.phone);
useEffect(() => {

  console.log("Called");
  setUserDetails(auth?.user);
  
  console.log(location)
  console.log(userDetails)
  setPhone(userDetails?.phone);
}, [auth]);

useEffect(() => {

  console.log("Called");
  console.log(location)
  console.log(userDetails)
  setPhone(userDetails?.phone);
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
  
 
      
    
    



          <div className="w-3/4 p-4">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                {!isEditing && (
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"  onClick={handleEdit}>
                  Edit
                </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
              {isEditing ? (
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  name="name"
                  placeholder="First Name"
                  type="text"
                  value={userDetails?.name}
                  onChange={handleChange}
                  defaultValue="Jayesh"
                />

              ):(
<p>{userDetails?.name}</p>
              )}
               {isEditing && (
              <button
                className=" w-1/2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </button>
            )}
              </div>

    
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Email Address</h2>
                {/* <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Edit
                </button> */}
              </div>
              {userDetails?.email}
              {/* <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                defaultValue="jayeshedits@gmail.com"
              /> */}
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Mobile Number</h2>
                <Link  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" to='/edit-phone' state={ { oldPhone: userDetails?.phone } }>
            Edit 
          </Link>
                {/* <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Edit
                </button> */}
              </div>
              {phone &&
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="tel"
                value={phone}
                defaultValue={+916351854267}
              />
}
            </div>
          </div>
















             







  );
};

export default Profile;
