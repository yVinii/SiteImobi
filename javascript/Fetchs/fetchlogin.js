async function enviarDados() {
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
        window.location.href = 'index.html';
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