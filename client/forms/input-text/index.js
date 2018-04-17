import React from 'react';




const LabeledInput = ( props ) => {

    return (
        <div className="form-group">
            { props.label && <label className="form-label">{props.label}:</label> }
            <input type="text" value={ props.value } placeholder={ props.placeholder } onChange={( event ) => props.change( event, { id: 'some-id' })} className="form-control" />
        </div>
    );
};

export default LabeledInput;
