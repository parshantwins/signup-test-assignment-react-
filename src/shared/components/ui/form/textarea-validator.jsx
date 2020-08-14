import React, { Fragment } from 'react';
import { ValidatorComponent } from 'react-form-validator-core';

class TextareaValidator extends ValidatorComponent {

    render() {
        const { isValid } = this.state;
        const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;
        return (
            <Fragment>
                <div className="Form">
                    <div className="input-group">
                        <textarea
                            {...rest}
                            ref={(r) => { this.textarea = r; }}
                        />
                    </div>
                    <div className="error">
                        {this.errorText()}
                    </div>
                </div>
            </Fragment>
        );
    }

    errorText() {
        const { isValid } = this.state;

        if (isValid) {
            return null;
        }

        return (
            this.getErrorMessage()
        );
    }
}

export default TextareaValidator;