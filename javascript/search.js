let inputBoxHeader = document.querySelector(".input-box-header"),
    searchIconHeader = document.querySelector(".icon-search"),
    closeIconSearch = document.querySelector(".close-icon-search");

searchIconHeader.addEventListener("click", () => inputBoxHeader.classList.add("open"));
closeIconSearch.addEventListener("click", () => inputBoxHeader.classList.remove("open"));