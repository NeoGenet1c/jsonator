import FormComponent from './form-component';





export default class ListedFormComponent extends FormComponent {
    constructor({ propertyName, reactComponent, validationService, childItemFormComponent }) {
        super( propertyName, reactComponent, validationService );

        this.childItemFormComponent = childItemFormComponent;
        this.childItemFormComponent.setParent( this );
        this.childrenList = [];
    }
}
