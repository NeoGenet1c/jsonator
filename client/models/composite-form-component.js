import FormComponent from './form-component';





export default class CompositeFormComponent extends FormComponent {
    constructor({ propertyName, reactComponent, validationService, childrenComponents }) {
        super( propertyName, reactComponent, validationService );
        this.childrenComponents = childrenComponents;
    }

    assignParentToChildren() {
        this.childrenComponents.forEach( ( child ) => child.addParent( this ) );
    }
}
