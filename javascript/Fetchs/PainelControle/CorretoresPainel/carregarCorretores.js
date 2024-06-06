document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("deleteModal");
  const closeModal = document.getElementById("closeModal");
  const confirmDelete = document.getElementById("confirmDelete");
  const cancelDelete = document.getElementById("cancelDelete");

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  cancelDelete.addEventListener("click", () => {
    modal.style.display = "none";
  });

  confirmDelete.addEventListener("click", async () => {
    if (currentBrokerId) {
      const url = `http://localhost:5502/broker/${currentBrokerId}`;

      try {
        const token = getAuthToken();

        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("Corretor excluído com sucesso!");
          location.reload();
        } else {
          const errorText = await response.text();
          console.error(
            "Erro ao excluir corretor:",
            response.status,
            errorText
          );
          alert("Erro ao excluir corretor.", errorText);
        }
      } catch (error) {
        console.error("Erro na requisição de exclusão:", error.message);
        alert("Erro ao excluir corretor.", error.message);
      }
    }
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  carregarCorretores();
});

async function carregarCorretores() {
  try {
    const response = await fetch("http://localhost:5502/broker/");
    const data = await response.json();
    if (response.ok) {
      const corretores = data.brokers;
      corretores.forEach((broker) => CriarCardsCorretores(broker));
      console.log("Corretores carregados com sucesso!");
    } else {
      console.error("Erro ao obter corretores:", response.statusText);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

function CriarCardsCorretores(broker) {
  const container = document.getElementById("broker-cards-container");

  const card = document.createElement("div");

  card.className = "card-funcionarios";

  card.innerHTML = `
    <div class="image-content-funcionarios">
      <span class="overlay-funcionarios"></span>
      <div class="card-image">
        <img src="../../" alt="" class="card-funcionarios-img">
      </div>
    </div>
    <div class="card-funcionarios-content">
      <h2 class="name-funcionario">${broker.name || "Nome corretor"}</h2>
      <h2 class="funcao">${broker.email || "Email"}</h2>
      <p class="name-funcionario"> Registro : ${
        broker.creci || "Email não disponível"
      }</p>
       <p class="name-funcionario"> Telefone : ${
         broker.phone || "Telefone não disponível"
       }</p>
       </div>
      <div class="card-funcionarios-button">
        <button class="button btn-edit" value="${broker.id}">Editar</button>
        <button class="button btn-delete" value="${broker.id}">Excluir</button>
      </div>
  `;

  container.appendChild(card);

  const deleteButton = card.querySelector(".btn-delete");

  deleteButton.addEventListener("click", function () {
    const modal = document.getElementById("deleteModal");
    currentBrokerId = this.value;
    modal.style.display = "flex";
  });
}

function getAuthToken() {
  return localStorage.getItem("token");
}
