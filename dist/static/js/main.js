"use strict";document.addEventListener("DOMContentLoaded",function(){function e(){$('a[href^="tel:"]').attr("href",function(e,t){return t.replace(/\(/g,"").replace(/\)/g,"").replace(/\ /g,"").replace(/\-/g,"")})}function t(){0!=$(".header-content__cart .header-content-circle__badge").text()?$(".header-content__cart .header-content-circle__badge").addClass("header-content-circle__badge_active"):$(".header-content__cart .header-content-circle__badge").removeClass("header-content-circle__badge_active"),$(".header-cart__btn").on("click",function(){0==$(".cart-count").text()&&(preventDefault(),$(".cart-empty__drop-menu").toggleClass("cart-empty__drop-menu_active"))})}function o(){$(".header-filter .header-filter-list-item .header-filter-list-drop-menu input").on("click",function(){$(".header-filter .header-filter-list-drop-menu").each(function(e){$(this).parent().find(".filter-list-count").text($(this).find('input[type="checkbox"]:checked').length),$(this).parent().find(".filter-list-count").text()<="0"?$(this).parent().find(".filter-list-count").css("opacity","0"):$(this).parent().find(".filter-list-count").css("opacity","1")})})}console.log("hello"),$("#up").click(function(){return $("html, body").animate({scrollTop:0},300),!1}),e(),$('input[type="tel"]').inputmask("+7 (999) 999-99-99"),$(document).ajaxSuccess(function(){$('input[type="tel"]').inputmask("+7 (999) 999-99-99"),e()}),$(".alert-close").on("click",function(){$(this).closest(".alert").hide()}),$(".page-content-grid-sizer").show(),0!=$(".header-content__favourites .header-content-circle__badge").text()?$(".header-content__favourites .header-content-circle__badge").addClass("header-content-circle__badge_active"):$(".header-content__favourites .header-content-circle__badge").removeClass("header-content-circle__badge_active"),$(".header-favourites__btn").on("click",function(){0==$(".favourites-count").text()&&(preventDefault(),$(".favourites-empty__drop-menu").toggleClass("favourites-empty__drop-menu_active"))}),t(),$("body").on("click",".add-to-cart",function(){preventDefault(),$.ajax({url:"/static/ajax/data.json",data:{count:$(this).closest(".product-card").find(".quantity-num").val(),product_id:$(this).closest(".product-card").data("product-id")}}).done(function(e){0<e.data_count&&($(".cart-count").text(e.data_count),t())}).fail(function(e){console.log(e),console.log("Failed")}).always(function(){})}),$("#search-input").focusin(function(){$(".header-bot-search__input").addClass("header-bot-search__input_active"),$(".header-bot-filter").addClass("header-bot-filter_active"),$(".header-bot-search").addClass("header-bot-search_active"),$(".header-bot-search__icon").addClass("header-bot-search__icon_active"),""!==$(".header-bot-search__input").val()&&$(".bx_searche").addClass("bx_searche_active")}),$("#search-input").focusout(function(){""!==$(".header-bot-search__input").val()?(console.log("что-то есть"),$(".header-bot-search__input").addClass("header-bot-search__input-border_active"),$(".header-bot-search__icon").addClass("header-bot-search__icon_active")):($(".header-bot-search__input").removeClass("header-bot-search__input-border_active"),$(".header-bot-search__icon").removeClass("header-bot-search__icon_active")),$(".header-bot-search__input").removeClass("header-bot-search__input_active"),setTimeout(function(){$(".header-bot-search").removeClass("header-bot-search_active"),$(".header-bot-filter").removeClass("header-bot-filter_active")},300),$(".bx_searche").removeClass("bx_searche_active")}),$(".header-bot-search__clear").on("click",function(){$(".header-bot-search__clear").removeClass("header-bot-search__clear_active"),$(".header-bot-search__input").removeClass("header-bot-search__input-border_active"),$(".header-bot-search__icon").removeClass("header-bot-search__icon_active")}),$(".header-bot-filter").on("click",function(){$(".header-filter").toggleClass("header-filter_active"),$(".header-bot-filter").toggleClass("header-bot-filter_triangle")}),$("body").on("click",".header-filter-list-item__title",function(){$(this).closest(".header-filter-list-item").hasClass("header-filter-list-item_active")?$(this).closest(".header-filter-list-item").removeClass("header-filter-list-item_active"):($(".header-filter-list-item").removeClass("header-filter-list-item_active"),$(this).closest(".header-filter-list-item").addClass("header-filter-list-item_active"))}),$(document).mouseup(function(e){$(".header-filter-list-item").is(e.target)||0!==$(".header-filter-list-item").has(e.target).length||$(".header-filter-list-item").removeClass("header-filter-list-item_active"),$(".header-bot-mobile-item__favourites").is(e.target)||0!==$(".header-bot-mobile-item__favourites").has(e.target).length||$(".favourites-empty__drop-menu").removeClass("favourites-empty__drop-menu_active"),$(".header-bot-mobile-item__cart").is(e.target)||0!==$(".header-bot-mobile-item__cart").has(e.target).length||$(".cart-empty__drop-menu").removeClass("cart-empty__drop-menu_active"),$(".header-bot-mobile-phone").is(e.target)||0!==$(".header-bot-mobile-phone").has(e.target).length||$(".header-mobile-phone-drop-menu").removeClass("header-mobile-phone-drop-menu_active")}),$(".header-bot-mobile-phone").on("click",function(){$(".header-mobile-phone-drop-menu").toggleClass("header-mobile-phone-drop-menu_active")}),o(),$('.header-filter input[type="checkbox"]').on("click",function(){$("#result span").html($("#controls input:checkbox:checked").length);var e=$('.header-filter input[type="checkbox"]:checked').length,t=$('.header-filter input[type="checkbox"]').index(this),o=$(".header-filter-checked-list"),a=$(".header-filter-checked-list li");if(0<e?($(".header-filter-submit").addClass("header-filter-submit_active"),$(".header-filter-reset").addClass("header-filter-reset_active"),$(".header-filter-checked").addClass("header-filter-checked_active"),$(".header-filter-btns").addClass("header-filter-btns_active"),$(".header-filter_active .container").css("bottom","84px")):($(".header-filter-submit").removeClass("header-filter-submit_active"),$(".header-filter-reset").removeClass("header-filter-reset_active"),$(".header-filter-checked").removeClass("header-filter-checked_active"),$(".header-filter-btns").removeClass("header-filter-btns_active"),$(".header-filter_active .container").css("bottom","0")),this.checked)$('<li data-index-of-check="'+t+'">'+$(this).parent().text()+'<svg class="svg-sprite-icon icon-close_brs"><use xlink:href="/static/images/sprite/symbol/sprite.svg#close_brs"></use></svg></li>').prependTo(o);else for(var i=0;i<a.length;i++)t==a[i].dataset.indexOfCheck&&a[i].remove()}),$("body").on("click",".header-filter-checked-list li",function(){for(var e=$('.header-filter input[type="checkbox"]'),t=0;t<e.length;t++)$(this).data("indexOfCheck")==t&&e[t].click();$(this).remove(),o(),$(".header-filter-list-item").removeClass("header-filter-list-item_active")}),$(".header-filter-checked-reset").on("click",function(){$(".header-filter-checked-list li").remove()}),$(".header-filter-reset").on("click",function(){$(".header-filter-checked-list li").remove()}),$('.header-filter button[type="reset"]').on("click",function(){$(".header-filter-submit").removeClass("header-filter-submit_active"),$(".header-filter-reset").removeClass("header-filter-reset_active"),$(".filter-list-count").css("opacity","0"),$(".header-filter-checked").removeClass("header-filter-checked_active"),$(".header-filter-btns").removeClass("header-filter-btns_active")}),$(".header-bot-search__input").on("input",function(){var e=$(this).val();console.log(e),$.ajax({url:"search-res.html",responseData:{searchvalue:e}}).done(function(e){$(".bx_searche").addClass("bx_searche_active"),$(".header-bot-search .bx_searche").append(e)}).fail(function(){console.log("Failed")}).always(function(){""==$(".header-bot-search__input").val()?(console.log("пусто"),$(".bx_searche").removeClass("bx_searche_active"),$(".header-bot-search__clear").removeClass("header-bot-search__clear_active")):(console.log("ГУСТО"),$(".header-bot-search__input").addClass("header-bot-search__input_active"),$(".header-bot-search__clear").addClass("header-bot-search__clear_active"))})});var a=$(".page-content-grid").masonry({columnWidth:".page-content-grid-sizer",itemSelector:".page-content-grid-item",horizontalOrder:!0,resize:!0,percentPosition:!0,initLayout:!1,gutter:8});a.masonry("on","layoutComplete",function(){console.log("layout is complete")}),a.imagesLoaded(function(){a.masonry()}),$("body").on("click",".card-collection__name",function(){preventDefault(),$(this).parent().parent().toggleClass("card-collection_active"),setTimeout(function(){a.masonry()},150)}),$("body").on("click",".card-brand__count-title",function(){var e,t=this;$(".page-content-grid").hasClass("page-content-list")?(console.log("НЕТ НУЖНОГО КЛАССА"),$(this).closest(".card-brand").find(".card-brand__max").removeClass("card-brand__max_active"),setTimeout(function(){$(t).closest(".card-brand").find(".card-brand__min").show();var e=$(".page-content-grid").masonry({itemSelector:".page-content-grid-item",horizontalOrder:!0,resize:!0,percentPosition:!0,initLayout:!1,gutter:8});e.imagesLoaded(function(){e.masonry()})},300)):($(this).closest(".card-brand-content").toggleClass("card-brand_active"),e=setInterval(function(){a.masonry()}),$(this).closest(".card-brand-content").find(".card-brand__list").on("transitionend",function(){clearInterval(e)}))}),$("body").on("click",".card-brand__min",function(){$(this).hide(),$(this).next().addClass("card-brand__max_active"),$(this).next().find(".card-brand-content").addClass("card-brand_active"),l();var e=setInterval(function(){var e=$(".page-content-grid").masonry({itemSelector:".page-content-grid-item",horizontalOrder:!0,resize:!0,percentPosition:!0,initLayout:!1,gutter:8});e.imagesLoaded(function(){e.masonry()})});$(this).closest(".page-card-brand").find(".card-brand-content").find(".card-brand__list").on("transitionend",function(){clearInterval(e)})});var i=0;$(window).on("scroll",function(){var e=$(this).scrollTop();i<e&&1e3<e?(console.log("вниз ниже 1000"),$(".header-bot").removeClass("header-fixed_active"),$(".header-filter").removeClass("header-filter_active-fixed")):i<e&&500<e?(console.log("вниз ниже 500"),console.log(e),$(".header-bot").addClass("header-fixed")):i<e?console.log("вниз ниже 0"):e<i&&1e3<e?(console.log("вверх ниже 1000"),$(".header-bot").addClass("header-fixed_active"),$(".header-filter").addClass("header-filter_active-fixed")):e<i&&500<e?(console.log("вверх выше 1000 и ниже 500"),$(".header-bot").removeClass("header-fixed_active"),$(".header-filter").removeClass("header-filter_active-fixed")):(console.log("вверх"),$(".header-bot").removeClass("header-fixed")),i=e}),document.querySelectorAll(".page-slider").length&&new Swiper(".page-slider",{loop:!0,lazy:{loadPrevNext:!0},pagination:{el:".page-slider-pagination",clickable:!0},navigation:{nextEl:".page-slider-next",prevEl:".page-slider-prev"}}),$(".header-burger").on("click",function(){$(".header-burger").toggleClass("header-burger_active"),$(".mobile-menu").toggleClass("mobile-menu_active"),$(".header-bot-mobile-item-desc").toggleClass("header-bot-mobile-item-desc_active"),$(".header-bot").toggleClass("header-bot_active"),$(".header").toggleClass("header-mobile"),$(".header-burger").hasClass("header-burger_active")?$("body").css("overflow","hidden"):$("body").css("overflow","")}),$(".header-bot-mobile-item-search").on("click",function(){$(".header-bot-mobile-item").hide(),$(".header-bot-search").css({display:"flex"}),$(".header-bot-search__input").css({"max-width":"100%"}),$(".header-bot-mobile-search-close").show()}),$(".header-bot-mobile-search-close").on("click",function(){$(".header-bot-mobile-item").show(),$(".header-bot-search").css({display:"none"}),$(".header-bot-search__input").css({"max-width":"282px"}),$(".header-bot-mobile-search-close").hide()}),$(".mobile-menu-list-item").on("click",function(){$(this).closest(".mobile-menu-list-item").find(".mobile-menu-list-drop").toggleClass("mobile-menu-list-drop_active")}),$(".mobile-menu-list-item__btn").on("click",function(){$(".header-filter").addClass("header-filter_active"),$(".header").addClass("header_overflow")}),$(".header-filter-head__close").on("click",function(){$(".header-filter").removeClass("header-filter_active"),$(".header").removeClass("header_overflow")});var n,r=lozad();function c(){$(".quantity-arrow-minus").click(function(){1<$(this).closest(".quantity-block").find(".quantity-num").val()&&$(this).closest(".quantity-block").find(".quantity-num").val($(this).closest(".quantity-block").find(".quantity-num").val()-1)}),$(".quantity-arrow-plus").click(function(){$(this).closest(".quantity-block").find(".quantity-num").val(+$(this).closest(".quantity-block").find(".quantity-num").val()+1)}),$(".quantity-num").focusin(function(){$(this).parent().addClass("quantity-num-wrap_active")}),$(".quantity-num").focusout(function(){$(".quantity-num-wrap").removeClass("quantity-num-wrap_active")})}function l(){var o=new Swiper(".page-card-img",{lazy:!0,effect:"fade",pagination:{el:".page-card-img-pagination",clickable:!0}});$(".page-card-img-hover li").on("mouseenter",function(){var e=$(this).parent().parent(),t=$(".page-card-img").index(e),e=$(this).parent().children().index(this);o[t].slideTo(e)})}function s(){$(".calculation-popup__form").validate({ignore:"",submitHandler:function(e){var t,o,a;$(e).hasClass("ajax-form")?(t=new FormData(e),0!=$(e).find("[type=file]").length&&(a=(o=$(e).find("[type=file]")[0]).files[0],t.append(o.name,a),$.ajax({type:$(e).attr("method"),url:$(e).attr("action"),data:$(e).serialize()}).done(function(){console.log("success"),$(".calculation-popup-wrap").remove(),$.ajax({url:"form-ok.html"}).done(function(e){$("body").append(e),$("body").on("click",".calculation-popup__ok-close",function(){$(".calculation-popup-wrap").remove(),$("body").css("overflow","auto")})}).fail(function(){console.log("Failed")}).always(function(){})}).fail(function(){console.log("fail")}))):e.submit()}})}r.observe(),$(".product-text__content-read-more").on("click",function(){$(".product-text__content-read-more").toggleClass("product-text__content-read-more_active")}),document.querySelectorAll(".product-slider").length&&(n=new Swiper(".product-slider-thumbs",{lazy:!0,spaceBetween:5,slidesPerView:"auto",freeMode:!0,loopedSlides:1,watchSlidesVisibility:!0,watchSlidesProgress:!0,direction:"horizontal",breakpoints:{761:{freeMode:!0,slidesPerView:7,spaceBetween:8,watchSlidesVisibility:!0,watchSlidesProgress:!0,direction:"horizontal"},1441:{freeMode:!0,spaceBetween:16,direction:"vertical",watchSlidesVisibility:!0,watchSlidesProgress:!0}}}),new Swiper(".product-slider-main",{grabCursor:!0,lazy:{loadPrevNext:!0},loopedSlides:1,navigation:{nextEl:".product-slider-main-next",prevEl:".product-slider-main-prev"},thumbs:{swiper:n,autoScrollOffset:1},pagination:{el:".product-slider-thumbs-pagination",type:"fraction"}})),c(),$("body").on("click",".pager-more",function(){preventDefault();var e=$(this).data("page-next");null!=e&&(console.log(e),$.ajax({url:"main-page-list.html",data:{PAGEN_1:e},beforeSend:function(){$(".pager-more").find("span").text("ЗАГРУЖАЮ"),$(".pager-more").find(".icon-renew").addClass("item-spin"),$(".pager-more").on("click",function(){return!1})}}).done(function(e){console.log("ok"),$(".page-content-grid").append($(e).find(".page-content-grid-item")),$(".pager").replaceWith($(e).find(".pager")),a.masonry("reloadItems"),a.imagesLoaded(function(){a.masonry()}),l(),r.observe(),$(".pager-more").find("span").text("ЗАГРУЗИТЬ ЕЩЁ"),$(".pager-more").find(".icon-renew").removeClass("item-spin")}).fail(function(){console.log("Failed")}).always(function(){}))}),$("body").on("click",".pager-content a",function(){preventDefault(),$.ajax({url:"main-page-list.html",beforeSend:function(){$(".pager-content a").on("click",function(){return!1})}}).done(function(e){console.log("ok"),$(".page-content").replaceWith(e);var t=$(".page-content-grid").masonry({itemSelector:".page-content-grid-item",horizontalOrder:!0,resize:!0,percentPosition:!0,initLayout:!1,gutter:8});t.masonry("on","layoutComplete",function(){console.log("layout is complete")}),t.imagesLoaded(function(){t.masonry()}),r.observe()}).fail(function(){console.log("Failed")}).always(function(){})}),l(),$(".dealers-cta").on("click",function(){preventDefault(),$.ajax({url:"becomeAdealer.html"}).done(function(e){$("body").css("overflow","hidden"),$("body").append(e),s(),history.pushState(null,null,"#popup"),$(window).on("popstate",function(){$(".calculation-popup-wrap").remove(),$("body").css("overflow","auto"),history.replaceState(null,null," ")}),$('input[type="radio"]').on("change",function(){$(this).closest(".header-filter-list-item").find(".header-filter-list-item__title").text($(this).parent().text())})}).fail(function(){console.log("Failed")}).always(function(){})}),$(".cta").on("click",function(){preventDefault(),$.ajax({url:"calculation-form.html"}).done(function(e){$("body").css("overflow","hidden"),$("body").append(e),s(),history.pushState(null,null,"#popup"),$(window).on("popstate",function(){$(".calculation-popup-wrap").remove(),$("body").css("overflow","auto"),history.replaceState(null,null," ")})}).fail(function(){console.log("Failed")}).always(function(){})}),$("body").on("change",".calculation-popup__footer-download input",function(){this.files[0]&&(document.querySelector(".calculation-popup__footer-loaded .file-name").innerText=this.files[0].name,document.querySelector(".calculation-popup__footer-loaded").style.opacity="1"),document.querySelector(".calculation-popup__footer-loaded .svg-sprite-icon").addEventListener("click",function(){document.querySelector(".calculation-popup__footer-download input").value="",/safari/i.test(navigator.userAgent)||(document.querySelector(".calculation-popup__footer-download input").type="",document.querySelector(".calculation-popup__footer-download input").type="file"),document.querySelector(".calculation-popup__footer-loaded .file-name").innerText="",document.querySelector(".calculation-popup__footer-loaded").style.opacity="0"})}),$("body").on("click",".calculation-popup__close",function(){$(".calculation-popup-wrap").remove(),$("body").css("overflow","auto"),history.replaceState(null,null," ")}),$(".view-list").on("click",function(){preventDefault(),$.ajax({url:"catalog-list.html"}).done(function(e){console.log("ok"),$(".page-content").replaceWith(e);var t=$(".page-content-grid").masonry({itemSelector:".page-content-grid-item",horizontalOrder:!0,resize:!0,percentPosition:!0,initLayout:!1,gutter:8});t.masonry("on","layoutComplete",function(){console.log("layout is complete")}),t.imagesLoaded(function(){t.masonry()}),r.observe()}).fail(function(){console.log("Failed")}).always(function(){})}),$(".catalog-content__top-list .header-filter-list-item .header-filter-list-drop-menu input").on("click",function(){$(".catalog-content__top-list .header-filter-list-drop-menu").each(function(e){$(this).parent().find(".filter-list-count").text($(this).find('input[type="checkbox"]:checked').length),$(this).parent().find(".filter-list-count").text()<="0"?$(this).parent().find(".filter-list-count").css("opacity","0"):$(this).parent().find(".filter-list-count").css("opacity","1")})}),$(".catalog-content__top-filter button").on("click",function(){$(".catalog-content__top-list").addClass("catalog-content__top-list_active"),$("body").css("overflow","hidden")}),$(".catalog-content__top-title .svg-sprite-icon").on("click",function(){$(".catalog-content__top-list").removeClass("catalog-content__top-list_active"),$("body").css("overflow","")}),$('.catalog-content__top-list input[type="checkbox"]').on("click",function(){console.log($('.catalog-content__top-list input[type="checkbox"]:checked').length),$(".catalog-content__top-filter button span").text(" ("+$('.catalog-content__top-list input[type="checkbox"]:checked').length+")")}),$(".catalog-filter-reset").on("click",function(){$(".catalog-content__top-filter button span").text(""),$(".catalog-content__top-list .filter-list-count").css("opacity","0")}),document.querySelectorAll(".information-main__link").length&&window.addEventListener("scroll",function(e){var o=window.scrollY+100;document.querySelectorAll(".information-main__link").forEach(function(e){var t=document.querySelector(e.hash);t.offsetTop<=o&&t.offsetTop+t.offsetHeight>o?e.classList.add("information-main__link_active"):e.classList.remove("information-main__link_active")})}),document.querySelectorAll(".top-scrollbar__item").length&&window.addEventListener("scroll",function(e){var o=window.scrollY+100;document.querySelectorAll(".top-scrollbar__item").forEach(function(e){var t=document.querySelector(e.hash);t.offsetTop<=o&&t.offsetTop+t.offsetHeight>o?e.classList.add("top-scrollbar__item_active"):e.classList.remove("top-scrollbar__item_active")})});var d=null;function u(e){$(window).innerWidth()<=760&&(!d||e?d=new Swiper(".scrollbar-slider",{slidesPerView:"auto",freeMode:!0}):console.log(d))}u(!1),$(window).on("resize",function(){u(!1)});var p,h=null;function f(e){$(window).innerWidth()<=760&&(!h||e?h=new Swiper(".top-scrollbar",{slidesPerView:"auto",freeMode:!0}):console.log(h))}function _(){$(".popup-contact__tab").on("click",function(){$(".popup-contact__tab").removeClass("popup-contact__tab_active"),$(this).addClass("popup-contact__tab_active");var e=$(this).index();$(".popup-contact__content").removeClass("popup-contact__content_active"),$(".popup-contact__content:eq("+e+")").addClass("popup-contact__content_active")})}f(!1),$(window).on("resize",function(){f(!1)}),_(),$(".information-contact__block-btn").on("click",function(){preventDefault(),$.ajax({url:"contact-popup.html"}).done(function(e){$("body").css("overflow","hidden"),$("body").append(e),history.pushState(null,null,"#popup"),$(window).on("popstate",function(){$(".calculation-popup-wrap").remove(),$("body").css("overflow","auto"),history.replaceState(null,null," ")}),u(),_()}).fail(function(){console.log("Failed")}).always(function(){})}),document.querySelectorAll(".contacts-slider__main").length&&(p=new Swiper(".contacts-slider__thumbs",{lazy:!0,spaceBetween:5,slidesPerView:7,freeMode:!0,loopedSlides:10,watchSlidesVisibility:!0,watchSlidesProgress:!0,direction:"horizontal",breakpoints:{769:{direction:"vertical",spaceBetween:10,slidesPerView:4,freeMode:!0,loopedSlides:4,watchSlidesVisibility:!0,watchSlidesProgress:!0},1200:{direction:"vertical",spaceBetween:10,slidesPerView:5,freeMode:!0,loopedSlides:5,watchSlidesVisibility:!0,watchSlidesProgress:!0}}})),document.querySelectorAll(".contacts-slider__main").length&&new Swiper(".contacts-slider__main",{lazy:{loadPrevNext:!0},loadPrevNext:!0,spaceBetween:10,pagination:{el:".contacts-slider__main-pagination",type:"fraction"},thumbs:{swiper:p,autoScrollOffset:1}});$(".product-card-content").on("click",function(){$.ajax({url:"product-popup.html"}).done(function(e){$("body").css("overflow","hidden"),$("body").append(e),history.pushState(null,null,"#popup"),$(window).on("popstate",function(){$(".calculation-popup-wrap").remove(),$("body").css("overflow","auto"),history.replaceState(null,null," ")}),c();e=Math.floor(Math.random()*Math.floor(3));document.querySelector(".media").src=2==e?"https://www.keramogranit.ru/resize/w370-h517-q90/upload/iblock/31a/41775_600.jpg?c31244c5":1==e?"https://images.obi.ru/product/RU/1500x1500/426565_2.jpg":"https://ceramir.ru/netcat_files/userfiles/ItalGraniti_Mega_01_Reception_Hotel_Part_A_Definitivo.jpg",zoom();var t={init:function(e,t){var o=document.querySelector(e);try{new MutationObserver(function(e){e.forEach(function(e){t(e.target,e.attributeName,e.oldValue)})}).observe(o,{attributes:!0,subtree:!0,attributeOldValue:!0})}catch(e){o.addEventListener("DOMAttrModified",function(e){t(e.target,e.attrName,e.prevValue)},!1)}}};$(function(){t.init(".popup-product__img",function(e,t,o){$(".popup-product__img-icon").slideUp(300)})})}).fail(function(){console.log("Failed")}).always(function(){})}),$(".cart-reset__all").on("click",function(){$(".cart-list__item").remove()}),$(".cart-list__item").on("click",".cart-list__item-remove",function(){var e=this;$(this).parent().css("opacity","0"),setTimeout(function(){$(e).parent().remove()},300)}),document.querySelectorAll(".recently-viewed").length&&new Swiper(".recently-viewed",{spaceBetween:8,slidesPerView:"auto",freeMode:!0,breakpoints:{760:{spaceBetween:10,slidesPerView:"auto",freeMode:!0,navigation:{nextEl:".recently-viewed-next",prevEl:".recently-viewed-prev"}}}}),$(".card-remove").on("click",function(){preventDefault(),$(this).closest(".page-content-grid-item").remove(),a.masonry(),console.log($(this).parent())}),$(".anchor-label").on("click",function(){$(this).toggleClass("anchor-label_active"),$(this).find(".anchor-label__block").toggleClass("anchor-label__block_active"),$(this).find(".icon-close_brs").toggleClass("anchor-label__close")}),$(".anchor-label__block-arr").on("click",function(){var e=$(this).attr("href");$(e).addClass("product-card_active"),console.log(testo)}),$(".product-card").on("mouseover",function(){$(this).removeClass("product-card_active")}),$(".3d-visual").on("click",function(){preventDefault(),$.ajax({url:"3d.html"}).done(function(e){$("body").append(e),history.pushState(null,null,"#popup"),$(window).on("popstate",function(){$(".calculation-popup-wrap").remove(),$("body").css("overflow","auto"),history.replaceState(null,null," ")}),document.querySelectorAll(".threed-slider").length&&(e=new Swiper(".threed-slider__thumbs",{lazy:!0,spaceBetween:5,slidesPerView:"auto",freeMode:!0,watchSlidesVisibility:!0,watchSlidesProgress:!0,breakpoints:{760:{spaceBetween:8,slidesPerView:5,freeMode:!0,watchSlidesVisibility:!0,watchSlidesProgress:!0}}}),new Swiper(".threed-slider__main",{lazy:{loadPrevNext:!0},spaceBetween:10,thumbs:{swiper:e,autoScrollOffset:1},pagination:{el:".threed-slider__main-pagination",type:"fraction"}})),s()}).fail(function(){console.log("Failed")}).always(function(){})}),$("body").on("click",".calculation-popup__check-private",function(){$(this).closest("form").find(".calculation-popup__entity").hide()}),$("body").on("click",".calculation-popup__check-entity",function(){$(this).closest("form").find(".calculation-popup__entity").show()}),$(".product-text__content-favorite").on("click",function(){$.ajax({}).done(function(){$(".product-text__content-favorite").toggleClass("product-text__content-favorite_active"),console.log("OK")}).fail(function(){console.log("Failed")}).always(function(){})}),console.log("press F")});