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
    return {
      firms:             FirmStore.getState().get("firms"),
      ports:             FirmStore.getState().get("ports"),
      sortInfo:          FirmStore.getState().get("sortInfo"),
      summaryInfo:       FirmStore.getState().get("summaryInfo"),
      selectedGroup:     FirmStore.getState().get("selectedGroup"),
      actions: {
        initialize:      Actions.initialize,
        addFirm:         Actions.addFirm,
        firmEvent:       Actions.firmEvent,
        sort:            Actions.sort,
        clickGroupRow:   Actions.clickGroupRow, 
        onClosePorts:    Actions.onClosePorts,
      },
    };
  }

  render(props) {
    //console.log("AppContainer::render");
    return ( <AppView firms={this.state.firms} ports={this.state.ports} actions={this.state.actions} sortInfo={this.state.sortInfo} summaryInfo={this.state.summaryInfo} selectedGroup={this.state.selectedGroup}></AppView> );
  }
}
export default Container.create(AppContainer);
