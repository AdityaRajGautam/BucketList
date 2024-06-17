import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";
import User from "../models/user.js";

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    email: "test@test.com",
    password: "testers",
  },
];

export const getUsers = async (req, res, next) => {
  try{
    const users = await User.find({},'-password');
    res.json({ users: users});
  }catch(err){
    res.status(500).json({message:"unable to fetch the request to find the user"});
  }
};

export const signup = async (req, res, next) => {
  // Validate the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid Input", errors: errors.array() });
  }

  const { name, email, password } = req.body;

  // Check if user already exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Signing up failed, please try again later." });
  }

  if (existingUser) {
    return res
      .status(422)
      .json({ message: "User exists already, please login instead." });
  }

  // Create a new user
  const createdUser = new User({
    name,
    email,
    password,
    image:
      "https://t4.ftcdn.net/jpg/04/83/98/17/360_F_483981769_DYd1dp7xthJQMDBfo6JL4GQinm4ddIgu.jpg",
    places: [],
  });

  // Save the new user
  try {
    await createdUser.save();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Signing up failed, please try again." });
  }

  // Respond with the created user
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const identifiedUser = await User.findOne({email:email,password:password});
    
    if (!identifiedUser || identifiedUser.password != password) {
      
      return res.status(401).json({success:false,message:"Could Not Find the user, please correct the credentials"})
    }
    res.json({ success: true, message: "Logged In Successfully" });
  } catch (error) {
    return res.json({message:"internal Error"})
  }


};
