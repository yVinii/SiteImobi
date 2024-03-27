async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        console.error(`Erro ao obter dados de ${url}: ${response.statusText}`);
        return null;
    }
    return data;
}

function populatePropertyCard(properties) {
    const property = properties.property[0];
    const titleElement = document.getElementById(`propertyTitle`);
    const registerElement = document.getElementById(`propertyRegister`);
    const detailsElement = document.getElementById(`propertyDetails`);
    const addressElement = document.getElementById(`propertyAdress`);
    const priceElementVenda = document.getElementById(`propertyPriceVenda`);
    const priceElementAluguel = document.getElementById(`propertyPriceAluguel`);
    const descriptionElement = document.getElementById(`propertyDescription`);
    const imageElement = document.getElementById(`images`);

    titleElement.textContent = `${property.title}`;
    registerElement.textContent = `Registro  ${property.register}  -  ${property.TypeProperty} - ${property.typeofsale}`
    addressElement.textContent = `${property.address} - ${property.neighborhood} - ${property.City}`;
    descriptionElement.textContent = `${property.description}`;

    if(property.typeofsale === "Venda"){
        priceElementAluguel.textContent = '';
        priceElementVenda.textContent = `Venda : R$ ${property.value}`;
    } else {
        priceElementVenda.textContent = '',
        priceElementAluguel.textContent = `Aluguel : R$ ${property.value}`;
    }
     detailsElement.innerHTML = '';
     const characteristics = [
         `Quartos : ${property.nbedrooms}`,
         `Suites : ${property.nsuites}`,
         `Banheiros : ${property.nbathrooms}`,
         `Garagem : ${property.nvacancies}`,
         `Área : ${property.groundm2}m²`,
         `Área Construída : ${property.buildm2}m²`
     ];
 
     characteristics.forEach(characteristic => {
         const li = document.createElement('li');
         li.textContent = characteristic;
         detailsElement.appendChild(li);
     });
     
     if (property.images && property.images.length > 0) {
        const imagesSrc = property.images.replace(/\\/g, '').replace(/"/g, '').replace(/]/g,'').replace(/\[/g,'');
        let imagesArray = [];
        imagesArray.push(imagesSrc.split(','));
        const swiperWrapper = document.getElementById(`div-principal`);
        if (imagesArray.length > 0) {
            imagesArray[0].forEach(imageSrc => {
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide', 'sw-slide');
                const img = document.createElement('img');
                img.classList.add('img-swiper-slide');
                img.src = `/backend/public/images/PropertyImages/${imageSrc}`;
                img.alt = '';
                swiperSlide.appendChild(img);
                swiperWrapper.appendChild(swiperSlide);
                
            });
        
        }
    }
    
    
    
}



async function carregarUnicaPropriedade() {
    try {
       
        const urlSearchParams = new URLSearchParams(window.location.search);
        const propertyId = urlSearchParams.get('propertyId');
        const propertiesData = await fetchData(`http://localhost:5502/properties/${propertyId}`);
        if (!propertiesData) {
            console.error('Dados da propriedade não encontrados.');
            return;
        }

        const property = propertiesData;

        populatePropertyCard(property);
        console.log('Propriedade carregada com sucesso!');
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}


async function carregarPropriedades() {
    try {
        const response = await fetch('http://localhost:5502/properties/');
        const data = await response.json();

        if (response.ok) {
            const properties = data.properties;
            properties.forEach((property, index) => preencherDetalhesPropriedade(property, index));
            console.log('Propriedades carregadas com sucesso!');
        } else {
            console.error('Erro ao obter propriedades:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

function preencherDetalhesPropriedade(property, index) {
    if(index < 6){
    const titleElement = document.getElementById(`propertyTitle${index + 1}`);
    const descriptionElement = document.getElementById(`propertyDescription${index + 1}`);
    const buttonElement = document.getElementById(`propertyButton${index + 1}`);

    titleElement.textContent = `${property.title} - ${property.City} - ${property.neighborhood}`;
    descriptionElement.textContent = `${property.description}`;
    buttonElement.value = property.id;

    if (property.images && property.images.length > 0) {
        let imagesArray = JSON.parse(property.images);
        if (imagesArray.length > 0) {
            imagesArray = property.images.replace(/\\/g, '').replace(/"/g, '').replace(/]/g,'').replace(/\[/g,'');
            const imageElement = document.querySelector(`#images${index + 1} img`);
            let imagem =imagesArray.split(',');
            imageElement.src = `/backend/public/images/PropertyImages/${imagem[0]}`;
        }
    }
}
}

const verMaisButtons = document.querySelectorAll('.ver-mais-button');

verMaisButtons.forEach(button => {
    button.addEventListener('click', function(event) {
  
        event.preventDefault();

        const propertyId = button.value;
        window.location.href = `imovel.html?propertyId=${propertyId}`;
    });
});


document.addEventListener("DOMContentLoaded", function () {
    carregarUnicaPropriedade();
    carregarPropriedades().then(() => {
    iniciarSwiperTelaImovel();
    });
});


