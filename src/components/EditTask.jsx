<div className="edit-div"
      style={{
        margin: "10px"
      }}>
      <h1>Edit Task</h1>
      
      <form onSubmit>
        <div>
          <label htmlFor="taskName">Task Name </label>
          <input
            type="text"
            id="taskName"
          />
        </div>

        <div id="taskContainer">
          <label htmlFor="taskDescription">Task Description</label>
          <textarea
            id="taskDescription"
          />
        </div>
        <button
          type="submit"
          onClick={() => {
            window.history.replaceState(null, "Home", "/");
          }}
        >
          Save
        </button>
      </form>
    </div>
