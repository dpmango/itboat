$(document).ready(function(){


    // --------------------------------------------------------------------------
    // Nav Mobile
    // --------------------------------------------------------------------------

    $('.nav').on('click', '.nav__btn', function(event) {
        event.preventDefault();
        if ($(this).is('.is-active')) {
            $(this).removeClass('is-active').closest('.nav').removeClass('is-open');
        }
        else {
            $(this).addClass('is-active').closest('.nav').addClass('is-open');
        }
    });


    // --------------------------------------------------------------------------
    // Search
    // --------------------------------------------------------------------------

    $('.search').on('click', '.search__btn', function(event) {
        if ($(this).is('.is-active')) {
            $(this).removeClass('is-active').closest('.search').removeClass('is-open');
        }
        else {
            event.preventDefault();
            $(this).addClass('is-active').closest('.search').addClass('is-open').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function() {
                $('.search__input').focus();
            });
        }
      
    });

    $(document).on('click', function(e) {
        if($(e.target).closest('.search').length == 0) {
           $('.search, .search__btn').removeClass('is-open is-active');
        }
    });

    // --------------------------------------------------------------------------
    // Owl Carousel
    // --------------------------------------------------------------------------

    var iconPrev = '<svg class="ico ico-prev"><use xlink:href="img/sprite.svg#ico-prev"></use></svg>',
        iconNext = '<svg class="ico ico-next"><use xlink:href="img/sprite.svg#ico-next"></use></svg>';

    var duration = 5000;

    $('.js-carousel').owlCarousel({
        center: true,
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: duration,
        nav: true,
        dots: true,
        margin: 0,
        navText: [iconPrev,iconNext],
        onInitialize: resetProgressBar,
        onInitialized: startProgressBar,
        onTranslate: resetProgressBar,
        onTranslated: startProgressBar
    });

    function startProgressBar() {
   
        $('.js-carousel-progress').css({
            'width': '100%',
            'transition': 'width +' + duration + 'ms'
        });

    }

    function resetProgressBar() {
        $('.js-carousel-progress').css({
            'width': 0,
            'transition': 'width 0s'
        });
    }


    $('.item').matchHeight({
        byRow: true,
        property: 'min-height',
        target: null,
        remove: false
    });


    // --------------------------------------------------------------------------
    // Masonry
    // --------------------------------------------------------------------------

    $('.js-masonry').masonry({
        itemSelector: 'li',
        percentPosition: true
    });


    // --------------------------------------------------------------------------
    // Owl Carousel Models
    // --------------------------------------------------------------------------


    $('.js-carousel-models').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        dots: true,
        margin: 30,
        navText: [iconPrev,iconNext],
        responsive: {
            768: {
                items: 3
            }
            
        }
    });

    $('.js-carousel-charterly').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        dots: true,
        margin: 30,
        navText: [iconPrev,iconNext]
    });

    // --------------------------------------------------------------------------
    // Formstyler
    // --------------------------------------------------------------------------

    $('.ui-select').styler({
        selectSmartPositioning: false,
        selectSearch: false,
        selectVisibleOptions: 0,
        selectSearchLimit: 6
    });

    // --------------------------------------------------------------------------
    // Range
    // --------------------------------------------------------------------------

    $('.ui-range__input').ionRangeSlider({
        type: "double",
        from: 0,
        step: 1,
        hide_min_max: true,
        hide_from_to: true,
        force_edges: true,
        grid: false
    });


    $('.ui-range__input').on('change', function(event) {
        event.preventDefault();

        var range = $(this),
            rangeData = range.data("ionRangeSlider"),
            rangeDataFrom = range.data("from"),
            rangeDataTo = range.data("to");

        range.closest('.ui-range').find('.ui-from').val(rangeDataFrom)
        range.closest('.ui-range').find('.ui-to').val(rangeDataTo)
        // .closest('.app-range').find('.app-range-data').text(rangeDataFrom + ' - ' + rangeDataTo)

    });



    // --------------------------------------------------------------------------
    // Tabs
    // --------------------------------------------------------------------------

    $('.tabs__menu').on('click', 'li:not(.active)', function() {
        $(this).addClass('is-active').siblings().removeClass('is-active')
        .closest('.tabs').find('.tabs__panel').removeClass('is-active').eq($(this).index()).addClass('is-active');
    });



    // --------------------------------------------------------------------------
    // Filter & Popular Toggle Mobile
    // --------------------------------------------------------------------------

    $('.js-toggle').on('click', '.js-toggle-btn', function(event) {
        event.preventDefault();
        if ($(this).is('.is-active')) {
            $(this).removeClass('is-active').closest('.js-toggle').find('.js-toggle-content').slideUp('fast');
        }
        else {
            $(this).addClass('is-active').closest('.js-toggle').find('.js-toggle-content').slideDown('fast');
        }
    });




    


  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
    }
  }

  var _mobileDevice = isMobile();
  // detect mobile devices
  function isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true
    } else {
      return false
    }
  }

  //////////
  // COMMON
  //////////

 	// Prevent # behavior
	$('[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Smoth scroll
	$('a[href^="#section"]').click( function() {
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  if ( $('.header-static').length == 0 ){
    _window.scrolled(10, function() { // scrolled is a constructor for scroll delay listener
      var vScroll = _window.scrollTop();
      var header = $('.header').not('.header--static');
      var headerHeight = header.height();
      var heroHeight = $('.hero').outerHeight() - headerHeight;

      if ( vScroll > headerHeight ){
        header.addClass('header--transformed');
      } else {
        header.removeClass('header--transformed');
      }

      if ( vScroll > heroHeight ){
        header.addClass('header--fixed');
      } else {
        header.removeClass('header--fixed');
      }
    });
  }

  // HAMBURGER TOGGLER
  $('.hamburger').on('click', function(){
    $('.hamburger').toggleClass('active');
    $('.mobile-navi').toggleClass('active');
  });

  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering
  // user .active for li instead
  $('.header__menu li').each(function(i,val){
    if ( $(val).find('a').attr('href') == window.location.pathname.split('/').pop() ){
      $(val).addClass('active');
    } else {
      $(val).removeClass('active')
    }
  });


  // VIDEO PLAY
  $('.promo-video .icon').on('click', function(){
    $(this).closest('.promo-video').toggleClass('playing');
    $(this).closest('.promo-video').find('iframe').attr("src", $("iframe").attr("src").replace("autoplay=0", "autoplay=1"));
  });


  //////////
  // SLIDERS
  //////////

  $('.trending__wrapper').slick({
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true
  });

  //////////
  // MODALS
  //////////
  // Custom modals
  // $('*[data-modal]').on('click', function(){
  //   // remove all active first
  //   $('.modal').removeClass('opened');
  //
  //   // find by id
  //   var target = $(this).data('modal');
  //   $('#'+target).addClass('opened');
  //
  //   window.location.hash = target;
  // });
  //
  // $('.modal__close').on('click', function(){
  //   $(this).closest('.modal').removeClass('opened');
  //   window.location.hash = "";
  // });
  //
  // // CHECK SAVED STATE
  // if(window.location.hash) {
  //   var hash = window.location.hash.substring(1);
  //   $('#'+hash).addClass('opened');
  // }
  //


  // Magnific Popup
  // var startWindowScroll = 0;
  $('.js-popup').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'popup-buble',
    callbacks: {
      beforeOpen: function() {
        // startWindowScroll = _window.scrollTop();
        // $('html').addClass('mfp-helper');
      },
      close: function() {
        // $('html').removeClass('mfp-helper');
        // _window.scrollTop(startWindowScroll);
      }
    }
  });

  // $('.popup-gallery').magnificPopup({
	// 	delegate: 'a',
	// 	type: 'image',
	// 	tLoading: 'Loading image #%curr%...',
	// 	mainClass: 'mfp-img-mobile',
	// 	gallery: {
	// 		enabled: true,
	// 		navigateByImgClick: true,
	// 		preload: [0,1]
	// 	},
	// 	image: {
	// 		tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
	// 	}
	// });


  ////////////
  // UI
  ////////////

  // custom selects
  $('.ui-select__visible').on('click', function(e){
    var that = this
    // hide parents
    $(this).parent().parent().parent().find('.ui-select__visible').each(function(i,val){
      if ( !$(val).is($(that)) ){
        $(val).parent().removeClass('active')
      }
    });

    $(this).parent().toggleClass('active');
  });

  $('.ui-select__dropdown span').on('click', function(){
    // parse value and toggle active
    var value = $(this).data('val');
    if (value){
      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      // set visible
      $(this).closest('.ui-select').removeClass('active');
      $(this).closest('.ui-select').find('input').val(value);

      $(this).closest('.ui-select').find('.ui-select__visible span').text(value);
    }

  });

  // handle outside click
  $(document).click(function (e) {
    var container = new Array();
    container.push($('.ui-select'));

    $.each(container, function(key, value) {
        if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
            $(value).removeClass('active');
        }
    });
  });

  // numeric input
  $('.ui-number span').on('click', function(e){
    var element = $(this).parent().find('input');
    var currentValue = parseInt($(this).parent().find('input').val()) || 0;

    if( $(this).data('action') == 'minus' ){
      if(currentValue <= 1){
        return false;
      }else{
        element.val( currentValue - 1 );
      }
    } else if( $(this).data('action') == 'plus' ){
      if(currentValue >= 99){
        return false;
      } else{
        element.val( currentValue + 1 );
      }
    }
  });

  // Masked input
  $(".js-dateMask").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
  $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});

});
