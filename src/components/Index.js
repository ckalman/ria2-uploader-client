import React, { Component } from 'react';
import AuthStore from '../stores/AuthStore';
import Home from './Home';

class IndexComponent extends Component {

  constructor() {
    super();
  }

  onEnter(){
    window.location.reload();
  }
  render() {
    return (
      <div>
        <h2>UPLOADER</h2>
      </div>
    );
  }
}

export default IndexComponent;
