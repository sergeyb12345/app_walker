define('app',['exports', 'aurelia-framework', 'aurelia-router', './account/user-context'], function (exports, _aureliaFramework, _aureliaRouter, _userContext) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    var _dec, _class;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var App = exports.App = function () {
        function App() {
            _classCallCheck(this, App);
        }

        App.prototype.configureRouter = function configureRouter(config, router) {

            config.title = 'Dream Space';
            config.options.pushState = true;

            this.router = router;
            config.addPipelineStep('authorize', AuthorizeStep);
            config.map([{ route: ["account"], moduleId: "account/navigation", name: "account", title: "Login", nav: false }, { route: ["strategies"], moduleId: "strategies/navigation", name: "strategies", title: "Strategies", auth: true, nav: true }, { route: '', redirect: 'strategies' }]);
        };

        return App;
    }();

    var AuthorizeStep = (_dec = (0, _aureliaFramework.inject)(_userContext.UserContext, "homePage"), _dec(_class = function () {
        function AuthorizeStep(userContext, homePage) {
            _classCallCheck(this, AuthorizeStep);

            this.isAuthenticated = userContext.user.isAuthenticated;
            this.homePage = homePage;
        }

        AuthorizeStep.prototype.run = function run(navigationInstruction, next) {
            var _this = this;

            if (navigationInstruction.getAllInstructions().some(function (i) {
                return i.config.auth;
            })) {

                if (this.isAuthenticated) {
                    return next();
                } else {
                    return next.cancel(new _aureliaRouter.RedirectToRoute('account'));
                }
            } else {
                if (navigationInstruction.getAllInstructions().some(function (i) {
                    return i.config.name === 'account-login' && _this.isAuthenticated;
                })) {
                    return next.cancel(new _aureliaRouter.RedirectToRoute(this.homePage));
                }
                return next();
            }
        };

        return AuthorizeStep;
    }()) || _class);
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
define('main',['exports', './environment', './account/user-context'], function (exports, _environment, _userContext) {
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

    var userContext = aurelia.container.get(_userContext.UserContext);
    userContext.initialize();

    aurelia.use.instance('homePage', 'strategies').standardConfiguration().feature('resources').feature('navigation');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      aurelia.setRoot();
    });
  }
});
define('account/edit',['exports', 'aurelia-framework', './user-context', 'aurelia-event-aggregator', 'aurelia-router'], function (exports, _aureliaFramework, _userContext, _aureliaEventAggregator, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Edit = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Edit = exports.Edit = (_dec = (0, _aureliaFramework.inject)(_userContext.UserContext, _aureliaEventAggregator.EventAggregator, _aureliaRouter.Router), _dec(_class = function () {
        function Edit(userContext, eventAggregator, router) {
            _classCallCheck(this, Edit);

            this.userContext = userContext;
            this.eventAggregator = eventAggregator;
            this.router = router;
        }

        Edit.prototype.activate = function activate() {
            this.user = this.userContext.user;
        };

        Edit.prototype.update = function update() {
            var _this = this;

            this.userContext.update(this.user).then(function (result) {
                if (result === 0) {
                    _this.router.navigate("view");
                }
            }).catch(function (error) {
                return _this.handleError(error);
            });
        };

        Edit.prototype.handleError = function handleError(error) {
            this.eventAggregator.publish('GeneralExceptions', error);
        };

        return Edit;
    }()) || _class);
});
define('account/login',['exports', 'aurelia-framework', 'aurelia-router', './user-context', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaRouter, _userContext, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Login = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _userContext.UserContext, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function Login(router, userContext, eventAggregator) {
            _classCallCheck(this, Login);

            this.router = router;
            this.userContext = userContext;
            this.eventAggregator = eventAggregator;

            this.username = '';
            this.password = '';
        }

        Login.prototype.login = function login() {
            var _this = this;

            this.userContext.login(this.username, this.password).then(function (result) {
                if (result === 0) {
                    var url = _this.router.generate("strategies");
                    window.location.href = url;
                }
            }).catch(function (error) {
                return _this.handleError(error);
            });
        };

        Login.prototype.handleError = function handleError(error) {
            this.eventAggregator.publish('GeneralExceptions', error);
        };

        return Login;
    }()) || _class);
});
define('account/navigation',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Navigation = exports.Navigation = function () {
        function Navigation() {
            _classCallCheck(this, Navigation);
        }

        Navigation.prototype.configureRouter = function configureRouter(config, router) {
            config.title = 'Login';

            config.map([{ route: ['', 'login'], moduleId: "./login", name: "account-login", title: "Login", nav: false }, { route: ['edit'], moduleId: "./edit", name: "account-edit", title: "Edit Profile", nav: true, auth: true }, { route: ['view'], moduleId: "./view", name: "account-view", title: "View Profile", nav: true, auth: true }]);

            this.router = router;
            this.section = config.title;
        };

        return Navigation;
    }();
});
define('account/user-context',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UserContext = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var UserContext = exports.UserContext = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function UserContext(httpClient, eventAggregator) {
            _classCallCheck(this, UserContext);

            httpClient.configure(function (config) {
                config.useStandardConfiguration().withBaseUrl('api/');
            });

            this.http = httpClient;
            this.eventAggregator = eventAggregator;
            this.user = {};
        }

        UserContext.prototype.initialize = function initialize() {
            var _this = this;

            return this.http.fetch("account/user").then(function (response) {
                response.json().then(function (user) {
                    _this.user = user;
                });
            }).catch(function (error) {
                _this.handleError(error);
            });
        };

        UserContext.prototype.login = function login(username, password) {
            var _this2 = this;

            var loginRequest = {
                Email: username,
                Password: password,
                RememberMe: true
            };

            return this.http.fetch("account/login", {
                method: 'post',
                body: (0, _aureliaFetchClient.json)(loginRequest)
            }).then(function (response) {
                return response.json().then(function (result) {
                    if (result.status === 0) {
                        _this2.user = result.user;
                    }
                    return result.status;
                });
            }).catch(function (error) {
                return _this2.handleError(error);
            });
        };

        UserContext.prototype.update = function update(user) {
            var _this3 = this;

            var updateRequest = {
                Username: user.username,
                FirstName: user.firstName
            };

            return this.http.fetch("account/update", {
                method: 'put',
                body: (0, _aureliaFetchClient.json)(updateRequest)
            }).then(function (response) {
                return response.json().then(function (result) {
                    if (result.status === 0) {
                        _this3.user = result.user;
                    }
                    return result.status;
                });
            }).catch(function (error) {
                return _this3.handleError(error);
            });
        };

        UserContext.prototype.handleError = function handleError(error) {
            this.eventAggregator.publish('GeneralExceptions', error);
        };

        return UserContext;
    }()) || _class);
});
define('account/view',['exports', 'aurelia-framework', './user-context', 'aurelia-router'], function (exports, _aureliaFramework, _userContext, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.View = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var View = exports.View = (_dec = (0, _aureliaFramework.inject)(_userContext.UserContext, _aureliaRouter.Router), _dec(_class = function () {
        function View(userContext, router) {
            _classCallCheck(this, View);

            this.user = userContext.user;
            this.router = router;
        }

        View.prototype.acttivate = function acttivate() {};

        View.prototype.edit = function edit() {
            this.router.navigate("edit");
        };

        return View;
    }()) || _class);
});
define('navigation/index',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;
    function configure(config) {
        config.globalResources('./main-menu', './sub-menu', './sub-nav');
    }
});
define('navigation/main-menu',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MainMenu = undefined;

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

    var MainMenu = exports.MainMenu = (_class = function MainMenu() {
        _classCallCheck(this, MainMenu);

        _initDefineProp(this, "router", _descriptor, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "router", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class);
});
define('navigation/sub-menu',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.SubMenu = undefined;

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

    var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var SubMenu = exports.SubMenu = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
        function SubMenu(eventAggregator) {
            _classCallCheck(this, SubMenu);

            _initDefineProp(this, 'router', _descriptor, this);

            _initDefineProp(this, 'section', _descriptor2, this);

            this.editMode = false;
            this.eventAggregator = eventAggregator;
            this.subscriptions = [];
        }

        SubMenu.prototype.startEdit = function startEdit() {
            this.editMode = true;
            this.eventAggregator.publish(this.section + '-edit-mode', this.editMode);
        };

        SubMenu.prototype.cancelEdit = function cancelEdit() {
            this.editMode = false;
            this.eventAggregator.publish(this.section + '-edit-mode', this.editMode);
        };

        SubMenu.prototype.applyChanges = function applyChanges() {
            this.eventAggregator.publish(this.section + '-save', true);
        };

        SubMenu.prototype.sectionChanged = function sectionChanged(newValue, oldValue) {
            this.section = newValue;
        };

        SubMenu.prototype.attached = function attached() {
            var _this = this;

            this.subscriptions.push(this.eventAggregator.subscribe(this.section + '-cancel-edit', function (flag) {
                return _this.cancelEdit();
            }));
        };

        SubMenu.prototype.detached = function detached() {
            this.subscriptions.forEach(function (subscription) {
                subscription.dispose();
            });
        };

        return SubMenu;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'router', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'section', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('navigation/sub-nav',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.SubNav = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var SubNav = exports.SubNav = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function SubNav(eventAggregator) {
            _classCallCheck(this, SubNav);

            this.eventAggregator = eventAggregator;
            this.categoriesUrl = '';
        }

        SubNav.prototype.activate = function activate(menu) {
            this.menu = menu;
            this.categoriesUrl = this.menu.section.Url + '/categories/' + this.menu.section.SectionId;
        };

        SubNav.prototype.getUrl = function getUrl(menuItem) {
            return '' + this.menu.section.Url + '/' + menuItem.Url;
        };

        SubNav.prototype.startEdit = function startEdit() {
            this.eventAggregator.publish(this.menu.section.Url + '-start-edit', true);
        };

        SubNav.prototype.applyChanges = function applyChanges() {
            this.eventAggregator.publish(this.menu.section.Url + '-save-article', true);
        };

        SubNav.prototype.cancelEdit = function cancelEdit() {
            this.eventAggregator.publish(this.menu.section.Url + '-cancel-edit', true);
        };

        return SubNav;
    }()) || _class);
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
define('strategies/create',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Create = exports.Create = function Create() {
    _classCallCheck(this, Create);
  };
});
define('strategies/list',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var List = exports.List = function List() {
    _classCallCheck(this, List);
  };
});
define('strategies/navigation',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Navigation = exports.Navigation = function () {
        function Navigation() {
            _classCallCheck(this, Navigation);
        }

        Navigation.prototype.configureRouter = function configureRouter(config, router) {
            config.title = 'Strategies';

            config.map([{ route: ['', 'list'], moduleId: "./list", name: "list", title: "Strategies", nav: true }, { route: ['create'], moduleId: "./create", name: "create", title: "Create New Strategy", nav: true }]);

            this.router = router;
            this.section = config.title;
        };

        return Navigation;
    }();
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
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <main-menu router.bind=\"router\"></main-menu>\r\n    <router-view></router-view>\r\n\r\n</template>\n"; });
define('text!account/edit.html', ['module'], function(module) { module.exports = "<template>\r\n    <header>\r\n        <h3>User Profile</h3>\r\n    </header>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-2\">First name</div>\r\n        <div class=\"col-xs-10\">\r\n            <input type=\"text\" class=\"form-control\" value.bind=\"user.firstName\" />\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-2\"></div>\r\n        <div class=\"col-xs-10\">\r\n            <button type=\"button\" click.delegate=\"update()\" class=\"btn btn-primary\">Update</button>\r\n        </div>\r\n    </div>\r\n\r\n</template>"; });
define('text!account/login.html', ['module'], function(module) { module.exports = "<template>\r\n    \r\n    <header>\r\n        <h3>Login</h3>\r\n    </header>\r\n    \r\n    <div class=\"row\">\r\n        <div class=\"col-xs-2\">Username</div>\r\n        <div class=\"col-xs-10\">\r\n            <input type=\"text\" class=\"form-control\" value.bind=\"username\" />\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-2\">Password</div>\r\n        <div class=\"col-xs-10\">\r\n            <input type=\"text\" class=\"form-control\" value.bind=\"password\" />\r\n        </div>\r\n    </div>    \r\n    \r\n    <div class=\"row\">\r\n        <div class=\"col-xs-2\"></div>\r\n        <div class=\"col-xs-10\">\r\n            <button type=\"button\" click.delegate=\"login()\" class=\"btn btn-primary\">Login</button>\r\n        </div>\r\n    </div>\r\n\r\n</template>"; });
define('text!account/navigation.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <div class=\"container page-content\">\r\n        <router-view></router-view>\r\n    </div>\r\n\r\n</template>"; });
define('text!account/view.html', ['module'], function(module) { module.exports = "<template>\r\n    <header>\r\n        <h3>User Profile</h3>\r\n    </header>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-2\">First name</div>\r\n        <div class=\"col-xs-10\">\r\n            <span>${user.firstName}</span>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-2\">Email</div>\r\n        <div class=\"col-xs-10\">\r\n            <span>${user.username}</span>\r\n        </div>\r\n    </div>\r\n    \r\n    <div class=\"row\">\r\n        <div class=\"col-xs-2\"></div>\r\n        <div class=\"col-xs-10\">\r\n            <button type=\"button\" click.delegate=\"edit()\" class=\"btn btn-primary\">Edit</button>\r\n        </div>\r\n    </div>\r\n\r\n</template>"; });
define('text!navigation/main-menu.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"main-menu\">\r\n        <div class=\"container\">\r\n            <div class=\"navbar-brand\">\r\n\r\n                <img class=\"logo\" src=\"/content/images/logo.png\" />\r\n                <a href=\"/\">D<span>ream</span> S<span>pace</span></a>\r\n            </div>\r\n            <nav class=\"navbar\">\r\n                <ul class=\"nav navbar-nav\">\r\n                    <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\r\n                        <a href.bind=\"row.href\">${row.title}</a>\r\n                    </li>\r\n                </ul>\r\n            </nav>\r\n        </div>\r\n     </div>\r\n</template>"; });
define('text!navigation/sub-menu.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <div class=\"sub-menu\">\r\n        <nav class=\"navbar navbar-fixed-top\">\r\n            <div class=\"container\">\r\n                <nav class=\"navbar\">\r\n                    <ul class=\"nav navbar-nav\">\r\n                        <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\r\n                            <a href.bind=\"row.href\">${row.title}</a>\r\n                        </li>\r\n                    </ul>\r\n\r\n                    <div class=\"actions\">\r\n                        <div class=\"btn-group\" role=\"group\" aria-label=\"Actions\">\r\n                            <button type=\"button\" if.bind=\"editMode !== true\" click.delegate=\"startEdit()\" class=\"btn btn-success\">Switch to Edit Mode</button>\r\n                            <button type=\"button\" if.bind=\"editMode === true\" click.delegate=\"applyChanges()\" class=\"btn btn-success\">Apply Changes</button>\r\n                            <button type=\"button\" if.bind=\"editMode === true\" click.delegate=\"cancelEdit()\" class=\"btn btn-default\">Cancel</button>\r\n                        </div>\r\n                    </div>\r\n\r\n                </nav>\r\n            </div>\r\n        </nav>\r\n    </div>\r\n</template>"; });
define('text!navigation/sub-nav.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"sub-menu\">\r\n        <nav class=\"navbar navbar-fixed-top\">\r\n            <div class=\"container\">\r\n                <nav class=\"navbar\">\r\n                    <ul class=\"nav navbar-nav\">\r\n                        <li repeat.for=\"item of menu.items\" class=\"${item.IsActive ? 'active' : ''}\">\r\n                            <a href.bind=\"$parent.getUrl(item)\">${item.Title}</a>\r\n                        </li>\r\n                    </ul>\r\n                    <div class=\"actions\">\r\n                        <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\r\n\r\n                            <div if.bind=\"menu.editMode !== true\" class=\"btn-group\" role=\"group\">\r\n                                <button type=\"button\" class=\"btn btn-warning dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                                    Configure\r\n                                    <span class=\"caret\"></span>\r\n                                </button>\r\n                                <ul class=\"dropdown-menu\">\r\n                                    <li><a click.delegate=\"startEdit()\">Edit Page</a></li>\r\n                                    <li role=\"separator\" class=\"divider\"></li>\r\n                                    <li><a href=\"/categories\">Manage Categories</a></li>\r\n                                </ul>\r\n                            </div>\r\n\r\n                            <button type=\"button\" if.bind=\"menu.editMode === true\" click.delegate=\"applyChanges()\" class=\"btn btn-success\">Apply Changes</button>\r\n                            <button type=\"button\" if.bind=\"menu.editMode === true\" click.delegate=\"cancelEdit()\" class=\"btn btn-default\">Cancel</button>\r\n\r\n                        </div>\r\n\r\n                    </div>\r\n                </nav>\r\n            </div>\r\n        </nav>\r\n    </div>\r\n</template>"; });
define('text!strategies/create.html', ['module'], function(module) { module.exports = "<template>\r\n    \r\n    <header>\r\n        <h3>Create new strategy</h3>\r\n    </header>\r\n    \r\n</template>"; });
define('text!strategies/list.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <header>\r\n        <h3>Defined Strategies</h3>\r\n    </header>\r\n\r\n</template>"; });
define('text!strategies/navigation.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <sub-menu router.bind=\"router\" section.bind=\"section\"></sub-menu>\r\n\r\n    <div class=\"container page-content\">\r\n        <router-view></router-view>\r\n    </div>\r\n\r\n</template>"; });
define('text!resources/elements/any-chart.html', ['module'], function(module) { module.exports = "<template>\r\n    <div id=\"${container}\" style=\"width: 500px; height: 400px;\"></div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map