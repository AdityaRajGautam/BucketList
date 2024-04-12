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