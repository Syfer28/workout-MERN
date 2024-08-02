import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutsContext";

const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw Error("useWorkoutsContext error");
  }

  return context;
};

export default useWorkoutsContext;
