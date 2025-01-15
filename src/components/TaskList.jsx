import { useState } from "react";
import "./TaskList.css";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, filterTasks, toggleTask } from "../store/actions";

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

      dispatch(addTask(newTask));

      setTaskName("");
    }
  };

  const toggleTaskHandler = (id) => {
    dispatch(toggleTask(id));
  };

  const deleteTaskHandler = (id) => {
    dispatch(deleteTask(id));
  };

  const filterTasksHandler = (filterType) => {
    dispatch(filterTasks(filterType));
  };
  const editTask = (id) => {
    setRightBlockState({ id, type: "edit" });
  };
  const taskDetail = (id) => {
    setRightBlockState({ id, type: "detail" });
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
      ? tasks.filter((task) => task.completed)
      : tasks.filter((task) => !task.completed);

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
          <button onClick={() => filterTasksHandler("all")}>All</button>
          <button onClick={() => filterTasksHandler("completed")}>Completed</button>
          <button onClick={() => filterTasksHandler("uncompleted")}>Uncompleted</button>
        </div>
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-item">
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskHandler(task.id)}
                />
                <span
                  className={task.completed ? "completed" : ""}
                  onClick={() => {
                    taskDetail(task.id);
                    window.history.replaceState(null, "TaskDetail", "/:taskId");
                  }}
                >
                  {task.name}
                </span>
              </div>
              <button
                onClick={() => {
                  editTask(task.id);
                  window.history.replaceState(
                    null,
                    "EditTask",
                    "/:taskId/edit"
                  );
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteTaskHandler(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
