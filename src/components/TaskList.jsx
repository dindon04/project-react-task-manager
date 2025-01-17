/*import { useState } from "react";
import "./TaskList.css";
import { useDispatch, useSelector } from "react-redux"; //отправляем действие в redux
import { addTask, deleteTask, filterTasks, toggleTask } from "../store/actions";

export const TaskList = ({ setRightBlockState }) => {
  const { tasks, filter } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");

  //создаем задачу
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

  //чекбокс состояние
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
          <button onClick={() => filterTasksHandler("all")}>
            All
          </button>
          <button onClick={() => filterTasksHandler("completed")}>
          Completed
          </button>
          <button onClick={() => filterTasksHandler("uncompleted")}>
          Uncompleted
          </button>
        </div>
        <ul className="task-list" 
             style={{
              width: "400px"
             }}>
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-item">
              <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskHandler(task.id)}
              />
              <span
                style={{
                  marginLeft: "8px",
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  taskDetail(task.id);
                  window.history.replaceState(null, "TaskDetail", "/:taskId");
                }}
              >
                {task.name}
              </span>
              </div>
              <button 
                style={{
                  width: "auto",
                  margin: "5px"
                }}
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
              <button onClick={() => deleteTaskHandler(task.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        
      </div>
    </>
  );
};*/

import { useState } from "react";
import "./TaskList.css";
import { useDispatch, useSelector } from "react-redux"; /*отправляем действие в redux*/
import { addTask, deleteTask, filterTasks, toggleTask } from "../store/actions";

export const TaskList = ({ setRightBlockState }) => {
  const { tasks, filter } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Состояние для поиска

  /* создаем задачу */
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

  /* чекбокс состояние */
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

  // Фильтрация задач по поисковому запросу
  const filteredTasksBySearch = searchTerm
    ? filteredTasks.filter((task) =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredTasks;

  return (
    <>
      <div>
        <h1>Task Manager</h1>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="task name"
          style={{
            padding: "5px",
            marginTop: "10px",
            width: "100%",
            maxWidth: "300px",
            fontSize: "14px",
          }}
        />
        <button onClick={addTaskHandler}>Add to list</button>
        <h3>Task List</h3>

        {/* Поиск */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks"
          style={{
            padding: "5px",
            marginTop: "10px",
            width: "100%",
            maxWidth: "300px",
            fontSize: "14px",
          }}
        />

        <div>
          <h3>Filter:</h3>
          <button onClick={() => filterTasksHandler("all")}>All</button>
          <button onClick={() => filterTasksHandler("completed")}>
            Completed
          </button>
          <button onClick={() => filterTasksHandler("uncompleted")}>
            Uncompleted
          </button>
        </div>

        <ul className="task-list" style={{ width: "400px" }}>
          {filteredTasksBySearch.map((task) => (
            <li key={task.id} className="task-item">
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskHandler(task.id)}
                />
                <span
                  style={{
                    marginLeft: "8px",
                    textDecoration: task.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    taskDetail(task.id);
                    window.history.replaceState(null, "TaskDetail", "/:taskId");
                  }}
                >
                  {task.name}
                </span>
              </div>
              <button
                style={{
                  width: "auto",
                  margin: "5px",
                }}
                onClick={() => {
                  editTask(task.id);
                  window.history.replaceState(null, "EditTask", "/:taskId/edit");
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

