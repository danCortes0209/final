import React from 'react';
import PropTypes from 'prop-types';

const DataListGroup = ({
    name, placeholder, value, error, onChange ,options
}) => {
    const selectOptions = options.map(option => (
        <option key={option._id} value={option._id}>
            {option.name}
        </option>
    ));
    return(
        <div className="form__group">
            <select name={name} onChange={onChange} value={value}>
                <option value="">Seleccione una opcion</option>
                {selectOptions}
            </select>
            {error ? <div className="form__feedback--invalid">{ error }</div>
                : <div className="form__feedback--valid">&nbsp;</div> }
        </div>
    );
};

DataListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};

DataListGroup.defaultProps = {
    type: 'text'
};

export default DataListGroup;