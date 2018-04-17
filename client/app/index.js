import React from 'react';

// Templates
import * as Layout from '../layout/';
import BaseForm from '../forms/';
import LabeledInput from '../forms/input-text';

// Data
import prescriptionObject from '../../data/prescription-medium.json';

// Processors
import Processor from '../processors';


export default class App extends React.Component {
    constructor( props ){
        super( props );

        let processor = new Processor( prescriptionObject );

        this.formComponentsList = processor.getFormComponents();

        console.log( '!!!', this.formComponentsList );
    }

    saveModelHandler( event ) {
        event.preventDefault();
        console.log( 'Saving the form' );
    }

    changeModelHandler( event, opts ) {
        event.preventDefault();
        console.log( 'Event: ', event );
        console.log( 'Options: ', opts );
    }

    render() {
        return (
            <div>
                <Layout.Header />
                <main className="container">
                    <h1>Form manager</h1>
                    <form onSubmit={this.saveModelHandler}>
                        <input type="submit" className="btn btn-primary" value="Save data" />
                    </form>
                </main>
                <Layout.Footer />
            </div>
        );
    }
}
