import React from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from "./textfieldgroup";

const TextAreaGroup = ({
    name, placeholder, value, error, onChange
}) => {
    return (
        <div className="form__group">
            <textarea
                className={error ? "form__textarea form__textarea--invalid" : "form__textarea form__textarea--valid"}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            { error ? <div className="form__feedback--invalid">{ error }</div> : null }
        </div>
    )
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default TextAreaGroup;