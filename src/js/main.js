$(document).ready(function(){

    // --------------------------------------------------------------------------
    // Sorting
    // --------------------------------------------------------------------------

    $('.sorting-check__input').on('click change', function(event) {
        if($(this).is('.is-reverse')) {
            $(this).removeClass('is-reverse');
            console.log('Un Reverse!')
        }
        else {
            $(this).addClass('is-reverse');
            console.log('Reverse!')
        }
    });

    // --------------------------------------------------------------------------
    // Shipyard-model MORE
    // --------------------------------------------------------------------------

    $('.shipyard-model__more').on('click', '.btn', function(event) {
        event.preventDefault();
        $('.shipyard-model').addClass('is-open')
    });

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
    // Ads Filter
    // --------------------------------------------------------------------------

     $('.ads__filter-group').on('change', '.ui-check__input', function(event) {
        event.preventDefault();
        if($(this).is(':checked')) {
            $(this).prop({ checked: true }).closest('.ads__filter-group').addClass('is-active').find('.ui-select').prop("disabled", false).trigger('refresh');
        }
        else {
            $(this).prop({ checked: false }).closest('.ads__filter-group').removeClass('is-active').find('.ui-select').prop("disabled", true).trigger('refresh');
        }
    });


    // --------------------------------------------------------------------------
    // Owl Carousel
    // --------------------------------------------------------------------------

    function initCarousels () {
       
    

        var iconPrev = '<svg class="ico ico-prev"><use xlink:href="img/sprite.svg#ico-prev"></use></svg>',
            iconNext = '<svg class="ico ico-next"><use xlink:href="img/sprite.svg#ico-next"></use></svg>';

        var duration = 5000;

        $('.js-carousel').owlCarousel({
            center: true,
            items: 1,
            loop: true,
            autoplay: false,
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

        // --------------------------------------------------------------------------
        // Owl Carousel Models
        // --------------------------------------------------------------------------


        $('.js-carousel-models').owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            dots: true,
            margin: 30,
            lazyLoad: true,
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
            lazyLoad: true,
            navText: [iconPrev,iconNext]
        });



        // ----- Add Captions and count

        $('.js-carousel-images').each(function(){

            var carouselLength = $(this).find('.images-item').length;

            if(carouselLength <= 1) {
                $(this).addClass('is-oneObj')
            }

            
            $(this).find('.images-item').each(function(i){

                var carouselIndex = i++;
                var carouselCaption = $(this).find('img').attr('alt');

                if(carouselLength > 1) {
                    $(this).append('<div class="images-carousel-caption"><div class="images-carousel-caption-in"><b>'+ (carouselIndex + 1) + ' / ' + carouselLength + '</b>' + carouselCaption + '</div></div>');
                }
                else {
                    $(this).append('<div class="images-carousel-caption"><div class="images-carousel-caption-in">' + carouselCaption + '</div></div>');
                }
            
            });

        
        });

        $('.js-carousel-images').owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            dots: true,
            margin: 20,
            autoHeight: true,
            lazyLoad: true,
            navText: [iconPrev,iconNext]
        });



        // Gallery

        var gallery = $('.js-gallery'),
            gallerySlides = gallery.find('.js-gallery-slides'),
            galleryThumbs = gallery.find('.js-gallery-thumbs'),

            galleryDuration = 500;


        $('.js-gallery-slides').each(function(){

            var galleryLength = $(this).find('.gallery-slides__item').length;

            $(this).find('.gallery-slides__item').each(function(i){
                var galleryIndex = i++;
                $(this).find('.js-gallery-count').html((galleryIndex + 1) + ' / ' + galleryLength)
            });

        });

        // carousel function for main slider

        gallerySlides.owlCarousel({
            loop: true,
            nav: true,
            items: 1,
            margin: 20,
            center: true,
            lazyLoad: true,
            smartSpeed: galleryDuration,
            fluidSpeed: galleryDuration,
            navText: [iconPrev,iconNext],
            autoHeight: true,
            responsive:{
                0: {
                     autoHeight: true
                },
                992: {
                    autoHeight: false
                }
            }
            }).on('changed.owl.carousel', function (e) {
                //On change of main item to trigger thumbnail item
                galleryThumbs.trigger('to.owl.carousel', [e.page.index, galleryDuration, true]);

                // console.log(e.page.count)
            });

        $(window).on('resize', function(event) {
           gallerySlides.trigger('refresh.owl.carousel');
        });

        // carousel function for thumbnail slider
        galleryThumbs.owlCarousel({
            loop: true,
            center: true, //to display the thumbnail item in center
            nav: false,
            margin: 20,
            stagePadding: 60,
            lazyLoad: true,
            smartSpeed: galleryDuration,
            fluidSpeed: galleryDuration,

            responsive:{
                0:{
                    items: 3
                },
                600:{
                    items: 4
                },
                1000:{
                    items: 5
                }
            }
        }).on('click', '.owl-item', function (e) {
            var index = $(this).find('.gallery-thumbs__item').data('gallery-index');
            gallerySlides.trigger('to.owl.carousel', [index - 1, galleryDuration, true]);

        }).on('changed.owl.carousel', function (e) {
            // gallerySlides.trigger('to.owl.carousel', [e.item.index, galleryDuration, true]);
        });


        $('.js-carousel-photo').owlCarousel({
            items: 1,
            loop: true,
            nav: false,
            dots: true,
            margin: 20,
            autoHeight: true,
            lazyLoad: true,
            navText: [iconPrev,iconNext],
            onChanged: callback,
            onInitialized: callback
        });

        $('.js-photo-prev').click(function() {
            $('.js-carousel-photo').trigger('prev.owl.carousel');
        })

        $('.js-photo-next').click(function() {
            $('.js-carousel-photo').trigger('next.owl.carousel');
        })

        function callback(event) {
   
           
            var slides         = event.target,
                slidesItems    = $(slides).find('.owl-item'),
                slidesCurrent  = event.item.index;

            var imgPrev = slidesItems.eq(slidesCurrent - 1).find('img').attr('src');
            var imgNext = slidesItems.eq(slidesCurrent + 1).find('img').attr('src');

            if(imgPrev == undefined) var imgPrev = slidesItems.eq(1).find('img').attr('src')
            if(imgNext == undefined) var imgNext = slidesItems.eq(0).find('img').attr('src')

            $('.js-photo-prev').find('.photo-btn__image').empty().append('<img src="' + imgPrev + '">');
            $('.js-photo-next').find('.photo-btn__image').empty().append('<img src="' + imgNext + '">');

        }


        $('.js-carousel-catalog').owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            dots: true,
            dotsEach: true,
            margin: 20,
            autoHeight: true,
            lazyLoad: true,
            navText: [iconPrev,iconNext],
            responsive: {
                420: {
                    items: 2
                },
                768: {
                    items: 3
                }
            }
        });


        $('.js-carousel-similar').owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            dots: true,
            margin: 0,
            autoHeight: true,
            lazyLoad: true,
            // stagePadding: 20,
            navText: [iconPrev,iconNext],
            responsive: {
                480: {
                    items: 2
                },
                768: {
                    items: 3
                },
                1200: {
                    items: 5
                }
            }
        });


        $('.js-carousel-brands').owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            dots: true,
            margin: 20,
            autoHeight: true,
            lazyLoad: true,
            navText: [iconPrev,iconNext],
            responsive: {
                768: {
                    items: 3
                },
                992: {
                    items: 6
                }
            }
        });


        // -----


        $('.js-carousel-gallery').find('img').each(function(){

            var child = $(this),
                childWidth = child.prop('naturalWidth');

                child.parent().css({
                    width: childWidth
                });

        });


        $('.js-carousel-gallery').owlCarousel({
            items: 3,
            loop: true,
            nav: true,
            lazyLoad: false,
            margin: 0,
            navText: [iconPrev,iconNext],
            autoWidth: true
        });



        // Gallery Full In Popup



        // Gallery Full In Popup - Slides

        var galleryFull = $('.js-gallery-full'),
            galleryFullSlides = galleryFull.find('.js-gallery-full-slides'),
            galleryFullThumbs = galleryFull.find('.js-gallery-full-thumbs'),
            galleryFullDots = galleryFull.find('.js-gallery-full-dots'),

            galleryFullDuration = 500;


        // Galllery Full In Popup - Zoom

        $('[data-fancybox="gallery"]').fancybox({
            loop : true,
            buttons : [
                'close'
            ],
            transitionEffect: 'slide',
            btnTpl : {
                close : '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
                            '<svg class="ico ico-close"><use xlink:href="img/sprite.svg#ico-close"></use></svg>' +
                        '</button>',
                arrowLeft : '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
                            '<svg class="ico ico-prev"><use xlink:href="img/sprite.svg#ico-prev"></use></svg>' +
                          '</button>',

                arrowRight : '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
                          '<svg class="ico ico-next"><use xlink:href="img/sprite.svg#ico-next"></use></svg>' +
                        '</button>'
            },
          
            beforeClose : function ( current ) {
                // galleryFullSlides.trigger('to.owl.carousel', [current.id - 1, 100, false]);
                // console.log(current.id)
            }

        });
        
        // Gallery Full In Popup - COUNTER (x/x)

        galleryFullSlides.each(function(){

            var galleryLength = $(this).find('.gallery-full__item').length;

            $(this).find('.gallery-full__item').each(function(i){
                var galleryIndex = i++;
                $(this).find('.js-gallery-full-count').html((galleryIndex + 1) + ' / ' + galleryLength);
                galleryFullDots.append('<span class="gallery-full-dots__item"></span>');
            });


        });


        // Gallery Full In Popup - Thumbs & Dots

        galleryFullSlides.on('initialized.owl.carousel', function (event) {

            galleryFullDots.children().removeClass('active').eq(event.page.index + 1).addClass('active');
            galleryFullThumbs.children().removeClass('active').eq(event.page.index + 1).addClass('active');

        }).on('changed.owl.carousel', function (event) {

            galleryFullDots.children().removeClass('active').eq(event.page.index).addClass('active');
            galleryFullThumbs.children().removeClass('active').eq(event.page.index).addClass('active');

        });


        galleryFullThumbs.on('click', '.gallery-full-thumbs__item', function(event) {
            $('.gallery-full-thumbs, .gallery-full-thumbs__btn').removeClass('is-active is-open');

            var thumbIndex = $(this).index();

            galleryFullSlides.trigger('to.owl.carousel', [thumbIndex, 0, true]);

        });


        // Gallery Full In Popup - Slides

        galleryFullSlides.owlCarousel({
            loop: true,
            nav: true,
            items: 1,
            margin: 102,
            lazyLoad: true,
            autoHeight: true,
            smartSpeed: galleryFullDuration,
            fluidSpeed: galleryFullDuration,
            navText: [iconPrev,iconNext],
            onTranslate: function(event) {

                $(event.target).addClass('owl-hideArrows');

            },
            onTranslated: function(event) {

                $(event.target).removeClass('owl-hideArrows');

            }
        });


        galleryFull.on('click', '.gallery-full-thumbs__btn', function(event) {
            event.preventDefault();
            if ($(this).is('.is-active')) {
                $(this).removeClass('is-active').closest('.js-gallery-full').find('.gallery-full-thumbs').removeClass('is-open');
            }
            else {
                $(this).addClass('is-active').closest('.js-gallery-full').find('.gallery-full-thumbs').addClass('is-open');
            }
        });

        $(window).on('resize', function(event) {
            galleryFullSlides.trigger('refresh.owl.carousel');
        });


        // Galllery Full In Popup - POPUP

        var startWindowScroll = 0;

        $('[data-mfp-gallery]').magnificPopup({
            type:'inline',

            fixedContentPos: true,
            fixedBgPos: true,

            mainClass: 'mfp-with-zoom mfp-gallery',
            showCloseBtn: false,
            removalDelay: 300,
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out'
              },
              overflowY: 'scroll',

              callbacks: {
                beforeOpen: function() {
                    startWindowScroll = $(window).scrollTop();
                },
                open: function() {


                    $('html').addClass('is-lock');


                    var currentIndex = $.magnificPopup.instance.st.el.data('mfp-gallery');


                    galleryFullSlides.trigger('to.owl.carousel', [currentIndex - 1 , 0, true]);


                    $('.js-readmore').readmore({
                        maxHeight: 44,
                        moreLink: '<a href="#">Читать далее</a>',
                        lessLink: '<a href="#">Скрыть</a>',
                        speed: 240,
                        beforeToggle: function(trigger, element, more) {
                            if(! more) {
                                $(trigger).closest('.gallery-full__desc').removeClass('is-collapsed');

                            }
                            else {
                                $(trigger).closest('.gallery-full__desc').addClass('is-collapsed');
                                
                            }

                        },
                        afterToggle: function(trigger, element, more) {
                            galleryFullSlides.trigger('refresh.owl.carousel');
                        }
                    });

                    // -----

                    if ( $('.mfp-content').height() < $(window).height() ){
                      $('body').on('touchmove', function (e) {
                          e.preventDefault();
                      });
                    }


                },
                close: function() {

                    $('html').removeClass('is-lock');

                    $(window).scrollTop(startWindowScroll);
                    $('body').off('touchmove');
                    
                }
              }
        });


        

        $('.js-carousel-offer').owlCarousel({
            items: 1,
            loop: false,
            nav: true,
            dots: true,
            margin: 20,
            autoHeight: true,
            lazyLoad: true,
            navText: [iconPrev,iconNext],
            responsive: {
                480: {
                    items: 2
                },
                768: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        });


        // ------


        $('.js-carousel-compare').each(function(){

            var compareLength = $(this).find('.compare-item').length;

            $('.js-compare-count').html('Выбрано ' + compareLength + ' лодок');

            $(this).find('.compare-item').each(function(i){
                var compareIndex = i++;
                $(this).attr({'data-index': compareIndex});
            });

        });

        $('.js-carousel-compare').owlCarousel({
            items: 2,
            loop: true,
            nav: true,
            dots: false,
            margin: 20,
            lazyLoad: true,
            navText: [iconPrev,iconNext],
            responsive: {
                768: {
                    items: 3
                },
                992: {
                    items: 3,
                    stagePadding: 20
                },
                1200: {
                    items: 4,
                    stagePadding: 20
                }
                
            }
        });

        $('.js-carousel-compare').on('click', '.compare-item__delete', function(event) {
            event.preventDefault();
            event.stopPropagation();


            var indexLength = $('.js-carousel-compare').find('.compare-item').length;
            var indexDelete = $(this).closest('.compare-item').data('index');

            $('.js-carousel-compare').trigger('remove.owl.carousel', indexDelete).trigger('refresh.owl.carousel');

            if(indexLength <= 1) {
                $('.compare-wrapper').addClass('is-empty');
            }


         
        });




    }


    setTimeout(initCarousels, 500);






    

    // --------------------------------------------------------------------------
    // Ui-multiple
    // --------------------------------------------------------------------------

    $('.ui-multiple').on('click', '.ui-multiple-trigger', function(event) {
        event.preventDefault();
        if( $(this).is('.is-active')) {
            $(this).removeClass('is-active').closest('.ui-multiple').removeClass('is-open');
        }
        else {
            $(this).addClass('is-active').closest('.ui-multiple').addClass('is-open');
        }
    });

    $('.ui-multiple').each(function () {

        var multiple            = $(this),
            multiplePlaceholder = multiple.data('placeholder'),
            multipleIcon        = multiple.find('.ui-multiple-trigger-icon'),
            multipleText        = multiple.find('.ui-multiple-trigger-text'),
            multipleLength      = multiple.find('.ui-multiple-input:checked').length;

        multipleText.html(multiplePlaceholder);



    });


    $('.ui-multiple').on('change', '.ui-multiple-input', function(event) {
        var multiple            = $(this).closest('.ui-multiple'),
            multiplePlaceholder = multiple.data('placeholder'),
            multipleIcon        = multiple.find('.ui-multiple-trigger-icon'),
            multipleText        = multiple.find('.ui-multiple-trigger-text'),
            multipleLength      = multiple.find('.ui-multiple-input:checked').length,

            multipleCheck       = multiple.find('.ui-multiple-input:checked'),
            multipleCheckText   = multipleCheck.parent().find('.ui-multiple-text').html(),
            multipleCheckIcon   = multipleCheck.parent().find('.ui-multiple-icon').html(),

            multipleOne = multiple.find('.ui-multiple-input:checked');


        if (multipleLength == 0) {

            multipleText.html(multiplePlaceholder);
            multiple.removeClass('is-change is-one');

        }

        else if( multipleLength == 1 ) {

            multipleIcon.html(multipleCheckIcon);
            multipleText.html(multipleCheckText);
            multiple.addClass('is-change is-one');

        }

        else {
            multipleText.html(multipleLength + ' выбрано');
            multiple.removeClass('is-one');
        }
        

    });



    $('body').on( 'click', function(event) {

        if($(event.target).closest('.ui-multiple').length==0) {
            $('.ui-multiple, .ui-multiple-trigger').removeClass('is-open is-active');
        }

    });


    $('.ui-multiple-search').on('keyup', function(event) {
        var valThis = this.value.toLowerCase(),
            lenght  = this.value.length;


        $('.ui-multiple-text').each(function () {
            var text  = $(this).text(),
                textL = text.toLowerCase(),
                htmlR = '<b>' + text.substr(0, lenght) + '</b>' + text.substr(lenght);

                if (textL.indexOf(valThis) == 0) {
                    $(this).html(htmlR).closest('li').show();
                }
                else {
                    $(this).closest('li').hide();
                }

                elLength = $('.ui-multiple-text').length,
                elLengthVisible = $('.ui-multiple-text:visible').length;

                if (elLengthVisible == 0) $(this).closest('.ui-multiple').addClass('is-empty');
                else $(this).closest('.ui-multiple').removeClass('is-empty');
               
        });
    });
   

    // --------------------------------------------------------------------------
    // ui-display
    // --------------------------------------------------------------------------

    $('.ui-display').on('click', '.ui-display-btn', function(event) {
        event.preventDefault();
        var displayType = $(this).data('display');

        $('.ui-display-btn').removeClass('is-active');
        $(this).addClass('is-active');
    
        $('.ads__group').removeClass('is-display-block is-display-compact').addClass('is-display-' + displayType)
    });

    // --------------------------------------------------------------------------
    // Ui File photo
    // --------------------------------------------------------------------------

    function readURL(input) {

        var url = input.value;
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();

        if (input.files && input.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
            var reader = new FileReader();

            reader.onload = function (event) {
                $('.ui-photo__image').html('<img src="'+ event.target.result + '">');
            }

            reader.readAsDataURL(input.files[0]);
        }
        else{
            $('.ui-photo__image').html('');
        }
    }

    $('.ui-photo').on('change', '.ui-photo__input', function(event) {
        readURL(this);
    });


    // --------------------------------------------------------------------------
    // Ui Formstyler
    // --------------------------------------------------------------------------

    $('.ui-select, .ui-number').styler({
        selectSmartPositioning: false,
        selectSearch: true,
        selectVisibleOptions: 0,
        selectSearchLimit: 10,
        onSelectOpened: function() {
            $(this).find('.jq-selectbox__search input').focus()
        }
    });

    // --------------------------------------------------------------------------
    // Ui Range
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

    });



    // --------------------------------------------------------------------------
    // Tabs
    // --------------------------------------------------------------------------

    $('.js-tabs__menu').on('click', 'li:not(.active)', function() {
        $(this).addClass('is-active').siblings().removeClass('is-active')
        .closest('.js-tabs').find('.js-tabs__panel').removeClass('is-active').eq($(this).index()).addClass('is-active');
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

    $('.filter').on('click', '.filter-advanced', function(event) {
        event.preventDefault();
        if ($(this).is('.is-active')) {

            $(this).removeClass('is-active').find('span').text('Расширенный поиск').closest('.filter').removeClass('is-advanced');

        }
        else {
            $(this).addClass('is-active').find('span').text('Свернуть поиск').closest('.filter').addClass('is-advanced');
        }
        
    });


    // --------------------------------------------------------------------------
    // Random colors for icons & random bg
    // --------------------------------------------------------------------------


    $('[class *= "ico-set-"]').each(function(){
        var colorsArr = ["#999999", "#212121", "#00AE6F"];
        var colorsRand = Math.floor(Math.random() * colorsArr.length);
        $(this).css('color',colorsArr[colorsRand])
    });


    $('.media-news').each(function(){
        var bgArr = ["media-news--bg", "media-news--nobg"];
        var bgRand = Math.floor(Math.random() * bgArr.length);
        $(this).addClass(bgArr[bgRand]);
    });


    // --------------------------------------------------------------------------
    // Tags more
    // --------------------------------------------------------------------------

    $('.tags__btn--more').on('click', function(event) {
        event.preventDefault();

        $(this).hide().closest('.tags').find('.tags__btn:hidden').each(function(i) {
            $(this).not('.tags__btn--more').delay((i++) * 100).fadeTo(200, 1);
        });

    });


    // --------------------------------------------------------------------------
    // Share
    // --------------------------------------------------------------------------

    $('.share-toggle').on('click', '.share-toggle__btn', function(event) {
        event.preventDefault();

        if ($(this).is('.is-active')) {
            $(this).removeClass('is-active').closest('.share-toggle').removeClass('is-open');
        }
        else {
            $(this).addClass('is-active').closest('.share-toggle').addClass('is-open');
        }

    });

     $(document).on('click', function(e) {
        if($(e.target).closest('.share-toggle').length == 0) {
           $('.share-toggle, .share-toggle__btn').removeClass('is-open is-active');
        }
    });
    




    // ------



    $('.other-item__compare').on('click', function(event) {
        event.preventDefault();
        var otherTitle = $(this).closest('.other-item').find('.other-item__title').text()
        alert('Сравнить: ' + otherTitle)
      
    });

    $('.market-item__compare, .market-item__compare').on('click', function(event) {
        event.preventDefault();
        var marketTitle = $(this).closest('.market-item').find('.market-item__title').text()
        alert('Сравнить: ' + marketTitle)
    });



    // --------------------------------------------------------------------------
    // Detect Touch
    // --------------------------------------------------------------------------

    function detectTouch() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $('html').addClass('touch-device');
        }
        else {
            $('html').addClass('no-touch-device');
        }
    }

    detectTouch();

    // --------------------------------------------------------------------------
    // Scroll Animated
    // --------------------------------------------------------------------------


    scrollAnimation( $('.no-touch-device [data-animation]') );


    function scrollAnimation(items) {

        items.each( function() {
            var el = $(this),
                animationClass = el.data('animation'),
                animationDelay = el.data('delay');

                el.css({
                    '-webkit-animation-delay':   animationDelay,
                    'animation-delay':           animationDelay
                });

                el.waypoint(function(direction) {

                    if( direction === 'down' ) {

                        el.addClass(animationClass);

                    }

                },{
                    triggerOnce: true,
                    offset: '70%'
                });
        });

    }




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


    $('[data-mfp]').magnificPopup({
        type:'inline',
        mainClass: 'mfp-with-zoom',
        showCloseBtn: false,
        removalDelay: 300,
        zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out'
          },
          overflowY: 'scroll',

          callbacks: {
            open: function() {

                var magnificPopup = $.magnificPopup.instance;

                var theme = magnificPopup.st.el.closest('.tariff-item').find('.tariff-item-title').text();

                if(theme != ''){
                    magnificPopup.content.find('[name="theme"]').val(theme)
                }
                console.log(theme)

                

            },
            close: function() {
                
            }
          }
    });



    $(document).on('click', '[data-mfp-close]', function(event) {
        event.preventDefault();
        $.magnificPopup.close();
    });


    // Fixed

    $('.js-fixed').stick_in_parent({
        offset_top: 20
    });

   

  ////////////
  // UI
  ////////////

  // custom selects
  // $('.ui-select__visible').on('click', function(e){
  //   var that = this
  //   // hide parents
  //   $(this).parent().parent().parent().find('.ui-select__visible').each(function(i,val){
  //     if ( !$(val).is($(that)) ){
  //       $(val).parent().removeClass('active')
  //     }
  //   });

  //   $(this).parent().toggleClass('active');
  // });

  // $('.ui-select__dropdown span').on('click', function(){
  //   // parse value and toggle active
  //   var value = $(this).data('val');
  //   if (value){
  //     $(this).siblings().removeClass('active');
  //     $(this).addClass('active');

  //     // set visible
  //     $(this).closest('.ui-select').removeClass('active');
  //     $(this).closest('.ui-select').find('input').val(value);

  //     $(this).closest('.ui-select').find('.ui-select__visible span').text(value);
  //   }

  // });

  // // handle outside click
  // $(document).click(function (e) {
  //   var container = new Array();
  //   container.push($('.ui-select'));

  //   $.each(container, function(key, value) {
  //       if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
  //           $(value).removeClass('active');
  //       }
  //   });
  // });

  // // numeric input
  // $('.ui-number span').on('click', function(e){
  //   var element = $(this).parent().find('input');
  //   var currentValue = parseInt($(this).parent().find('input').val()) || 0;

  //   if( $(this).data('action') == 'minus' ){
  //     if(currentValue <= 1){
  //       return false;
  //     }else{
  //       element.val( currentValue - 1 );
  //     }
  //   } else if( $(this).data('action') == 'plus' ){
  //     if(currentValue >= 99){
  //       return false;
  //     } else{
  //       element.val( currentValue + 1 );
  //     }
  //   }
  // });

  // // Masked input
  // $(".js-dateMask").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
  // $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});


    function preload() {
        $('.page').addClass('is-ready');
    }


    setTimeout(preload, 700);


});
