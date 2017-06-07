import ActionTypes from './ActionTypes';
import AppDispatcher from '../AppDispatcher'

const Actions = {
  initialize() {
    console.log("Actions::initialize");
    AppDispatcher.dispatch({
      type: ActionTypes.INITIALIZE,
    });
  },
  addFirm(firm) {
    console.log("Actions::addFirm");
    console.log(firm);
    AppDispatcher.dispatch({
      type: ActionTypes.ADD_FIRM,
      firm,
    });
  },
  firmEvent(firm) {
//    console.log("Actions::firmEvent");
    AppDispatcher.dispatch({
      type: ActionTypes.FIRM_EVENT,
      firm,
    });
  },
  sort(sorted, sortCol, sortDir) {
    console.log("Actions::sort [sortCol=%s, sortDir=%s]", sortCol, sortDir);
    AppDispatcher.dispatch({
      type:    ActionTypes.SORT,
      rows:    sorted,
      sortCol: sortCol,
      sortDir: sortDir,
    });
  },
};

export default Actions;
