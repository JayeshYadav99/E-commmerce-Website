import userModel from "../models/userModel.js";
import cartModel from "../models/cartModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import {
	sendPasswordResetEmail,
	sendResetSuccessEmail,
	sendVerificationEmail,
	sendWelcomeEmail,
} from "../mailtrap/emails.js";
const createEmptyCartForUser = async (user) => {
  try {
    const newCart = await cartModel.create({ user: user._id, items: [] });

    // Add a reference to the cart in the user model
    user.cart = newCart._id;
    await user.save();

    return newCart;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating cart for user');
  }
};
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phoneno, Address ,SecurityAnswer} = req.body;
    //validations
    if (!name) {
      return res.status(404).send({
        success: false,
        message: "name is required",
      });
    }
    if (!email) {
      return res.status(404).send({
        success: false,
        message: "name is required",
      });
    }
    if (!password) {
      return res.status(404).send({
        success: false,
        message: "password is required",
      });
    }
    if (!phoneno) {
      return res.status(404).send({
        success: false,
        message: "Phone Number is required",
      });
    }
    if (!Address) {
      return res.status(404).send({
        success: false,
        message: "name is required",
      });
    }
    if (!SecurityAnswer) {
      return res.status(404).send({
        success: false,
        message: "SecurityAnswer is required",
      });
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
    await sendWelcomeEmail(user.email, user.name);
    await createEmptyCartForUser(user);

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
        budget:user.budget,
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
export const forgotPassword = async (req, res) => {
	const { email } = req.body;
  console.log(req.body);
	try {
		const user = await userModel.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;
console.log(user);
		await user.save();

		// send email
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await userModel.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

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

export const UpdateBudgetController = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have middleware to extract user details from the token
    const { budget } = req.body;

    // Check if the user exists
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Update budget
    if (budget) {
      user.budget = budget;
      // Save the updated user details
      await user.save();

      res.status(200).send({
        success: true,
        message: "Budget updated successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
          budget: user.budget,
        },
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Budget is required for update",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating budget",
      error,
    });
  }
}
