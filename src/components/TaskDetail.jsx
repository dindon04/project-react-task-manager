<div 
    style={{
    margin: "10px"
    }}>
    <h2></h2>
    <p></p>
    <p>Status:</p>
    <button
    onClick={() => {
          
        window.history.replaceState(null, "Home", "/");
          
    }}
      >
    Close
    </button>
    {/* Вывод деталей задачи */}
</div>
