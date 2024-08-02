import mongoose from "mongoose";

import workoutModel from "../models/workoutModel.js";

// get all workouts
export const getWorkouts = async (req, res) => {
  const workouts = await workoutModel.find({}).sort({ createdAt: -1 });

  res.status(200).send(workouts);
};

// get a single workout
export const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await workoutModel.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// create new workout
export const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  const emptyFields = [];

  if (!title) {
    emptyFields.push(title);
  } else if (!reps) {
    emptyFields.push(reps);
  } else if (!load) {
    emptyFields.push(load);
  }

  if (emptyFields.length > 0) {
    return res
      .status(404)
      .json({ error: "Please, fill in all fields", emptyFields });
  }

  try {
    const workout = await workoutModel.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

// delete a workout
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await workoutModel.findByIdAndDelete(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// update a workout
export const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await workoutModel.findByIdAndUpdate(
    id,
    {
      ...req.body,
    },
    { new: true }
  );

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};
