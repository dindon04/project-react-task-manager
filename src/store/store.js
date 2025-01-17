import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { localStorageMiddleware } from "./middleware";

/*localStorage или пустое*/
const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(localStorageMiddleware)
);

/*подписывается на изменения*/
store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

console.log("Initial state:", persistedState); 
console.log("Current state:", store.getState()); 

export default store;
