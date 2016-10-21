define('app',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var App = exports.App = function App() {
        _classCallCheck(this, App);

        this.message = 'Hello World!';
        this.container_1 = 'container_1';
    };
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./elements/loading-indicator']);
    config.globalResources(['./elements/any-chart']);
  }
});
define('resources/elements/any-chart',['exports', 'aurelia-framework', 'npm-anystock'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AnyChart = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _desc, _value, _class, _descriptor;

    var AnyChart = exports.AnyChart = (_class = function () {
        function AnyChart() {
            _classCallCheck(this, AnyChart);

            _initDefineProp(this, 'container', _descriptor, this);
        }

        AnyChart.prototype.containerChanged = function containerChanged(newValue, oldValue) {
            this.draw(newValue);
        };

        AnyChart.prototype.generateSome = function generateSome(data) {};

        AnyChart.prototype.draw = function draw(container) {

            this.generateSome(123);

            anychart.onDocumentReady(function () {
                var chart = anychart.stock();

                var table = anychart.data.table();
                table.addData([['2015-12-24T12:00:00', '511.53', '514.98', '505.79', '506.40'], ['2015-12-25T12:00:00', '512.53', '514.88', '505.69', '507.34'], ['2015-12-26T12:00:00', '511.83', '514.98', '505.59', '506.23'], ['2015-12-27T12:00:00', '511.22', '515.30', '505.49', '506.47'], ['2015-12-28T12:00:00', '510.35', '515.72', '505.23', '505.80'], ['2015-12-29T12:00:00', '510.53', '515.86', '505.38', '508.25'], ['2015-12-30T12:00:00', '511.43', '515.98', '505.66', '507.45'], ['2015-12-31T12:00:00', '511.50', '515.33', '505.99', '507.98'], ['2016-01-01T12:00:00', '511.32', '514.29', '505.99', '506.37'], ['2016-01-02T12:00:00', '511.70', '514.87', '506.18', '506.75'], ['2016-01-03T12:00:00', '512.30', '514.78', '505.87', '508.67'], ['2016-01-04T12:00:00', '512.50', '514.77', '505.83', '508.35'], ['2016-01-05T12:00:00', '511.53', '516.18', '505.91', '509.42'], ['2016-01-06T12:00:00', '511.13', '516.01', '506.00', '509.26'], ['2016-01-07T12:00:00', '510.93', '516.07', '506.00', '510.99'], ['2016-01-08T12:00:00', '510.88', '515.93', '505.22', '509.95'], ['2016-01-09T12:00:00', '509.12', '515.97', '505.15', '510.12'], ['2016-01-10T12:00:00', '508.53', '516.13', '505.66', '510.42'], ['2016-01-11T12:00:00', '508.90', '516.24', '505.73', '510.40']]);

                var mapping = table.mapAs();
                mapping.addField('open', 1, 'first');
                mapping.addField('high', 2, 'max');
                mapping.addField('low', 3, 'min');
                mapping.addField('close', 4, 'last');
                mapping.addField('value', 4, 'last');

                chart.plot(0).ohlc(mapping).name('ACME Corp.');

                chart.title('AnyStock Basic Sample');

                chart.container(container);
                chart.draw();
            });
        };

        return AnyChart;
    }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'container', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return 'container';
        }
    })), _class);
});
define('resources/elements/loading-indicator',['exports', 'nprogress', 'aurelia-framework'], function (exports, _nprogress, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LoadingIndicator = undefined;

  var nprogress = _interopRequireWildcard(_nprogress);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LoadingIndicator = exports.LoadingIndicator = (0, _aureliaFramework.decorators)((0, _aureliaFramework.noView)(['nprogress/nprogress.css']), (0, _aureliaFramework.bindable)({ name: 'loading', defaultValue: false })).on(function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _class.prototype.loadingChanged = function loadingChanged(newValue) {
      if (newValue) {
        nprogress.start();
      } else {
        nprogress.done();
      }
    };

    return _class;
  }());
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <any-chart container.bind=\"container_1\"></any-chart>\n    <!--<compose view-model=\"./elements/any-chart\" chart_id.bind=\"params\"></compose>-->\n</template>\n"; });
define('text!resources/elements/any-chart.html', ['module'], function(module) { module.exports = "<template>\r\n    <div id=\"${container}\" style=\"width: 500px; height: 400px;\"></div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map