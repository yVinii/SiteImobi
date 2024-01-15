const element = document.querySelector(".pagination ul");

// Chamando uma função, passando parâmetros e adicionando dentro de um elemento que é uma lista ordenada (ul)
element.innerHTML = createPagination(totalPages, page);

function createPagination(totalPages, page) {
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;

  if (page > 1) {
    // Mostrar o botão Voltar se o valor da página for maior que 1
    liTag += `<li class="btn prev" onclick="createPagination(${totalPages}, ${page - 1})"><span><i class="fas fa-angle-left"></i> Voltar</span></li>`;
  }

  if (page > 2) {
    // Se o valor da página for maior que 2, adicione 1 após o botão anterior
    liTag += `<li class="first numb" onclick="createPagination(${totalPages}, 1)"><span>1</span></li>`;
    if (page > 3) {
      // Se o valor da página for maior que 3, adicione "..." após o primeiro li ou página
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // Quantas páginas ou li mostrar antes do li atual
  beforePage = Math.max(1, beforePage);

  // Quantas páginas ou li mostrar após o li atual
  afterPage = Math.min(totalPages, afterPage);

  for (let plength = beforePage; plength <= afterPage; plength++) {
    if (page == plength) {
      // Se a página for igual a plength, atribua a string "active" à variável ativa
      active = "active";
    } else {
      // Caso contrário, deixe a variável ativa vazia
      active = "";
    }
    liTag += `<li class="numb ${active}" id="page${plength}" onclick="handlePageClick(${plength})"><span>${plength}</span></li>`;
  }

  if (page < totalPages - 1) {
    // Se o valor da página for menor que totalPages - 1, mostre o último li ou página
    if (page < totalPages - 2) {
      // Se o valor da página for menor que totalPages - 2, adicione "..." antes do último li ou página
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(${totalPages}, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    // Mostrar o botão Próximo se o valor da página for menor que totalPages
    liTag += `<li class="btn next" onclick="createPagination(${totalPages}, ${page + 1})"><span>Próximo <i class="fas fa-angle-right"></i></span></li>`;
  }

  element.innerHTML = liTag; // Adicionar a tag li dentro da tag ul
  return liTag; // Retornar a tag li
}
