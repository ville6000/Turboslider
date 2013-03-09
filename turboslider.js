/**
 * Turboslider
 * Minimal jQuery slider plugin
 */
(function ($) {
  $.fn.turboslider = function (option, settings) {
    var _settings, 
      plugin;

    return this.each(function () {
      _settings = $.extend({}, $.fn.turboslider.defaultSettings, settings || {}),
        $elem = $(this),
        plugin = new Turboslider(_settings, $elem);
        plugin.init();
    });
  };

  /**
   * Default settings
   * @typy {Object}
   */
  $.fn.turboslider.defaultSettings = {
    effect: 'swapImage',
    interval: 2000
  };

  /**
   * Create new instance of Turboslider
   *
   * @param {Object} settings User provided settings merged to default settings
   * @param {Object} $elem jQuery selected container element
   * @return {Object} Instance of Turboslider
   */
  function Turboslider(settings, $elem) {
    this.settings = settings;
    this.$elem = $elem;
    this.slides = [];

    return this;
  }

  /**
   *
   * @return {Object} this
   */
  Turboslider.prototype.init = function () {
    var self = this, 
      slide;

    this.$elem.addClass("turboslider-container");

    this.$elem.children().each(function (idx, el) {
      slide = $(el);
      slide.addClass("turboslider-slide");
      self.slides.push(slide);

      // Hide inactive slides
      if (idx > 0) {
        slide.hide();
      }
    });

    if (this.slides.length === 0) {
      if (console && console.log) {
        console.log("Nothing to slide");
      }
      return this;
    }

    setTimeout(function () {
      self.nextSlide();
    }, this.settings.interval);

    return this;
  };

  /**
   *
   * @return {Object} this
   */
  Turboslider.prototype.nextSlide = function () {
    var self = this;

    this.doEffect(this.settings.effect);

    setTimeout(function () { 
      self.nextSlide(); 
    }, this.settings.interval);

    return this;
  };

  /**
   * Call effect function
   *
   * @param {String} effect
   * @return {Object} this
   */
  Turboslider.prototype.doEffect = function (effect) {
    if (typeof this[effect] === 'function') {
      this[effect]();
    } else {
      throw new Error("Uknown effect: " + effect);
    }

    return this;
  };

  /**
   * Swap images
   *
   * @return {Object} this
   */
  Turboslider.prototype.swapImage = function () {
    var self = this,
      currentSlide = this.slides.shift(),
      nextSlide = this.slides[0];

    nextSlide.show();
    currentSlide.hide();
    this.slides.push(currentSlide);

    return this;
  };
})(jQuery);
