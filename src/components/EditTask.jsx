import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../store/actions";
import "./EditTask.css";

export const EditTask = ({ taskId, onSubmit }) => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  
  // найти задачу по id
  const task = tasks.find((item) => item.id === parseInt(taskId));

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // обновление состояния при изменении taskId
  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setTaskDescription(task.description);
    }
  }, [taskId, task]);

  if (!task) return <div>Task not found</div>;

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editTask(task.id, {
        ...task,
        name: taskName,
        description: taskDescription,
      })
    );
    if (onSubmit) onSubmit();

    window.history.replaceState(null, "Home", "/");
  };

  return (
    <div className="edit-div" style={{ margin: "10px" }}>
      <h1>Edit Task(id: {taskId})</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="taskName">Task Name </label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={handleTaskNameChange}
          />
        </div>

        <div id="taskContainer">
          <label htmlFor="taskDescription">Task Description</label>
          <textarea
            id="taskDescription"
            value={taskDescription}
            onChange={handleTaskDescriptionChange}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};
