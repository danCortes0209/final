const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = validateUpdatePassInput = (data) => {
    let errors = {};

    data.password = !isEmpty(data.password) ? data.password : "" ;
    data.password2 = !isEmpty(data.password2) ? data.password2 : "" ;

    if (Validator.equals(data.password, data.password2)) errors.password2 = "La nueva contraseña no debe ser igual a la antigua";

    if (Validator.isEmpty(data.password)) errors.password = "Campo requerido";

    if (Validator.isEmpty(data.password2)) errors.password2 = "Campo requerido";

    if (!Validator.isLength(data.password2, {min: 6, max: 30})) errors.password2 = "la contraseña debe de contener entre 6 y 30 caracteres";

    return {
        errors,
        isValid: isEmpty(errors)
    }

};