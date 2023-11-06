// jQuery para alternar menus suspensos
$(document).ready(function(){
    // Ativa o evento de clique para os elementos com a classe .sub-btn
    $(".sub-btn").click(function(){
        // Alterna a exibição do próximo elemento com a classe .sub-menu
        $(this).next(".sub-menu").slideToggle();
    });
});

// JavaScript para o menu de navegação responsivo
var menu = document.querySelector(".menu");
var menuBtn = document.querySelector(".menu-btn");
var closeBtn = document.querySelector(".close-btn");

// Adiciona evento de clique para abrir o menu
menuBtn.addEventListener("click", () => {
    menu.classList.add("active"); // Adiciona a classe active ao menu
});

// Adiciona evento de clique para fechar o menu
closeBtn.addEventListener("click", () => {
    menu.classList.remove("active"); // Remove a classe active do menu
});

// JavaScript para efeitos na barra de navegação durante a rolagem da página
window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    // Adiciona ou remove a classe sticky do elemento header dependendo do scroll
    header.classList.toggle("sticky", window.scrollY > 50);
});

// JavaScript para o slider (carrossel de imagens)
let count = 1;
document.getElementById("radio1").checked = true;

// Alterna automaticamente para a próxima imagem a cada 4 segundos
setInterval(function(){
    nextImage();
}, 4000);

function nextImage(){
    count++;
    if(count > 4){
        count = 1;
    }
    document.getElementById("radio" + count).checked = true; // Marca o próximo radio button
}

// JavaScript para a seleção de quartos
const wrapper = document.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
options = wrapper.querySelector(".options");

// Array com opções de quartos
let quartos = ["1" , "2" , "3" , "4+"];

// Função para adicionar as opções de quartos dinamicamente
function addQuarto(selectedQuarto){
    options.innerHTML = "";
    quartos.forEach(quarto => {
        let isSelected = quarto == selectedQuarto ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}">${quarto}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}
addQuarto(); // Inicializa a exibição dos quartos

// Função para atualizar o quarto selecionado
function updateName(selectedLi){
    searchInp.value = "";
    addQuarto(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
}

// Evento ao digitar no campo de busca de quartos
searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchedVal = searchInp.value.toLowerCase();
    arr = quartos.filter(data => {
        return data.toLowerCase().startsWith(searchedVal);
    }).map(data => `<li onclick="updateName(this)">${data}</li>`).join("");
    options.innerHTML = arr ? arr : `<p>Quartos não encontrados</p>`;
});

// Evento ao clicar no botão de seleção de quartos
selectBtn.addEventListener("click", () => {
    wrapper.classList.toggle("active");
});
