import FormComponent from './form-component';





export default class SimpleFormComponent extends FormComponent {
    constructor({ propertyName, reactComponent, validationService, initialValue = null }) {
        super( propertyName, reactComponent, validationService );

        this.value = initialValue;
    }
}
