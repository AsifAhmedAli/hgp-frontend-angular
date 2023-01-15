(function($) {
    "use strict";

    $(document).on("click", ".slick-dots", function () {
      const dotNo = $(this).find('.slick-active').index();
      $(".sliderTitle").removeClass('active');
      $("#slider-" + dotNo).addClass('active');
    });

    $(document).on("click", ".sliderTitle", function () {
      $(".sliderTitle").removeClass('active');
      $(this).addClass('active');
    });

    /*for homepage testimonial slier*/

  $(document).on("click", ".showMoreBtn", function () {
    $(this).parent(".expand-content").find(".testimonial-slider").toggleClass('show-less');
    if ($(this).parent(".expand-content").find(".testimonial-slider").hasClass('show-less')) {
      $(this).text('SEE MORE');
    } else {
      $(this).text('SHOW LESS');
    }
  });

    function parallax() {
        $('.bg--parallax').each(function() {
            var el = $(this),
                xpos = "50%",
                windowHeight = $(window).height();
            $(window).scroll(function() {
                var current = $(window).scrollTop(),
                    top = el.offset().top,
                    height = el.outerHeight();
                if (top + height < current || top > current + windowHeight) {
                    return;
                }
                el.css('backgroundPosition', xpos + " " + Math.round((top - current) * 0.2) + "px");
            });
        });
    }

    function backgroundImage() {
        var databackground = $('[data-background]');
        databackground.each(function() {
            if ($(this).attr('data-background')) {
                var image_path = $(this).attr('data-background');
                $(this).css({
                    'background': 'url(' + image_path + ')'
                });
            }
        });
    }

    function siteToggleAction() {
        var siteOverlay = $('.ps-site-overlay');
        $('.menu-toggle-open').on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass('active')
            siteOverlay.toggleClass('active');
        });

        $('.ps-toggle--sidebar').on('click', function(e) {
            e.preventDefault();
            var url = $(this).attr('href');
            $(this).toggleClass('active');
            $(this).siblings('a').removeClass('active');
            $(url).toggleClass('active');
            $(url).siblings('.ps-panel--sidebar').removeClass('active');
            siteOverlay.toggleClass('active');
        });

        $('.ps-panel--sidebar .ps-panel__close').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.ps-panel--sidebar').removeClass('active');
            siteOverlay.removeClass('active');
        });

        $('body').on("click", function(e) {
            if ($(e.target).siblings(".ps-panel--sidebar").hasClass('active')) {
                $('.ps-panel--sidebar').removeClass('active');
                //siteOverlay.removeClass('active');
                $('.ps-site-overlay').removeClass('active');
            }
        });
    }

    function subMenuToggle() {
        $('.menu--mobile .menu-item-has-children > .sub-toggle').on('click', function(e) {
            e.preventDefault();
            var current = $(this).parent('.menu-item-has-children')
            $(this).toggleClass('active');
            current.siblings().find('.sub-toggle').removeClass('active');
            current.children('.sub-menu').slideToggle(350);
            current.siblings().find('.sub-menu').slideUp(350);
            if (current.hasClass('has-mega-menu')) {
                current.children('.mega-menu').slideToggle(350);
                current.siblings('.has-mega-menu').find('.mega-menu').slideUp(350);
            }
        });

        $('.menu--mobile .has-mega-menu .mega-menu__column .sub-toggle').on('click', function(e) {
            e.preventDefault();
            var current = $(this).closest('.mega-menu__column');
            $(this).toggleClass('active');
            current.siblings().find('.sub-toggle').removeClass('active');
            current.children('.sub-menu--mega').slideToggle();
            current.siblings().find('.sub-menu--mega').slideUp();
        });
    }

    function stickyHeader() {
        var header = $('.header'),
            checkpoint = 50;
        if (header.data('sticky') === true) {
            $(window).scroll(function() {
                var currentPosition = $(this).scrollTop();
                if (currentPosition > checkpoint) {
                    header.addClass('header--sticky');
                } else {
                    header.removeClass('header--sticky');
                }
            });
        } else {
            return false;
        }
    }

    function setAnimation(_elem, _InOut) {
        var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        _elem.each(function() {
            var $elem = $(this);
            var $animationType = 'animated ' + $elem.data('animation-' + _InOut);

            $elem.addClass($animationType).one(animationEndEvent, function() {
                $elem.removeClass($animationType);
            });
        });
    }

    function owlCarouselConfig() {
        var target = $('.owl-slider');
        if (target.length > 0) {
            target.each(function() {
                var el = $(this),
                    dataAuto = el.data('owl-auto'),
                    dataLoop = el.data('owl-loop'),
                    dataSpeed = el.data('owl-speed'),
                    dataGap = el.data('owl-gap'),
                    dataNav = el.data('owl-nav'),
                    dataDots = el.data('owl-dots'),
                    dataAnimateIn = (el.data('owl-animate-in')) ? el.data('owl-animate-in') : '',
                    dataAnimateOut = (el.data('owl-animate-out')) ? el.data('owl-animate-out') : '',
                    dataDefaultItem = el.data('owl-item'),
                    dataItemXS = el.data('owl-item-xs'),
                    dataItemSM = el.data('owl-item-sm'),
                    dataItemMD = el.data('owl-item-md'),
                    dataItemLG = el.data('owl-item-lg'),
                    dataItemXL = el.data('owl-item-xl'),
                    dataNavLeft = (el.data('owl-nav-left')) ? el.data('owl-nav-left') : "<i class='icon-chevron-left'></i>",
                    dataNavRight = (el.data('owl-nav-right')) ? el.data('owl-nav-right') : "<i class='icon-chevron-right'></i>",
                    duration = el.data('owl-duration'),
                    datamouseDrag = (el.data('owl-mousedrag') == 'on') ? true : false,
                    center = el.data('owl-center');
                if (target.children('div, span, a, img, h1, h2, h3, h4, h5, h5').length >= 2) {
                    el.owlCarousel({
                        animateIn: dataAnimateIn,
                        animateOut: dataAnimateOut,
                        margin: dataGap,
                        autoplay: dataAuto,
                        autoplayTimeout: dataSpeed,
                        autoplayHoverPause: true,
                        loop: dataLoop,
                        nav: dataNav,
                        mouseDrag: datamouseDrag,
                        touchDrag: true,
                        autoplaySpeed: duration,
                        navSpeed: duration,
                        dotsSpeed: duration,
                        dragEndSpeed: duration,
                        navText: [dataNavLeft, dataNavRight],
                        dots: dataDots,
                        items: dataDefaultItem,
                        center: Boolean(center),
                        responsive: {
                            0: {
                                items: dataItemXS
                            },
                            480: {
                                items: dataItemSM
                            },
                            768: {
                                items: dataItemMD
                            },
                            992: {
                                items: dataItemLG
                            },
                            1200: {
                                items: dataItemXL
                            },
                            1680: {
                                items: dataDefaultItem
                            }
                        }
                    });

                    el.on('change.owl.carousel', function(event) {
                        var $currentItem = $('.owl-item', el).eq(event.item.index);
                        var $elemsToanim = $currentItem.find("[data-animation-out]");
                        setAnimation($elemsToanim, 'out');
                    });

                    el.on('changed.owl.carousel', function(event) {
                        var $currentItem = $('.owl-item', el).eq(event.item.index);
                        var $elemsToanim = $currentItem.find("[data-animation-in]");
                        setAnimation($elemsToanim, 'in');
                    });
                }

            });
        }
    }

    function masonry($selector) {
        var masonry = $($selector);
        if (masonry.length > 0) {
            masonry.imagesLoaded(function() {
                masonry.masonry({
                    columnWidth: '.grid-sizer',
                    itemSelector: '.grid-item'
                });
            });
        }
    }

    function slickConfig() {
        var product = $('.ps-product--detail');
        if (product.length > 0) {
            var primary = product.find('.ps-product__gallery'),
                second = product.find('.ps-product__variants'),
                vertical = product.find('.ps-product__thumbnail').data('vertical');
            primary.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: '.ps-product__variants',
                fade: true,
                dots: false,
                infinite: false,
                arrows: primary.data('arrow'),
                prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>",
            });
            second.slick({
                slidesToShow: second.data('item'),
                slidesToScroll: 1,
                infinite: false,
                arrows: second.data('arrow'),
                focusOnSelect: true,
                prevArrow: "<a href='#'><i class='fa fa-angle-up'></i></a>",
                nextArrow: "<a href='#'><i class='fa fa-angle-down'></i></a>",
                asNavFor: '.ps-product__gallery',
                vertical: vertical,
                responsive: [{
                        breakpoint: 1200,
                        settings: {
                            arrows: second.data('arrow'),
                            slidesToShow: 4,
                            vertical: false,
                            prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                            nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>"
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            arrows: second.data('arrow'),
                            slidesToShow: 4,
                            vertical: false,
                            prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                            nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>"
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 3,
                            vertical: false,
                            prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                            nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>"
                        }
                    },
                ]
            });

        }
    }

    function tabs() {
        $('.ps-tab-list  li > a ').on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $(this).closest('li').siblings('li').removeClass('active');
            $(this).closest('li').addClass('active');
            $(target).addClass('active');
            $(target).siblings('.ps-tab').removeClass('active');
        });

        $('.ps-tab-list.owl-slider .owl-item a').on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $(this).closest('.owl-item').siblings('.owl-item').removeClass('active');
            $(this).closest('.owl-item').addClass('active');
            $(target).addClass('active');
            $(target).siblings('.ps-tab').removeClass('active');
        });
    }

    function rating() {
        $('select.ps-rating').each(function() {
            var readOnly;
            if ($(this).attr('data-read-only') == 'true') {
                readOnly = true
            } else {
                readOnly = false;
            }
            $(this).barrating({
                theme: 'fontawesome-stars',
                readonly: readOnly,
                emptyValue: '0'
            });
        });
    }

    function productLightbox() {
        var product = $('.ps-product--detail');
        if (product.length > 0) {
            $('.ps-product__gallery').lightGallery({
                selector: '.item a',
                thumbnail: true,
                share: false,
                fullScreen: false,
                autoplay: false,
                autoplayControls: false,
                actualSize: false
            });
            if (product.hasClass('ps-product--sticky')) {
                $('.ps-product__thumbnail').lightGallery({
                    selector: '.item a',
                    thumbnail: true,
                    share: false,
                    fullScreen: false,
                    autoplay: false,
                    autoplayControls: false,
                    actualSize: false
                });
            }
        }

        $('.ps-gallery--image').lightGallery({
            selector: '.ps-gallery__item',
            thumbnail: true,
            share: false,
            fullScreen: false,
            autoplay: false,
            autoplayControls: false,
            actualSize: false
        });

        $('.ps-video').lightGallery({
            thumbnail: false,
            share: false,
            fullScreen: false,
            autoplay: false,
            autoplayControls: false,
            actualSize: false
        });
    }

    function filterSlider() {
        var el = $('.ps-slider'),
            min = el.siblings().find('.ps-slider__min'),
            max = el.siblings().find('.ps-slider__max'),
            defaultMinValue = el.data('default-min'),
            defaultMaxValue = el.data('default-max'),
            maxValue = el.data('max'),
            step = el.data('step');
        if (el.length > 0) {
            el.slider({
                min: 0,
                max: maxValue,
                step: step,
                range: true,
                values: [defaultMinValue, defaultMaxValue],
                slide: function(event, ui) {
                    var values = ui.values;
                    min.text('$' + values[0]);
                    max.text('$' + values[1]);
                }
            });
            var values = el.slider("option", "values");
            min.text('$' + values[0]);
            max.text('$' + values[1]);
        } else {
            return false;
        }
    }

    function modalInit() {
        var modal = $('.ps-modal');
        if (modal.length) {
            if (modal.hasClass('active')) {
                $('body').css('overflow-y', 'hidden');
            }
        }

        modal.find('.ps-modal__close, .ps-btn--close').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.ps-modal').removeClass('active');
            $("body").css('overflow-y', 'auto');
        });

        $('.ps-modal-link').on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $(target).addClass('active');
            $("body").css('overflow-y', 'hidden');
        });

        $('.ps-modal').on("click", function(event) {
            if (!$(event.target).closest(".ps-modal__container").length) {
                modal.removeClass('active');
                $("body").css('overflow-y', 'auto');
            }
        });
    }

    function searchInit() {
        var searchbox = $('.ps-search');
        $('.ps-search-btn').on('click', function(e) {
            e.preventDefault();
            searchbox.addClass('active');
        });
        searchbox.find('.ps-btn--close').on('click', function(e) {
            e.preventDefault();
            searchbox.removeClass('active');
        });
    }

    function productFilterToggle() {
        $('.ps-filter__trigger').on('click', function(e) {
            e.preventDefault();
            var el = $(this);
            el.find('.ps-filter__icon').toggleClass('active');
            el.closest('.ps-filter').find('.ps-filter__content').slideToggle();
        });
        if ($('.ps-sidebar--home').length > 0) {
            $('.ps-sidebar--home > .ps-sidebar__header > a').on('click', function(e) {
                e.preventDefault();
                $(this).closest('.ps-sidebar--home').children('.ps-sidebar__content').slideToggle();
            })
        }

        $('.ps-shop__filter-toggle').on('click', function(e) {
            e.preventDefault();
            $('#shop-filter').slideToggle();
        });
    }

    function stickySidebar() {
        var sticky = $('.ps-product--sticky'),
            stickySidebar, checkPoint = 992,
            windowWidth = $(window).innerWidth();
        if (sticky.length > 0) {
            stickySidebar = new StickySidebar('.ps-product__sticky .ps-product__info', {
                topSpacing: 20,
                bottomSpacing: 20,
                containerSelector: '.ps-product__sticky',
            });
            if ($('.sticky-2').length > 0) {
                var stickySidebar2 = new StickySidebar('.ps-product__sticky .sticky-2', {
                    topSpacing: 20,
                    bottomSpacing: 20,
                    containerSelector: '.ps-product__sticky',
                });
            }
            if (checkPoint > windowWidth) {
                stickySidebar.destroy();
                stickySidebar2.destroy();
            }
        } else {
            return false;
        }
    }

    function accordion() {
        var accordion = $('.ps-accordion');
        accordion.find('.ps-accordion__content').hide();
        $('.ps-accordion.active').find('.ps-accordion__content').show();
        accordion.find('.ps-accordion__header').on('click', function(e) {
            e.preventDefault();
            if ($(this).closest('.ps-accordion').hasClass('active')) {
                $(this).closest('.ps-accordion').removeClass('active');
                $(this).closest('.ps-accordion').find('.ps-accordion__content').slideUp(350);

            } else {
                $(this).closest('.ps-accordion').addClass('active');
                $(this).closest('.ps-accordion').find('.ps-accordion__content').slideDown(350);
                $(this).closest('.ps-accordion').siblings('.ps-accordion').find('.ps-accordion__content').slideUp();
            }
            $(this).closest('.ps-accordion').siblings('.ps-accordion').removeClass('active');
            $(this).closest('.ps-accordion').siblings('.ps-accordion').find('.ps-accordion__content').slideUp();
        });
    }

    function select2Cofig() {
        $('select.ps-select').select2({
            placeholder: $(this).data('placeholder'),
            minimumResultsForSearch: -1
        });
    }

    function dateTimePicker() {
        $('.ps-datepicker').datepicker();
    }

    function navigateCarousel() {
        var link = $('.ps-home-banner .ps-section__nav a'),
            owl = $('.ps-home-banner').find('.owl-slider');
        owl.owlCarousel();
        link.on('click', function(e) {
            e.preventDefault();
            var el = $(this),
                position = el.closest('li').index();
            console.log(position);
            if (!el.closest('li').hasClass('active')) {
                el.closest('li').addClass('active');
                el.closest('li').siblings('li').removeClass('active');
                owl.trigger('to.owl.carousel', [position, 1, true]);
            }
        });
    }

    function shoppable() {
        var element = $('.ps-block--shoppable .ps-block__content');
        element.each(function(e) {
            $(this).css({
                top: $(this).data('y') + "%",
                left: $(this).data('x') + "%",
            })
        });
        $('.ps-block--shoppable .ps-block__circle').on('click', function(e) {
            e.preventDefault();
            $(this).siblings('.ps-block__product').slideToggle();
            $(this).siblings('.ps-block__product').siblings('.ps-block__product').hide();
        })

        $('.ps-block--checkout-action .ps-block__header').on('click', function(e) {
            e.preventDefault();
            $(this).siblings('.ps-block__content').slideToggle(500);
        });
    }

    function countDown() {
        var time = $(".ps-countdown");
        time.each(function() {
            var el = $(this),
                value = $(this).data('time');
            var countDownDate = new Date(value).getTime();
            var timeout = setInterval(function() {
                var now = new Date().getTime(),
                    distance = countDownDate - now;
                var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds = Math.floor((distance % (1000 * 60)) / 1000);
                el.find('.days').html(days);
                el.find('.hours').html(hours);
                el.find('.minutes').html(minutes);
                el.find('.seconds').html(seconds);
                if (distance < 0) {
                    clearInterval(timeout);
                    el.closest('.ps-section').hide();
                }
            }, 1000);
        });
    }

    // Custom Variables
    let helloHeight = 0;

    window.showSearch = () => {
        if ($('.upper-head').css('display') != 'none') {
            helloHeight = $('.upper-head').outerHeight(true);
        } else {
            helloHeight = 0;
        }
        if ($(".wc-search").length) {
            $(".wc-search").css('top', '110px');
        }
        $('.dropdown').removeClass('show');
        $('.dropdown-menu').removeClass('show');
        $('.dropdown-toggle').attr('aria-expanded', 'false');
        $('.collapse').removeClass('show');
        $('.navbar-toggler').addClass('collapsed');
        $('.navbar-toggler').attr('aria-expanded', 'false');
        $("html, body").animate({ scrollTop: 0 }, '200');
        $('input[name=srch]').focus();
    }

    window.removeSearch = () => {
        if ($(".wc-search").length) {
            if ($(".wc-search").offset().top >= 0) {
                $(".wc-search").css('top', '-100%');
            }
        }
    }


    $(function() {
        backgroundImage();
        owlCarouselConfig();
        siteToggleAction();
        subMenuToggle();
        masonry('.ps-masonry');
        productFilterToggle();
        tabs();
        slickConfig();
        //productLightbox();
        rating();
        stickyHeader();
        filterSlider();
        modalInit();
        searchInit();
        parallax();
        stickySidebar();
        accordion();
        select2Cofig();
        dateTimePicker();
        navigateCarousel();
        shoppable();
        countDown();

        /* Search Animation Starts */
        $('.search-link').click(function() {
            showSearch();
            return false;
        });

        window.closeSearch = () => {
            removeSearch();
            $('input[name=srch]').val("");
            $('input[name=home_page_search]').val("");
            // $('.srch-prdt-lower').hide();
            return false;
        };

        $('.srch-close').click(function() {
            removeSearch();
            $('#kesprs').val("");
            //$('.srch-prdt-lower').hide();
            return false;
        });
        $(document).click(function(e) {
            var target = e.target;
            if (!$(target).is('.wc-search') && !$(target).parents().is('.wc-search') && !$(target).is('.wc-search *') && !$(target).is('.upper-head') && !$(target).is('.upper-head *')) {
                removeSearch();
                $('#kesprs').val("");
                //$('.srch-prdt-lower').hide();
            }
        });
        /* Search Animation Ends */

        window.closeHelloBar = () => {
            $('.upper-head').slideUp(115);
            /*if ($(".wc-search").offset().top > 0) {
                $(".wc-search").css('top', '0px');
            }*/
            return false;
        };

        /* Hello Bar Close Starts */
        $('.hello-close').click(function() {
            $('.upper-head').slideUp(115);
            if ($(".wc-search").offset().top > 0) {
                $(".wc-search").css('top', '0px');
            }
            return false;
        });
        /* Hello Bar Close Ends */

    });

    $(window).on('load', function() {
        $('body').addClass('loaded');
    });


    $('#kesprs').keyup(function() {

        // If value is not empty
        if ($(this).val().length == 0) {
            // Hide the element
            $('.srch-prdt-lower').hide();
        } else {
            // Otherwise show it
            $('.srch-prdt-lower').show();
        }
    }).keyup();


    /* Search Bar Removal Starts */
    // $(window).scroll(function() {
    //     removeSearch();
    // });
    /* Search Bar Removal Ends */
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();

    });

    window.hideMegaMenu = () => {

        // $('.shop-crtgy').not($(this).parent().find('.shop-crtgy')).removeClass('shp-dropdn');
        $('.shop-crtgy').toggleClass('shp-dropdn active-link');
        $('.custm-mega-menu').fadeToggle('fast');
    }

    $(document).on("click", ".shop-crtgy", function(e) {
        e.preventDefault();
        e.stopPropagation();
        hideMegaMenu();
    });

    $(document).on("click", ".custm-mega-menu", function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $(document).on("keyup", "#new-srch", function() {

        if ($('#new-srch').val().length !== 0) {
            $('.search-open-bx').fadeIn();
            $('.bannr-btn').css('background-image', 'url(assets/_img/white-cross.png)')
        } else {
            $('.search-open-bx').fadeOut();
            $('.bannr-btn').css('background-image', 'url(assets/_img/serch-icon.png)')
        }
    });

    $(document).on("click", "body", function() {
        $('.custm-mega-menu').fadeOut()
        $(".shop-crtgy").removeClass('shp-dropdn active-link');
        $('.search-open-bx').fadeOut();
        $('.bannr-btn').css('background-image', 'url(assets/_img/serch-icon.png)')
        $('#new-srch').val('')
            // $('.newsletter-error').remove();
    });

    $(document).on("click", ".faq-shw-mobl", function() {
        $('.faq-lft-btm').fadeToggle();
        $(this).find('.fa').toggleClass('fa-chevron-down');
        //$(this).find('.nav-link').addClass('close-cotgry-tb');
        // $('.close-cotgry-tb').fadeOut();
    });

    $(document).on("click", ".close-cotgry-tb", function() {
        if (screen && screen.width < 767) {
            // console.log(1234654);
            $('.faq-lft-btm').fadeOut();
        }
    });

    // $(document).on("click","button.btn", function() {
    //   console.log(1234654);
    //   return false;
    // });

    /*
      $(document).on("click",".megamnu-larg-btn a", function(e) {
        e.preventDefault();
        e.stopPropagation();

        scrollToKits();

      });

      $(document).on("click",".megamnu-larg-btn a", function(e) {
        e.preventDefault();
        e.stopPropagation();

        scrollToKits();

      });
      */


})(jQuery);

