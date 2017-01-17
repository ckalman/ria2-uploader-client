import React, { Component } from 'react';
import AuthStore from '../stores/AuthStore';
import BitlyActions from '../actions/BitlyActions';
import BityStore from '../stores/BitlyStore';
import Bitly from './url/Bitly';
import Dropzone from 'react-dropzone';
import { Form, Button, FormGroup, FormControl, ControlLabel, Panel } from 'react-bootstrap'

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

    handleShortCutSubmit(e) {
        e.preventDefault();
        console.log(this.state.longUrl);
        BitlyActions.short(this.state.longUrl);
    }

    onDrop(acceptedFiles, rejectedFiles) {
        console.log('Accepted files: ', acceptedFiles);
        console.log('Rejected files: ', rejectedFiles);
    }

    onChange() {
        this.setState({
            link: BityStore.getLink()
        });
    }

    render() {
        return (
            <div>
                <h3 className="center" >Welcome : {this.state.profile.nickname}</h3>
                <div>
                    <Panel header="Shortcut your url">
                        <Form className="center" inline onSubmit={this.handleShortCutSubmit}>
                            <FormGroup controlId="formInlineEmail">
                                <FormControl type="url" name="longUrl" placeholder="http://google.ch" onChange={this.handleEmailChange} required />
                            </FormGroup>
                            {' '}
                            <Button type="submit">
                                shortcut this url
                        </Button>
                        </Form>

                        {this.state.link.url != null ? (
                            <div>
                                <hr></hr>
                                <Bitly urls={[this.state.link]}></Bitly>
                            </div>
                        ) : (
                                <div></div>
                            )}
                    </Panel>
                    <Panel header="Upload photos">
                        <Dropzone onDrop={this.onDrop}>
                            <div>Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>
                    </Panel>

                </div>
            </div>
        );
    }

}

export default HomeComponent;
