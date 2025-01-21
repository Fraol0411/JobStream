import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerUser, findUserByEmail } from "../models/userModels.js";
import { generateToken } from "../utils/jwtUtils.js";

// Handle user registration
export const register = async (req, res) => {
  const { username, email, password, role, applyfor } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    await registerUser(username, email, hashedPassword, role, applyfor);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Handle user login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    console.log(user);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
