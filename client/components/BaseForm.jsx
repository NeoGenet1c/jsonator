import React from 'react';

const BaseForm = ( {rootPrescription, saveModel} ) => {

    // Input Tracker
    let input;

    // Return JSX
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            saveModel();
        }}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">{rootPrescription.label}</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="HIIT course" />
                <small id="emailHelp" className="form-text text-muted">We'll never share this with anyone else</small>
            </div>
        </form>
    );
};

export default BaseForm;
