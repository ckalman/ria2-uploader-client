import React, { Component } from 'react';
import BitlyActions from '../../actions/BitlyActions';
import BitlyStore from '../../stores/BitlyStore';
import UploadActions from '../../actions/UploadActions';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Table, Panel } from 'react-bootstrap'

class BitlyComponent extends Component {

    constructor() {
        super();
        this.state = {
            info: {},
            search_url: ''
        }
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        BitlyStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        BitlyStore.removeChangeListener(this.onChange);
    }

    handleClick(url) {
        BitlyActions.getInfo(url);
        this.state.search_url = url;
    }

    handleRemoveClick(uuid){
        UploadActions.remove(uuid);
    }


    onChange() {
        console.log("info : ", BitlyStore.getInfo());
        this.setState({
            info: BitlyStore.getInfo()
        });
    }

    render() {
        return (
            <div>
                {this.state.info.link_clicks != undefined ? (
                    <Panel header={"Link info " + this.state.search_url}>
                        <p> Number of clicks {this.state.info.link_clicks} </p>
                        <br></br>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Countries</th>
                                    <th>Number of clicks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.info.countries.map(function (country, index) {
                                    return (
                                        <tr key={index}>
                                            <td>{country.country}</td>
                                            <td>{country.clicks}</td>
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </Table>
                    </Panel>
                ) : (
                        <div></div>
                    )}
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Long url</th>
                            <th>Tiny url</th>
                            <th>Copy</th>
                            <th>Info</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.urls.map(function (url, index) {
                            return (
                                <tr key={index}>
                                    <td>{url.long_url}</td>
                                    <td>{url.url}</td>
                                    <td>
                                        <CopyToClipboard text={url.url || ''}>
                                            <button>Copy to clipboard</button>
                                        </CopyToClipboard>
                                    </td>
                                    <td><button onClick={() => this.handleClick(url.url)}>INFO</button></td>
                                    <td><button onClick={() => this.handleRemoveClick(url.info.uuid)}>Remove</button></td>
                                </tr>
                            );
                        }.bind(this))}

                    </tbody>

                </Table>
            </div>
        );
    }

}

export default BitlyComponent;
