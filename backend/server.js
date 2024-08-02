import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import workoutRouter from "./routes/workouts.js";

const app = express();
app.use(cors());
configDotenv();
app.use(express.json());

app.use("/workouts", workoutRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server OK");
    });
  })
  .catch((error) => {
    console.log(error);
  });
