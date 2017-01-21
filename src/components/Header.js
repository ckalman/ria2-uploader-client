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

  initAuth() {
    let self = this;
    self.props.lock.on("authenticated", function (authResult) {
      self.props.lock.getUserInfo(authResult.accessToken, function (error, profile) {
        if (error) {
          alert(error);
          return;
        }
        self.setState({ authenticated: true });
        AuthActions.logUserIn(profile, authResult.idToken);
        self.context.router.push('/home');
      });
    });
  }

  login() {
    this.context.router.push('/');    
    this.props.lock.show();
  }

  logout() {
    this.context.router.push('/');
    this.setState({ authenticated: false });
    AuthActions.logUserOut();
    window.location.reload();
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">My Uploaders</a>
          </Navbar.Brand>
        </Navbar.Header>
        {!this.state.authenticated ? (
          <Nav>
            <NavItem onClick={this.login}>Login</NavItem>
          </Nav>
        ) : (
            <Nav>
              <NavItem href="/home">Home</NavItem>
              <NavItem href="/myUploads">My Uploads</NavItem>
              <NavItem href="/myLinks">My Links</NavItem>
              <NavItem onClick={this.logout}>Logout</NavItem>
            </Nav>
          )}
      </Navbar>
    );
  }
}

export default HeaderComponent;
