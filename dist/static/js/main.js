"use strict";

document.addEventListener('DOMContentLoaded', function () {
  console.log('hello');
  $('.page-content-grid-sizer').show(); // посковая строка в шапке открытие/закрытие

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

  $('.header-filter-list-item').each(function (index, event) {
    $(this).children('.header-filter-list-item__title').on('click', function () {
      if ($(this).parent().find('.header-filter-list-drop-menu').hasClass('header-filter-list-drop-menu_active')) {
        $(this).parent().find('.header-filter-list-drop-menu').removeClass('header-filter-list-drop-menu_active');
      } else {
        $('.header-filter-list-drop-menu').removeClass('header-filter-list-drop-menu_active');
        $(this).parent().find('.header-filter-list-drop-menu').addClass('header-filter-list-drop-menu_active');
      }
    });
  }); // выпадающие меню в списке фильтров

  $(document).mouseup(function (e) {
    // событие клика по веб-документу
    if ($('.header-filter-list-item').has(e.target).length === 0) {
      // и не по его дочерним элементам
      $('.header-filter-list-drop-menu').removeClass('header-filter-list-drop-menu_active');
    }
  });
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
  $('.header-filter input[type="checkbox"]').on('click', function () {
    $('#result span').html($('#controls input:checkbox:checked').length);
    var countCheckedFilters = $('.header-filter input[type="checkbox"]:checked').length;

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

    console.log(countCheckedFilters);
  }); // CБРОС ФИЛЬТРОВ

  $('.header-filter button[type="reset"]').on('click', function () {
    $('.header-filter-submit').removeClass('header-filter-submit_active');
    $('.header-filter-reset').removeClass('header-filter-reset_active');
    $('.filter-list-count').css('opacity', '0');
    $('.header-filter-checked').removeClass('header-filter-checked_active');
    $('.header-filter-btns').removeClass('header-filter-btns_active');
  }); // let allCheck = document.querySelectorAll('.header-filter input[type="checkbox"]');
  // allCheck.forEach(function (item) {
  //     item.addEventListener('click', function () {
  //         console.log(item.closest('label').innerText);
  //     })
  // })
  // $('.header-filter input[type="checkbox"]').on('click', function () {
  //     // const pageNext = $(this).data('page-next');
  //     // if (pageNext == undefined) {
  //     //     return;
  //     // }
  //     console.log($(this).parent().text());
  //     $.ajax({
  //         url: 'check-res.html',
  //         data: $('.header-filter input[type="checkbox"]').parent().val(),
  //         // type: 'post'
  //     }).done(function (resultHtml) {
  //         console.log(resultHtml);
  //     }).fail(function () {
  //         console.log('Failed');
  //     }).always(function () {
  //     });
  // });
  // аякс для строки поиска

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
    $('body').on('click', '.card-collection__name', function () {
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
          $grid.masonry('on', 'layoutComplete', function () {
            console.log('layout is complete');
          });
          $grid.imagesLoaded(function () {
            // init Masonry after all images have loaded
            $grid.masonry();
          });
        }, 300);
      } else {
        $(this).closest('.card-brand-content').toggleClass('card-brand_active');
        setTimeout(function () {
          $grid.masonry();
        }, 150);
      }
    });
  }

  cardBrandActive();

  function cardBrandMinActive() {
    $('body').on('click', '.card-brand__min', function () {
      $(this).hide();
      $(this).next().addClass('card-brand__max_active');
      $(this).next().find('.card-brand-content').addClass('card-brand_active');
      initSwiperCardImg();
      setTimeout(function () {
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
      }, 150);
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
    $('.header').addClass('header_overflow');
    $('body').css('overflow', 'hidden');
  });
  $('.header-filter-head__close').on('click', function () {
    $('.header-filter').removeClass('header-filter_active');
    $('.header').removeClass('header_overflow');
    $('body').css('overflow', '');
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
      // lazy: true,
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
        swiper: galleryThumbs
      },
      pagination: {
        el: '.product-slider-thumbs-pagination',
        type: 'fraction'
      }
    });
  } // СЛАЙДЕР НА СТРАНИЦЕ КОЛЛЕКЦИИ
  // КНОПКИ КОЛИЧЕТСВА НА КАРТОЧКА ПРОДУКТОВ


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
  }); // КНОПКИ КОЛИЧЕТСВА НА КАРТОЧКА ПРОДУКТОВ

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
  $('a[href^="tel:"]').attr('href', function (_, v) {
    return v.replace(/\(/g, '').replace(/\)/g, '').replace(/\ /g, '').replace(/\-/g, '');
  });
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
  }); // попап контактов

  $(".information-contact__block-btn").on('click', function () {
    preventDefault();
    $.ajax({
      url: 'contact-popup.html' // type: 'post'

    }).done(function (resultHtml) {
      $('body').css('overflow', 'hidden');
      $('body').append(resultHtml);
      scrollBarSliderFunc(true);
      $('.popup-contact__tab').on('click', function () {
        $('.popup-contact__tab').removeClass('popup-contact__tab_active');
        $(this).addClass('popup-contact__tab_active');
        var tabIndex = $(this).index();
        $('.popup-contact__content').removeClass('popup-contact__content_active');
        $('.popup-contact__content:eq(' + tabIndex + ')').addClass('popup-contact__content_active');
      });
    }).fail(function () {
      console.log('Failed');
    }).always(function () {});
  }); // попап контактов

  console.log('press F');
});