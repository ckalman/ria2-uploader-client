import React, { Component } from 'react';
import AuthStore from '../stores/AuthStore';
import { Form, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class HomeComponent extends React.Component {

        constructor() {
            super();
            this.state = {
                profile: AuthStore.getUser(),
                longUrl: '',
                shortcutDisabled: false
            }
            this.handleEmailChange = this.handleEmailChange.bind(this);
            this.handleShortCutSubmit = this.handleShortCutSubmit.bind(this);
        }
    
        handleEmailChange(e) {
            this.setState({ longUrl: e.target.value });
        }
    
        handleShortCutSubmit(){
            this.setState({shortcutDisabled: true});
        }
    
        render() {
            return (
                <div>
                    <h2>Welcome : {this.state.profile.nickname}</h2>
                    <div>
                        <p> Shortcut your url : </p>
                        <Form inline>
                            <FormGroup controlId="formInlineName">
                                <ControlLabel>URL</ControlLabel>
                                {' '}
                                <FormControl type="text" name="longUrl" placeholder="http://google.ch" onChange={this.handleEmailChange} />
                            </FormGroup>
                            {' '}
                            <Button onClick={this.handleShortCutSubmit} disabled={this.state.shortcutDisabled}>
                                shortcut this url
                            </Button>
                        </Form>
                        <p> or upload photos : </p>
    
                    </div>
                </div>
            );
        }
    
}

export default HomeComponent;
