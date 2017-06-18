import ActionTypes from './ActionTypes';
import AppDispatcher from '../AppDispatcher'

const Actions = {
  initialize() {
    console.log("Actions::initialize");
    AppDispatcher.dispatch({
      type: ActionTypes.INITIALIZE,
    });
  },
  firmEvent(firm) {
//    console.log("Actions::firmEvent");
    AppDispatcher.dispatch({
      type: ActionTypes.ON_PORT_UPDATE,
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
  clickGroupRow(rowIndex) {
    console.log("Actions::clickGroupRow [rowIndex=%s], rowIndex");
    AppDispatcher.dispatch({
      type: ActionTypes.CLICK_GROUP_ROW,
      rowIndex:  rowIndex,
    });
  },
  onClosePorts() {
    console.log("Actions::onClosePorts");
    AppDispatcher.dispatch({
      type: ActionTypes.CLOSE_PORTS,
    });
  }
};

export default Actions;
