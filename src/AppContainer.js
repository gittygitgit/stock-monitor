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
      groups:            FirmStore.getState().get("groupMap"),
      ports:             FirmStore.getState().get("portsForSelectedGroup"),
      groupSortInfo:     FirmStore.getState().get("groupSortInfo"),
      portSortInfo:      FirmStore.getState().get("portSortInfo"),
      summaryInfo:       FirmStore.getState().get("groupSummaryInfo"),
      selectedGroup:     FirmStore.getState().get("selectedGroup"),
      actions: {
        initialize:      Actions.initialize,
        firmEvent:       Actions.firmEvent,
        sortGroups:      Actions.sortGroups,
        sortPorts:       Actions.sortPorts,
        clickGroupRow:   Actions.clickGroupRow, 
        onClosePorts:    Actions.onClosePorts,
        onWSMessage:     Actions.onWSMessage,
      },
    };
  }

  render(props) {
    //console.log("AppContainer::render");
    return ( <AppView groups={this.state.groups} ports={this.state.ports} actions={this.state.actions} groupSortInfo={this.state.groupSortInfo} portSortInfo={this.state.portSortInfo} summaryInfo={this.state.summaryInfo} selectedGroup={this.state.selectedGroup}></AppView> );
  }
}
export default Container.create(AppContainer);
