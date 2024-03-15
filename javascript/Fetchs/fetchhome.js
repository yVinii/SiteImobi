async function carregarCidades() {
    try {
        const response = await fetch('http://localhost:5502/city/');
        const data = await response.json();

        if (response.ok) {
            const cidades = data.city;
            const selectElement = document.getElementById('cidade');
          
            selectElement.textContent = ''; // Usar textContent para limpar

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.text = 'Selecione';
            selectElement.appendChild(defaultOption);

            cidades.forEach(city => {
                const option = document.createElement('option');
                option.text = city.name;
                option.value = city.id;
                selectElement.appendChild(option);
            });

            console.log('Cidades carregadas com sucesso!');
        } else {
            console.log('Erro ao obter cidades:', response.statusText);
        }
    } catch (error) {
        console.log('Erro na requisição:', error);
    }
}

function preencherDetalhesPropriedade(property, index, cityData) {
    const titleElement = document.getElementById(`propertyTitle${index + 1}`);
    const detailsElement = document.getElementById(`propertyDetails${index + 1}`);
    const priceElement = document.getElementById(`propertyPrice${index + 1}`);
    const imageElement = document.getElementById(`images${index + 1}`);

    titleElement.textContent = `${property.title} - ${cityData.city.name} - ${property.neighborhood}`;
    detailsElement.textContent = `Quartos: ${property.nbedrooms} / Banheiros: ${property.nbathrooms} / Garagem: ${property.nvacancies} / Área: ${property.groundm2}m²`;
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
        const response = await fetch('http://localhost:5502/properties/');
        const data = await response.json();

        if (response.ok) {
            const properties = data.properties;

            const cityPromises = properties.map((property, index) =>
                fetch(`http://localhost:5502/city/${property.idCity}`)
                    .then(cityResponse => cityResponse.json())
                    .then(cityData => preencherDetalhesPropriedade(property, index, cityData))
            );

            await Promise.all(cityPromises);
            console.log('Propriedades carregadas com sucesso!');
        } else {
            console.error('Erro ao obter propriedades:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

document.getElementById('buscarimovel').addEventListener('click', async function(event) {
    event.preventDefault()

    const cityId = document.getElementById('cidade').value;
    // Aguarde o carregamento das propriedades antes de redirecionar
    await carregarPropriedades();
    window.location.href = `pagimoveis.html?cityId=${cityId}`;
});

const buttons = document.querySelectorAll('.buscartipo');
buttons.forEach(button => {
    button.addEventListener('click', async function(event) {
        event.preventDefault();
        const propertyTypeId = button.value;
        // Aguarde o carregamento das propriedades antes de redirecionar
        await carregarPropriedades();
        window.location.href = `pagimoveis.html?propertyTypeId=${propertyTypeId}`;
    });  
});

document.addEventListener("DOMContentLoaded", function () {
    carregarCidades();
    carregarPropriedades().then(() => {
        iniciarSwiper();
    });
});