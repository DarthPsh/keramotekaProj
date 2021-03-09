"use strict";

document.addEventListener('DOMContentLoaded', function () {
  console.log('hello');
  $('#up').click(function () {
    // скролл вверх
    $('html, body').animate({
      scrollTop: 0
    }, 500);
    return false;
  });

  function onlyTheNumbersRemain() {
    // удаляем все символы кроме + из ссылки с типом tel
    $('a[href^="tel:"]').attr('href', function (_, v) {
      return v.replace(/\(/g, '').replace(/\)/g, '').replace(/\ /g, '').replace(/\-/g, '');
    });
  }

  onlyTheNumbersRemain(); // удаляем все символы из инпута tel кроме чисел

  $('input[type="tel"]').inputmask("+7 (999) 999-99-99"); // маска инпута телефона

  $(document).ajaxSuccess(function () {
    $('input[type="tel"]').inputmask("+7 (999) 999-99-99"); // маска инпута телефона после аякса

    onlyTheNumbersRemain(); // удаляем все символы кроме + из ссылки с типом tel после аякса
  }); //плавный скролл
  // jQuery('a[href*="#"]').on('click', function (e) {
  //     e.preventDefault();
  //     jQuery('html, body').animate({
  //         scrollTop: jQuery(jQuery(this).attr('href')).offset().top
  //     }, 500, 'linear');
  // });

  $('.alert-close').on('click', function () {
    // удаляем баннер над шапкой
    $(this).closest('.alert').hide();
  });
  $('.page-content-grid-sizer').show();
  $('.header-bot-mobile-phone').on('click', function () {
    $('.header-mobile-phone-drop-menu').toggleClass('header-mobile-phone-drop-menu_active');
  });

  function favouritesBadgeCounter() {
    // счётчик количества товаров в избранном
    if ($('.header-content__favourites .header-content-circle__badge').val() > 0) {
      $('.header-content__favourites .header-content-circle__badge').addClass('header-content-circle__badge_active');
    } else {
      $('.header-content__favourites .header-content-circle__badge').removeClass('header-content-circle__badge_active');
    }

    $('.header-bot-mobile-item__favourites').on('click', function () {
      if ($('.favourites-count').val() <= 0) {
        preventDefault();
        $('.favourites-empty__drop-menu').toggleClass('favourites-empty__drop-menu_active');
      }
    });
    $('.header-content__favourites').on('click', function () {
      preventDefault();
    });
    $('.header-content__favourites').on('mouseenter', function () {
      if ($('.header-content__favourites .header-content-circle__badge').val() <= 0) {
        $('.favourites-empty__drop-menu').addClass('favourites-empty__drop-menu_active');
      }
    });
    $('.header-content__favourites').on('mouseleave', function () {
      if ($('.header-content__favourites .header-content-circle__badge').val() <= 0) {
        $('.favourites-empty__drop-menu').removeClass('favourites-empty__drop-menu_active');
      }
    });
  }

  favouritesBadgeCounter();

  function cartBadgeCounter() {
    // счётчик количества товаров в корзине
    if ($('.header-content__cart .header-content-circle__badge').val() > 0) {
      $('.header-content__cart .header-content-circle__badge').addClass('header-content-circle__badge_active');
    } else {
      $('.header-content__cart .header-content-circle__badge').removeClass('header-content-circle__badge_active');
    }

    $('.header-bot-mobile-item__cart').on('click', function () {
      if ($('.cart-count').val() <= 0) {
        preventDefault();
        $('.cart-empty__drop-menu').toggleClass('cart-empty__drop-menu_active');
      }
    });
    $('.header-content__cart').on('click', function () {
      preventDefault();
    });
    $('.header-content__cart').on('mouseenter', function () {
      if ($('.cart-count').val() <= 0) {
        $('.cart-empty__drop-menu').addClass('cart-empty__drop-menu_active');
      }
    });
    $('.header-content__cart').on('mouseleave', function () {
      if ($('.cart-count').val() <= 0) {
        $('.cart-empty__drop-menu').removeClass('cart-empty__drop-menu_active');
      }
    });
  }

  cartBadgeCounter();
  $('body').on('click', '.add-to-cart', function () {
    // добавление в корзину
    preventDefault();
    $.ajax({
      // type: 'POST',
      url: '/static/ajax/data.json',
      data: {
        count: $(this).closest('.product-card').find('.quantity-num').val(),
        product_id: $(this).closest('.product-card').data('product-id')
      }
    }).done(function (dataResp) {
      if (dataResp.data_count > 0) {
        $('.cart-count').val(dataResp.data_count);
        cartBadgeCounter();
      }
    }).fail(function (e) {
      console.log(e);
      console.log('Failed');
    }).always(function () {});
  }); // посковая строка в шапке открытие/закрытие

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

  $('.header-filter-list-item__title').each(function (index, event) {
    $(this).on('click', function () {
      if ($(this).closest('.header-filter-list-item').hasClass('header-filter-list-item_active')) {
        $(this).closest('.header-filter-list-item').removeClass('header-filter-list-item_active');
      } else {
        $('.header-filter-list-item').removeClass('header-filter-list-item_active');
        $(this).closest('.header-filter-list-item').addClass('header-filter-list-item_active');
      }
    });
  }); // выпадающие меню в списке фильтров

  $(document).mouseup(function (e) {
    // событие клика по веб-документу
    if ($('.header-filter-list-item').has(e.target).length === 0) {
      // и не по его дочерним элементам
      $('.header-filter-list-item').removeClass('header-filter-list-item_active');
    }
  });

  function countCheckedFiltersFunc() {
    $('.header-filter .header-filter-list-item .header-filter-list-drop-menu input').on('click', function () {
      $(".header-filter .header-filter-list-drop-menu").each(function (index) {
        $(this).parent().find('.filter-list-count').text($(this).find('input[type="checkbox"]:checked').length);

        if ($(this).parent().find('.filter-list-count').text() <= '0') {
          $(this).parent().find('.filter-list-count').css('opacity', '0');
        } else {
          $(this).parent().find('.filter-list-count').css('opacity', '1');
        }
      });
    });
  }

  countCheckedFiltersFunc();
  $('.header-filter input[type="checkbox"]').on('click', function () {
    $('#result span').html($('#controls input:checkbox:checked').length);
    var countCheckedFilters = $('.header-filter input[type="checkbox"]:checked').length;
    var dataIndexOfCheck = $('.header-filter input[type="checkbox"]').index(this);
    var checkList = $('.header-filter-checked-list');
    var checkListItem = $('.header-filter-checked-list li');

    if (countCheckedFilters > 0) {
      $('.header-filter-submit').addClass('header-filter-submit_active');
      $('.header-filter-reset').addClass('header-filter-reset_active');
      $('.header-filter-checked').addClass('header-filter-checked_active');
      $('.header-filter-btns').addClass('header-filter-btns_active');
    } else {
      $('.header-filter-submit').removeClass('header-filter-submit_active');
      $('.header-filter-reset').removeClass('header-filter-reset_active');
      $('.header-filter-checked').removeClass('header-filter-checked_active');
      $('.header-filter-btns').removeClass('header-filter-btns_active');
    }

    if (this.checked) {
      $('<li data-index-of-check="' + dataIndexOfCheck + '">' + $(this).parent().text() + '<svg class="svg-sprite-icon icon-close_brs"><use xlink:href="/static/images/sprite/symbol/sprite.svg#close_brs"></use></svg></li>').prependTo(checkList);
    } else {
      for (var i = 0; i < checkListItem.length; i++) {
        if (dataIndexOfCheck == checkListItem[i].dataset.indexOfCheck) {
          checkListItem[i].remove();
        }
      }
    }
  });
  $('body').on('click', '.header-filter-checked-list li', function () {
    var checkedFilters = $('.header-filter input[type="checkbox"]');

    for (var i = 0; i < checkedFilters.length; i++) {
      if ($(this).data('indexOfCheck') == i) {
        checkedFilters[i].click();
      }
    }

    $(this).remove();
    countCheckedFiltersFunc();
    $('.header-filter-list-item').removeClass('header-filter-list-item_active');
  });
  $('.header-filter-checked-reset').on('click', function () {
    $('.header-filter-checked-list li').remove();
  });
  $('.header-filter-reset').on('click', function () {
    $('.header-filter-checked-list li').remove();
  }); // CБРОС ФИЛЬТРОВ

  $('.header-filter button[type="reset"]').on('click', function () {
    $('.header-filter-submit').removeClass('header-filter-submit_active');
    $('.header-filter-reset').removeClass('header-filter-reset_active');
    $('.filter-list-count').css('opacity', '0');
    $('.header-filter-checked').removeClass('header-filter-checked_active');
    $('.header-filter-btns').removeClass('header-filter-btns_active');
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
    gutter: 8 // transitionDuration: 0,

  });
  $grid.masonry('on', 'layoutComplete', function () {
    console.log('layout is complete');
  }); // $grid.masonry();

  $grid.imagesLoaded(function () {
    // init Masonry after all images have loaded
    $grid.masonry();
  });

  function cardCollectionActive() {
    $('body').on('click', '.card-collection__name', function () {
      preventDefault();
      $(this).parent().parent().toggleClass('card-collection_active');
      setTimeout(function () {
        $grid.masonry();
      }, 150);
    });
  }

  cardCollectionActive();

  function cardBrandActive() {
    $('body').on('click', '.card-brand__count-title', function () {
      var _this = this;

      if ($('.page-content-grid').hasClass('page-content-list')) {
        console.log('НЕТ НУЖНОГО КЛАССА');
        $(this).closest('.card-brand').find('.card-brand__max').removeClass('card-brand__max_active');
        setTimeout(function () {
          $(_this).closest('.card-brand').find('.card-brand__min').show();
          var $grid = $('.page-content-grid').masonry({
            itemSelector: '.page-content-grid-item',
            horizontalOrder: true,
            resize: true,
            percentPosition: true,
            initLayout: false,
            gutter: 8
          });
          $grid.imagesLoaded(function () {
            $grid.masonry();
          });
        }, 300);
      } else {
        $(this).closest('.card-brand-content').toggleClass('card-brand_active');
        var initGrid = setInterval(function () {
          $grid.masonry();
        });
        $(this).closest('.card-brand-content').find('.card-brand__list').on('transitionend', function () {
          clearInterval(initGrid);
        });
      }
    });
  }

  cardBrandActive();

  function cardBrandMinActive() {
    $('body').on('click', '.card-brand__min', function () {
      $(this).hide();
      $(this).next().addClass('card-brand__max_active');
      $(this).next().find('.card-brand-content').addClass('card-brand_active');
      initSwiperCardImg(); // setTimeout(() => {   
      // }, 150);

      var initGrid = setInterval(function () {
        var $grid = $('.page-content-grid').masonry({
          itemSelector: '.page-content-grid-item',
          horizontalOrder: true,
          resize: true,
          percentPosition: true,
          initLayout: false,
          gutter: 8
        });
        $grid.imagesLoaded(function () {
          // init Masonry after all images have loaded
          $grid.masonry();
        });
      });
      $(this).closest('.page-card-brand').find('.card-brand-content').find('.card-brand__list').on('transitionend', function () {
        clearInterval(initGrid);
      });
    });
  }

  cardBrandMinActive(); // ВЫПАДАЮЩАЯ ШАПКА ПРИ СКРОЛЛЕ

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
      loop: true,
      lazy: {
        loadPrevNext: true
      },
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
    $('.header').toggleClass('header-mobile');

    if ($('.header-burger').hasClass('header-burger_active')) {
      $('body').css('overflow', 'hidden');
    } else {
      $('body').css('overflow', '');
    }
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
    preventDefault();
    $(this).closest('.mobile-menu-list-item').find('.mobile-menu-list-drop').toggleClass('mobile-menu-list-drop_active');
  });
  $('.mobile-menu-list-item__btn').on('click', function () {
    $('.header-filter').addClass('header-filter_active');
    $('.header').addClass('header_overflow'); // $('body').css('overflow', 'hidden');
  });
  $('.header-filter-head__close').on('click', function () {
    $('.header-filter').removeClass('header-filter_active');
    $('.header').removeClass('header_overflow'); // $('body').css('overflow', '');
  });
  var observer = lozad(); // lazy loads elements with default selector as '.lozad'

  observer.observe();
  $('.product-text__content-read-more').on('click', function () {
    $('.product-text__content-read-more').toggleClass('product-text__content-read-more_active');
  });
  var threedSliderThumbs = new Swiper('.threed-slider__thumbs', {
    spaceBetween: 5,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      760: {
        spaceBetween: 8,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true
      }
    }
  });
  var threedSliderMain = new Swiper('.threed-slider__main', {
    spaceBetween: 10,
    thumbs: {
      swiper: threedSliderThumbs,
      autoScrollOffset: 1
    },
    pagination: {
      el: '.threed-slider__main-pagination',
      type: 'fraction'
    }
  }); // СЛАЙДЕР НА СТРАНИЦЕ КОЛЛЕКЦИИ

  if (document.querySelectorAll('.product-slider').length) {
    var galleryThumbs = new Swiper('.product-slider-thumbs', {
      lazy: true,
      spaceBetween: 5,
      slidesPerView: 7,
      // loop: true,
      freeMode: true,
      loopedSlides: 1,
      //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      direction: 'horizontal',
      breakpoints: {
        761: {
          freeMode: true,
          slidesPerView: 7,
          spaceBetween: 8,
          watchSlidesVisibility: true,
          watchSlidesProgress: true
        },
        1441: {
          freeMode: true,
          spaceBetween: 16,
          direction: 'vertical',
          watchSlidesVisibility: true,
          watchSlidesProgress: true
        }
      }
    });
    var galleryTop = new Swiper('.product-slider-main', {
      // lazy: true,
      grabCursor: true,
      lazy: {
        loadPrevNext: true
      },
      // spaceBetween: 10,
      // loop: true,
      loopedSlides: 1,
      navigation: {
        nextEl: '.product-slider-main-next',
        prevEl: '.product-slider-main-prev'
      },
      thumbs: {
        swiper: galleryThumbs,
        autoScrollOffset: 1
      },
      pagination: {
        el: '.product-slider-thumbs-pagination',
        type: 'fraction'
      }
    });
  } // СЛАЙДЕР НА СТРАНИЦЕ КОЛЛЕКЦИИ
  // КНОПКИ КОЛИЧЕТСВА НА КАРТОЧКА ПРОДУКТОВ


  function quantityBtnsFunc() {
    $(".quantity-arrow-minus").click(function () {
      if ($(this).closest('.quantity-block').find('.quantity-num').val() > 1) {
        $(this).closest('.quantity-block').find('.quantity-num').val($(this).closest('.quantity-block').find('.quantity-num').val() - 1);
      }
    });
    $(".quantity-arrow-plus").click(function () {
      $(this).closest('.quantity-block').find('.quantity-num').val(+$(this).closest('.quantity-block').find('.quantity-num').val() + 1);
    });
  }

  ;
  quantityBtnsFunc(); // КНОПКИ КОЛИЧЕТСВА НА КАРТОЧКА ПРОДУКТОВ

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
      observer.observe();
    }).fail(function () {
      console.log('Failed');
    }).always(function () {});
  }); // АКТИВАЦИЯ СВАЙПЕРА НА КАРТОЧКАХ ПРОИЗВОДИТЕЛЯ И КОЛЛЕКЦИИ

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

  initSwiperCardImg(); // АКТИВАЦИЯ СВАЙПЕРА НА КАРТОЧКАХ ПРОИЗВОДИТЕЛЯ И КОЛЛЕКЦИИ
  // ФОРМА "Отправить спецификацию на просчет"

  $(".cta").on('click', function () {
    preventDefault();
    $.ajax({
      url: 'calculation-form.html' // type: 'post'

    }).done(function (resultHtml) {
      $('body').css('overflow', 'hidden');
      $('body').append(resultHtml);
      sendCalculationForm();
      history.pushState(null, null, "#popup");
      $(window).on('popstate', function () {
        $('.calculation-popup-wrap').remove();
        $('body').css('overflow', 'auto');
        history.replaceState(null, null, " ");
      });
    }).fail(function () {
      console.log('Failed');
    }).always(function () {});
  });
  $('body').on('change', '.calculation-popup__footer-download input', function () {
    if (this.files[0]) {
      // если выбрали файл
      document.querySelector('.calculation-popup__footer-loaded .file-name').innerText = this.files[0].name;
      document.querySelector('.calculation-popup__footer-loaded').style.opacity = '1';
    }

    document.querySelector('.calculation-popup__footer-loaded .svg-sprite-icon').addEventListener('click', function () {
      document.querySelector('.calculation-popup__footer-download input').value = '';

      if (!/safari/i.test(navigator.userAgent)) {
        document.querySelector('.calculation-popup__footer-download input').type = '';
        document.querySelector('.calculation-popup__footer-download input').type = 'file';
      }

      document.querySelector('.calculation-popup__footer-loaded .file-name').innerText = '';
      document.querySelector('.calculation-popup__footer-loaded').style.opacity = '0';
    });
  });
  $('body').on('click', '.calculation-popup__close', function () {
    $('.calculation-popup-wrap').remove();
    $('body').css('overflow', 'auto');
    history.replaceState(null, null, " ");
  });

  function sendCalculationForm() {
    $('.calculation-popup__form').validate({
      ignore: '',
      submitHandler: function submitHandler(form) {
        if ($(form).hasClass('ajax-form')) {
          var formData = new FormData(form);

          if ($(form).find('[type=file]').length != 0) {
            var fileNode = $(form).find('[type=file]')[0];
            var file = fileNode.files[0];
            formData.append(fileNode.name, file);
            $.ajax({
              type: $(form).attr('method'),
              url: $(form).attr('action'),
              data: $(form).serialize()
            }).done(function () {
              console.log('success');
              $('.calculation-popup-wrap').remove();
              loadCalculationFormOK();
            }).fail(function () {
              console.log('fail');
            });
          }
        } else {
          form.submit();
        }
      }
    });
  }

  function loadCalculationFormOK() {
    $.ajax({
      url: 'form-ok.html' // type: 'post'

    }).done(function (resultHtml) {
      $('body').append(resultHtml);
      $('body').on('click', '.calculation-popup__ok-close', function () {
        $('.calculation-popup-wrap').remove();
        $('body').css('overflow', 'auto');
      });
    }).fail(function () {
      console.log('Failed');
    }).always(function () {});
  } // ФОРМА "Отправить спецификацию на просчет"


  $(".view-list").on('click', function () {
    preventDefault();
    $.ajax({
      url: 'catalog-list.html'
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
      observer.observe();
    }).fail(function () {
      console.log('Failed');
    }).always(function () {});
  });
  $('.catalog-content__top-list .header-filter-list-item .header-filter-list-drop-menu input').on('click', function () {
    $(".catalog-content__top-list .header-filter-list-drop-menu").each(function (index) {
      $(this).parent().find('.filter-list-count').text($(this).find('input[type="checkbox"]:checked').length);

      if ($(this).parent().find('.filter-list-count').text() <= '0') {
        $(this).parent().find('.filter-list-count').css('opacity', '0');
      } else {
        $(this).parent().find('.filter-list-count').css('opacity', '1');
      }
    });
  });
  $('.catalog-content__top-filter button').on('click', function () {
    $('.catalog-content__top-list').addClass('catalog-content__top-list_active');
  });
  $('.catalog-content__top-title .svg-sprite-icon').on('click', function () {
    $('.catalog-content__top-list').removeClass('catalog-content__top-list_active');
  });
  $('.catalog-content__top-list input[type="checkbox"]').on('click', function () {
    console.log($('.catalog-content__top-list input[type="checkbox"]:checked').length);
    $('.catalog-content__top-filter button span').text(' (' + $('.catalog-content__top-list input[type="checkbox"]:checked').length + ')');
  });
  $('.catalog-filter-reset').on('click', function () {
    $('.catalog-content__top-filter button span').text('');
    $('.catalog-content__top-list .filter-list-count').css('opacity', '0');
  });

  if (document.querySelectorAll('.information-main__link').length) {
    window.addEventListener("scroll", function (event) {
      var fromTop = window.scrollY;
      var sectionBlock = document.querySelectorAll('.information-main__link');
      sectionBlock.forEach(function (block) {
        var section = document.querySelector(block.hash);

        if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
          block.classList.add("information-main__link_active");
        } else {
          block.classList.remove("information-main__link_active");
        }
      });
    });
  }

  var scrollBarSlider = null;

  function scrollBarSliderFunc(doCreate) {
    if ($(window).innerWidth() <= 760) {
      if (!scrollBarSlider || doCreate) {
        scrollBarSlider = new Swiper('.scrollbar-slider', {
          slidesPerView: 'auto',
          freeMode: true
        });
      } else {
        console.log(scrollBarSlider);
      }
    }
  }

  scrollBarSliderFunc(false);
  $(window).on('resize', function () {
    scrollBarSliderFunc(false);
  });

  function contactsTabs() {
    $('.popup-contact__tab').on('click', function () {
      $('.popup-contact__tab').removeClass('popup-contact__tab_active');
      $(this).addClass('popup-contact__tab_active');
      var tabIndex = $(this).index();
      $('.popup-contact__content').removeClass('popup-contact__content_active');
      $('.popup-contact__content:eq(' + tabIndex + ')').addClass('popup-contact__content_active');
    });
  }

  contactsTabs(); // попап контактов

  $(".information-contact__block-btn").on('click', function () {
    preventDefault();
    $.ajax({
      url: 'contact-popup.html' // type: 'post'

    }).done(function (resultHtml) {
      $('body').css('overflow', 'hidden');
      $('body').append(resultHtml);
      history.pushState(null, null, "#popup");
      $(window).on('popstate', function () {
        $('.calculation-popup-wrap').remove();
        $('body').css('overflow', 'auto');
        history.replaceState(null, null, " ");
      });
      scrollBarSliderFunc();
      contactsTabs();
    }).fail(function () {
      console.log('Failed');
    }).always(function () {});
  }); // попап контактов

  if (document.querySelectorAll('.contacts-slider__main').length) {
    var contactsSliderThumbs = new Swiper('.contacts-slider__thumbs', {
      lazy: true,
      spaceBetween: 5,
      slidesPerView: 7,
      // loop: true,
      freeMode: true,
      loopedSlides: 10,
      //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      direction: 'horizontal',
      breakpoints: {
        769: {
          direction: 'vertical',
          spaceBetween: 10,
          slidesPerView: 4,
          // loop: true,
          freeMode: true,
          loopedSlides: 4,
          watchSlidesVisibility: true,
          watchSlidesProgress: true
        },
        1200: {
          direction: 'vertical',
          spaceBetween: 10,
          slidesPerView: 5,
          // loop: true,
          freeMode: true,
          loopedSlides: 5,
          watchSlidesVisibility: true,
          watchSlidesProgress: true
        }
      }
    });
  }

  if (document.querySelectorAll('.contacts-slider__main').length) {
    var contactsSliderMain = new Swiper('.contacts-slider__main', {
      lazy: true,
      loadPrevNext: true,
      spaceBetween: 10,
      // loop: true,
      //loopedSlides: 5, //looped slides should be the same
      pagination: {
        el: '.contacts-slider__main-pagination',
        type: 'fraction'
      },
      thumbs: {
        swiper: contactsSliderThumbs,
        autoScrollOffset: 1
      }
    });
  } // попап товара "положить в квартиру"    


  $('.product-card-content').on('click', function () {
    // preventDefault();
    $.ajax({
      url: 'product-popup.html' // type: 'post'

    }).done(function (resultHtml) {
      $('body').css('overflow', 'hidden');
      $('body').append(resultHtml);
      history.pushState(null, null, "#popup");
      $(window).on('popstate', function () {
        $('.calculation-popup-wrap').remove();
        $('body').css('overflow', 'auto');
        history.replaceState(null, null, " ");
      });
      quantityBtnsFunc();
      zoom();
    }).fail(function () {
      console.log('Failed');
    }).always(function () {});
  }); // попап товара "положить в квартиру"

  function clearCart() {
    $('.cart-reset__all').on('click', function () {
      $(".cart-list__item").remove();
    });
  }

  clearCart();

  function removeCartItem() {
    $('.cart-list__item').on('click', '.cart-list__item-remove', function () {
      var _this2 = this;

      $(this).parent().css('opacity', '0');
      setTimeout(function () {
        $(_this2).parent().remove();
      }, 300);
    });
  }

  removeCartItem();

  function initTreedSlider() {
    if (document.querySelectorAll('.threed-slider').length) {
      var threedSliderThumbs = new Swiper('.threed-slider__thumbs', {
        spaceBetween: 5,
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
          760: {
            spaceBetween: 8,
            slidesPerView: 5,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true
          }
        }
      });
      var threedSliderMain = new Swiper('.threed-slider__main', {
        spaceBetween: 10,
        thumbs: {
          swiper: threedSliderThumbs,
          autoScrollOffset: 1
        },
        pagination: {
          el: '.threed-slider__main-pagination',
          type: 'fraction'
        }
      });
    }
  }

  if (document.querySelectorAll('.recently-viewed').length) {
    var recentlyViewedSlider = new Swiper('.recently-viewed', {
      spaceBetween: 10,
      slidesPerView: 'auto',
      freeMode: true,
      navigation: {
        nextEl: '.recently-viewed-next',
        prevEl: '.recently-viewed-prev'
      }
    });
  }

  $('.card-remove').on('click', function () {
    preventDefault();
    $(this).closest('.page-content-grid-item').remove();
    $grid.masonry();
    console.log($(this).parent());
  });
  $('.anchor-label').on('click', function () {
    console.log($(this));
    $(this).addClass('anchor-label_active');
    $(this).find('.anchor-label__block').addClass('anchor-label__block_active');
    $(this).find('.icon-close_brs').addClass('anchor-label__close');
  });
  $('.icon-close_brs').on('click', function () {
    var _this3 = this;

    setTimeout(function () {
      $(_this3).parent().removeClass('anchor-label_active');
      $(_this3).siblings('.anchor-label__block').removeClass('anchor-label__block_active');
      $(_this3).removeClass('anchor-label__close');
    }, 100);
  }); // попап тридэ

  $(".3d-visual").on('click', function () {
    preventDefault();
    $.ajax({
      url: '3d.html' // type: 'post'

    }).done(function (resultHtml) {
      $('body').append(resultHtml); // $('#popup').html();

      history.pushState(null, null, "#popup");
      $(window).on('popstate', function () {
        $('.calculation-popup-wrap').remove();
        $('body').css('overflow', 'auto');
        history.replaceState(null, null, " ");
      });
      initTreedSlider();
      sendCalculationForm();
    }).fail(function () {
      console.log('Failed');
    }).always(function () {});
  }); // попап тридэ
  // переключаем физлицо/юрлицо в форме

  $('body').on('click', '.calculation-popup__check-entity', function () {
    $(this).closest('.cart-form').find('.calculation-popup__org').hide();
  });
  $('body').on('click', '.calculation-popup__check-private', function () {
    $(this).closest('.cart-form').find('.calculation-popup__org').show();
  }); // переключаем физлицо/юрлицо в форме

  $('.product-text__content-favorite').on('click', function () {
    // кнопка избранное на стрнице коллекции
    $('.product-text__content-favorite').toggleClass('product-text__content-favorite_active');
  }); // let fList;
  // $('.header-filter input[type="checkbox"]').change(function() {
  //     fList = [];
  //     $(".header-filter input:checked").each(function(i, item) {
  //         let fObj = {     
  //             fName: $(item).attr("name"), 
  //             fVal: $(item).attr("value")
  //         };
  //         fList.push(fObj);
  //     });
  // })

  function clickOnCheckbox() {
    $('.header-filter').submit();
  }

  $('.header-filter input[type="checkbox"]').click(clickOnCheckbox);
  $('.header-filter').submit(function (e) {
    e.preventDefault();
    var formValue = $(e.target).serializeArray();
    console.log(formValue);
  });
  console.log('press F');
});