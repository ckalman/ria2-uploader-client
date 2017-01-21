// Root.js

import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Index from './components/Index';
import Home from './components/Home';
import Uploads from './components/Uploads';
import Bitlys from './components/Bitlys';

import App from './components/App';

class Root extends Component {

  // We need to provide a list of routes
  // for our app, and in this case we are
  // doing so from a Root component
  render() {
    return (
      <Router history={this.props.history}>
        <Route path='/' component={App}>
          <IndexRoute component={Index}/>
          <Route path='/home' component={Home} />
          <Route path='/myUploads' component={Uploads} />
          <Route path='/myLinks' component={Bitlys} />
          {/*<Route path='/contact/:id' component={ContactDetail} />*/}
        </Route>
      </Router>
    );
  }
}

export default Root;
