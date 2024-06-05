document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("form-data")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      enviarDados();
    });
  carregarCorretores();
  carregarCidades();
  carregarTipoPropriedade();
});

async function carregarCidades() {
  try {
    const response = await fetch("http://localhost:5502/city/");
    const data = await response.json();

    if (response.ok) {
      const cidades = data.cities;
      const selectElement = document.getElementById("cidade");

      selectElement.innerHTML = "";

      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.text = "Selecione";
      selectElement.appendChild(defaultOption);

      cidades.forEach((city) => {
        const option = document.createElement("option");
        option.text = city.name;
        option.value = city.id;
        selectElement.appendChild(option);
      });

      console.log("Cidades carregadas com sucesso!");
    } else {
      console.log("Erro ao obter cidades:", response.statusText);
    }
  } catch (error) {
    console.log("Erro na requisição:", error);
  }
}

async function carregarTipoPropriedade() {
  try {
    const response = await fetch("http://localhost:5502/propertytype/");
    const data = await response.json();

    if (response.ok) {
      const tipo = data.propertyTypes;
      const selectElement = document.getElementById("propertytype");

      selectElement.innerHTML = "";

      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.text = "Selecione";
      selectElement.appendChild(defaultOption);

      tipo.forEach((propertytype) => {
        const option = document.createElement("option");
        option.text = propertytype.name;
        option.value = propertytype.id;
        selectElement.appendChild(option);
      });

      console.log("Tipo carregados com sucesso!");
    } else {
      console.log("Erro ao obter tipo:", response.statusText);
    }
  } catch (error) {
    console.log("Erro na requisição:", error);
  }
}

async function carregarCorretores() {
  try {
    const response = await fetch("http://localhost:5502/broker/");
    const data = await response.json();

    if (response.ok) {
      const brokers = data.brokers;
      const selectElement = document.getElementById("broker");

      selectElement.innerHTML = "";

      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.text = "Selecione";
      selectElement.appendChild(defaultOption);

      brokers.forEach((broker) => {
        const option = document.createElement("option");
        option.value = broker.id;
        option.text = broker.name;
        selectElement.appendChild(option);
      });

      console.log("Corretores carregados com sucesso!");
    } else {
      console.error("Erro ao obter corretores:", response.statusText);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

async function enviarDados() {
  try {
    const title = document.getElementById("title").value;
    const address = document.getElementById("address").value;
    const value = document.getElementById("value").value;
    const tipoimovel = document.getElementById("propertytype").value;
    const bairro = document.getElementById("neighborhood").value;
    const banheiros = document.getElementById("nbathrooms").value;
    const vagas = document.getElementById("nvacancies").value;
    const registro = document.getElementById("register").value;
    const suites = document.getElementById("nsuites").value;
    const area = document.getElementById("groundm2").value;
    const construido = document.getElementById("buildm2").value;
    const quartos = document.getElementById("nbedrooms").value;
    const city = document.getElementById("cidade").value;
    const corretor = document.getElementById("broker").value;
    const tipoNegociacao = document.getElementById("tipo-negociacao").value;
    const owner = document.getElementById("owner").value;
    const ownerPhone = document.getElementById("ownerPhone").value;
    const infoadd = document.getElementById("description").value;
    const files = document.getElementById("upload-input").files;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("address", address);
    formData.append("value", value);
    formData.append("propertyTypeId", tipoimovel);
    formData.append("cityId", city);
    formData.append("typeofsale", tipoNegociacao);
    formData.append("description", infoadd);
    formData.append("brokerId", corretor);
    formData.append("neighborhood", bairro);
    formData.append("nbedrooms", quartos);
    formData.append("buildm2", construido);
    formData.append("groundm2", area);
    formData.append("nsuites", suites);
    formData.append("nvacancies", vagas);
    formData.append("owner", owner);
    formData.append("ownerPhone", ownerPhone);
    formData.append("nbathrooms", banheiros);
    formData.append("register", registro);

    for (const file of files) {
      formData.append("images", file);
    }

    const response = await fetch("http://localhost:5502/properties/create", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      alert("Sucesso no cadastro de nova Propriedade.");
    } else {
      const errorData = await response.json();
      alert("Erro ao cadastrar propriedade.", errorData);
      console.error(
        "Erro ao enviar dados:",
        response.status,
        errorData.message
      );
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro ao cadastrar propriedade.", error.message);
  }
}
