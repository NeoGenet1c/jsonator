

export class DataValidatorService {

    /**
     * @param {DataValidator[]} dataValidators
     */
    constructor( dataValidators ){
        this.dataValidators = dataValidators;
    }


    /**
     * Validates `subject` with all available validators and
     * returns list of all errors.
     *
     * @return {String[]} List of all found errors.
     */
    validate() {
        if ( !this.subject ) {
            console.warn( 'No subject to be validated has been assigned - skipping validation.', this.dataValidators );
            return;
        }

        let errorMessages = [];

        this.dataValidators.forEach( ( validator ) => {
            let validationError = validator.validate( this.subject );

            if ( validationError ) errorMessages.push( validationError );
        });

        return errorMessages;
    }

    /**
     * @param {Object} subject
     */
    setSubject( subject ) {
        this.subject = subject;
    }

    /**
     * @param {DataValidator} validator
     */
    addValidator( validator ) {
        this.dataValidators.push( validator );
    }
}




class DataValidator {
    validate(){}
}


export class MinItemsValidator extends DataValidator {
    constructor( minItems ) {
        super();
        this.minItems = minItems;
    }

    /**
     * @param {ListedFormComponent} listedFormComponent
     * @return {null|string} - if there's a validation issue,
     * return an error message
     */
    validate( listedFormComponent ) {
        if ( listedFormComponent.childrenList.length < this.minItems ) {
            return `At least ${ this.minItems } item${ this.minItems > 1 ? 's' : '' } must be added.`
        }
    }
}
