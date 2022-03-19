import { createStore } from "redux";

function reducer(state, action) {
  return action;
}

const stateManagement = createStore(reducer);

export default stateManagement;
