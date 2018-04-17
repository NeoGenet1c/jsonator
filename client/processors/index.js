import PrescriptionTypeValidator from './prescription-validators';
import getComponentResolver from './component-resolver';

import FormComponent from './../models/form-component';




class Processor {
    constructor( prescription ){
        this.prescription = prescription;

        this.normalisePrescription();
    }


    /**
     * @private
     */
    normalisePrescription() {
        this.prescription.type = 'root' || this.prescription.type;
    }

    /**
     * @public
     *
     * @return {FormComponent}
     */
    getFormComponents() {
        let componentResolver = getComponentResolver( this.prescription, PrescriptionTypeValidator );

        return componentResolver && componentResolver.resolve();
    }

}


export default Processor;
