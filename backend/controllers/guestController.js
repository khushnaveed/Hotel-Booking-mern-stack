import GuestModel from "../models/guestSchema.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();


export const getAllguests = async (req, res) => {
  try {
    const guests = await GuestModel.find(); 
    res.json({ success: true, data: guests });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};


export const getGuestById = async (req, res) => {
  try {
    const guest = await GuestModel.findById(req.params.id); 
    if (!guest) {
      return res
        .status(404)
        .send({ success: false, message: "Guest not found" });
    }
    res.json({ success: true, data: guest });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};



export const sendConfirmationEmail = async (
  email,
  firstName,
  confirmationToken
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const confirmationLink = `http://localhost:5005/guest/confirm-email/${confirmationToken}`;

    await transporter.sendMail({
      from: `"Royal Grand" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Royal Grand! Please Confirm Your Email",
      html: `
        <h2>Hello ${firstName},</h2>
        <p>Thank you for registering with Royal Grand. Please click the link below to confirm your email address:</p>
        <a href="${confirmationLink}">Confirm Email</a>
      `,
    });

    console.log("Confirmation email sent to:", email);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

export const addNewGuest = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phonenumber,
      address,
      city,
      zipcode,
      country,
      password,
      confirmPassword,
    } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .send({ success: false, message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newGuest = new GuestModel({
      ...req.body,
      password: hashedPassword,
      isEmailConfirmed: false, 
    });
    //console.log(req.body); 

    await newGuest.save();

    const confirmationToken = jwt.sign(
      { guestId: newGuest._id, email: newGuest.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    await sendConfirmationEmail(email, firstName, confirmationToken);

    res.status(201).json({
      success: true,
      message:
        "Guest created successfully. Please check your email to confirm your account.",
    });
  } catch (err) {
    console.error("Error registering guest:", err);
    if (err.code === 11000 && err.keyPattern?.email) {
      return res
        .status(400)
        .send({
          success: false,
          message: "User with this email already exists.",
        });
    }
    res.status(500).send({ success: false, message: "Internal server error." });
  }
};

export const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const guest = await GuestModel.findById(decoded.guestId);

    if (!guest) {
      return res
        .status(404)
        .json({ success: false, message: "Guest not found" });
    }

    guest.isEmailConfirmed = true;
    await guest.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Email confirmed successfully. You can now log in.",
      });
  } catch (error) {
    console.error("Error confirming email:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to confirm email." });
  }
};


export const updateGuest = async (req, res) => {
  try {
    const guest = await GuestModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // Use await, pass id and update data
    if (!guest) {
      return res
        .status(404)
        .send({ success: false, message: "Guest not found" });
    }
    res.json({ success: true, data: guest });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};


export const deleteGuest = async (req, res) => {
  try {
    const guest = await GuestModel.findByIdAndDelete(req.params.id); // Use await, pass id to delete
    if (!guest) {
      return res
        .status(404)
        .send({ success: false, message: "Guest not found" });
    }
    res.json({ success: true, message: "Guest deleted successfully" });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

export const loginGuest = async (req, res) => {
  try {
    const { email, password } = req.body;

    const guest = await GuestModel.findOne({ email }).populate("bookings");

    if (!guest) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

   // console.log("Guest data retrieved:", guest);

    const isPasswordValid = await bcrypt.compare(password, guest.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign(
      { _id: guest._id, email: guest.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.header("token",token).json({
      success: true,
      message: "Login successful",
      data: guest, 
    });
  } catch (error) {
    console.error("Error during login:", error); 
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const guest = await GuestModel.findOne({ email });

    if (!guest) {
      return res
        .status(404)
        .json({ success: false, message: "No user with that email" });
    }

    const resetToken = jwt.sign(
      { guestId: guest._id },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`; 

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Royal Grand" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${guest.firstName},</p>
        <p>You requested to reset your password. Click the link below to do so:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    res.json({ success: true, message: "Reset link sent to your email" });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match!" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const guest = await GuestModel.findById(decoded.guestId);

    if (!guest) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    guest.password = hashedPassword;
    await guest.save();

    res.json({ success: true, message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error in reset password:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to reset password." });
  }
};

export const verifyguesttoken = (req,res,next)=> {
  res.json({success:true, data:req.guest})
}