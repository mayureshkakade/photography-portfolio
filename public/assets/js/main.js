(function ($) {
  'use strict';
  // TOP Menu Sticky
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 400) {
      $('#sticky-header').removeClass('sticky');
      $('#back-top').fadeIn(500);
    } else {
      $('#sticky-header').addClass('sticky');
      $('#back-top').fadeIn(500);
    }
  });

  if (window.location.href.search('404') !== -1) {
    var container = document.getElementById('not-found-container');
    window.onmousemove = function (e) {
      var x = -e.clientX / 5;
      var y = -e.clientY / 5;
      container.style.backgroundPositionX = x + 'px';
      container.style.backgroundPositionY = y + 'px';
    };
  }

  $(window).on('load', function () {
    //for menu active class
    $('.portfolio-menu button').on('click', function (event) {
      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');
      event.preventDefault();
    });
  });
})(jQuery);
