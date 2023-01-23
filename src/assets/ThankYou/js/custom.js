//fitems-carousel-three

$(document).ready(function () {

    var owl = $('.frecently-carousel');
    owl.owlCarousel({
        stagePadding: 30,
        nav: true,
        loop: true,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        mouseDrag: true,
        navText: [
            '<i class="fas fa-arrow-left fa-fw" aria-hidden="true"></i>',
            '<i class="fas fa-arrow-right fa-fw" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });

});
