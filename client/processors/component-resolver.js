
// Form Components
import CompositeFormComponent from '../models/composite-form-component';
import ListedFormComponent from '../models/listed-form-component';
import SimpleFormComponent from '../models/simple-form-component';


// Validators
import { DataValidatorService, NonNullPropertiesValidator, MinItemsValidator } from '../validators/data-validators';


let CurrentValidator;

export default function getComponentResolver( prescription, PrescriptionValidator ) {
    if ( PrescriptionValidator ) CurrentValidator = PrescriptionValidator; // Thread unsafe assignment!

    try {
        new CurrentValidator( prescription ).validateProperties();
    } catch( err ) {
        console.error( 'Cannot process rules into components due to a structural error.', err );
        return null;
    }

    if ( prescription.type == 'object' || prescription.type == 'root' ) return new ObjectComponentResolver( prescription );
    if ( prescription.type == 'array' ) return new ArrayComponentResolver( prescription );

    return new SimpleComponentResolver( prescription );
}



class ComponentResolver {

    /**
     * @private
     */
    constructor( prescription ) {
        this.prescription = prescription;
        this.type = prescription.type;
    }

    resolve() {
        console.log( `Resolving... ${ this.type }`);
        return null;
    }
}


class ObjectComponentResolver extends ComponentResolver {
    constructor( prescription ){
        super( prescription );
    }

    resolve( propertyName ) {
        super.resolve();

        this.component = new CompositeFormComponent ({
            propertyName: propertyName,
            reactComponent: this.getUiComponent(),
            validationService: this.getValidationService(),
            childrenComponents: this.getChildrenComponents(),
        })

        return this.component;
    }



    /** Private functions. */

    getChildrenComponents() {
        const childrenComponentsList = [];

        Object.getOwnPropertyNames( this.prescription.properties ).forEach( ( childrenPropertyName ) => {
            const childComponentResolver = getComponentResolver(
                this.prescription.properties[ childrenPropertyName ],
             );

            childrenComponentsList.push( childComponentResolver.resolve( childrenPropertyName ));
        });

        return childrenComponentsList;
    }


    getValidationService() {
        //TODO: Implement
        return null;
    }

    getUiComponent() {
        //TODO: Implement
        return null;
    }
}


class ArrayComponentResolver extends ComponentResolver {
    constructor( prescription ){
        super( prescription );
    }

    resolve( propertyName ) {
        super.resolve();

        this.component = new ListedFormComponent ({
            propertyName: propertyName,
            reactComponent: this.getUiComponent(),
            validationService: this.getValidationService(),
            childItemFormComponent: this.getChildItemFormComponent(),
        })

        return this.component;
    }


    getChildItemFormComponent() {
        const childComponentResolver = getComponentResolver( this.prescription.items );

        return childComponentResolver.resolve();
    }


    getValidationService() {
        const validators = [];

        if ( this.prescription.hasOwnProperty( 'minItems' )){
            validators.push( new MinItemsValidator( this.prescription.minItems ));
        }

        return new DataValidatorService( validators );
    }

    getUiComponent() {
        //TODO: Implement
        return null;
    }
}


class SimpleComponentResolver extends ComponentResolver {
    constructor( prescription ){
        super( prescription );
    }

    resolve( propertyName ) {
        super.resolve();

        this.component = new SimpleFormComponent ({
            propertyName: propertyName,
            reactComponent: this.getUiComponent(),
            validationService: this.getValidationService(),
        });

        return this.component;
    }

    getValidationService() {
        //TODO: Implement
        return null;
    }

    getUiComponent() {
        //TODO: Implement
        return null;
    }
}
