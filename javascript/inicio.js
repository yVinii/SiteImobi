/*//jquery for toggle dropdown menus
$(document).ready(function(){
    //toggle sub menus
    $(".sub-btn").click(function(){
        $(this).next(".sub-menu").slideToggle();
    });
});

//javascript for the responsive navigation menu
var menu = document.querySelector(".menu");
var menuBtn = document.querySelector(".menu-btn");
var closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
    menu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    menu.classList.remove("active");
});

//javascript for the navigation bar effects on scroll
window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 50);
});

//javscript slider
//let count = 1;
//document.getElementById("radio1").checked = true;

setInterval( function(){
    nextImage();
}, 4000);

function nextImage(){
    count++;
    if(count>4){
        count = 1;
   }

   document.getElementById("radio"+count).checked = true;
}

const wrapper = document.querySelector(".wrapper"),
//selectBtn = wrapper.querySelector(".select-btn"),
//searchInp = wrapper.querySelector("input"),
//options = wrapper.querySelector(".options"); 

// array dos quartos
//let quartos = ["1" , "2" , "3" , "4+"];

/*function addQuarto(selectedQuarto){
    options.innerHTML = "";
    quartos.forEach(quarto => {
        let isSelected = quarto == selectedQuarto ? "selected" : "";
        let li = `<li onclick ="updateName(this)" class="${isSelected}">${quarto}</li>`; 
        options.insertAdjacentHTML("beforeend", li);    
    });
}
addQuarto();

function updateName(selectedLi){
    searchInp.value = "";
    addQuarto(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
}

searchInp.addEventListener("keyup", () => {
    let arr =[]; // array vazio
    let searchedVal = searchInp.value.toLowerCase();
    arr = quartos.filter(data => {
        return data.toLowerCase().startsWith(searchedVal);
    }).map(data => `<li onclick ="updateName(this)>${data}</li>`).join("");
    options.innerHTML = arr ? arr : `<p>Quartos não encontrados</p>`;
});

selectBtn.addEventListener("click", () => {
    wrapper.classList.toggle("active");
});
*/