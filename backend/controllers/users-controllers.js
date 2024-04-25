import { v4 as uuidv4 } from 'uuid';
import HttpError from "../models/http-error.js";

const DUMMY_USERS = [
    {
      id: 'u1',
      name: 'Max Schwarz',
      email: 'test@test.com',
      password: 'testers'
    }
  ];

  export const getUsers =(req,res,next)=>{
    res.json({users:DUMMY_USERS})
  }

  export const signup = (req,res,next) => {
    const {name,email,password} = req.body;

    const hasUser = DUMMY_USERS.find(u=>u.email === email);

    if(hasUser){
      throw new HttpError('Could not create User,email already exists',422)
    }

    const createdUser = {
      id:uuidv4(),
      name,
      email,
      password
    }

    DUMMY_USERS.push(createdUser)

    res.status(200).json({users:createdUser});
  }

  export const login = (req,res,next) => {
    const {email,password} = req.body;

    const identifiedUser = DUMMY_USERS.find(u=>u.email === email)

    if(!identifiedUser || identifiedUser.password != password){
      throw new HttpError('Could Not Find the user, please correct the credentials',401);

    }
    res.json({success:true,message:'Logged In Successfully'});
  }

  