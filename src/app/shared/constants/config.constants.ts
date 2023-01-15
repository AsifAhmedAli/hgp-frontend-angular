export const SlickProduct = {
  slidesToShow: 1,
  slidesToScroll: 1,
  // asNavFor: '.ps-product__thumbnail .ps-product__variants',
  fade: true,
  dots: false,
  infinite: false,
  arrows: true,
  adaptiveHeight: true,
  prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
  nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>',
};

export const SlickProductThumb = {
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: false,
  arrows: false,
  focusOnSelect: true,
  prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-up\'></i></a>',
  nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-down\'></i></a>',
  // asNavFor: '.ps-product__thumbnail .ps-product__gallery',
  vertical: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        arrows: false,
        slidesToShow: 4,
        vertical: false,
        prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
        nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>'
      }
    },
    {
      breakpoint: 992,
      settings: {
        arrows: false,
        slidesToShow: 4,
        vertical: false,
        prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
        nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>'
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        vertical: false,
        prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
        nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>'
      }
    },
  ]
};

export const SlickKitThumb = {
  slidesToShow: 5,
  slidesToScroll: 1,
  infinite: false,
  arrows: false,
  focusOnSelect: true,
  prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-up\'></i></a>',
  nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-down\'></i></a>',
  // asNavFor: '.ps-product__thumbnail .ps-product__gallery',
  vertical: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        arrows: false,
        slidesToShow: 4,
        vertical: false,
        prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
        nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>'
      }
    },
    {
      breakpoint: 991,
      settings: {
        arrows: false,
        slidesToShow: 3,
        vertical: false,
        prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
        nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>'
      }
    },
    {
      breakpoint: 767,
      settings: {
        arrows: false,
        slidesToShow: 2,
        vertical: false,
        prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
        nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>'
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 2,
        vertical: false,
        prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
        nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>'
      }
    },
  ]
};

export const Colors = {
  starsColor: '#FFB800'
};

export const Testimonial = {
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  draggable: true,
  infinite: false,
  arrows: true,
  adaptiveHeight: true,
  focusOnSelect: true,
  prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
  nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>',
  vertical: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        arrows: false,
        slidesToShow: 2,
        vertical: false,
        prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
        nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>'
      }
    },
    {
      breakpoint: 992,
      settings: {
        arrows: false,
        slidesToShow: 2,
        vertical: false,
        prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
        nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>'
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        vertical: false,
        prevArrow: '<a href=\'#\'><i class=\'fa fa-angle-left\'></i></a>',
        nextArrow: '<a href=\'#\'><i class=\'fa fa-angle-right\'></i></a>'
      }
    },
  ]
};
