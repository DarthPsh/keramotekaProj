"use strict";

document.addEventListener('DOMContentLoaded', function () {
  console.log('hello'); // document.querySelector('.header-bot-search__input').addEventListener('click', function() {
  //     document.querySelector('.header-bot-filter').style.position = 'absolute';
  //     document.querySelector('.header-bot-search').style.width = '100%';
  //     document.querySelector('.header-bot-search__input').style.width = '100%';
  // })
  // const menuBtn = $('.btn'),
  //   menu    = $('.menu');

  function closeSearchRow() {
    $('.header-bot-search__input').removeClass('header-bot-search__input_active');
    $('.header-bot-search__icon').removeClass('header-bot-search__icon_active');
    setTimeout(function () {
      $('.header-bot-search').removeClass('header-bot-search_active');
      $('.header-bot-filter').removeClass('header-bot-filter_active');
    }, 300);
    $('.bx_searche').removeClass('bx_searche_active');
  }

  $('.header-bot-search .icon-search-clear').on('click', function () {
    console.log(123);
  });
  $('.header-bot-search__input').on('click', function () {
    if ($(this).hasClass('header-bot-search__input_active')) {
      closeSearchRow();
    } else {
      $(this).addClass('header-bot-search__input_active');
      $('.header-bot-filter').addClass('header-bot-filter_active');
      $('.header-bot-search').addClass('header-bot-search_active');
      $('.header-bot-search__icon').addClass('header-bot-search__icon_active');

      if ($('.header-bot-search__input').val() !== '') {
        $('.bx_searche').addClass('bx_searche_active');
      }
    }
  });
  $(document).click(function (e) {
    if (!$('.header-bot-search__input').is(e.target) && !$('.header-bot-search__input').is(e.target) && $('.header-bot-search__input').has(e.target).length === 0) {
      closeSearchRow();
    }

    ;
  });
  $(".header-bot-search__input").on('input', function postinput() {
    var searchvalue = $(this).val(); // this.value

    console.log(searchvalue);
    $.ajax({
      url: 'search-res.html',
      data: {
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
        $('.header-bot-search__icon').removeClass('header-bot-search__icon_active');
      } else {
        console.log('ГУСТО');
        $('.header-bot-search__icon').addClass('header-bot-search__icon_active');
      }
    });
  });
  console.log('press F');
});