export default class FormComponent {
    constructor( propertyName = null, reactComponent = null, validationService ) {
        this.propertyName = propertyName;
        this.reactComponent = reactComponent;
        this.validationService = validationService;

        if ( this.validationService ) this.validationService.setSubject( this )
    }

    setParent( parentFormComponent ) { this.parent = parentFormComponent; }

    validate() {
        this.validationErrors = this.validationService.validate();
    }

    getOutputObject() {}
}
