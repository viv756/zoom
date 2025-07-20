import bcrypt, { hash } from "bcrypt"
import crypto from "crypto"
import httpStatus from "http-status";
import User from "../models/user.model.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please Provide" });
  }

  try {
    const user = await User.findOne({ userName:username });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User Not Found" });
    }

    let isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      let token = crypto.randomBytes(20).toString("hex");

      user.token = token;
      await user.save();
      return res.status(httpStatus.OK).json({ token: token });
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Username or password" });
    }
  } catch (e) {
    return res.status(500).json({ message: `Something went wrong ${e}` });
  }
};

export const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(httpStatus.FOUND).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      userName: username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(httpStatus.CREATED).json({ message: "User Registered" });
  } catch (e) {
    res.json({ message: `Something went wrong ${e}` });
  }
};
