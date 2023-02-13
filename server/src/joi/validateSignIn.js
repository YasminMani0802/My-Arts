const joi = require('joi');
const regexPatterns = {
    password: /^(?=(.*?[0-9]){4})(?=.*?[A-Z])(?=.*?[a-z])(?=.*[!@#$%^&*-_*]).{8,}$/
}


const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(8).pattern(new RegExp(regexPatterns.password)),
    isArtist: joi.boolean()
});


function validateSignIn(details) {
    return schema.validate(details);
}

module.exports = validateSignIn;