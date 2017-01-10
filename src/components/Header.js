import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Header, Brand } from 'react-bootstrap';
import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';

class HeaderComponent extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      authenticated: AuthStore.isAuthenticated()
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  componentWillMount() {
    this.initAuth();  
  }

  initAuth(){
    let self = this;
    self.props.lock.on("authenticated", function(authResult) {
      self.props.lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if(error){
          alert(error);
          return;
        }
        AuthActions.logUserIn(profile, authResult.idToken);
        self.setState({authenticated: true});
      });
    });
  }

  login() {    
    this.props.lock.show();
  }

  logout() {
    AuthActions.logUserOut();
    this.setState({authenticated: false});
    this.context.router.push('/');
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">My Uploaders</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          { !this.state.authenticated ? (
            <NavItem onClick={this.login}>Login</NavItem>
          ) : (
            <NavItem onClick={this.logout}>Logout</NavItem>
          )}
        </Nav>
      </Navbar>
    );
  }
}

export default HeaderComponent;
