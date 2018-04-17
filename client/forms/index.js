import React from 'react';

import LabeledInput from './input-text';

const BaseForm = ({ rootPrescription, saveModel }) => {

    // Return JSX
    return (
        <form onSubmit={saveModel}>
            <small id="emailHelp" className="form-text text-muted">We'll never share this with anyone else</small>

            <input type="submit" value="Save" />
        </form>
    );
};

export default BaseForm;
