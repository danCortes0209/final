import React from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    name, placeholder, value, error, info, type, disabled, onChange, autoComplete, icon
}) => {
    return(
        <div className="form__group">
            <div className="form__group--input">
                <input type={ type }
                       autoComplete={ autoComplete }
                       className={ error ? "form__input form__input--invalid" : "form__input form__input--valid"}
                       name={ name }
                       placeholder={ placeholder }
                       value={ value }
                       disabled={ disabled }
                       onChange = { onChange }
                />
                <span className={`form__input--icon`}><i className={icon}/></span>
            </div>
            { error ? <div className="form__feedback--invalid">{ error }</div> : <div className="form__feedback--valid">&nbsp;</div> }
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    type: PropTypes.string.isRequired,
    error: PropTypes.string,
    disabled: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoComplete: PropTypes.string,
    icon: PropTypes.string
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;