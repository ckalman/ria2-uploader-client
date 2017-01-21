import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Panel } from 'react-bootstrap'
import BitlyActions from '../actions/BitlyActions';
import UploadActions from '../actions/UploadActions';
import UploadStore from '../stores/UploadStore';
import BityStore from '../stores/BitlyStore';
import Bitly from './url/Bitly';
import Upload from './url/Upload';


class UploadComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            uploads: null
        }
        this.onChange = this.onChange.bind(this);
        UploadActions.getAll();
    }

    componentWillMount() {
        BityStore.addChangeListener(this.onChange);
        UploadStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        BityStore.removeChangeListener(this.onChange);
        UploadStore.removeChangeListener(this.onChange);
    }


    onChange() {
        this.setState({
            uploads: UploadStore.getFiles()
        });
    }

    render() {
        return (
            <div>
                    <Panel header="Uploaded photos">                        
                        {this.state.uploads != null && this.state.uploads.length >0 ? (
                            <div>
                                <hr></hr>
                                <Upload urls={this.state.uploads}></Upload>
                            </div>
                        ) : (
                        <div>You have uploaded nothing ... Please upload someting : go to the home page. ;)</div>
                            )}
                    </Panel>

            </div>
        );
    }

}

export default UploadComponent;
