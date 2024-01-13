import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import{auth} from "../Firebase/firebase";
import "firebase/compat/auth";
import firebase from 'firebase/compat/app'
import { Link, useParams ,useNavigate, useLocation} from "react-router-dom";
import { onAuthStateChanged, signOut,PhoneAuthProvider } from "firebase/auth";
import axios from "axios"
import { useAuth } from "../../Context/Auth";
export default function SignInScreen(props) {
 
  const config = {
    apiKey: "AIzaSyCbxIXw-pXevk9nmq2MEonu86uemZCjvCk",
    authDomain: "policefeedbacksystem-5e031.firebaseapp.com",
    projectId: "policefeedbacksystem-5e031",
    storageBucket: "policefeedbacksystem-5e031.appspot.com",
    messagingSenderId: "641111786552",
    appId: "1:641111786552:web:80f40c0c4098317280d2cd",
    measurementId: "G-1MPYYGTN5S",
  };
  firebase.initializeApp(config);
  
  const [user, setUser] = useState(null);
  const[UpdatedUser,SetUpdatedUser]=useState(null);
    const location = useLocation();
    console.log(props)
    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged( (user) => {
  
        setUser(user);
  
      });
  
      return unsubscribe;
    }, []);
    const[auth,setAuth]=useAuth();
  const oldPhone = location.state?.oldPhone || props?.location?.state?.oldPhone||''; 
  console.log(oldPhone)
    const navigate=useNavigate();
   var updateduser;

    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          console.log('signInSuccessWithAuthResult', authResult);
          console.log(authResult.user.phoneNumber)
          const phonenumber=authResult.user.phoneNumber;
          const handleSave = async(phonenumber) => {
    // Save the updated user details
    try {
      // Assuming userDetails contains the updated user details
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/edit-phone`,{phone:phonenumber} );
  
      if (response.data.success) {
        // If the API call is successful, update the state and UI accordingly
        setAuth({ ...auth, user: response.data.user });
        SetUpdatedUser(response.data.user);
        // setIsEditing(false);
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
  handleSave(phonenumber);
  console.log(UpdatedUser);
 
        
          return false
        }
      },
  
      // Popup signin flow rather than redirect flow.
      signInFlow: "redirect",
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      // signInSuccessUrl: "/feedback",
      // We will display Google and Facebook as auth providers.
      signInOptions: [
      
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        PhoneAuthProvider.PROVIDER_ID,
      ],
    };
  
    useEffect(() => {
      // Check if UpdatedUser is not null before navigating
      if (UpdatedUser) {
        navigate('/Dashboard/user/profile', { state: { phone: UpdatedUser.phone } });
      }
    }, [UpdatedUser, navigate]);
    return (
        <div className="flex justify-center items-center min-h-screen py-5 bg-blue-100 border-black border-2 px-5">
        <div className="bg-white max-w-md p-8 border-2 rounded-2xl text-center shadow-xl hover:shadow-2xl">
          <p className="mb-6 font-bold text-2xl text-blue-800">
            {/* {JSON.stringify(oldPhone)} */}
            Verify Your New Mobile Number {oldPhone} 
          </p>
          {/* StyledFirebaseAuth component for Firebase authentication */}
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
  
          {/* Additional content, e.g., back to the home page link */}
          <div className="mt-8 text-gray-700">
            <Link to="/" className="text-sm hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
