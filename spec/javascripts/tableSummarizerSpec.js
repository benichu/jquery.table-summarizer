
describe('tableSummarizer', function() {
  var options;
  options = {
    summarizableCss: ['duration', 'other_duration'],
    showValue: true,
    summaryCssClass: 'summary'
  };
  beforeEach(function() {
    loadFixtures('fragment.html');
    return this.$element = $('#fixtures');
  });
  describe('plugin functionnalities', function() {
    beforeEach(function() {
      return this.plugin = new $.tableSummarizer(this.$element, options);
    });
    it('should append a row to the first tbody', function() {
      return expect(this.$element.find("tbody#case1 tr").length).toEqual(4);
    });
    it('should append a row to the last tbody', function() {
      return expect(this.$element.find("tbody#case3 tr").length).toEqual(3);
    });
    it('should calculate the sum of data-values property on the `cssClass` element', function() {
      return expect(this.$element.find("tbody#case1 tr.summary td.duration").html()).toBeCloseTo(30.20);
    });
    return it('should calculate the sum of data-values property inside the `cssClass` element', function() {
      return expect(this.$element.find("tbody#case1 tr.summary td.other_duration").html()).toBeCloseTo(180.33);
    });
  });
  describe('plugin display customization', function() {
    beforeEach(function() {
      return this.plugin = new $.tableSummarizer(this.$element, {
        summaryLabel: 'Sub-Total'
      });
    });
    it('should add a summary label to each <tbody> summary first empty cell', function() {
      return expect(this.$element.find("tbody#case1 tr.summary td:first").html()).toEqual("Sub-Total");
    });
    return it('should not add a summary label to each <tbody> summary first not empty cell', function() {
      return expect(this.$element.find("tbody#case2 tr.summary td:first").html()).toNotEqual("Sub-Total");
    });
  });
  describe('plugin behavior', function() {
    it('should be available on the jQuery object', function() {
      return expect($.fn.tableSummarizer).toBeDefined();
    });
    it('should be chainable', function() {
      return expect(this.$element.tableSummarizer()).toBe(this.$element);
    });
    it('should offers default values', function() {
      var plugin;
      plugin = new $.tableSummarizer(this.$element);
      return expect(plugin.defaults).toBeDefined();
    });
    return it('should overwrites the settings', function() {
      var plugin;
      plugin = new $.tableSummarizer(this.$element, options);
      return expect(plugin.settings.cssClass).toBe(options.cssClass);
    });
  });
  return describe('plugin state', function() {
    beforeEach(function() {
      return this.plugin = new $.tableSummarizer(this.$element);
    });
    it('should have a ready state', function() {
      return expect(this.plugin.getState()).toBe('ready');
    });
    return it('should be updatable', function() {
      this.plugin.setState('new state');
      return expect(this.plugin.getState()).toBe('new state');
    });
  });
});
