export const inputChangedHandler = (value, formIdentifier, requiredObject, isTest = false) => {

    // check current state
    let myCurrentState = isTest ? requiredObject.state() : requiredObject.state;
    // check validity
    let checkValidity = (value, rules) => {
        let isValid = true;
    
        // check if validation object exists (it does not on drop down field)
        if (!rules) {
            return true;
        }
    
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
            console.log("got here");
        }
    
        if (rules.minlength) {
            isValid = value.length >= rules.minlength && isValid;
        }
    
        if (rules.maxlength) {
            isValid = value.length <= rules.maxlength && isValid;
        }
    
        return isValid;
    };
    // update controls
    const updatedControls = {
        ...myCurrentState.controls,
        [formIdentifier]: {
            ...myCurrentState.controls[formIdentifier],
            value: value,
            valid: checkValidity(
                value,
                myCurrentState.controls[formIdentifier].validation
            ),
            touched: true
        }
    };

    requiredObject.setState({ controls: updatedControls });
}