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
      firms: FirmStore.getState(),
      actions: {
        initialize: Actions.initialize,
        addFirm:    Actions.addFirm,
        firmEvent:  Actions.firmEvent,
        sort:       Actions.sort,
      },
    };
  }

  render() {
    //console.log("AppContainer::render");
    return ( <AppView firms={this.state.firms} actions={this.state.actions}></AppView> );
  }
}
export default Container.create(AppContainer);
