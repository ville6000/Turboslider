/**
 * Turboslider
 * Minimal jQuery slider plugin
 */
(function ($) {
  $.fn.turboslider = function (option, settings) {
    var mergedSettings,
      plugin,
      $elem;

    return this.each(function () {
      mergedSettings = $.extend({}, $.fn.turboslider.defaultSettings, settings || {});
      $elem = $(this);
      plugin = new Turboslider(mergedSettings, $elem);
      plugin.init();
    });
  };

  $.fn.turboslider.defaultSettings = {
    interval: 2000,
    animationSpeed: 400
  };

  function Turboslider(settings, $elem) {
    this.settings = settings;
    this.$elem = $elem;
    this.slideContainer = this.$elem.find('.turboslider-images');
    this.slideWidth = 0;

    return this;
  }

  Turboslider.prototype.init = function () {
    var self = this,
      slides = this.slideContainer.children(),
      slide,
      containerWidth = 1;

    slides.each(function (idx, el) {
      slide = $(el);
      slide.addClass("turboslider-slide");
      containerWidth += slide.width();
    });

    this.slideWidth = parseInt(containerWidth / slides.length, 10);
    this.totalWidth = containerWidth;
    this.slideContainer.width(containerWidth);

    setInterval(function () {
      self.slide();
    }, this.settings.interval);
  };

  Turboslider.prototype.slide = function () {
    var currentMargin = parseInt(this.slideContainer.css('marginLeft'), 10),
      margin = this.slideWidth - currentMargin;

    this.slideContainer.animate({
      'marginLeft': ((margin + this.slideWidth) >= this.totalWidth) ? 0 : "-" + margin + "px"
    }, this.settings.animationSpeed, "swing");
  };
})(jQuery);