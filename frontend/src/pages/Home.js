import { useEffect } from "react";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("http://localhost:4000/workouts/");
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: json });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWorkouts();
    console.log(workouts);
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts ? (
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
