const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = validateUpdateEmailInput = (data) => {
    let errors = { };

    data.email = !isEmpty(data.email) ? data.email : "";
    data.email2 = !isEmpty(data.email2) ? data.email2 : "";

    if (!Validator.isEmail(data.email2)) errors.email2 = "Email invalido";

    if (Validator.equals(data.email, data.email2)) errors.email2 = "EL nuevo correo electronico no debe ser igual al anterior";

    if (Validator.isEmpty(data.email)) errors.email = "Campo es requerido";

    if (Validator.isEmpty(data.email2)) errors.email2 = "Campo es requerido";

    return {
        errors,
        isValid: isEmpty(errors)
    }
    
};