import AppView from './views/AppView';
import React from 'react';
import {Container} from 'flux/utils';
import FirmStore from './stores/FirmStore';
import Actions from './actions/Actions';

class AppContainer extends React.Component {
  static getStores() {
    //console.log("AppContainer::getStores");
    return [
      FirmStore
    ];
  }
  static calculateState(prevState) {
    //console.log("AppContainer::calculateState");
    console.log(FirmStore.getState());
    debugger;
    return {
      firms:        FirmStore.getState().get("firms"),
      sortInfo:     FirmStore.getState().get("sortInfo"),
      last:         FirmStore.getState().get("last"),
      totQuotes:    FirmStore.getState().get("totQuotes"),
      totBlocks:    FirmStore.getState().get("totBlocks"),
      totPurges:    FirmStore.getState().get("totPurges"),
      totUndPurges: FirmStore.getState().get("totUndPurges"),
      actions: {
        initialize: Actions.initialize,
        addFirm:    Actions.addFirm,
        firmEvent:  Actions.firmEvent,
        sort:       Actions.sort,
      },
    };
  }

  render(props) {
    //console.log("AppContainer::render");
    return ( <AppView firms={this.state.firms} actions={this.state.actions} sortInfo={this.state.sortInfo} last={this.state.last} totQuotes={this.state.totQuotes} totBlocks={this.state.totBlocks} totPurges={this.state.totPurges} totUndPurges={this.state.totUndPurges}></AppView> );
  }
}
export default Container.create(AppContainer);
