async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
        console.error(`Erro ao obter dados de ${url}: ${response.statusText}`);
        return null;
    }

    return data;
}

function populatePropertyCard(property, index, cityData) {
    const titleElement = document.getElementById(`propertyTitle${index + 1}`);
    const detailsElement = document.getElementById(`propertyDetails${index + 1}`);
    const priceElement = document.getElementById(`propertyPrice${index + 1}`);
    const descriptionElement = document.getElementById(`propertyDescription${index + 1}`);
    const imageElement = document.getElementById(`images${index + 1}`);

    titleElement.textContent = `${cityData.city.name} - ${property.neighborhood}`;
    detailsElement.textContent = `Quartos: ${property.nbedrooms} / Banheiros: ${property.nbathrooms} / Garagem: ${property.nvacancies} / Área: ${property.groundm2}m²`;
    descriptionElement.textContent = `${property.description}`;
    priceElement.textContent = `${property.typeofsale}: R$ ${property.value}`;


    if (property.images && property.images.length > 0) {
        const imagesArray = JSON.parse(property.images);
        if (imagesArray.length > 0) {
            const imageElement = document.querySelector(`#images${index + 1} img`);
            imageElement.src = `/backend/public/images/PropertyImages/${imagesArray[0]}`;
        }
    }
}

async function carregarPropriedades() {
    try {
        const urlSearchParams = new URLSearchParams(window.location.search);

        let propertiesUrl = 'http://localhost:5502/properties/?limit=6&offset=0';
        if (urlSearchParams.has('cityId')) {
            const cityId = urlSearchParams.get('cityId');
            propertiesUrl = `http://localhost:5502/properties/city/${cityId}?limit=6&offset=0`;
        }
        if (urlSearchParams.has('propertyTypeId')) {
            const propertyTypeId = urlSearchParams.get('propertyTypeId');
            propertiesUrl = `http://localhost:5502/properties/propertyType/${propertyTypeId}?limit=6&offset=0`
        }

        const propertiesData = await fetchData(propertiesUrl);

      
        const pagination = propertiesData.pagination;
        const totalPages = Math.ceil(pagination.total / pagination.limit);
        createPagination(totalPages, 1);

        if (propertiesData) {
            const properties = propertiesData.properties;
            const cityPromises = properties.map((property, index) =>
                fetchData(`http://localhost:5502/city/${property.idCity}`)
                    .then(cityData => populatePropertyCard(property, index, cityData))
            );

            await Promise.all(cityPromises);
            console.log('Propriedades carregadas com sucesso!');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}





carregarPropriedades();