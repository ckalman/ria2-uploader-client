import React, { Component } from 'react';
import AuthStore from '../stores/AuthStore';
import BitlyActions from '../actions/BitlyActions';
import BityStore from '../stores/BitlyStore';
import { Form, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class HomeComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            profile: AuthStore.getUser(),
            longUrl: '',
            shortcutDisabled: false,
            link: {}
        }
        this.onChange = this.onChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleShortCutSubmit = this.handleShortCutSubmit.bind(this);
    }
    componentWillMount() {
        BityStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        BityStore.removeChangeListener(this.onChange);
    }

    handleEmailChange(e) {
        this.setState({ longUrl: e.target.value });
    }

    handleShortCutSubmit() {
        BitlyActions.short(this.state.longUrl);
        //this.setState({ shortcutDisabled: true });
    }

    onChange() {
        this.setState({
            link: BityStore.getLink()
        });
  }
  
    render() {
        return (
            <div>
                <h2>Welcome : {this.state.profile.nickname}</h2>
                <div>
                    <p> Shortcut your url : </p>
                    <input type="text" name="longUrl" placeholder="http://google.ch" onChange={this.handleEmailChange} />
                    <p>{this.state.link.url}</p>
                    <Button onClick={this.handleShortCutSubmit} disabled={this.state.shortcutDisabled}>
                        shortcut this url
                            </Button>
                    <p> or upload photos : </p>

                </div>
            </div>
        );
    }

}

export default HomeComponent;
