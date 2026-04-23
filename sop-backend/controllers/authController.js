import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 LOGIN (Register + Login)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ❗ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 🔍 Check if user exists
    let user = await User.findOne({ email });

    // 🆕 If not exists → create user
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        email,
        password: hashedPassword,
      });
    }

    // 🔑 Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 🎟️ Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🚪 LOGOUT (dummy for now)
export const logout = async (req, res) => {
  res.json({ message: "Logged out successfully" });
};

// 👤 GET CURRENT USER
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};