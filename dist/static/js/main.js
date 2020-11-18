"use strict";

document.addEventListener('DOMContentLoaded', function () {
  console.log('hello'); // document.querySelector('.header-bot-search__input').addEventListener('click', function() {
  //     document.querySelector('.header-bot-filter').style.position = 'absolute';
  //     document.querySelector('.header-bot-search').style.width = '100%';
  //     document.querySelector('.header-bot-search__input').style.width = '100%';
  // })
  // const menuBtn = $('.btn'),
  //   menu    = $('.menu');

  $('.header-bot-search__input').on('click', function () {
    if ($(this).hasClass('header-bot-search__input_active')) {
      $(this).removeClass('header-bot-search__input_active');
      setTimeout(function () {
        $('.header-bot-search').removeClass('header-bot-search_active');
        $('.header-bot-filter').removeClass('header-bot-filter_active');
      }, 300);
    } else {
      $(this).addClass('header-bot-search__input_active');
      $('.header-bot-filter').addClass('header-bot-filter_active');
      $('.header-bot-search').addClass('header-bot-search_active');
    }
  });
  $(document).click(function (e) {
    if (!$('.header-bot-search__input').is(e.target) && !$('.header-bot-search__input').is(e.target) && $('.header-bot-search__input').has(e.target).length === 0) {
      $('.header-bot-search__input').removeClass('header-bot-search__input_active');
      setTimeout(function () {
        $('.header-bot-search').removeClass('header-bot-search_active');
        $('.header-bot-filter').removeClass('header-bot-filter_active');
      }, 300);
    }

    ;
  });
  console.log('press F');
});