import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Table } from 'react-bootstrap'

class BitlyComponent extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Long url</th>
                            <th>Tiny url</th>
                            <th>Copy</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.urls.map(function(url, index){
                        return(
                            <tr key={index}>
                                <td>{url.long_url}</td>
                                <td>{url.url}</td>
                                <td>
                                    <CopyToClipboard text={url.url || ''}>
                                    <button>Copy to clipboard</button>
                                    </CopyToClipboard>
                                </td>
                                <td>[?]</td>
                            </tr>
                        );
                    })}
                        
                    </tbody>

                </Table>
            </div>
        );
    }

}

export default BitlyComponent;
