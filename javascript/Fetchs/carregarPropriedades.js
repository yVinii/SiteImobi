async function carregarPropriedades() {
    try {
        const response = await fetch('http://localhost:5502/properties/');
        const data = await response.json();
        console.log(data)
        
        if (response.ok) {
                const property = data.properties[0];
                const titleElement = document.getElementById('propertyTitle');
                const detailsElement = document.getElementById('propertyDetails');
                const priceElement = document.getElementById('propertyPrice');
                const imageElement = document.getElementById('images');
                
                    titleElement.textContent = `${property.title} - ${property.city} - ${property.neighborhood}`;
                    detailsElement.textContent = `Quartos: ${property.nbedrooms} / Banheiros: ${property.nbathrooms} / Garagem: ${property.nvacancies} / Área: ${property.groundm2}m²`;
                    priceElement.textContent = `${property.typeofsale}: R$ ${property.value.toFixed(2)}`;

        if (property.images.length > 0) {
            imageElement.src = `backend/public/images/PropertyImages${property.images[0]}`;
        }
           console.log('Propriedades carregadas com sucesso!');
        } else {
            console.error('Erro ao obter propriedades:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}


carregarPropriedades();