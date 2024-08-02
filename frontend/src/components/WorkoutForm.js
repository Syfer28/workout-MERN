import { useState } from "react";

import useWorkoutsContext from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("http://localhost:4000/workouts/", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("new workout added", json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add new workout</h3>
      <div className="title-input">
        <label>New workout name: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={emptyFields.includes(title) ? "error" : ""}
        />
      </div>

      <div className="load-input">
        <label>Load (kg): </label>
        <input
          type="number"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className={emptyFields.includes(load) ? "error" : ""}
        />
      </div>

      <div className="reps-input">
        <label>Reps: </label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className={emptyFields.includes(reps) ? "error" : ""}
        />
      </div>

      <button>Add workout</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
