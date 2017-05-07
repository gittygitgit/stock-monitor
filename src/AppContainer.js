import AppView from './views/AppView';
import React from 'react';
import {Container} from 'flux/utils';
import FirmStore from './stores/FirmStore';
import Actions from './Actions';
function getStores() {
  console.log("getStores");
  return [
    FirmStore
  ];
}

function getState() {
  console.log("getState");
  console.log(FirmStore.getState());
  return {
    firms: FirmStore.getState(),
    onAddFirm: Actions.addFirm,
  };
}

export default Container.createFunctional(AppView, getStores, getState);
