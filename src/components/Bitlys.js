import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Panel } from 'react-bootstrap'
import BitlyActions from '../actions/BitlyActions';
import BityStore from '../stores/BitlyStore';
import Bitly from './url/Bitly';


class BitlysComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            bitlys: null
        }
        this.onChange = this.onChange.bind(this);
        BitlyActions.getAll();
    }

    componentWillMount() {
        BityStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        BityStore.removeChangeListener(this.onChange);
    }


    onChange() {
        this.setState({
            bitlys: BityStore.getLinks()
        });
    }

    render() {
        return (
            <div>
                <Panel header="Shortcut links">
                    {this.state.bitlys != null && this.state.bitlys.length > 0? (
                        <div>
                            <hr></hr>
                            <Bitly urls={this.state.bitlys}></Bitly>
                        </div>
                    ) : (
                            <div>You have 0 shortcut link ... Please go to the home page for add some shortcut link ! ;)</div>
                        )}
                </Panel>

            </div>
        );
    }

}

export default BitlysComponent;
