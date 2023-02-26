//import Swiper ,{Navigation,Pagination} from 'swiper';
//const Swiper = require("swiper");

// ive tried many times,but it ain't work ..
/*
export default function swiper_func(){

    let  mySwiper = new Swiper('.swiper-container', {
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
        },
        modules:[Navigation,Pagination],
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    })
//    SwiperSlide
    console.log("reached swiper after modification")


}
*/


export default function swiper_func() {

    const swiperContainer = document.querySelector('.swiper-container');
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const swiperSlides = document.querySelectorAll('.swiper-slide');
    const swiperButtonPrev = document.querySelector(".swiper-button-prev");
    const swiperButtonNext = document.querySelector(".swiper-button-next");

    swiperSlides[0].classList.add("active");
    swiperSlides[swiperSlides.length -1 ].classList.add("prev");
    swiperSlides[1].classList.add("next");
    animateSlides(swiperSlides[0]);

    function activeClassManager(entries,entry,checkClass){
        if(entry.classList.contains(checkClass)){
            entries.forEach((el)=>el.classList.remove("active","prev","next"));
            switch(+entry.dataset.position){
                case 1 :
                    entries[entries.length-1].classList.add("prev");
                    entry.nextElementSibling.classList.add("next");
                    break;
                case entries.length :
                    entry.previousElementSibling.classList.add("prev");
                    entries[0].classList.add("next");
                    break;
                default :
                    entry.previousElementSibling.classList.add("prev");
                    entry.nextElementSibling.classList.add("next");
            }
            entry.classList.add("active");
            animateSlides(entry)
            return true;
        }
        return false;
    }

    function animateSlides(current){
        swiperSlides.forEach((slide,i)=>{
        slide.style.cssText = `
            transform: translateX(${ (+swiperContainer.innerWidth < 767?0:10)*(i+1)}%) scale(0.5);
            z-index:1;
        `;
        if(slide.classList.contains("prev")){
            slide.style.cssText = `
            transform: translateX(-${ +swiperContainer.innerWidth < 767?20:50}%) scale(0.8);
            z-index:9;
        `;
        }
        if(slide.classList.contains("next")){
            slide.style.cssText = `
            transform: translateX(${ +swiperContainer.innerWidth < 767?20:50}%) scale(0.8);
            z-index:9;
        `;
        }
        });
        current.style.cssText =`
            transform:translateX(0%) scale(1);
            z-index:10;
        `;
    }
    swiperButtonPrev.addEventListener("click", function(e) {
        for(let i=0;i<swiperSlides.length;i++){
            if(activeClassManager(swiperSlides,swiperSlides[i],"prev")) {
                break;
            }
        }
    });
    swiperButtonNext.addEventListener("click", function(e) {
        for(let i=0;i<swiperSlides.length;i++){
            if(activeClassManager(swiperSlides,swiperSlides[i],"next")) {
                break;
            }
        }
    })

    setInterval(()=>{
        swiperButtonNext.click();
    },3000);
}