document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("form-data")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      enviarDados();
    });
});

async function enviarDados() {
  try {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const creci = document.getElementById("creci").value;

    const token = getAuthToken();

    const formData = {
      name: nome,
      email: email,
      phone: telefone,
      creci: creci,
    };

    const response = await fetch("http://localhost:5502/broker/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      alert("Sucesso no cadastro de novo corretor.");
    } else {
      const errorData = await response.json();
      alert("Erro ao cadastrar corretor: " + errorData.message);
      console.error(
        "Erro ao enviar dados:",
        response.status,
        errorData.message
      );
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro ao cadastrar corretor: " + error.message);
  }
}

function getAuthToken() {
  return localStorage.getItem("token");
}
