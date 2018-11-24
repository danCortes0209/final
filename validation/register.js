const isEmpty = require("./is-empty");
const Validator = require("validator");

/*
* Este modulo checa si la cada valor del parametro data (en este caso req.body) está vacio o si no cumple el tamaño
*
* De encontrarse algun problema de estos, se ingresa un mensaje de error en un objeto, el cual despues se regresará mediante json
* */

module.exports = validateRegisterInput = (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.question = !isEmpty(data.question) ? data.question : "";
    data.answer = !isEmpty(data.answer) ? data.answer : "";

    if (!Validator.isLength(data.name, {min: 2, max: 50})) errors.name = "El nombre debe de contener entre 2 y 50 caracteres";

    if (Validator.isEmpty(data.name)) errors.name = "Campo requerido";

    if (Validator.isEmpty(data.email)) errors.email = "Campo requerido";

    if (!Validator.isEmail(data.email)) errors.email = "Email invalido";

    if (Validator.isEmpty(data.password)) errors.password = "Campo requerido";

    if (!Validator.isLength(data.password, {min: 6, max: 30})) errors.password = "la contraseña debe de contener entre 6 y 30 caracteres";

    if (Validator.isEmpty(data.password2)) errors.password2 = "Por favor confirme su contraseña";

    if (!Validator.equals(data.password, data.password2))  errors.password2  = "Las contraseñas debe de coincidir";

    //if (Validator.isEmpty(data.question)) errors.question = "Debe de elegir una pregunta de seguridad";

    //if (Validator.isEmpty(data.answer)) errors.answer = "Debe de introducir una respuesta";

    //if (!Validator.isLength(data.answer, {min:6, max: 30} )) errors.answer = "la respuesta debe de contener entre 6 y 30 caracteres";

    return {
        errors,
        isValid: isEmpty(errors)
    }
};