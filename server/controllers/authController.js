import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phoneno, Address ,SecurityAnswer} = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!phoneno) {
      return res.send({ error: "Phone no is Required" });
    }
    if (!Address) {
      return res.send({ error: "Address is Required" });
    }
    if (!SecurityAnswer) {
      return res.send({ error: "SecurityAnswer is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email});
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await  userModel.create({
      name, email, phone:phoneno, address:Address ,
      password: hashedPassword,
      SecurityAnswer
    });

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};


export const forgotpasswordController=async(req,res)=>{
  try {
    const{email, SecurityAnswer,newpassword}=req.body;
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!newpassword) {
      return res.send({ error: "Password is Required" });
    }
    if (!SecurityAnswer) {
      return res.send({ error: "SecurityAnswer is Required" });
    }

    const user=await userModel.findOne({email,SecurityAnswer});
    if(!user)
    {
      return res.status(404).send({
        success: false,
        message: "User Not found",
      });
    }
    const hashed =await hashPassword(newpassword);
    await userModel.findByIdAndUpdate(user._id,{
      password:hashed
    });
    res.status(200).send({
      success: true,
      message: "Password Changed successfully",
    })

  } catch (error) {
    console.log(error);
    res.send("Error found at forgot password",error);
    
  }

}
//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
// editProfileController
export const editProfileController = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have middleware to extract user details from the token

    const { name, email, phone, address } = req.body;

    // Check if the user exists
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Update user details
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    // Save the updated user details
    await user.save();

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating profile",
      error,
    });
  }
};
// updatePhoneController
export const updatePhoneController = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have middleware to extract user details from the token
    const { phone } = req.body;

    // Check if the user exists
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Update phone number
    if (phone) {
      user.phone = phone;
      // Save the updated user details
      await user.save();

      res.status(200).send({
        success: true,
        message: "Phone number updated successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Phone number is required for update",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating phone number",
      error,
    });
  }
};

