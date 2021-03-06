
jQuery(function() {
  $.tableSummarizer = function(element, options) {
    var addRow, log, state, sumColumns,
      _this = this;
    state = 'waiting';
    this.settings = {};
    this.$element = $(element);
    this.setState = function(_state) {
      return state = _state;
    };
    this.getState = function() {
      return state;
    };
    this.getSetting = function(key) {
      return this.settings[key];
    };
    this.callSettingFunction = function(name, args) {
      if (args == null) {
        args = [];
      }
      return this.settings[name].apply(this, args);
    };
    addRow = function(tbody) {
      var settings;
      log("Add summary row");
      _this.$row = tbody.find("tr:last").clone(true);
      if (_this.settings.position === 'after') {
        _this.$row.appendTo(tbody);
      } else {
        _this.$row.prependTo(tbody);
      }
      _this.$row.addClass(_this.settings.summaryCssClass);
      settings = _this.settings;
      return _this.$row.find("td").each(function() {
        $(this).html("");
        return $(this).find(settings.summarizableAttr).attr(settings.summarizableAttr, "");
      });
    };
    sumColumns = function(tbody) {
      var firstTd, item, settings, sumCell, sumColumn, summarizableCss, _cssScope, _i, _len, _results;
      summarizableCss = _this.settings.summarizableCss;
      log("Summarize: " + summarizableCss);
      _results = [];
      for (_i = 0, _len = summarizableCss.length; _i < _len; _i++) {
        item = summarizableCss[_i];
        sumColumn = 0;
        settings = _this.settings;
        _cssScope = tbody.find("tr:not(." + settings.summaryCssClass + ")");
        _cssScope.find("." + item + "[" + settings.summarizableAttr + "], ." + item + " [" + settings.summarizableAttr + "]").each(function() {
          var val;
          if ($(this).attr(settings.summarizableAttr)) {
            val = parseFloat($(this).attr(settings.summarizableAttr));
          } else {
            val = 0;
          }
          return sumColumn += val;
        });
        sumColumn = sumColumn.toFixed(settings.roundTo);
        sumCell = tbody.find("tr." + settings.summaryCssClass + " td." + item);
        log("" + item + ": " + sumColumn);
        if (settings.showResultValue) {
          sumCell.html(sumColumn);
        }
        sumCell.attr(settings.summarizableAttr, sumColumn);
        log("Summary label: " + settings.summaryLabel);
        if (!!settings.summaryLabel) {
          firstTd = tbody.find("tr." + settings.summaryCssClass + " td:first");
          if (!firstTd.html()) {
            _results.push(firstTd.html(settings.summaryLabel));
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    log = function(msg) {
      if (_this.settings.debug) {
        return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
      }
    };
    this.init = function() {
      this.settings = $.extend({}, this.defaults, options);
      this.setState('waiting');
      if (this.$element.length) {
        log("Element is defined.");
        this.$tbodies = this.$element.find("tbody");
        this.$tbodies.each(function() {
          addRow($(this));
          return sumColumns($(this));
        });
        this.setState('ready');
        return this.callSettingFunction('onReady', [this.$element]);
      } else {
        this.setState('error');
        return this.callSettingFunction('onError', [this.$element]);
      }
    };
    this.init();
    return this;
  };
  $.tableSummarizer.prototype.defaults = {
    debug: false,
    summaryCssClass: 'summary',
    summaryLabel: '',
    position: 'after',
    showResultValue: true,
    summarizableCss: ['duration'],
    summarizableAttr: 'data-minute',
    roundTo: 2,
    onReady: function() {},
    onError: function() {}
  };
  return $.fn.tableSummarizer = function(options) {
    return this.each(function() {
      var plugin;
      if ($(this).data('tableSummarizer') === void 0) {
        plugin = new $.tableSummarizer(this, options);
        return $(this).data('tableSummarizer', plugin);
      }
    });
  };
});
