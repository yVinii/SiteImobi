const PropertiesRepository = require("../repositories/PropertiesRepository");
const CityRepository = require("../repositories/cityRepository");
const BrokerRepository = require('../repositories/brokerRepository');
const PropertyTypeRepository = require('../repositories/propertyTypeRepository');


    module.exports = class PropertiesService {
        static async create(propertyData) {
            // Validations
            const {title, typeofsale, address, cityId, neighborhood, value, nbedrooms, propertyTypeId, buildm2, groundm2, description, nsuites, nvacancies, nbathrooms, register, owner, ownerPhone, brokerId, images} = propertyData;
            
            //validations
            if(!title){
                throw new Error("O titulo do imóvel é obrigatório")
            }
    
            if(!typeofsale){
                throw new Error("O typeofsale do imóvel é obrigatório")
            }
    
            if(!address){
                throw new Error("O address do imóvel é obrigatório")
            }
    
            if(!neighborhood){
                throw new Error("O neighborhood do imóvel é obrigatório")
            }
    
            if(!value){
                throw new Error("O value do imóvel é obrigatório")
            }
    
            if(!nbedrooms){
                throw new Error("O nbedrooms do imóvel é obrigatório")
            }
    
            if(!buildm2){
                throw new Error("O buildm2 do imóvel é obrigatório")
            }
    
            if(!groundm2){
                throw new Error("O groundm2 do imóvel é obrigatório")
            }
    
            if(!description){
                throw new Error("O description do imóvel é obrigatório")
            }
    
            if(!nsuites){
                throw new Error("O nsuites do imóvel é obrigatório")
            }
    
            if(!nvacancies){
                throw new Error("O nvacancies do imóvel é obrigatório")
            }
    
            if(!nbathrooms){
                throw new Error("O nbathrooms do imóvel é obrigatório")
            }
    
            if(!register){
                throw new Error("O register do imóvel é obrigatório")
            }
            
            if(!owner){
                throw new Error("O owner do imóvel é obrigatório")
            }
    
            if(!ownerPhone){
                throw new Error("O ownerPhone do imóvel é obrigatório")
            }
    
            if(images.length === 0){
                throw new Error('A imagem é obrigatória!')
            }
    
            // Check if broker exists
            const broker = await BrokerRepository.getById(brokerId);
            if (!broker) {
                throw new Error('Corretor não encontrado');
            }
    
            // Check if city exists
            const city = await CityRepository.getById(cityId)
            if (!city) {
                throw new Error('Cidade não encontrada');
            }
    
            // Check if property type exists
            const propertyType = await PropertyTypeRepository.getById(propertyTypeId);
            if (!propertyType) {
                throw new Error('Tipo de Propriedade não encontrado');
            }
            // set the active atribute to true in propertyData
            propertyData.active = true;
            // Add images to propertyData
            propertyData.images = images;
    
            // Create property
            const newProperty = await PropertiesRepository.create(propertyData);
    
            // Associate city with the property
            await newProperty.setCity(city);
    
            // Associate property type with the property
            await newProperty.setPropertyType(propertyType);
            // Associate property type with the property
            await newProperty.setBroker(broker);
    
            return newProperty;
        }

    static async getById(id) {
        property = await PropertiesRepository.getById(id);
        if (!property) {
            throw new Error('Propriedade não cadastrada ou inativa');
        }
        return property;
    }

    static async getAll(limit, offset) {
        try {
            // Se limit ou offset não estiverem definidos, atribua valores padrão
            limit = limit ? Number(limit) : 9;
            offset = offset ? Number(offset) : 0;

            // Obtém o número total de propriedades ativas
            const total = await PropertiesRepository.countActive();

            // Obtém as propriedades ativas com paginação
            const properties = await PropertiesRepository.findAll({
                where: { active: true },
                order: [['createdAt', 'DESC']],
                limit: limit,
                offset: offset
            });

            const pagination = {
                total: total,
                limit: limit,
                offset: offset,
                nextUrl: offset + limit < total ? `/properties?limit=${limit}&offset=${offset + limit}` : null,
                previousUrl: offset - limit >= 0 ? `/properties?limit=${limit}&offset=${offset - limit}` : null
            };

            return { properties, pagination };
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async removeById(id) {
        try {
            PropertiesRepository.deleteById(id);
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async updateProperty(id, newData, images) {
        try {
            const { brokerId, cityId, propertyTypeId } = newData;

            const broker = await BrokerRepository.getById(brokerId);
            if (!broker) {
                throw new Error('Corretor não encontrado');
            }

            const city = await CityRepository.getById(cityId);
            if (!city) {
                throw new Error('Cidade não encontrada');
            }

            const propertyType = await PropertyTypeRepository.getById(propertyTypeId);
            if (!propertyType) {
                throw new Error('Tipo de Propriedade não encontrado');
            }

            const updateData = {
                ...newData,
                broker,
                city,
                propertytype: propertyType,
                images: images.map(file => file.filename)
            };

            await PropertiesRepository.update(id, updateData);

            return { message: 'Propriedade atualizada com sucesso!' };
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }


        static async getUniqueNeighborhoods() {
            try {
                return await PropertiesRepository.getUniqueNeighborhoods();
            } catch (error) {
                console.error(error);
                throw new Error('Erro interno do servidor');
      
            }
        }

        static async getAllBrokerProperties(idBroker) {
            try {
                return await PropertiesRepository.getAllBrokerProperties(idBroker);
            } catch (error) {
                console.error(error);
                throw new Error('Erro interno do servidor');
            }
        }

        static async getAllCityProperties(idCity) {
            try {
                return await PropertiesRepository.getAllCityProperties(idCity);
            } catch (error) {
                console.error(error);
                throw new Error('Erro interno do servidor');
            }
        }

        static async getAllTypeProperties(idPropertyType) {
            try {
                return await PropertiesRepository.getAllTypeProperties(idPropertyType);
            } catch (error) {
                console.error(error);
                throw new Error('Erro interno do servidor');
            }
        }

        static async getByTypeOfSale(typeofsale) {
            try {
                return await PropertiesRepository.getByTypeOfSale(typeofsale);
            } catch (error) {
                console.error(error);
                throw new Error('Erro interno do servidor');
            }
        }

}




    // Implement other methods as needed
