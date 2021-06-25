"use strict";

document.addEventListener('DOMContentLoaded', function () {
  console.log('hello');
  $('#up').click(function () {
    // скролл вверх
    $('html, body').animate({
      scrollTop: 0
    }, 300);
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
    // удаляем баннерs над шапкой
    $(this).closest('.alert').hide();
  });
  $('.page-content-grid-sizer').show();

  function favouritesBadgeCounter() {
    // счётчик количества товаров в избранном
    if ($('.header-content__favourites .header-content-circle__badge').text() != 0) {
      $('.header-content__favourites .header-content-circle__badge').addClass('header-content-circle__badge_active');
    } else {
      $('.header-content__favourites .header-content-circle__badge').removeClass('header-content-circle__badge_active');
    } // $('.header-favourites__btn').on('mouseenter', function () {
    //     if ($('.header-content__favourites .header-content-circle__badge').val() <= 0) {
    //         $('.favourites-empty__drop-menu').addClass('favourites-empty__drop-menu_active');
    //     }
    // })
    // $('.header-favourites__btn').on('mouseleave', function () {
    //     if ($('.header-content__favourites .header-content-circle__badge').val() <= 0) {
    //         $('.favourites-empty__drop-menu').removeClass('favourites-empty__drop-menu_active');
    //     }
    // })


    $('.header-favourites__btn').on('click', function () {
      if ($('.favourites-count').text() == 0) {
        preventDefault();
        $('.favourites-empty__drop-menu').toggleClass('favourites-empty__drop-menu_active');
      }
    }); // $('.header-favourites__btn').on('click', function () {
    //     preventDefault();
    // })
  }

  favouritesBadgeCounter();

  function cartBadgeCounter() {
    // счётчик количества товаров в корзине
    if ($('.header-content__cart .header-content-circle__badge').text() != 0) {
      $('.header-content__cart .header-content-circle__badge').addClass('header-content-circle__badge_active');
    } else {
      $('.header-content__cart .header-content-circle__badge').removeClass('header-content-circle__badge_active');
    }

    $('.header-cart__btn').on('click', function () {
      if ($('.cart-count').text() == 0) {
        preventDefault();
        $('.cart-empty__drop-menu').toggleClass('cart-empty__drop-menu_active');
      }
    }); // $('.header-cart__btn').on('click', function () {
    // preventDefault();
    // })
    // $('.header-cart__btn').on('mouseenter', function () {
    //     if ($('.cart-count').val() <= 0) {
    //         $('.cart-empty__drop-menu').addClass('cart-empty__drop-menu_active');
    //     }
    // })
    // $('.header-cart__btn').on('mouseleave', function () {
    //     if ($('.cart-count').val() <= 0) {
    //         $('.cart-empty__drop-menu').removeClass('cart-empty__drop-menu_active');
    //     }
    // })
  }

  cartBadgeCounter();
  $('body').on('click', '.add-to-cart', function (event) {
    // добавление в корзину
    preventDefault();
    $.ajax({
      // type: 'POST',
      url: '/static/ajax/data.json',
      data: {
        count: $(this).closest('.product-card').find('.quantity-num').val(),
        product_id: $(this).closest('.product-card').data('product-id')
      },
      beforeSend: function beforeSend() {
        event.currentTarget.querySelector('span').innerText = 'Добавляю';
      }
    }).done(function (dataResp) {
      if (dataResp.data_count > 0) {
        $('.cart-count').text(dataResp.data_count);
        cartBadgeCounter();
        event.currentTarget.querySelector('span').innerText = 'добавить в корзину';
      }
    }).fail(function (e) {
      console.log(e);
      console.log('Failed');
    }).always(function () {});
  }); // поисковая строка в шапке открытие/закрытие

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
  // открываем/закрываем меню с фильтрами    

  $('.header-bot-filter').on('click', function () {
    $('.header-filter').toggleClass('header-filter_active');
    $('.header-bot-filter').toggleClass('header-bot-filter_triangle');
  }); // открываем/закрываем меню с фильтрами
  // выпадающие меню в списке фильтров

  $('body').on('click', '.header-filter-list-item__title', function () {
    if ($(this).closest('.header-filter-list-item').hasClass('header-filter-list-item_active')) {
      $(this).closest('.header-filter-list-item').removeClass('header-filter-list-item_active');
    } else {
      $('.header-filter-list-item').removeClass('header-filter-list-item_active');
      $(this).closest('.header-filter-list-item').addClass('header-filter-list-item_active');
    }
  }); // выпадающие меню в списке фильтров

  $(document).mouseup(function (e) {
    // событие клика по веб-документу
    // заrрываем выпадающие списки в филmтрах
    if (!$(".header-filter-list-item").is(e.target) // если клик был не по нашему блоку
    && $(".header-filter-list-item").has(e.target).length === 0) {
      // и не по его дочерним элементам
      $(".header-filter-list-item").removeClass('header-filter-list-item_active'); // скрываем его
    } // заrрываем выпадающие списки в филmтрах
    // попап при клике на избранное если пусто


    if (!$('.header-bot-mobile-item__favourites').is(e.target) // если клик был не по нашему блоку
    && $('.header-bot-mobile-item__favourites').has(e.target).length === 0) {
      // и не по его дочерним элементам
      $('.favourites-empty__drop-menu').removeClass('favourites-empty__drop-menu_active'); // скрываем его
    } // попап при клике на избранное если пусто
    // попап при клике на корзину если пусто


    if (!$('.header-bot-mobile-item__cart').is(e.target) // если клик был не по нашему блоку
    && $('.header-bot-mobile-item__cart').has(e.target).length === 0) {
      // и не по его дочерним элементам
      $('.cart-empty__drop-menu').removeClass('cart-empty__drop-menu_active'); // скрываем его
    } // попап при клике на корзину если пусто
    // закрываем попап при клике на телефон на мобиле


    if (!$('.header-bot-mobile-phone').is(e.target) // если клик был не по нашему блоку
    && $('.header-bot-mobile-phone').has(e.target).length === 0) {
      // и не по его дочерним элементам
      $('.header-mobile-phone-drop-menu').removeClass('header-mobile-phone-drop-menu_active'); // скрываем его
    } // закрываем попап при клике на телефон на мобиле
    // закрываем попап при клике вне попапа


    if (!$('.calculation-popup').is(e.target) // если клик был не по нашему блоку
    && $('.calculation-popup').has(e.target).length === 0) {
      // и не по его дочерним элементам
      $('.calculation-popup-wrap').remove();
      $('body').css('overflow', 'auto');
      history.replaceState(null, null, " ");
    } // закрываем попап при клике вне попапа

  });
  $('.header-bot-mobile-phone').on('click', function () {
    $('.header-mobile-phone-drop-menu').toggleClass('header-mobile-phone-drop-menu_active');
  }); // открываем попап при клике на телефон на мобиле

  function countCheckedFiltersFunc() {
    // счётчик кол-ва отмеченных фильтров в списке фильтров в шапке
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
    // создаём спсок отмеченных фильтров под фильтрами
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
      $('.header-filter_active .container').css('bottom', '84px');
    } else {
      $('.header-filter-submit').removeClass('header-filter-submit_active');
      $('.header-filter-reset').removeClass('header-filter-reset_active');
      $('.header-filter-checked').removeClass('header-filter-checked_active');
      $('.header-filter-btns').removeClass('header-filter-btns_active');
      $('.header-filter_active .container').css('bottom', '0');
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
  }); // создаём спсок отмеченных фильтров под фильтрами

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
  }); // удаляем элементы списка отмеченных фильтров под фильтрами

  $('.header-filter-checked-reset').on('click', function () {
    $('.header-filter-checked-list li').remove();
  }); // удаляем список отмеченных фильтров под фильтрами

  $('.header-filter-reset').on('click', function () {
    $('.header-filter-checked-list li').remove();
  }); // удаляем список отмеченных фильтров под фильтрами
  // CБРОС ФИЛЬТРОВ

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
      $('.header-bot-search .bx_searche').prepend(responseData);
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
    gutter: 5 // transitionDuration: 0,

  });
  $grid.masonry('on', 'layoutComplete', function () {
    console.log('layout is complete');
  }); // $grid.masonry();

  $grid.imagesLoaded(function () {
    // init Masonry after all images have loaded
    $grid.masonry();
  });

  function cardCollectionActive() {
    // разворачиваем карточки коллекций на страницах (на мобиле)
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
    // разворачиваем карточки производителя на страницах
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
            gutter: 5
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
    // разворачиваем карточки производителя 
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
          gutter: 5
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

  $('.mobile-menu-list-item').on('click', function () {
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
  }); // СЛАЙДЕР НА СТРАНИЦЕ КОЛЛЕКЦИИ

  if (document.querySelectorAll('.product-slider').length) {
    var galleryThumbs = new Swiper('.product-slider-thumbs', {
      lazy: true,
      spaceBetween: 5,
      slidesPerView: 'auto',
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
          watchSlidesProgress: true,
          direction: 'horizontal'
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
    $('.quantity-num').focusin(function () {
      $(this).parent().addClass('quantity-num-wrap_active');
    });
    $('.quantity-num').focusout(function () {
      $('.quantity-num-wrap').removeClass('quantity-num-wrap_active');
    });
  }

  ;
  quantityBtnsFunc(); // КНОПКИ КОЛИЧЕТСВА НА КАРТОЧКА ПРОДУКТОВ

  $("body").on('click', ".pager-more", function () {
    // ЗАГРУЗИТЬ ЕЩЁ
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
      },
      // type: 'post',
      beforeSend: function beforeSend() {
        $(".pager-more").find('span').text('ЗАГРУЖАЮ');
        $(".pager-more").find('.icon-renew').addClass('item-spin');
        $(".pager-more").on('click', function () {
          return false;
        });
      }
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
      $(".pager-more").find('span').text('ЗАГРУЗИТЬ ЕЩЁ');
      $(".pager-more").find('.icon-renew').removeClass('item-spin');
    }).fail(function () {
      console.log('Failed');
    }).always(function () {});
  });
  $("body").on('click', ".pager-content a", function () {
    // ПАГИНАЦИЯ
    preventDefault(); // const pageNext = $(this).data('page-next');
    // if (pageNext == undefined) {
    //     return;
    // }

    $.ajax({
      url: 'main-page-list.html',
      // data: { PAGEN_1: pageNext },
      // type: 'post',
      beforeSend: function beforeSend() {
        $(".pager-content a").on('click', function () {
          return false;
        });
      }
    }).done(function (resultHtml) {
      console.log('ok');
      $('.page-content').replaceWith(resultHtml);
      var $grid = $('.page-content-grid').masonry({
        itemSelector: '.page-content-grid-item',
        horizontalOrder: true,
        resize: true,
        percentPosition: true,
        initLayout: false,
        gutter: 5
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
      lazy: true,
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
    $('.page-card-img-hover li').on('mouseleave', function () {
      var currentSwiper = $(this).parent().parent();
      var swiperIndex = $('.page-card-img').index(currentSwiper);
      swiperCardImg[swiperIndex].slideTo(0);
    });
  }

  initSwiperCardImg(); // АКТИВАЦИЯ СВАЙПЕРА НА КАРТОЧКАХ ПРОИЗВОДИТЕЛЯ И КОЛЛЕКЦИИ
  // ФОРМА СТАТЬ ДИЛЕРОМ

  $(".dealers-cta").on('click', function () {
    preventDefault();
    $.ajax({
      url: 'becomeAdealer.html' // type: 'post'

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
      $('input[type="radio"]').on('change', function () {
        $(this).closest('.header-filter-list-item').find('.header-filter-list-item__title').text($(this).parent().text());
      });
    }).fail(function () {
      console.log('Failed');
    }).always(function () {});
  }); // ФОРМА "Отправить спецификацию на просчет"

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
    // добавляем файл в форму
    if (this.files[0]) {
      // если выбрали файл
      document.querySelector('.calculation-popup__footer-loaded .file-name').innerText = this.files[0].name;
      document.querySelector('.calculation-popup__footer-loaded').style.display = 'block';
    }

    document.querySelector('.calculation-popup__footer-loaded .svg-sprite-icon').addEventListener('click', function () {
      document.querySelector('.calculation-popup__footer-download input').value = '';

      if (!/safari/i.test(navigator.userAgent)) {
        document.querySelector('.calculation-popup__footer-download input').type = '';
        document.querySelector('.calculation-popup__footer-download input').type = 'file';
      }

      document.querySelector('.calculation-popup__footer-loaded .file-name').innerText = '';
      document.querySelector('.calculation-popup__footer-loaded').style.display = 'none';
    });
  });
  $('body').on('click', '.calculation-popup__close', function () {
    // ЗАКРЫВАЕМ ПОПАП (любой)
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
        gutter: 5
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
  }); // счётчик кол-ва отмеченных фильтров в списке фильтров перед карточками

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
    $('body').css('overflow', 'hidden');
  });
  $('.catalog-content__top-title .svg-sprite-icon').on('click', function () {
    $('.catalog-content__top-list').removeClass('catalog-content__top-list_active');
    $('body').css('overflow', '');
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
      var fromTop = window.scrollY + 100;
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

  if (document.querySelectorAll('.top-scrollbar__item').length) {
    window.addEventListener("scroll", function (event) {
      var fromTop = window.scrollY + 100;
      var sectionBlock = document.querySelectorAll('.top-scrollbar__item');
      sectionBlock.forEach(function (block) {
        var section = document.querySelector(block.hash);

        if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
          block.classList.add("top-scrollbar__item_active");
        } else {
          block.classList.remove("top-scrollbar__item_active");
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
  var topScrollBarSlider = null;

  function topScrollBarSliderFunc(doCreate) {
    if ($(window).innerWidth() <= 760) {
      if (!topScrollBarSlider || doCreate) {
        topScrollBarSlider = new Swiper('.top-scrollbar', {
          slidesPerView: 'auto',
          freeMode: true
        });
      } else {
        console.log(topScrollBarSlider);
      }
    }
  }

  topScrollBarSliderFunc(false);
  $(window).on('resize', function () {
    topScrollBarSliderFunc(false);
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
      lazy: {
        loadPrevNext: true
      },
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
  }

  var oldAddClass = addClass;

  function addClass($element, targetClass) {
    oldAddClass($element, targetClass); // your handler

    console.log($element, targetClass);
    $('.popup-product__img-icon').hide();
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
      quantityBtnsFunc(); //это надо будет удалить

      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

      var randNum = getRandomInt(3);

      if (randNum == 2) {
        document.querySelector('.media').src = "https://www.keramogranit.ru/resize/w370-h517-q90/upload/iblock/31a/41775_600.jpg?c31244c5";
      } else if (randNum == 1) {
        document.querySelector('.media').src = "https://images.obi.ru/product/RU/1500x1500/426565_2.jpg";
      } else {
        document.querySelector('.media').src = "https://ceramir.ru/netcat_files/userfiles/ItalGraniti_Mega_01_Reception_Hotel_Part_A_Definitivo.jpg";
      } //это надо будет удалить


      zoom(); // создаём мутейшнОбсервер

      var observeObject = function () {
        var _class = {
          init: function init(selector, callback) {
            var element = document.querySelector(selector);

            try {
              var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                  callback(mutation.target, mutation.attributeName, mutation.oldValue);
                });
              });
              observer.observe(element, {
                attributes: true,
                subtree: true,
                attributeOldValue: true
              });
            } catch (z) {
              element.addEventListener('DOMAttrModified', function (e) {
                callback(e.target, e.attrName, e.prevValue);
              }, false);
            }
          }
        };
        return _class;
      }();
      /* А тут инициализируем отслеживание в элементе, передавая селектор */


      $(function () {
        observeObject.init('.popup-product__img', function (target, name, oldValue) {
          /* ссылка на Node, имя атрибута, предыдущее значение */
          // console.log(target, name, oldValue);
          $('.popup-product__img-icon').slideUp(300);
        });
      });
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
    // слайдер в попапе 3D визуализация
    if (document.querySelectorAll('.threed-slider').length) {
      var threedSliderThumbs = new Swiper('.threed-slider__thumbs', {
        lazy: true,
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
        lazy: {
          loadPrevNext: true
        },
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
      spaceBetween: 8,
      slidesPerView: 'auto',
      freeMode: true,
      breakpoints: {
        760: {
          spaceBetween: 10,
          slidesPerView: 'auto',
          freeMode: true,
          navigation: {
            nextEl: '.recently-viewed-next',
            prevEl: '.recently-viewed-prev'
          }
        }
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
    // setTimeout(() => {
    $(this).toggleClass('anchor-label_active');
    $(this).find('.anchor-label__block').toggleClass('anchor-label__block_active');
    $(this).find('.icon-close_brs').toggleClass('anchor-label__close'); // }, 100);
  });
  $('.anchor-label__block-arr').on('click', function () {
    var idAnchor = $(this).attr('href');
    $(idAnchor).addClass('product-card_active');
    console.log(testo);
  });
  $('.product-card').on('mouseover', function () {
    $(this).removeClass('product-card_active');
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

  $('body').on('click', '.calculation-popup__check-private', function () {
    $(this).closest('form').find('.calculation-popup__entity').css('display', 'none');
  });
  $('body').on('click', '.calculation-popup__check-entity', function () {
    $(this).closest('form').find('.calculation-popup__entity').css('display', 'flex');
  }); // переключаем физлицо/юрлицо в форме
  // переключаем доставку в форме

  $('body').on('click', '.calculation-popup__check-pickup', function () {
    $('.calculation-popup__info-address').css('display', 'none');
  });
  $('body').on('click', '.calculation-popup__check-need', function () {
    $('.calculation-popup__info-address').css('display', 'flex');
  }); // переключаем доставку в форме
  // let fList;
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
  // function clickOnCheckbox() {
  //     $('.header-filter').submit();
  // }
  // $('.header-filter input[type="checkbox"]').click(clickOnCheckbox);
  // $('.header-filter').submit((e) => {
  //     e.preventDefault();
  //     const formValue = $(e.target).serializeArray();
  //     console.log(formValue);
  // })
  // отправим инфо о том, что мы лайкнули или анлайкнули эту коллекцию

  $('.product-text__content-favorite').on('click', function () {
    // preventDefault();
    $.ajax({// type: 'post'
    }).done(function () {
      // $('.product-text__content-favorite').on('click', function () { // кнопка избранное на стрнице коллекции
      $('.product-text__content-favorite').toggleClass('product-text__content-favorite_active'); // })

      console.log('OK');
    }).fail(function () {
      console.log('Failed');
    }).always(function () {});
  }); // отправим инфо о том, что мы лайкнули или анлайкнули эту коллекцию

  console.log('press F');
});