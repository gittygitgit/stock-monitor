import ActionTypes from './ActionTypes';
import AppDispatcher from './AppDispatcher'

const Actions = {
  addFirm(firm) {
    console.log("addFirm");
    AppDispatcher.dispatch({
      type: ActionTypes.ADD_FIRM,
      firm,
    });
  },
  firmActivity(firm) {
    console.log("firmActivity");
    AppDispatcher.dispatch({
      type: ActionTypes.FIRM_ACTIVITY,
      firm,
    });
  },
};

export default Actions;
