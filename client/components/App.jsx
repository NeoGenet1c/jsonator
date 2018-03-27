import React from 'react';
import * as Layout from './Layout.jsx'


export default class App extends React.Component {
    constructor( props ){
        super( props );

        // Set default initial state
        this.state = {
            data: []
        }
    }

    /** Private functions */


    render() {
        return (
            <div>
                <Layout.Header />

                <Layout.Footer />
            </div>
        );
    }
}