function scrollToKits() {
    if (document.body.classList.contains('home-page')) {
        var target = $('.tbs-grey'),
            megaMenu = $('.custm-mega-menu'),
            timeduration = 1000;
        if (screen.width > 767) {
            // code for res above 768
            $('html,body').animate({
                scrollTop: target.offset().top - 15
            }, timeduration);
        } else {
            // code for 767 and below resolution
            $('html,body').animate({
                scrollTop: target.offset().top - (megaMenu.height() + 30)
            }, timeduration);
        }
        // Hide mega Menu
        // hideMegaMenu();
        $('.shop-crtgy').removeClass('shp-dropdn');
        $('.custm-mega-menu').fadeOut('fast');
    }
}

$(window).scroll(function() {
    var $myDiv = $('#paymentHeight');
    var $myDiv2 = $('#boundaryDiv');
    if ($myDiv.length) {
        var payE = $myDiv.height() - 10;
        //console.log(payE);
        $myDiv2.css('height', payE + 'px');
    }
    //var paymentHeightvar = $('#paymentHeight').height() - 10;
});
$(document).on("click", ".wrte-btn", function() {
    $('.revw-frm').fadeToggle();
});
// Floating Label JS Starts
var FloatLabel = (() => {

    // add active class and placeholder
    const handleFocus = (e) => {
        const target = e.target;
        target.parentNode.classList.add('active');
        target.setAttribute('placeholder', target.getAttribute('data-placeholder'));
        //console.log('yes');
    };

    // remove active class and placeholder
    const handleBlur = (e) => {
        const target = e.target;
        if (!target.value) {
            target.parentNode.classList.remove('active');
        }
        target.removeAttribute('placeholder');
    };

    // register events
    const bindEvents = (element) => {
        //const floatField = element.querySelector('input');
        const floatField = element.querySelector('.frmEle');

        floatField.addEventListener('focus', handleFocus);
        floatField.addEventListener('blur', handleBlur);
    };



    // get DOM elements
    const init = () => {
        const floatContainers = document.querySelectorAll('.input-field');

        floatContainers.forEach((element) => {
            if (element.querySelector('.frmEle').value) {
                element.classList.add('active');
            }

            bindEvents(element);
        });
    };

    return {
        init: init
    };
})();

//FloatLabel.init();
// Floating Label ends
