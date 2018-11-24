const isEmpty = require("./is-empty");
const Validator = require("validator");


module.exports = validateLoginInput = (data) => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!Validator.isEmail(data.email)) errors.email = "Email invalido";

    if (Validator.isEmpty(data.email)) errors.email = "Campo requerido";

    if (Validator.isEmpty(data.password)) errors.password = "Campo requerido";

    return {
        errors,
        isValid: isEmpty(errors)
    }
};