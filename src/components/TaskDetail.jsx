import { useSelector } from "react-redux";

export const TaskDetail = ({ taskId, onClose }) => {
  const tasks = useSelector((state) => state.tasks);
  const task = tasks.find((item) => item.id === parseInt(taskId));

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div 
       style={{
        margin: "10px"
       }}>
      <h2>{task.name}</h2>
      <p>{task.description}</p>
      <p>Status: {task.completed ? "Completed" : "Not completed"}</p>
      <button
        onClick={() => {
          onClose();
          window.history.replaceState(null, "Home", "/");
         
        }}
      >
        Close
      </button>
      {/* Вывод деталей задачи */}
    </div>
  );
};
