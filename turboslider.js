/**
 * Turboslider
 * Minimal jQuery slider plugin
 */
(function ($) {
  $.fn.turboslider = function (option, settings) {
    var _settings, 
      plugin,
      $elem;

    return this.each(function () {
      _settings = $.extend({}, $.fn.turboslider.defaultSettings, settings || {});
      $elem = $(this);
      plugin = new Turboslider(_settings, $elem);
      plugin.init();
    });
  };

  $.fn.turboslider.defaultSettings = {
    interval: 2000
  };

  function Turboslider(settings, $elem) {
    this.settings = settings;
    this.$elem = $elem;
    this.slides = [];

    return this;
  }

  Turboslider.prototype.init = function () {
    var self = this, 
      slide;

    this.$elem.addClass("turboslider-container");
    this.$elem.children().each(function (idx, el) {
      slide = $(el);
      slide.addClass("turboslider-slide");
      self.slides.push(slide);
    });

    this.swapImage();

    return this;
  };

  Turboslider.prototype.swapImage = function () {
    var self = this,
      currentSlide = this.slides.shift(),
      nextSlide = this.slides[0];

    nextSlide.show();
    currentSlide.hide();

    this.slides.push(currentSlide);

    setTimeout(function () { 
      self.swapImage(); 
    }, this.settings.interval);

    return this;
  };
})(jQuery);