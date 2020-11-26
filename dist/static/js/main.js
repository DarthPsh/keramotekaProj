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

  var allCheck = document.querySelectorAll('.header-filter-list input[type="checkbox"]');
  allCheck.forEach(function (item) {
    item.addEventListener('click', function () {
      console.log(item.closest('label').innerText);
    });
  }); // аякс для строки поиска

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
        $('.header-bot-search__clear').removeClass('header-bot-search__clear_active');
      } else {
        console.log('ГУСТО');
        $('.header-bot-search__input').addClass('header-bot-search__input_active');
        $('.header-bot-search__clear').addClass('header-bot-search__clear_active');
      }
    });
  }); // аякс для строки поиска  
  // сетка "водопад" на главной и других

  function waterfallGrid() {
    var mainEl = document.querySelector(".page-content");
    var rowHeight = parseInt(getComputedStyle(mainEl).getPropertyValue("grid-auto-rows"));
    var rowGap = parseInt(getComputedStyle(mainEl).getPropertyValue("grid-row-gap"));

    var setSpan = function setSpan(el) {
      // Calculate the number of lines that the div needs to span
      el.style.gridRowEnd = "span ".concat(Math.ceil((el.clientHeight + rowGap) / (rowHeight + rowGap)));
    };

    setTimeout(function () {
      document.querySelectorAll(".page-content-item").forEach(setSpan);
      document.querySelectorAll(".page-card").forEach(function (item) {
        item.style.height = 'max-content';
      });
      setTimeout(function () {
        document.querySelectorAll(".page-content-item").forEach(function (item) {
          item.style.height = 'auto';
        });
      }, 100);
    }, 200);
  }

  waterfallGrid();
  window.addEventListener('resize', function (event) {
    waterfallGrid();
  }); // сетка "водопад" на главной и других

  var pageSlider = new Swiper('.page-slider', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
  console.log('press F');
});