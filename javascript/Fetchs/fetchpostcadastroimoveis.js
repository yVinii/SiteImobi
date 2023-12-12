async function enviarDados() {
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
            console.log(responseData);
        } else {
            console.error('Erro ao enviar dados:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}
