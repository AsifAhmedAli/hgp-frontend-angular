$('body').on('click', '.ps-block--checkout-action .ps-block__header' , function(e) {
  e.preventDefault();
  $(this).siblings('.ps-block__content').slideToggle(500);
});


$('body').on('click', '.shop-crtgy' , function() {
  $('.help').removeClass('show');
  $('.help>a').css('aria-expanded', 'false');
  $('.help>.dropdown-menu').removeClass('show');
});


function hideShop(){
  $('.custm-mega-menu').fadeOut('fast');
  $('.shop-crtgy').removeClass('shp-dropdn');
}

$('body').on('click', '.toggle-password' , function() {

  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }

});


$(window).scroll(function(){
  // console.log($('.header-main').height());
  $('.header-cover').css('min-height', $('.header-main').height()+'px');
  if ($(window).scrollTop() >= 300) {
      $('.header-cover').removeClass('d-none');
      $('.header-main').addClass('fixed-header');
  }
  else {
      $('.header-cover').addClass('d-none');
      $('.header-main').removeClass('fixed-header');
  }
});


$(function() {
  $('body').on('click', '.iframe-popup' , function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(".home-page").removeClass("show-popup");
    $("#hippoVideo")[0].src = "";
  });



  // Escape Key to exit popup starts
  $(document).keyup(function(e) {
      if (e.key == "Escape") {
          $(".home-page").removeClass("show-popup");
          $("#hippoVideo")[0].src = "";
      }
  });
  // Escape Key to exit popup ends

  $('body').on('click', '.iframe-popup > iframe' , function(e) {
    e.preventDefault();
    e.stopPropagation();
  });

});