import _isArray from 'lodash/isArray';
import _isNumber from 'lodash/isNumber';
import _isString from 'lodash/isString';
import _isBoolean from 'lodash/isBoolean';
import _isObject from 'lodash/isObject';



function isType( obj, typeName ){
    switch( typeName ) {
        case 'array': return _isArray( obj.valueOf() )
        case 'string': return _isString( obj.valueOf() )
        case 'number': return _isNumber( obj.valueOf() )
        case 'boolean': return _isBoolean( obj.valueOf() )
        case 'object': return _isObject( obj.valueOf() )
        default: return false;
    }
}

export { isType };

