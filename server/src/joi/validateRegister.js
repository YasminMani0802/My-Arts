const joi = require('joi');
const regexPatterns = [{
        phone: /^\+?[0-9]{3}[ -]?[0-9]{6,12}$/
    },
    {
        password: /^(?=(.*?[0-9]){4})(?=.*?[A-Z])(?=.*?[a-z])(?=.*[!@#$%^&*-_*]).{8,}$/
    }
];

const schema = joi.object({
    fullName: joi.string().required().min(5),
    email: joi.string().required().email(),
    phone: joi.string().required().min(9).max(12).pattern(new RegExp(regexPatterns[0].phone)),
    password: joi.string().required().min(8).pattern(new RegExp(regexPatterns[1].password)),
    isArtist: joi.boolean()
})


function validateRegister(details) {
    return schema.validate(details);
}

module.exports =
    validateRegister;