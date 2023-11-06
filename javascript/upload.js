$(document).ready(function () {
  // Ao clicar na área de upload, aciona o clique no input de upload
  $(".upload-area").click(function () {
    $("#upload-input").trigger("click");
  });

  // Quando o arquivo é selecionado para upload
  $("#upload-input").change((event) => {
    if (event.target.files) {
      let filesAmount = event.target.files.length;
      $(".upload-img").html(""); // Limpa a área de exibição de imagens

      // Para cada arquivo selecionado
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();

        // Quando o arquivo é lido
        reader.onload = function (event) {
          let html = `
                        <div class="uploaded-img">
                            <img src="${event.target.result}">
                            <button type="button" class="remove-btn">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `;
          // Adiciona o HTML com a imagem e o botão de remoção à área de imagens
          $(".upload-img").append(html);
        };

        // Lê o arquivo como uma URL de dados
        reader.readAsDataURL(event.target.files[i]);
      }

      // Atualiza o valor da quantidade de arquivos selecionados
      $(".upload-info-value").text(filesAmount);
      // Define um padding para a área de imagens
      $(".upload-img").css("padding", "20px");
    }
  });

  // Evento de clique global na janela
  $(window).click(function (event) {
    // Remove a imagem quando o botão de remoção é clicado
    if ($(event.target).hasClass("remove-btn")) {
      $(event.target).parent().remove();
    } else if ($(event.target).parent().hasClass("remove-btn")) {
      $(event.target).parent().parent().remove();
    }
  });
});
