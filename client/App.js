import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { getPlayersThunk } from './store'
import { connect } from 'react-redux';

import Nav from './Nav';
import Home from './Home';
import Arena from './Arena';
import Players from './players/Players';

class App extends Component {

  componentDidMount() {
    this.props.fetchPlayers();
  }

  render() {

    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/arena' component={Arena} />
            <Route exact path='/players' component={Players} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlayers: () => dispatch(getPlayersThunk())
  }
}

export default connect(null, mapDispatchToProps)(App);

