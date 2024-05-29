const TemplatesRepository = require("../repositories/templateRepository");
const templateSchema = require("../schemas/templateSchema");

module.exports = class TemplatesService {
  static async create(templateData) {
    const { error } = templateSchema.validate(templateData, {
      abortEarly: false,
    });

    if (error) {
      throw new Error(error.details.map((detail) => detail.message).join(","));
    }
    if (typeof templateData.phone === "string") {
      templateData.phone = parseInt(templateData.phone, 10);
    }
    const {
      owner,
      emailOwner,
      phone,
      city,
      propertytype,
      description,
      typeofsale,
      images,
    } = templateData;
    return await TemplatesRepository.create({
      owner,
      emailOwner,
      phone,
      city,
      propertytype,
      description,
      typeofsale,
      images,
      active: true,
    });
  }

  static async getById(id) {
    return await TemplatesRepository.findById(id);
  }

  static async getAllActive() {
    return await TemplatesRepository.findAllActive();
  }

  static async deactivateById(id) {
    await TemplatesRepository.deactivateById(id);
  }
};
