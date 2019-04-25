import React, { Component } from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Starwars from './pages/Starwars/Starwars';
import PageNotFound from './pages/PageNotFound/PageNotFound';

import './App.scss';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <Router>
            <Switch>
              <Route exact path="/" component={Starwars} />
              <Route component={PageNotFound} />
            </Switch>
          </Router>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error : state.Error.value
  }
}

export default connect(mapStateToProps)(App);
