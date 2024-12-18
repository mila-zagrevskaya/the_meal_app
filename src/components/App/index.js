import React, { Component } from 'react';
import { Router } from 'Router';

import { connect } from 'react-redux';
import {
  doRequestToGetItemsByFirstLetter,
  lookupFullMealDetailsById,
  onSearchInputChange,
  changeSelectedPage,
} from 'actions/actions';

import './style.scss';

class App extends Component {
  render() {
    return <Router />;
  }
}

const mapStateToProps = (state) => ({
  appState: state.appState,
});

const mapDispatchToProps = {
  doRequestToGetItemsByFirstLetter,
  lookupFullMealDetailsById,
  onSearchInputChange,
  changeSelectedPage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
