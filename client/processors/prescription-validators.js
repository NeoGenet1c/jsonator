import { isType } from '../utils/';



/** Related exceptions and errors. */

class InvalidPrescriptionStructureException extends SyntaxError {
    constructor( message, prescriptionRule ) {
        super( message );
        this.invalidPrescriptionRule = prescriptionRule;
    }
}

class InvalidPrescriptionStructureError extends SyntaxError {
    constructor( message, prescriptionRule ) {
        super( message );
        this.invalidPrescriptionRule = prescriptionRule;
    }
}



/**
 * Definitions of required and optional properties for
 * each existing 'type'.
 */
const typePropertiesDefinitions = {

    root: {
        'required': {
            'type': 'string',
            'properties': 'object'
        },
        'optional': {
            'description': 'string',
            'required': 'array',
            'definitions': 'object',
            'ui': 'object'
        }
    },

    object: {
        'required': {
            'type': 'string',
            'properties': 'object'
        },
        'optional': {
            'required': 'array',
            'ui': 'object'
        }
    },

    array: {
        'required': {
            'type': 'string',
            'items': 'object'
        },
        'optional': {
            'minItems': 'number',
            'ui': 'object'
        }
    },

    string: {
        'required': {
            'type': 'string'
        },
        'optional': {
            'ui': 'object'
        }
    }
};



export default class PrescriptionTypeValidator {

    /**
     * @param {Object} prescriptionRuleObject
     *
     * @throws {InvalidPrescriptionStructureError}
     */
    constructor( prescriptionRuleObject ) {
        this.ruleType           = prescriptionRuleObject.type;
        this.prescriptionRule   = prescriptionRuleObject;

        this.checkRuleTypeValidity();

        this.required = typePropertiesDefinitions[ this.ruleType ].required || {};
        this.optional = typePropertiesDefinitions[ this.ruleType ].optional || {};
    }



    /** Public methods */


    /**
     * @public
     *
     * @throws {InvalidPrescriptionStructureException}
     * @return {void}
     */
    validateProperties() {
        this.validateRequiredPropertiesPresence();
        this.validatePropertiesDataTypes();
    }


    /**
     * @public
     *
     * @throws {InvalidPrescriptionStructureException}
     * @return {void}
     */
    validateRequiredPropertiesPresence() {
        const requiredPropertyNames = Object.getOwnPropertyNames( this.required );

        requiredPropertyNames.forEach( ( requiredPropertyName ) => {
            if ( !this.prescriptionRule.hasOwnProperty( requiredPropertyName ) ) {
                throw new InvalidPrescriptionStructureException( `A Prescription requires property '${requiredPropertyName}' inside rule type '${this.ruleType}.'`, this.prescriptionRule );
            }
        });
    }


    /**
     * @public
     *
     * @throws {InvalidPrescriptionStructureException}
     */
    validatePropertiesDataTypes() {
        const rulesPropertyNames = Object.getOwnPropertyNames( this.prescriptionRule );

        rulesPropertyNames.forEach( ( propertyName ) => {
            let expectedDataType;

            if ( this.required.hasOwnProperty( propertyName ) ) expectedDataType = this.required[ propertyName ];
            if ( this.optional.hasOwnProperty( propertyName ) ) expectedDataType = this.optional[ propertyName ];

            if ( !expectedDataType ) {
                // Check that all the properties belong either to required or optional...
                let allowedProperties = Object.getOwnPropertyNames( this.required ).concat( Object.getOwnPropertyNames( this.optional ));

                console.warn( `Unknown property '${propertyName}' specified for the object with '${this.ruleType}' type. Allowed properties: [${ allowedProperties.join( '|' ) }]. The property will be ignored.'` );
            } else if ( !isType( this.prescriptionRule[ propertyName ], expectedDataType ) ) {
                // ... and their types are correct.
                throw new InvalidPrescriptionStructureException( `A rule with 'type': '${this.ruleType}' contains a property '${propertyName}' with invalid data type '${ typeof ( this.prescriptionRule[ propertyName ] ) }'. The data type of '${propertyName}' property must be '${expectedDataType}'.`, this.prescriptionRule );
            }
        });
    }



    /** Private functions */


    /**
     * @private
     *
     * @throws {InvalidPrescriptionStructureError}
     */
    checkRuleTypeValidity() {
        if ( !typePropertiesDefinitions.hasOwnProperty( this.ruleType )) {
            let allowedRuleDataTypes = Object.getOwnPropertyNames( typePropertiesDefinitions );

            throw new InvalidPrescriptionStructureError( `Cannot create a prescription validator - 'type': '${this.ruleType}' is not allowed or known rule type. Allowed rule types: [${ allowedRuleDataTypes.join( '|') }]` );
        }
    }
}
