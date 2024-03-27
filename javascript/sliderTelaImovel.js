function iniciarSwiperTelaImovel(){
    var swiper = new Swiper(".slide-content", {
        slidesPerView: 1,
        spaceBetween: 25,
        loop: true,
        centeredSlides: true, 
        fade: 'true',
        grabCursor: 'true',
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
    
        breakpoints:{
            0: {
                slidesPerView: 1,
            },
            520: {
                slidesPerView: 1,
            },
            950: {
                slidesPerView: 1,
            },
        },
      });
    }