const Joi = require("joi");

const clienteSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "any.required": "Por favor insira um nome",
    "string.empty": "O nome não pode estar vazio",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Por favor insira um email válido",
    "string.email": "Por favor insira um email válido",
  }),
  phone: Joi.alternatives()
    .try(
      Joi.string()
        .pattern(/^[0-9]{10,11}$/)
        .required()
        .messages({
          "string.pattern.base":
            "O telefone deve conter apenas números e ter entre 10 e 11 dígitos",
        }),
      Joi.number()
        .integer()
        .min(1000000000)
        .max(99999999999)
        .required()
        .messages({
          "number.base": "O telefone deve ser um número inteiro",
          "number.min": "O telefone deve ter pelo menos 10 dígitos",
          "number.max": "O telefone deve ter no máximo 11 dígitos",
        })
    )
    .required()
    .messages({
      "any.required": "Por favor insira um telefone válido",
    }),
  idProperty: Joi.number().required().messages({
    "any.required": "Escolha uma propriedade",
  }),
});

module.exports = clienteSchema;
