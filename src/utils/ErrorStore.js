function ErrorStore() {
    let errors = null;

    function add(fieldName, fieldValue, validators = [], errorMessage = null) {
    		if(errors && errors.hasOwnProperty(fieldName)) {
        	return;
        }
        let fieldError = null;
        for(let i=0; i < validators.length; i++) {
            fieldError = validators[i](fieldValue);
            if(fieldError) {
                break;
            }
        }
        if(fieldError) {
            if(!errors) {
                errors = {};
            }
            errors[fieldName] = errorMessage || fieldError;
        }
    }
	
  	function addMultiple(fields, validators) {
        for(let i=0; i<fields.length; i++) {
            for(var property in fields[i]) {
                add(property, fields[i][property], validators);
            }
        }
    }

    function get() {
        return errors;
    }

    return {
        add,
        addMultiple,
        get
    };
}

export default ErrorStore;