async function carregarPropriedades() {
    try {
        const response = await fetch('http://localhost:5502/properties/');

        if (!response.ok) {
            console.error('Erro na requisição:', response.statusText);
            return;
        }
        const properties = await response.json();

        if (response.ok) {
            const cardWrapper = document.querySelector('.cards-wrapper');

            properties.forEach(property => {
                const card = document.createElement('div');
                card.classList.add('card');

                const imageWrapper = document.createElement('div');
                imageWrapper.classList.add('image-wrapper');

                const img = document.createElement('img');
                img.src = property.images; // Corrigido para property.images
                img.alt = 'Imagem da propriedade';

                imageWrapper.appendChild(img);

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const title = document.createElement('h5');
                title.classList.add('card-title');
                title.textContent = property.title;

                const description = document.createElement('p');
                description.classList.add('card-text');
                description.textContent = property.description;

                const link = document.createElement('a');
                link.href = '#';
                link.classList.add('btn', 'btn-primary');
                link.textContent = 'Ver imóvel';

                cardBody.appendChild(title);
                cardBody.appendChild(description);
                cardBody.appendChild(link);

                card.appendChild(imageWrapper);
                card.appendChild(cardBody);

                cardWrapper.appendChild(card);
            });

            console.log('Propriedades carregadas com sucesso!');
        } else {
            console.error('Erro ao obter propriedades:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

carregarPropriedades();