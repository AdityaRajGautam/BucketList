import { v4 as uuidv4 } from 'uuid';
import {validationResult} from 'express-validator'
import HttpError from "../models/http-error.js";
import getCoordinatesForAddress from '../util/location.js';

let DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      location: {
        lat: 40.7484474,
        lng: -73.9871516
      },
      address: '20 W 34th St, New York, NY 10001',
      creator: 'u1'
    }
  ];

  export const getPlaceById = (req,res,next) => {
    const placeid = req.params.pid;

    const place = DUMMY_PLACES.find(p=>{
        return p.id == placeid;
    })
    if(!place){
        throw new HttpError('could not find the palce for the provided id',404)
    }
    res.status(400).json({place});
  }

  export const getPlaceByUserId = (req,res,next) => {
    const userId = req.params.uid;

    const places = DUMMY_PLACES.filter(p=>{
        return p.creator == userId
    })

    if(!places || places.length === 0){
        throw new HttpError('could not find places for the provided user id',404);
    }
    res.status(400).json({places});
  }

  export const createplace = async (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
      console.log(error)
      return next( new HttpError('Invalis Inputs Passed',422))
    }
    const {title,description,address,creator} = req.body;
    let coordinates;
    try {
      coordinates = await getCoordinatesForAddress(address)
    } catch (error) {
      return next(error)
    }

    const createdPlace = {
        id:uuidv4(),
        title,
        description,
        location:coordinates,
        address,
        creator
    }

    DUMMY_PLACES.push(createdPlace)
    res.status(201).json({place:createdPlace})
  }

  export const updatePlace = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
      console.log(error)
      throw new HttpError('Invalis Inputs Passed',422)
    }
    const { title, description } = req.body;
    const { pid } = req.params;
    
    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === pid) };
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === pid);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;
    res.status(200).json({ place: updatedPlace });
}

  export const deletePlace = (req,res,next) => {
    const {pid} = req.params;
    if(!DUMMY_PLACES.find(p=>p.pid===pid)){
      throw new HttpError('Place Does not found',404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id!=pid)
    res.status(200).json({success:'true',message:'place deleted successfully'})
  }



