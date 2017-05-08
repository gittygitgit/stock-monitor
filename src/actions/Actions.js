import ActionTypes from './ActionTypes';
import AppDispatcher from '../AppDispatcher'

const Actions = {
  initialize() {
    console.log("initialize");
    AppDispatcher.dispatch({
      type: ActionTypes.INITIALIZE,
    });
  },
  addFirm(firm) {
    console.log("addFirm");
    console.log(firm);
    AppDispatcher.dispatch({
      type: ActionTypes.ADD_FIRM,
      firm,
    });
  },
  firmEvent(firm) {
    console.log("firmEvent");
    AppDispatcher.dispatch({
      type: ActionTypes.FIRM_EVENT,
      firm,
    });
  },
};

export default Actions;
