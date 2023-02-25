export default function swiper_func(){


    import Swiper ,{Navigation,Pagination} from '../../../node_modules/swiper';
    const swiper = new Swiper(".swiper",{
        direction:"vertical",
        loop:true,
        modules:[Navigation,Pagination],
        pagination:{
            el:".swiper-pagination"
        },
        navigation:{
            nextEl:".swiper-button-next",
            prevEl:".swiper-button-prev"
        },
        scrollbar:{
            el:".swiper-scrollbar"
        }
    });
    //swiper.init();
    console.log("reached swiper")


}