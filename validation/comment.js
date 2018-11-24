const isEmpty = require("./is-empty");
const Validator = require("validator");



module.exports = validateCommentInput = (data) =>{
    let errors = { };

    data.text = !isEmpty(data.text) ? data.text : "" ;

    if (Validator.isEmpty(data.text)) errors.text = "Campo requerido";

    if (!Validator.isLength(data.text, {min: 2, max:400})) errors.text = "El comentario debe de contener de  2 a 400 caracteres";

    return{
        errors,
        isValid: isEmpty(errors)
    }
};