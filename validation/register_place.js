const isEmpty = require("./is-empty");
const Validator = require("validator");

/*
* Este modulo checa si la cada valor del parametro data (en este caso req.body) está vacio o si no cumple el tamaño
*
* De encontrarse algun problema de estos, se ingresa un mensaje de error en un objeto, el cual despues se regresará mediante json
* */

module.exports = ValidateRegisterPlaceInput = (data) => {
    let errors = [];

    data.name = !isEmpty(data.name) ? data.name: "";
    data.type = !isEmpty(data.type) ? data.type: "";
    data.direction = !isEmpty(data.direction) ? data.direction: "";
    data.description = !isEmpty(data.description) ? data.description: "";

    if (!Validator.isLength(data.name, {min: 2, max: 50})) errors.name = "El nombre debe de contener entre 2 y 50 caracteres";

    if (Validator.isEmpty(data.name)) errors.name = "Campo requerido";

    if (!Validator.isLength(data.type, {min: 2, max: 50})) errors.type = "El nombre debe de contener entre 2 y 50 caracteres";

    if (Validator.isEmpty(data.type)) errors.type = "Campo requerido";

    if (!Validator.isLength(data.direction, {min: 2, max: 50})) errors.direction = "El nombre debe de contener entre 2 y 50 caracteres";

    if (Validator.isEmpty(data.direction)) errors.direction = "Campo requerido";

    if (!Validator.isLength(data.description, {min: 2, max: 50})) errors.description = "El nombre debe de contener entre 2 y 50 caracteres";

    if (Validator.isEmpty(data.description)) errors.description = "Campo requerido";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}