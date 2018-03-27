import React from 'react';

// Templates
import * as Layout from './Layout.jsx';
import BaseForm from './BaseForm.jsx';

// Data
import prescriptionJson from '../../test/prescription.json';


export default class App extends React.Component {
    constructor( props ){
        super( props );

        // Set default initial state
        this.state = {
            data: {
                label: 'Course title'
            }
        };
    }


    /** Private functions */



    render() {
        return (
            <div>
                <Layout.Header />
                <main className="container">
                    <h1>Form manager</h1>
                    <BaseForm rootPrescription={this.state.data} />
                </main>
                <Layout.Footer />
            </div>
        );
    }
}
