const Joi = require("joi");

const templateSchema = Joi.object({
  owner: Joi.string().min(1).required().messages({
    "any.required": "O proprietário é obrigatório",
    "string.empty": "O proprietário não pode estar vazio",
  }),
  emailOwner: Joi.string().email().required().messages({
    "any.required": "O email do proprietário é obrigatório",
    "string.email": "Por favor insira um email válido",
  }),
  phone: Joi.alternatives()
    .try(
      Joi.string()
        .pattern(/^[0-9]{10,11}$/)
        .messages({
          "string.pattern.base":
            "O telefone deve conter apenas números e ter entre 10 e 11 dígitos",
        }),
      Joi.number().integer().min(1000000000).max(99999999999).messages({
        "number.base": "O telefone deve ser um número inteiro",
        "number.min": "O telefone deve ter pelo menos 10 dígitos",
        "number.max": "O telefone deve ter no máximo 11 dígitos",
      })
    )
    .required()
    .messages({
      "any.required": "O telefone é obrigatório",
    }),
  city: Joi.string().min(1).required().messages({
    "any.required": "A cidade é obrigatória",
    "string.empty": "A cidade não pode estar vazia",
  }),
  propertytype: Joi.string().min(1).required().messages({
    "any.required": "O tipo de propriedade é obrigatório",
    "string.empty": "O tipo de propriedade não pode estar vazio",
  }),
  description: Joi.string().min(1).required().messages({
    "any.required": "A descrição é obrigatória",
    "string.empty": "A descrição não pode estar vazia",
  }),
  typeofsale: Joi.string().min(1).required().messages({
    "any.required": "O tipo de venda é obrigatório",
    "string.empty": "O tipo de venda não pode estar vazio",
  }),
  images: Joi.array().items(Joi.string()).min(1).required().messages({
    "any.required": "Pelo menos uma imagem é obrigatória",
    "array.min": "Pelo menos uma imagem é obrigatória",
  }),
  active: Joi.boolean().default(true),
});

module.exports = templateSchema;
