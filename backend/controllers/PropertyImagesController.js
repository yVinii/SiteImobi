const PropertyImages = require('../models/PropertyImages');

module.exports = class PropertyImagesController {
  static async createPropertyImage(propertyId, imagePath) {
    try {
      const createdImage = await PropertyImages.create({
        propertyId,
        image: imagePath,
      });
      return createdImage;
    } catch (error) {
      throw new Error(`Erro ao criar imagem para propriedade: ${error.message}`);
    }
  }

  // Outras operações conforme necessário
};
