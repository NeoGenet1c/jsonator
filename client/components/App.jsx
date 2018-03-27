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
                <main>
                    <h1>Form manager</h1>
                    <p>Body</p>
                </main>
                <Layout.Footer />
            </div>
        );
    }
}
