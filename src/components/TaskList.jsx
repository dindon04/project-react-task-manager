import { useState } from "react";
import "./TaskList.css";
import { useDispatch, useSelector } from "react-redux";

export const TaskList = ({ setRightBlockState }) => {
  const { tasks, filter } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");

  const addTaskHandler = () => {
    if (taskName.trim() !== "") {
      const newTask = {
        id: tasks.length + 1,
        name: taskName,
        description: "",
        completed: false,
      };
    }
  };

  return (
    <>
      <div>
        <h1>Task Manager</h1>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="task name"
        />
        <button onClick={addTaskHandler}>Add to list</button>
        <h3>Task List</h3>
        <div>
          <h3>Filter:</h3>
          <button onClick>
            All
          </button>
          <button onClick>
          Completed
          </button>
          <button onClick>
          Uncompleted
          </button>
        </div>

      </div>
    </>
  );
}
