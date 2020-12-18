"use strict";

document.addEventListener('DOMContentLoaded', function () {
  console.log('hello'); // посковая строка в шапке открытие/закрытие

  function closeSearchRow() {
    if ($('.header-bot-search__input').val() !== '') {
      console.log('что-то есть');
      $('.header-bot-search__input').addClass('header-bot-search__input-border_active');
      $('.header-bot-search__icon').addClass('header-bot-search__icon_active');
    } else {
      $('.header-bot-search__input').removeClass('header-bot-search__input-border_active');
      $('.header-bot-search__icon').removeClass('header-bot-search__icon_active');
    }

    $('.header-bot-search__input').removeClass('header-bot-search__input_active'); // $('.header-bot-search__icon').removeClass('header-bot-search__icon_active');

    setTimeout(function () {
      $('.header-bot-search').removeClass('header-bot-search_active');
      $('.header-bot-filter').removeClass('header-bot-filter_active');
    }, 300);
    $('.bx_searche').removeClass('bx_searche_active');
  }

  function showSearchRow() {
    $('.header-bot-search__input').addClass('header-bot-search__input_active');
    $('.header-bot-filter').addClass('header-bot-filter_active');
    $('.header-bot-search').addClass('header-bot-search_active');
    $('.header-bot-search__icon').addClass('header-bot-search__icon_active');

    if ($('.header-bot-search__input').val() !== '') {
      $('.bx_searche').addClass('bx_searche_active');
    }
  }

  $('#search-input').focusin(function () {
    showSearchRow();
  });
  $('#search-input').focusout(function () {
    closeSearchRow();
  }); // посковая строка в шапке открытие/закрытие
  // кнопка очищения строки поиска    

  $('.header-bot-search__clear').on('click', function () {
    $('.header-bot-search__clear').removeClass('header-bot-search__clear_active');
    $('.header-bot-search__input').removeClass('header-bot-search__input-border_active');
    $('.header-bot-search__icon').removeClass('header-bot-search__icon_active');
  }); // кнопка очищения строки поиска 
  // открываем.закрываем меню с фильтрами    

  $('.header-bot-filter').on('click', function () {
    $('.header-filter').toggleClass('header-filter_active');
    $('.header-bot-filter').toggleClass('header-bot-filter_triangle');
  }); // открываем.закрываем меню с фильтрами
  // выпадающие меню в списке фильтров

  $('.header-filter-list-item').on('click', function () {
    $(this).children('.header-filter-list-drop-menu').toggleClass('header-filter-list-drop-menu_active');
    $('.header-filter-list-drop-menu').on('click', function (event) {
      event.stopPropagation();
    });
  }); // выпадающие меню в списке фильтров

  $('.header-filter input[type="checkbox"]').on('click', function () {
    $('#result span').html($('#controls input:checkbox:checked').length);
    var countCheckedFilters = $('.header-filter input[type="checkbox"]:checked').length;

    if (countCheckedFilters > 0) {
      $('.header-filter-submit').addClass('header-filter-submit_active');
      $('.header-filter-reset').addClass('header-filter-reset_active');
    } else {
      $('.header-filter-submit').removeClass('header-filter-submit_active');
      $('.header-filter-reset').removeClass('header-filter-reset_active');
    }

    console.log(countCheckedFilters);
  }); // CБРОС ФИЛЬТРОВ

  $('.header-filter-reset').on('click', function () {
    $('.header-filter-submit').removeClass('header-filter-submit_active');
    $('.header-filter-reset').removeClass('header-filter-reset_active');
  }); // let allCheck = document.querySelectorAll('.header-filter input[type="checkbox"]');
  // allCheck.forEach(function (item) {
  //     item.addEventListener('click', function () {
  //         console.log(item.closest('label').innerText);
  //     })
  // })

  $('.header-filter input[type="checkbox"]').on('click', function () {
    // const pageNext = $(this).data('page-next');
    // if (pageNext == undefined) {
    //     return;
    // }
    console.log($(this).parent().text());
    $.ajax({
      url: 'check-res.html',
      data: $('.header-filter input[type="checkbox"]').parent().val() // type: 'post'

    }).done(function (resultHtml) {
      console.log(resultHtml);
    }).fail(function () {
      console.log('Failed');
    }).always(function () {});
  }); // аякс для строки поиска

  $(".header-bot-search__input").on('input', function postinput() {
    var searchvalue = $(this).val(); // this.value

    console.log(searchvalue);
    $.ajax({
      url: 'search-res.html',
      responseData: {
        searchvalue: searchvalue
      } // type: 'post'

    }).done(function (responseData) {
      $('.bx_searche').addClass('bx_searche_active');
      $('.header-bot-search .bx_searche').append(responseData);
    }).fail(function () {
      console.log('Failed');
    }).always(function () {
      if ($('.header-bot-search__input').val() == '') {
        console.log('пусто');
        $('.bx_searche').removeClass('bx_searche_active');
        $('.header-bot-search__clear').removeClass('header-bot-search__clear_active');
      } else {
        console.log('ГУСТО');
        $('.header-bot-search__input').addClass('header-bot-search__input_active');
        $('.header-bot-search__clear').addClass('header-bot-search__clear_active');
      }
    });
  }); // аякс для строки поиска  

  var $grid = $('.page-content-grid').masonry({
    columnWidth: '.page-content-grid-sizer',
    itemSelector: '.page-content-grid-item',
    horizontalOrder: true,
    resize: true,
    percentPosition: true,
    initLayout: false,
    gutter: 8
  });
  $grid.masonry('on', 'layoutComplete', function () {
    console.log('layout is complete');
  }); // $grid.masonry();

  $grid.imagesLoaded(function () {
    // init Masonry after all images have loaded
    $grid.masonry();
  });

  function cardCollectionActive() {
    if (document.querySelectorAll('.card-collection').length) {
      (function () {
        var cardCollectionCard = document.querySelectorAll('.card-collection');
        var cardCollectionName = document.querySelectorAll('.card-collection__name');

        var _loop = function _loop(i) {
          cardCollectionName[i].onclick = function () {
            cardCollectionCard[i].classList.toggle('card-collection_active');
            setTimeout(function () {
              $grid.masonry();
            }, 150);
          };
        };

        for (var i = 0; i < cardCollectionCard.length; i++) {
          _loop(i);
        }
      })();
    }
  }

  cardCollectionActive();

  function cardBrandActive() {
    if (document.querySelectorAll('.card-brand').length) {
      (function () {
        var cardBrandCard = document.querySelectorAll('.card-brand');
        var cardBrandCountTitle = document.querySelectorAll('.card-brand__count-title');

        var _loop2 = function _loop2(i) {
          cardBrandCountTitle[i].onclick = function () {
            cardBrandCard[i].classList.toggle('card-brand_active');
            setTimeout(function () {
              $grid.masonry();
            }, 150);
          };
        };

        for (var i = 0; i < cardBrandCard.length; i++) {
          _loop2(i);
        }
      })();
    }
  }

  cardBrandActive(); // ВЫПАДАЮЩАЯ ШАПКА ПРИ СКРОЛЛЕ

  var scrollPos = 0;
  $(window).on('scroll', function () {
    var st = $(this).scrollTop();

    if (st > scrollPos && st > 1000) {
      console.log('вниз ниже 1000');
      $(".header-bot").removeClass('header-fixed_active');
      $(".header-filter").removeClass('header-filter_active-fixed');
    } else if (st > scrollPos && st > 500) {
      console.log('вниз ниже 500');
      console.log(st);
      $(".header-bot").addClass('header-fixed');
    } else if (st > scrollPos) {
      console.log('вниз ниже 0');
    } else if (st < scrollPos && st > 1000) {
      console.log('вверх ниже 1000');
      $(".header-bot").addClass('header-fixed_active');
      $(".header-filter").addClass('header-filter_active-fixed');
    } else if (st < scrollPos && st > 500) {
      console.log('вверх выше 1000 и ниже 500');
      $(".header-bot").removeClass('header-fixed_active');
      $(".header-filter").removeClass('header-filter_active-fixed');
    } else {
      console.log('вверх');
      $(".header-bot").removeClass('header-fixed');
    }

    scrollPos = st; // 
  }); // ВЫПАДАЮЩАЯ ШАПКА ПРИ СКРОЛЛЕ
  // АКТИВАЦИЯ СЛАЙДЕРА НА ГЛАВНОЙ

  if (document.querySelectorAll('.page-slider').length) {
    var pageSlider = new Swiper('.page-slider', {
      pagination: {
        el: '.page-slider-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.page-slider-next',
        prevEl: '.page-slider-prev'
      }
    });
  } // АКТИВАЦИЯ СЛАЙДЕРА НА ГЛАВНОЙ
  // БУРГЕР


  $('.header-burger').on('click', function () {
    $('.header-burger').toggleClass('header-burger_active');
    $('.mobile-menu').toggleClass('mobile-menu_active');
    $('.header-bot-mobile-item-desc').toggleClass('header-bot-mobile-item-desc_active');
    $('.header-bot').toggleClass('header-bot_active');
  }); // СТРОКА ПОИСКА НА МОБИЛЕ

  $('.header-bot-mobile-item-search').on("click", function () {
    $('.header-bot-mobile-item').hide();
    $('.header-bot-search').css({
      'display': 'flex'
    });
    $('.header-bot-search__input').css({
      'max-width': '100%'
    });
    $('.header-bot-mobile-search-close').show();
  });
  $('.header-bot-mobile-search-close').on("click", function () {
    $('.header-bot-mobile-item').show();
    $('.header-bot-search').css({
      'display': 'none'
    });
    $('.header-bot-search__input').css({
      'max-width': '282px'
    });
    $('.header-bot-mobile-search-close').hide();
  }); // МОБИЛЬНОЕ МЕНЮ

  $('.mobile-menu-list-item .header-top__more').on('click', function () {
    $(this).siblings($('.mobile-menu-list-drop')).toggleClass('mobile-menu-list-drop_active');
  });
  $('.mobile-menu-list-item__btn').on('click', function () {
    $('.header-filter').addClass('header-filter_active');
  });
  $('.header-filter-head__close').on('click', function () {
    $('.header-filter').removeClass('header-filter_active');
  });
  var observer = lozad(); // lazy loads elements with default selector as '.lozad'

  observer.observe();
  $('.product-text__content-read-more').on('click', function () {
    $('.product-text__content-read-more').toggleClass('product-text__content-read-more_active');
  });

  if (document.querySelectorAll('.product-slider').length) {
    var galleryThumbs = new Swiper('.product-slider-thumbs', {
      lazy: true,
      spaceBetween: 5,
      slidesPerView: 7,
      loop: true,
      freeMode: true,
      loopedSlides: 1,
      //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      direction: 'horizontal',
      breakpoints: {
        761: {
          freeMode: false,
          slidesPerView: 7,
          spaceBetween: 8
        },
        1441: {
          freeMode: false,
          spaceBetween: 16,
          direction: 'vertical'
        }
      }
    });
    var galleryTop = new Swiper('.product-slider-main', {
      lazy: true,
      // spaceBetween: 10,
      // loop: true,
      loopedSlides: 1,
      navigation: {
        nextEl: '.product-slider-main-next',
        prevEl: '.product-slider-main-prev'
      },
      thumbs: {
        swiper: galleryThumbs
      },
      pagination: {
        el: '.product-slider-thumbs-pagination',
        type: 'fraction'
      }
    });
  } // 


  $(function () {
    (function quantityProducts() {
      var $quantityArrowMinus = $(".quantity-arrow-minus");
      var $quantityArrowPlus = $(".quantity-arrow-plus");
      var $quantityNum = $(".quantity-num");
      $quantityArrowMinus.click(quantityMinus);
      $quantityArrowPlus.click(quantityPlus);

      function quantityMinus() {
        if ($quantityNum.val() > 1) {
          $quantityNum.val(+$quantityNum.val() - 1);
        }
      }

      function quantityPlus() {
        $quantityNum.val(+$quantityNum.val() + 1);
      }
    })();
  });
  $(".pager-more").on('click', function () {
    preventDefault();
    var pageNext = $(this).data('page-next');

    if (pageNext == undefined) {
      return;
    }

    console.log(pageNext);
    $.ajax({
      url: 'main-page-list.html',
      data: {
        PAGEN_1: pageNext
      } // type: 'post'

    }).done(function (resultHtml) {
      console.log('ok');
      $('.page-content-grid').append($(resultHtml).find('.page-content-grid-item'));
      $('.pager').replaceWith($(resultHtml).find('.pager'));
      $grid.masonry('reloadItems');
      $grid.imagesLoaded(function () {
        $grid.masonry();
      });
      cardCollectionActive();
      cardBrandActive();
      initSwiperCardImg();
      observer.observe();
    }).fail(function () {
      console.log('Failed');
    }).always(function () {});
  });
  $(".pager-content a").on('click', function () {
    preventDefault(); // const pageNext = $(this).data('page-next');
    // if (pageNext == undefined) {
    //     return;
    // }

    $.ajax({
      url: 'main-page-list.html' // data: { PAGEN_1: pageNext },
      // type: 'post'

    }).done(function (resultHtml) {
      console.log('ok');
      $('.page-content').replaceWith(resultHtml);
      var $grid = $('.page-content-grid').masonry({
        itemSelector: '.page-content-grid-item',
        horizontalOrder: true,
        resize: true,
        percentPosition: true,
        initLayout: false,
        gutter: 8
      });
      $grid.masonry('on', 'layoutComplete', function () {
        console.log('layout is complete');
      });
      $grid.imagesLoaded(function () {
        // init Masonry after all images have loaded
        $grid.masonry();
      });
      cardCollectionActive();
      cardBrandActive();
      observer.observe();
    }).fail(function () {
      console.log('Failed');
    }).always(function () {});
  });

  function initSwiperCardImg() {
    var swiperCardImg = new Swiper('.page-card-img', {
      effect: 'fade',
      pagination: {
        el: '.page-card-img-pagination',
        clickable: true
      }
    });
    $('.page-card-img-hover li').on('mouseenter', function () {
      var currentSwiper = $(this).parent().parent();
      var swiperIndex = $('.page-card-img').index(currentSwiper);
      var currentIndex = $(this).parent().children().index(this);
      swiperCardImg[swiperIndex].slideTo(currentIndex);
    });
  }

  initSwiperCardImg();
  console.log('press F');
});