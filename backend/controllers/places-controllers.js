import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";
import getCoordinatesForAddress from "../util/location.js";
import Place from "../models/place.js";
import User from "../models/user.js"
import mongoose from "mongoose";

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

export const getPlaceById = async (req, res, next) => {
  const placeid = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeid);
  } catch (error) {
    console.log("Something went wrong coul not find a place", error);
    return next(error);
  }

  if (!place) {
    return next(
      new HttpError("could not find the palce for the provided id", 404)
    );
  }
  res.status(400).json({ place: place.toObject({ getters: true }) });
};

export const getPlaceByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  try {
    const places = await Place.find({ creator: userId });

    if (!places || places.length === 0) {
      return res
        .status(404)
        .json({ message: "Could not find places for the provided user ID" });
    }

    res.json({ places }); // Use concise response format (avoids unnecessary object mapping)
  } catch (error) {
    console.error("Error fetching places for user ID:", userId, error);
    return res.status(500).json({ message: "Internal server error" }); // Handle generic server errors
  }
};

export const createplace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error);
    return next(new HttpError("Invalis Inputs Passed", 422));
  }
  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordinatesForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    image:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fletsenhance.io%2Fstatic%2F73136da51c245e80edc6ccfe44888a99%2F1015f%2FMainBefore.jpg&tbnid=D2e1clQQJsbJwM&vet=12ahUKEwj58vLRnJSGAxXU5jgGHbVKBeUQMygBegQIARBN..i&imgrefurl=https%3A%2F%2Fletsenhance.io%2F&docid=-t22bY2ix3gHaM&w=1280&h=720&q=image&ved=2ahUKEwj58vLRnJSGAxXU5jgGHbVKBeUQMygBegQIARBN",
    address,
    location: coordinates,
    creator,
  });

  let user;

  try {
    user = await User.findById(creator)
  } catch (error) {
    // console.error("Creating Place Failed", error);
    return res.json({ message: "Creating Place Failed" });
  }

  if(!user){
    return res.json({message:"Could not find the User!!"})
  }

  // console.log(user)

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({session:sess});
    user.places.push(createdPlace);
    await user.save({session:sess})
    await sess.commitTransaction();

  } catch (error) {
    console.log(error);
    return next(error);
  }
  res.status(201).json({ place: createdPlace });
};

export const updatePlace = async (req, res, next) => {
  // Validate request body using a validation library
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid inputs passed", errors: errors.array() });
  }

  const { title, description } = req.body;
  const { pid } = req.params;

  try {
    // Find the place by ID and handle potential errors
    const place = await Place.findById(pid);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    // Update place properties
    place.title = title;
    place.description = description;

    // Save the updated place and handle potential errors
    await place.save();

    // Return the updated place data
    res.status(200).json({ place: place.toObject({ getters: true }) });
  } catch (error) {
    console.error("Error updating place:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePlace = async (req, res, next) => {
  const { pid } = req.params;

  let place;
  try {
    place = await Place.findById(pid).populate('creator');
    if (!place) {
      return next(new HttpError('Place not found.', 404));
    }
  } catch (err) {
    console.error('Error finding place:', err);
    return next(new HttpError('Internal server error.', 500));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.deleteOne({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
    sess.endSession();
  } catch (err) {
    console.error('Error deleting place:', err);
    return next(new HttpError('Internal server error.', 500));
  }

  res.status(200).json({ success: true, message: 'Place deleted successfully.' });
};
