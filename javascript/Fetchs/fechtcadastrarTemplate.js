const fadeElement = document.querySelector("#fade");
const closeButton = document.querySelector("#close-btn");
// show or hide loader 
const toggleLoader = () => {
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
};

  // close message modal
  closeButton.addEventListener("click", () => toggleMessage());

// show or hide message
const toggleMessage = (msg) => {

    
    const messageElement = document.querySelector("#message");

    const messageElementText = document.querySelector("#message p");

    messageElementText.innerText = msg;
    
    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
}


// Cadastrando Template
async function enviarDadosTemplate() {
    try {
        const firstname = document.getElementById('firstname').value;
        const email = document.getElementById('email').value;
        const number = document.getElementById('number').value;
        const tipoimovel = document.getElementById('tipoimovel').value;
        const selectcdd = document.getElementById('selectcdd').value;
        const tipoNegociacao = document.getElementById('tipo-negociacao').value;
        const infoadd = document.getElementById('infoadd').value;
        const files = document.getElementById('upload-input').files;

        // Verificar se o valor selecionado não é o valor padrão
        if (tipoimovel === 'Selecione') {
            toggleMessage("Por favor, selecione um tipo de imóvel válido.");
            return;
        }
        // Verificar se o valor selecionado não é o valor padrão
        if (selectcdd === 'Selecione') {
            toggleMessage("Por favor, selecione uma cidade válida.");
            return;
        }
        // Verificar se o valor selecionado não é o valor padrão
        if (tipoNegociacao === 'Selecione') {
            toggleMessage("Por favor, selecione uma opção tipo de negociação.");
            return;
        }


        const formData = new FormData();
        formData.append('owner', firstname);
        formData.append('emailOwner', email);
        formData.append('phone', number);
        formData.append('propertytype', tipoimovel);
        formData.append('city', selectcdd);
        formData.append('typeofsale', tipoNegociacao);
        formData.append('description', infoadd);

        for (const file of files) {
            formData.append('images', file);
        }

        const response = await fetch('http://localhost:5502/templates/create', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            toggleMessage("Propriedade cadastrada com sucesso, em breve entraremos em contato !");
            const responseData = await response.json();
        } else 
        {
            const responseData = await response.json();
            toggleMessage("Erro ao enviar dados : \n"+responseData.message);
        }
    } catch (error) {
           toggleMessage("Erro na requisição: "+ responseData.message);
    }
}
