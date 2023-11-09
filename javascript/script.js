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

 // TELA DE LOGIN USUARIO
 async function enviarDadosLogin() {
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const dados = {
            email: email,
            password: password
        };
        const response = await fetch('http://localhost:5502/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(dados),
        });

        // Verificar se a resposta foi bem-sucedida (status 2xx)
        if (response.ok) {
            const responseData = await response.json();
            // Armazenar o token no localStorage
            localStorage.setItem('token', responseData.token);
            // Redirecionar para a próxima página
            window.location.href = 'createimovel.html';
        } else {
            // Se a resposta não foi bem-sucedida, tratar de acordo
            const responseData = await response.json();
            if (responseData.errorType === 'UserNotFound') {
                toggleMessage(responseData.message);
            } else if (responseData.errorType === 'SenhaNotFound') {
                toggleMessage(responseData.message);
            } else if (responseData.errorType === 'EmailNotFound') {
                toggleMessage(responseData.message);
            } else {
                toggleMessage('Erro ao realizar o login:', responseData.message);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const getAddress = async (cep) => {
    toggleLoader();

    celInput.blur();

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

    const response = await fetch(apiUrl);

    const data = await response.json();

    console.log(data);
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
            const responseData = await response.json();
            toggleMessage("Propriedade cadastrada com sucesso, em breve entraremos em contato !");
        } else 
        {
            const responseData = await response.json();
            toggleMessage("Erro ao enviar dados : \n"+responseData.message);
        }
    } catch (error) {
           toggleMessage("Erro na requisição: "+ responseData.message);
    }
}



