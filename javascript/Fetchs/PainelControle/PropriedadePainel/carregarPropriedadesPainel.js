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
    if (currentPropertyId) {
      const url = `http://localhost:5502/properties/${currentPropertyId}`;

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
          alert("Propriedade excluída com sucesso!");
          location.reload();
        } else {
          const errorText = await response.text();
          console.error(
            "Erro ao excluir propriedade:",
            response.status,
            errorText
          );
          alert("Erro ao excluir propriedade.");
        }
      } catch (error) {
        console.error("Erro na requisição de exclusão:", error.message);
        alert("Erro ao excluir propriedade.");
      }
    }
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  carregarPropriedades();
});

async function carregarPropriedades() {
  try {
    const response = await fetch("http://localhost:5502/properties/");
    const data = await response.json();

    if (response.ok) {
      const properties = data.properties;
      properties.forEach((property) => CriarCardsPropriedades(property));
      console.log("Propriedades carregadas com sucesso!");
    } else {
      console.error("Erro ao obter propriedades:", response.statusText);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

function CriarCardsPropriedades(property) {
  const container = document.getElementById("property-cards-container");

  const card = document.createElement("div");
  card.className = "card swiper-slide";

  let imageUrl;
  let imagesArray = JSON.parse(property.images);
  imagesArray = property.images
    .replace(/\\/g, "")
    .replace(/"/g, "")
    .replace(/]/g, "")
    .replace(/\[/g, "");
  let imagem = imagesArray.split(",");
  if (imagesArray.length > 0) {
    imageUrl = `../../../../backend/public/images/PropertyImages/${imagem[0]}`;
  }

  card.innerHTML = `
    <div class="image-content">
      <span class="overlay"></span>
      <div class="card-image">
        <img src="${imageUrl}" alt="" class="card-img">
      </div>
    </div>
    <div class="card-content">
      <h2 class="name-card">${
        property.TypeProperty || "Tipo de Propriedade"
      }</h2>
      <h2 class="name-card">${property.City || "Endereço"}</h2>
      <p class="description">${
        property.description || "Descrição não disponível"
      }</p>
      <div class="buttons-card-imovel">
        <button class="button btn-edit" value="${property.id}">Editar</button>
        <button class="button btn-delete" value="${
          property.id
        }">Excluir</button>
      </div>
    </div>
  `;

  container.appendChild(card);

  const deleteButton = card.querySelector(".btn-delete");
  deleteButton.addEventListener("click", function () {
    const modal = document.getElementById("deleteModal");
    currentPropertyId = this.value;
    modal.style.display = "flex";
  });
}

function getAuthToken() {
  return localStorage.getItem("token");
}
