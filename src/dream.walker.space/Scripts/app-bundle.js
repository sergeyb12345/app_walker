define('app',["exports", "aurelia-framework", "aurelia-router"], function (exports, _aureliaFramework, _aureliaRouter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class, _dec2, _class2;

    var App = exports.App = (_dec = (0, _aureliaFramework.inject)("User", "Settings"), _dec(_class = function () {
        function App(userContext, settings) {
            _classCallCheck(this, App);

            this.isAuthenticated = userContext.user.isAuthenticated;
            this.homePage = settings.homePage;
            this.router = null;
        }

        App.prototype.configureRouter = function configureRouter(config, router) {

            config.title = 'Dream Space';
            config.options.pushState = true;

            this.router = router;
            config.addPipelineStep('authorize', AuthorizeStep);
            config.map([{ route: ["account"], moduleId: "account/navigation", name: "account", title: "Login", nav: false }, { route: ["strategies"], moduleId: "strategies/navigation", name: "strategies", title: "Strategies", auth: true, nav: this.isAuthenticated }, { route: ["studies"], moduleId: "studies/navigation", name: "studies", title: "Studies", nav: true }, { route: '', redirect: this.homePage }]);
        };

        return App;
    }()) || _class);
    var AuthorizeStep = (_dec2 = (0, _aureliaFramework.inject)("User", "Settings"), _dec2(_class2 = function () {
        function AuthorizeStep(userContext, settings) {
            _classCallCheck(this, AuthorizeStep);

            this.isAuthenticated = userContext.user.isAuthenticated;
            this.homePage = settings.homePage;
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
    }()) || _class2);
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
define('main',['exports', 'jquery', './environment', './settings', './common/error-parser', './account/user-context'], function (exports, _jquery, _environment, _settings, _errorParser, _userContext) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;

    var _jquery2 = _interopRequireDefault(_jquery);

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
        var errorparser = aurelia.container.get(_errorParser.ErrorParser);
        var userContext = aurelia.container.get(_userContext.UserContext);
        var settings = aurelia.container.get(_settings.Settings);

        userContext.initialize().then(function (response) {

            settings.initialize().then(function (response) {
                aurelia.use.instance('ErrorParser', errorparser).instance('Settings', settings).instance('User', userContext).standardConfiguration().feature('resources').feature('navigation').plugin('aurelia-validation');

                if (_environment2.default.debug) {
                    aurelia.use.developmentLogging();
                }

                if (_environment2.default.testing) {}

                aurelia.start().then(function () {
                    aurelia.setRoot();
                });
            });
        });
    }
});
define('settings',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Settings = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Settings = exports.Settings = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function Settings(httpClient, eventAggregator) {
            _classCallCheck(this, Settings);

            this.eventAggregator = eventAggregator;

            httpClient.configure(function (config) {
                config.useStandardConfiguration().withBaseUrl('api/');
            });

            this.sections = [];
            this.http = httpClient;
            this.initialized = false;
            this.homePage = 'studies';
        }

        Settings.prototype.getStudiesSection = function getStudiesSection() {
            if (this.initialized === true) {
                return this.sections.find(function (s) {
                    return s.url === "studies";
                });
            }
            return null;
        };

        Settings.prototype.getSection = function getSection(sectionId) {
            if (this.initialized === true) {
                return this.sections.find(function (s) {
                    return s.sectionId === sectionId;
                });
            }
            return null;
        };

        Settings.prototype.initialize = function initialize() {
            var _this = this;

            return this.http.fetch("article/sections").then(function (response) {
                response.json().then(function (sections) {
                    _this.sections = sections;
                    _this.initialized = true;
                });

                return _this;
            }).catch(function (error) {
                return _this.handleError(error, "initialize");
            });
        };

        Settings.prototype.handleError = function handleError(error, source) {
            var exception = {
                source: "Settings->" + source,
                exception: error
            };
            this.eventAggregator.publish('GeneralExceptions', exception);
            return error;
        };

        return Settings;
    }()) || _class);
});
define('account/edit',["exports", "aurelia-framework", "aurelia-event-aggregator", "aurelia-validation", "../common/bootstrap-form-renderer"], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaValidation, _bootstrapFormRenderer) {
    "use strict";

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

    var Edit = exports.Edit = (_dec = (0, _aureliaFramework.inject)("User", _aureliaEventAggregator.EventAggregator, _aureliaValidation.ValidationController), _dec(_class = function () {
        function Edit(userContext, eventAggregator, validation) {
            _classCallCheck(this, Edit);

            this.userContext = userContext;
            this.eventAggregator = eventAggregator;
            this.user = this.userContext.user;

            this.validation = validation;
            this.validation.validateTrigger = _aureliaValidation.validateTrigger.change;
            this.validation.addRenderer(new _bootstrapFormRenderer.BootstrapFormRenderer());

            _aureliaValidation.ValidationRules.ensure(function (u) {
                return u.firstName;
            }).required().minLength(3).on(this.user);
        }

        Edit.prototype.activate = function activate(params, routeConfig, navigationInstruction) {
            this.router = navigationInstruction.router;
        };

        Edit.prototype.update = function update() {
            var _this = this;

            if (this.validation.errors && this.validation.errors.length > 0) {
                return;
            }

            this.userContext.update(this.user).then(function (result) {
                if (result === 0) {
                    _this.router.navigate("view");
                }
            }).catch(function (error) {
                return _this.handleError(error, "update");
            });
        };

        Edit.prototype.handleError = function handleError(error, source) {
            var exception = {
                source: "Account.Edit->" + source,
                exception: error
            };
            this.eventAggregator.publish('GeneralExceptions', exception);
            return error;
        };

        return Edit;
    }()) || _class);
});
define('account/login',["exports", "aurelia-framework", "aurelia-event-aggregator"], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    "use strict";

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

    var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)("User", _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function Login(userContext, eventAggregator) {
            _classCallCheck(this, Login);

            this.userContext = userContext;
            this.eventAggregator = eventAggregator;

            this.username = '';
            this.password = '';
        }

        Login.prototype.activate = function activate(params, routeConfig, navigationInstruction) {
            this.router = navigationInstruction.router;
        };

        Login.prototype.login = function login() {
            var _this = this;

            this.userContext.login(this.username, this.password).then(function (result) {
                if (result === 0) {
                    var url = _this.router.generate("strategies");
                    window.location.href = url;
                }
            }).catch(function (error) {
                return _this.handleError(error, "login");
            });
        };

        Login.prototype.handleError = function handleError(error, source) {
            var exception = {
                source: "Account.Login->" + source,
                exception: error
            };
            this.eventAggregator.publish('GeneralExceptions', exception);
            return error;
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
                return response.json().then(function (user) {
                    _this.user = user;
                });
            }).catch(function (error) {
                _this.handleError(error, "initialize");
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
                return _this2.handleError(error, "login");
            });
        };

        UserContext.prototype.logout = function logout() {
            var _this3 = this;

            return this.http.fetch("account/logout", {
                method: 'post'
            }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this3.handleError(error, "logout");
            });
        };

        UserContext.prototype.update = function update(user) {
            var _this4 = this;

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
                        _this4.user = result.user;
                    }
                    return result.status;
                });
            }).catch(function (error) {
                return _this4.handleError(error, "update");
            });
        };

        UserContext.prototype.handleError = function handleError(error, source) {
            var exception = {
                source: "UserContext->" + source,
                exception: error
            };
            this.eventAggregator.publish('GeneralExceptions', exception);
            return error;
        };

        return UserContext;
    }()) || _class);
});
define('account/view',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
    "use strict";

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

    var View = exports.View = (_dec = (0, _aureliaFramework.inject)("User"), _dec(_class = function () {
        function View(userContext) {
            _classCallCheck(this, View);

            this.user = userContext.user;
        }

        View.prototype.activate = function activate(params, routeConfig, navigationInstruction) {
            this.router = navigationInstruction.router;
        };

        View.prototype.edit = function edit() {
            this.router.navigate("edit");
        };

        return View;
    }()) || _class);
});
define('common/bootstrap-form-renderer',['exports', 'aurelia-validation'], function (exports, _aureliaValidation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BootstrapFormRenderer = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var BootstrapFormRenderer = exports.BootstrapFormRenderer = function () {
        function BootstrapFormRenderer() {
            _classCallCheck(this, BootstrapFormRenderer);
        }

        BootstrapFormRenderer.prototype.render = function render(instruction) {
            for (var _iterator = instruction.unrender, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var _ref3 = _ref;
                var error = _ref3.error;
                var elements = _ref3.elements;

                for (var _iterator3 = elements, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                    var _ref4;

                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref4 = _iterator3[_i3++];
                    } else {
                        _i3 = _iterator3.next();
                        if (_i3.done) break;
                        _ref4 = _i3.value;
                    }

                    var element = _ref4;

                    this.remove(element, error);
                }
            }

            for (var _iterator2 = instruction.render, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var _ref5 = _ref2;
                var error = _ref5.error;
                var elements = _ref5.elements;

                for (var _iterator4 = elements, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                    var _ref6;

                    if (_isArray4) {
                        if (_i4 >= _iterator4.length) break;
                        _ref6 = _iterator4[_i4++];
                    } else {
                        _i4 = _iterator4.next();
                        if (_i4.done) break;
                        _ref6 = _i4.value;
                    }

                    var _element = _ref6;

                    this.add(_element, error);
                }
            }
        };

        BootstrapFormRenderer.prototype.add = function add(element, error) {
            var formGroup = element.closest('.form-group');
            if (!formGroup) {
                return;
            }

            formGroup.classList.add('has-error');

            var message = document.createElement('span');
            message.className = 'help-block validation-message';
            message.textContent = error.message;
            message.id = 'validation-message-' + error.id;
            formGroup.appendChild(message);
        };

        BootstrapFormRenderer.prototype.remove = function remove(element, error) {
            var formGroup = element.closest('.form-group');
            if (!formGroup) {
                return;
            }

            var message = formGroup.querySelector('#validation-message-' + error.id);
            if (message) {
                formGroup.removeChild(message);

                if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
                    formGroup.classList.remove('has-error');
                }
            }
        };

        return BootstrapFormRenderer;
    }();
});
define('common/error-handler',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'toastr'], function (exports, _aureliaFramework, _aureliaEventAggregator, _toastr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ErrorHandler = undefined;

    var _toastr2 = _interopRequireDefault(_toastr);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ErrorHandler = exports.ErrorHandler = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, "ErrorParser"), _dec(_class = function () {
        function ErrorHandler(eventAggregator, errorParser) {
            var _this = this;

            _classCallCheck(this, ErrorHandler);

            this.errorParser = errorParser;

            eventAggregator.subscribe("GeneralExceptions", function (error) {
                return _this.handleError(error);
            });

            this.lastError = {
                client: {
                    source: "",
                    message: ""
                },
                server: {
                    source: "",
                    message: ""
                }

            };
        }

        ErrorHandler.prototype.handleError = function handleError(error) {
            var self = this;

            this.errorParser.parseError(error).then(function (errorInfo) {
                self.logError(errorInfo);
            });
        };

        ErrorHandler.prototype.getLastError = function getLastError() {
            return this.lastError;
        };

        ErrorHandler.prototype.logError = function logError(errorInfo) {
            this.lastError = errorInfo;

            var logger = errorInfo.client.source + ' (' + errorInfo.server.source + ')';
            var message = 'ERROR [' + logger + '] ' + errorInfo.client.message + ' SERVER: ' + errorInfo.server.message;

            console.error(message);
            _toastr2.default.error(message);
        };

        return ErrorHandler;
    }()) || _class);
});
define('common/error-parser',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ErrorParser = exports.ErrorParser = function () {
        function ErrorParser() {
            _classCallCheck(this, ErrorParser);
        }

        ErrorParser.prototype.parseErrorFromStream = function parseErrorFromStream(stream) {

            var promise = new Promise(function (resolve, reject) {

                var result = {
                    source: "",
                    message: ""
                };

                try {

                    var reader = stream.getReader();

                    reader.read().then(function (data) {

                        var enc = new TextDecoder();
                        var message = enc.decode(data.value);

                        try {
                            var json = JSON.parse(message);

                            result.message = json.Message;
                            result.source = json.Source;
                        } catch (e) {
                            result.message = message;
                        }

                        resolve(result);
                    }).catch(function (err) {
                        reject(err);
                    });
                } catch (e) {
                    reject(e);
                }
            });

            return promise;
        };

        ErrorParser.prototype.parseError = function parseError(error) {

            var promise = new Promise(function (resolve, reject) {

                var errorInfo = {
                    client: {
                        source: "",
                        message: ""
                    },
                    server: {
                        source: "",
                        message: ""
                    }
                };

                if (error.source) {
                    errorInfo.client.source = error.source;
                }

                if (error.message) {
                    errorInfo.client.message = error.message;
                }

                if (error.exception) {

                    this.parseErrorFromStream(error.exception.body).then(function (serverError) {
                        errorInfo.server.source = serverError.source;
                        errorInfo.server.message = serverError.message;

                        resolve(errorInfo);
                    }).catch(function (error) {
                        errorInfo.server.message = "Failed to extract server message";
                        resolve(errorInfo);
                    });
                } else {
                    if (errorInfo.client.source.length === 0 && errorInfo.client.message.length === 0) {
                        errorInfo.client.message = error;
                    }

                    resolve(errorInfo);
                }
            });

            return promise;
        };

        return ErrorParser;
    }();
});
define('navigation/index',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;
    function configure(config) {
        config.globalResources('./sub-menu');
    }
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
define('navigation/sub-nav',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var SubNav = exports.SubNav = function () {
        function SubNav() {
            _classCallCheck(this, SubNav);

            this.categoriesUrl = '';
        }

        SubNav.prototype.activate = function activate(menu) {
            this.menu = menu;
            this.categoriesUrl = this.menu.section.url + '/categories/' + this.menu.section.sectionId;
        };

        SubNav.prototype.getUrl = function getUrl(menuItem) {
            return '' + this.menu.section.url + '/' + menuItem.url;
        };

        return SubNav;
    }();
});
define('resources/index',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;
    function configure(config) {

        config.globalResources(['./elements/navigation/nav-header']);
        config.globalResources(['./elements/navigation/main-nav']);
        config.globalResources(['./elements/navigation/sub-nav']);
        config.globalResources(['./elements/chart/any-chart']);
        config.globalResources(['./elements/rule/rule']);
        config.globalResources(['./attributes/first-letter-span']);
        config.globalResources('./elements/article/article', './elements/article/article-block', './elements/article//heading-block', './elements/article//paragraph-block', './elements/article/image-block', './elements/article/ordered-list-block', './elements/article/block-actions', './elements/article/new-block');
    }
});
define('services/article-service',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ArticleService = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ArticleService = exports.ArticleService = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function ArticleService(httpClient, eventAggregator) {
            _classCallCheck(this, ArticleService);

            httpClient.configure(function (config) {
                config.useStandardConfiguration().withBaseUrl('api/');
            });

            this.http = httpClient;
            this.eventAggregator = eventAggregator;
        }

        ArticleService.prototype.getArticle = function getArticle(id) {
            var _this = this;

            return this.http.fetch("article/" + id).then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this.handleError(error, "getArticle");
            });
        };

        ArticleService.prototype.deleteArticle = function deleteArticle(id) {
            var _this2 = this;

            return this.http.fetch("article/" + id, { method: 'delete' }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this2.handleError(error, "deleteArticle");
            });
        };

        ArticleService.prototype.updateArticleOrder = function updateArticleOrder(articleId, orderId) {
            var _this3 = this;

            var article = {
                ArticleId: articleId,
                OrderId: orderId
            };

            return this.http.fetch("article/" + articleId + "/order", { method: 'put', body: (0, _aureliaFetchClient.json)(article) }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this3.handleError(error, "updateArticleOrder");
            });
        };

        ArticleService.prototype.getArticleByUrl = function getArticleByUrl(categotyId, articleUrl) {
            var _this4 = this;

            return this.http.fetch("article/url/" + categotyId + "/" + articleUrl).then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this4.handleError(error, "getArticleByUrl");
            });
        };

        ArticleService.prototype.getSection = function getSection(url) {
            var _this5 = this;

            return this.http.fetch("article/section/" + url).then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this5.handleError(error, "getSection");
            });
        };

        ArticleService.prototype.getCategories = function getCategories(sectionId) {
            var _this6 = this;

            return this.http.fetch("article/categories/" + sectionId).then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this6.handleError(error, "getCategories");
            });
        };

        ArticleService.prototype.getCategory = function getCategory(categoryUrl) {
            var _this7 = this;

            return this.http.fetch("article/category/" + categoryUrl).then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this7.handleError(error);
            });
        };

        ArticleService.prototype.getFeatured = function getFeatured(categoryId) {
            var _this8 = this;

            return this.http.fetch("article/" + categoryId + "/featured").then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this8.handleError(error, "getFeatured");
            });
        };

        ArticleService.prototype.getArticles = function getArticles(categoryId) {
            var _this9 = this;

            return this.http.fetch("article/" + categoryId + "/all").then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this9.handleError(error, "getArticles");
            });
        };

        ArticleService.prototype.saveArticle = function saveArticle(article) {
            var _this10 = this;

            return this.http.fetch('article', {
                method: 'post',
                body: (0, _aureliaFetchClient.json)(article)
            }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                _this10.handleError(error, "saveArticle");
            });
        };

        ArticleService.prototype.saveCategory = function saveCategory(category) {
            var _this11 = this;

            return this.http.fetch('article/category', {
                method: 'post',
                body: (0, _aureliaFetchClient.json)(category)
            }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                _this11.handleError(error, "saveCategory");
            });
        };

        ArticleService.prototype.deleteCategory = function deleteCategory(categoryId) {
            var _this12 = this;

            return this.http.fetch('article/category/' + categoryId, {
                method: 'delete'
            }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                _this12.handleError(error, "deleteCategory");
            });
        };

        ArticleService.prototype.handleError = function handleError(error, source) {
            var exception = {
                source: "ArticleService->" + source,
                exception: error
            };
            this.eventAggregator.publish('GeneralExceptions', exception);
            return error;
        };

        return ArticleService;
    }()) || _class);
});
define('services/blob-services',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BlobServices = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var BlobServices = exports.BlobServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function BlobServices(http, eventAggregator) {
            _classCallCheck(this, BlobServices);

            http.configure(function (config) {
                config.useStandardConfiguration().withBaseUrl('api/');
            });

            this.eventAggregator = eventAggregator;
            this.http = http;
        }

        BlobServices.prototype.post = function post(fileName, fileBody) {
            var _this = this;

            var payload = {
                fileName: fileName,
                fileBody: fileBody
            };

            return this.http.fetch('blob/upload', {
                method: 'post',
                body: (0, _aureliaFetchClient.json)(payload)
            }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this.handleError(error, "post");
            });
        };

        BlobServices.prototype.handleError = function handleError(error, source) {
            var exception = {
                source: "BlobServices->" + source,
                exception: error
            };
            this.eventAggregator.publish('GeneralExceptions', exception);
            return error;
        };

        return BlobServices;
    }()) || _class);
});
define('services/rule-service',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.RuleService = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var RuleService = exports.RuleService = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function RuleService(http, eventAggregator) {
            _classCallCheck(this, RuleService);

            http.configure(function (config) {
                config.useStandardConfiguration().withBaseUrl('api/');
            });

            this.eventAggregator = eventAggregator;
            this.http = http;
        }

        RuleService.prototype.getRule = function getRule(id) {
            var _this = this;

            return this.http.fetch('rule/' + id, {
                method: 'get'
            }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this.handleError(error, "getRule");
            });
        };

        RuleService.prototype.getRulesForPeriod = function getRulesForPeriod(period) {
            var _this2 = this;

            return this.http.fetch('rule/' + period + '/all', {
                method: 'get'
            }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this2.handleError(error, "getRulesForPerios");
            });
        };

        RuleService.prototype.deleteRule = function deleteRule(id) {
            var _this3 = this;

            return this.http.fetch("rule/" + id, { method: 'delete' }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this3.handleError(error, "deleteRule");
            });
        };

        RuleService.prototype.saveRule = function saveRule(rule) {
            var _this4 = this;

            return this.http.fetch("rule", {
                method: 'post',
                body: (0, _aureliaFetchClient.json)(rule)
            }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                _this4.handleError(error, "saveRule");
            });
        };

        RuleService.prototype.handleError = function handleError(error, source) {
            var exception = {
                source: "RuleService->" + source,
                exception: error
            };
            this.eventAggregator.publish('GeneralExceptions', exception);
            return error;
        };

        return RuleService;
    }()) || _class);
});
define('services/strategy-service',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.StrategyService = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var StrategyService = exports.StrategyService = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function StrategyService(http, eventAggregator) {
            _classCallCheck(this, StrategyService);

            http.configure(function (config) {
                config.useStandardConfiguration().withBaseUrl('api/');
            });

            this.eventAggregator = eventAggregator;
            this.http = http;
        }

        StrategyService.prototype.getAll = function getAll() {
            var _this = this;

            return this.http.fetch('strategy/getAll', {
                method: 'get'
            }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this.handleError(error, "getAll");
            });
        };

        StrategyService.prototype.getByUrl = function getByUrl(url) {
            var _this2 = this;

            return this.http.fetch('strategy/getByUrl/' + url, {
                method: 'get'
            }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this2.handleError(error, "getByUrl");
            });
        };

        StrategyService.prototype.getById = function getById(id) {
            var _this3 = this;

            return this.http.fetch('strategy/get/' + id, {
                method: 'get'
            }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                return _this3.handleError(error, "getById");
            });
        };

        StrategyService.prototype.update = function update(strategy) {
            var _this4 = this;

            return this.http.fetch('strategy', {
                method: 'post',
                body: (0, _aureliaFetchClient.json)(strategy)
            }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                _this4.handleError(error, "update");
            });
        };

        StrategyService.prototype.handleError = function handleError(error, source) {
            var exception = {
                source: "StrategyServices->" + source,
                exception: error
            };
            this.eventAggregator.publish('GeneralExceptions', exception);
            return exception;
        };

        StrategyService.prototype.enable = function enable(strategyId) {
            var self = this;
            return this.getById(strategyId).then(function (strategy) {
                if (strategy && strategy.deleted) {
                    strategy.deleted = false;
                    return self.update(strategy);
                }
            });
        };

        StrategyService.prototype.disable = function disable(strategyId) {
            var self = this;
            return this.getById(strategyId).then(function (strategy) {
                if (strategy && !strategy.deleted) {
                    strategy.deleted = true;
                    return self.update(strategy);
                }
            });
        };

        return StrategyService;
    }()) || _class);
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
define('strategies/edit',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../services/strategy-service', 'aurelia-validation', '../common/bootstrap-form-renderer'], function (exports, _aureliaFramework, _aureliaEventAggregator, _strategyService, _aureliaValidation, _bootstrapFormRenderer) {
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

    var Edit = exports.Edit = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _strategyService.StrategyService, "ErrorParser", _aureliaValidation.ValidationController), _dec(_class = function () {
        function Edit(eventAggregator, strategyService, errorParser, validation) {
            _classCallCheck(this, Edit);

            this.errorParser = errorParser;
            this.eventAggregator = eventAggregator;
            this.strategyService = strategyService;

            this.subscriptions = [];
            this.editMode = false;
            this.errors = [];
            this.strategy = {};

            this.validation = validation;
            this.validation.validateTrigger = _aureliaValidation.validateTrigger.change;
            this.validation.addRenderer(new _bootstrapFormRenderer.BootstrapFormRenderer());
        }

        Edit.prototype.activate = function activate(params, routeConfig, navigationInstruction) {
            var _this = this;

            var self = this;
            this.router = navigationInstruction.router;

            if (params.strategy) {

                this.strategyService.getByUrl(params.strategy).then(function (data) {
                    self.strategy = data;

                    _aureliaValidation.ValidationRules.ensure(function (u) {
                        return u.name;
                    }).required().minLength(3).ensure(function (u) {
                        return u.url;
                    }).required().minLength(3).on(self.strategy);
                }).catch(function (error) {
                    _this.handleError(error);
                });
            }
        };

        Edit.prototype.update = function update() {
            var _this2 = this;

            if (!this.strategy) {
                return;
            }

            if (this.validation.errors && this.validation.errors.length > 0) {
                return;
            }

            this.strategyService.update(this.strategy).then(function (result) {
                if (result.strategyId > 0) {
                    _this2.router.navigateToRoute("strategy-list");
                }
            }).catch(function (error) {
                return _this2.handleError(error, "update");
            });
        };

        Edit.prototype.attached = function attached() {};

        Edit.prototype.detached = function detached() {
            if (this.subscriptions.length > 0) {
                this.subscriptions.forEach(function (subscription) {
                    subscription.dispose();
                });
            }
        };

        Edit.prototype.handleError = function handleError(error) {
            var self = this;

            this.errorParser.parseError(error).then(function (errorInfo) {
                self.errors.push(errorInfo);
            });
        };

        return Edit;
    }()) || _class);
});
define('strategies/list',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../services/strategy-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _strategyService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.List = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _strategyService.StrategyService, "ErrorParser"), _dec(_class = function () {
        function List(eventAggregator, strategyService, errorParser) {
            _classCallCheck(this, List);

            this.errorParser = errorParser;
            this.eventAggregator = eventAggregator;
            this.strategyService = strategyService;
            this.subscriptions = [];
            this.editMode = false;
            this.errors = [];
            this.strategies = [];
        }

        List.prototype.activate = function activate(params, routeConfig, navigationInstruction) {
            var _this = this;

            var self = this;
            this.router = navigationInstruction.router;
            this.strategyService.getAll().then(function (data) {
                self.strategies = data;
            }).catch(function (error) {
                _this.handleError(error);
            });
        };

        List.prototype.attached = function attached() {};

        List.prototype.enable = function enable(strategy) {
            var _this2 = this;

            if (strategy && strategy.strategyId) {
                this.strategyService.enable(strategy.strategyId).then(function (data) {
                    if (data) {
                        strategy.deleted = data.deleted;
                    }
                }).catch(function (error) {
                    _this2.handleError(error);
                });
            }
        };

        List.prototype.disable = function disable(strategy) {
            var _this3 = this;

            if (strategy && strategy.strategyId) {
                this.strategyService.disable(strategy.strategyId).then(function (data) {
                    if (data) {
                        strategy.deleted = data.deleted;
                    }
                }).catch(function (error) {
                    _this3.handleError(error);
                });
            }
        };

        List.prototype.generateUrl = function generateUrl(strategy) {
            var url = "";

            if (strategy && strategy.strategyId) {
                url = this.router.generate("strategy-edit", { strategy: strategy.url });
            }
            return url;
        };

        List.prototype.detached = function detached() {
            if (this.subscriptions.length > 0) {
                this.subscriptions.forEach(function (subscription) {
                    subscription.dispose();
                });
            }
        };

        List.prototype.handleError = function handleError(error) {
            var self = this;

            this.errorParser.parseError(error).then(function (errorInfo) {
                self.errors.push(errorInfo);
            });
        };

        return List;
    }()) || _class);
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

            config.map([{ route: ['', 'list'], moduleId: "./list", name: "strategy-list", title: "Strategies", nav: true }, { route: ['create'], moduleId: "./create", name: "strategy-create", title: "Create Strategy", nav: true, auth: true }, { route: ['edit', 'edit/:strategy'], moduleId: "./edit", name: "strategy-edit", title: "Modify Strategy", nav: false, auth: true }, { route: ['rules'], moduleId: "./rules/rules", name: "manage-rules", title: "Manage Rules", nav: true, auth: true }, { route: ['rule-sets'], moduleId: "./rules/rule-sets", name: "manage-rule-sets", title: "Manage Rule Sets", nav: true, auth: true }]);

            this.router = router;
            this.section = config.title;
        };

        return Navigation;
    }();
});
define('studies/category',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../services/article-service', './navigation'], function (exports, _aureliaFramework, _aureliaEventAggregator, _articleService, _navigation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Category = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Category = exports.Category = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _articleService.ArticleService, _navigation.Navigation, "User"), _dec(_class = function () {
        function Category(eventAggregator, articleService, navigation, userContext) {
            _classCallCheck(this, Category);

            this.powerUser = userContext.user.isAuthenticated;
            this.eventAggregator = eventAggregator;
            this.articleService = articleService;
            this.subscriptions = [];
            this.editMode = false;
            this.navigation = navigation;
            this.article = {};
        }

        Category.prototype.activate = function activate(params, routeconfig) {
            this.articleUrl = "default";

            if (!params.category) {
                params.category = "default";
            }

            if (params.article) {
                this.articleUrl = params.article;
            }

            this.loadCategory(params.category);
        };

        Category.prototype.loadArticle = function loadArticle(categoryId, articleUrl) {
            var _this = this;

            this.articleService.getArticleByUrl(categoryId, articleUrl).then(function (result) {
                _this.article = result;
                _this.setEditMode(false);
                _this.subscribe();
            });
        };

        Category.prototype.loadArticles = function loadArticles(categoryId) {
            var _this2 = this;

            this.articleService.getArticles(categoryId).then(function (articles) {
                _this2.articles = articles;
                _this2.sortArticles();
            });
        };

        Category.prototype.loadCategory = function loadCategory(categoryUrl) {
            var _this3 = this;

            this.setEditMode(false);

            this.articleService.getCategory(categoryUrl).then(function (category) {
                _this3.category = category;

                if (_this3.category && _this3.category.categoryId > 0) {
                    _this3.navigation.selectMenuItem(category.url);

                    _this3.loadArticle(_this3.category.categoryId, _this3.articleUrl);
                    _this3.loadArticles(_this3.category.categoryId);
                }
            });
        };

        Category.prototype.getArticleUrl = function getArticleUrl(article) {
            return '/' + this.navigation.section.url + '/' + this.category.url + '/' + article.url;
        };

        Category.prototype.setEditMode = function setEditMode(editMode) {
            this.editMode = editMode;
            this.navigation.menu.editMode = editMode;
        };

        Category.prototype.getUrl = function getUrl(menuItem) {
            return '' + this.menu.section.url + '/' + menuItem.url;
        };

        Category.prototype.startEdit = function startEdit(flag) {
            if (this.article && this.article.articleId) {
                this.eventAggregator.publish('start-edit-article-' + this.article.articleId, true);
            }

            this.setEditMode(true);
        };

        Category.prototype.cancelEdit = function cancelEdit(flag) {
            if (this.article && this.article.articleId) {
                this.eventAggregator.publish('cancel-edit-article-' + this.article.articleId, true);
            }

            this.setEditMode(false);
        };

        Category.prototype.saveArticle = function saveArticle(flag) {

            if (this.article && this.article.articleId) {
                this.eventAggregator.publish('save-article-' + this.article.articleId, true);
            }
        };

        Category.prototype.onArticleSaved = function onArticleSaved(flag) {
            if (flag) {
                this.setEditMode(false);

                if (this.articles) {
                    this.articles.forEach(function (article) {
                        if (article.changed === true) {
                            if (article.IsDeleted) {
                                self.removeArticle(article.articleId);
                            } else {
                                self.updateArticleOrder(article.articleId, article.orderId);
                            }
                        }
                    });
                }
            }
        };

        Category.prototype.addArticle = function addArticle() {
            this.article = {
                articleId: 0,
                categoryId: this.category.categoryId,
                isFeatured: false,
                isDeleted: false,
                title: "New Article",
                url: "new-article",
                orderId: this.maxOrderId(this.articles) + 1,
                blocks: []
            };
        };

        Category.prototype.deleteArticle = function deleteArticle(article) {
            article.isDeleting = true;
        };

        Category.prototype.cancelDeleteArticle = function cancelDeleteArticle(article) {
            article.isDeleting = false;
        };

        Category.prototype.confirmDeleteArticle = function confirmDeleteArticle(article) {
            article.IsDeleted = true;
        };

        Category.prototype.removeArticle = function removeArticle(articleId) {
            this.articleService.deleteArticle(articleId).then(function (response) {});
        };

        Category.prototype.updateArticleOrder = function updateArticleOrder(articleId, orderId) {
            this.articleService.updateArticleOrder(articleId, orderId).then(function (response) {});
        };

        Category.prototype.moveUpArticle = function moveUpArticle(article) {
            var order = article.orderId - 1;
            var up = this.articles.find(function (x) {
                return x.orderId === order;
            });

            if (up && up.orderId === order) {
                up.orderId = article.orderId;
                up.changed = true;
                article.orderId = order;
                article.changed = true;

                this.sortArticles();
            }
        };

        Category.prototype.moveDownArticle = function moveDownArticle(article) {
            var order = article.orderId + 1;
            var down = this.articles.find(function (x) {
                return x.orderId === order;
            });

            if (down && down.orderId === order) {
                down.orderId = article.orderId;
                down.changed = true;
                article.orderId = order;
                article.changed = true;

                this.sortArticles();
            }
        };

        Category.prototype.sortArticles = function sortArticles() {
            if (this.articles) {
                this.sortedArticles = this.articles.filter(function (item) {
                    return item.isDeleted !== true;
                }).slice(0).sort(function (a, b) {
                    return a['orderId'] - b['orderId'];
                });
            }
        };

        Category.prototype.subscribe = function subscribe() {
            var _this4 = this;

            if (this.article && this.article.articleId) {
                this.unsubscribe();

                this.subscriptions.push(this.eventAggregator.subscribe('article-saved-' + this.article.articleId, function (flag) {
                    return _this4.onArticleSaved(flag);
                }));
            }
        };

        Category.prototype.unsubscribe = function unsubscribe() {
            if (this.subscriptions.length > 0) {
                this.subscriptions.forEach(function (subscription) {
                    subscription.dispose();
                });
            }
        };

        Category.prototype.detached = function detached() {
            this.unsubscribe();
        };

        return Category;
    }()) || _class);
});
define('studies/navigation',["exports", "aurelia-framework", "../services/article-service"], function (exports, _aureliaFramework, _articleService) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Navigation = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Navigation = exports.Navigation = (_dec = (0, _aureliaFramework.inject)(_articleService.ArticleService, "Settings"), _dec(_class = function () {
        function Navigation(articleService, settings) {
            _classCallCheck(this, Navigation);

            this.articleService = articleService;
            this.settings = settings;
            this.section = this.settings.getStudiesSection();
            this.menus = [];

            this.menu = {
                editMode: false,
                section: this.section,
                editModeUrl: ''
            };

            this.loadCategories(this.section.sectionId);
        }

        Navigation.prototype.loadCategories = function loadCategories(sectionId) {
            var _this = this;

            this.articleService.getCategories(sectionId).then(function (categories) {
                _this.menu.items = categories;
                _this.menus.push(_this.menu);
            });
        };

        Navigation.prototype.configureRouter = function configureRouter(config, router) {
            config.title = this.section.Title;

            config.map([{ route: ['', ':category', ':category/:article'], moduleId: "./category", name: "category" }]);

            this.router = router;
        };

        Navigation.prototype.selectMenuItem = function selectMenuItem(categoryUrl) {
            if (this.menu && this.menu.items) {
                this.menu.items.forEach(function (item) {
                    item.isActive = item.url === categoryUrl;
                });
            }
        };

        return Navigation;
    }()) || _class);
});
define('resources/attributes/first-letter-span',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FirstLetterSpan = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _dec2, _class;

    var FirstLetterSpan = exports.FirstLetterSpan = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.customAttribute)('first-letter-span'), _dec(_class = _dec2(_class = function () {
        function FirstLetterSpan(element) {
            _classCallCheck(this, FirstLetterSpan);

            this.element = element;
            if (this.element.childElementCount === 0) {
                this.wrapFirstLetterInSpan();
            }
        }

        FirstLetterSpan.prototype.wrapFirstLetterInSpan = function wrapFirstLetterInSpan() {
            var text = this.element.innerText;
            var transformed = text.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            transformed = transformed.replace(/\b([a-z])/gi, '<span>$1</span>');
            this.element.innerHTML = transformed;
        };

        return FirstLetterSpan;
    }()) || _class) || _class);
});
define('strategies/rules/rule-sets',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../services/rule-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _ruleService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.RuleSets = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var RuleSets = exports.RuleSets = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _ruleService.RuleService, "ErrorParser"), _dec(_class = function RuleSets(eventAggregator, strategyService, errorParser) {
        _classCallCheck(this, RuleSets);

        this.errorParser = errorParser;
        this.eventAggregator = eventAggregator;
        this.strategyService = strategyService;
        this.subscriptions = [];
        this.errors = [];
        this.ruleSets = [];
    }) || _class);
});
define('strategies/rules/rules',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../services/rule-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _ruleService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Rules = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Rules = exports.Rules = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _ruleService.RuleService, "ErrorParser"), _dec(_class = function () {
        function Rules(eventAggregator, ruleService, errorParser) {
            _classCallCheck(this, Rules);

            this.errorParser = errorParser;
            this.eventAggregator = eventAggregator;
            this.ruleService = ruleService;
            this.subscriptions = [];
            this.errors = [];
            this.rules = [];

            this.period = 0;
        }

        Rules.prototype.activate = function activate(params, routeconfig) {

            if (params.period) {
                this.period = params.period;
            }

            this.loadRules(this.period);
        };

        Rules.prototype.loadRules = function loadRules(period) {
            var _this = this;

            this.ruleService.getRulesForPeriod(period).then(function (result) {
                _this.rules = result;
            }).catch(function (error) {
                return _this.handleError(error, "update");
            });
        };

        Rules.prototype.handleError = function handleError(error) {
            var self = this;

            this.errorParser.parseError(error).then(function (errorInfo) {
                self.errors.push(errorInfo);
            });
        };

        return Rules;
    }()) || _class);
});
define('strategies/rules/strategy-rules',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../services/strategy-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _strategyService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.StrategyRules = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var StrategyRules = exports.StrategyRules = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _strategyService.StrategyService, "ErrorParser"), _dec(_class = function StrategyRules(eventAggregator, strategyService, errorParser) {
        _classCallCheck(this, StrategyRules);

        this.errorParser = errorParser;
        this.eventAggregator = eventAggregator;
        this.strategyService = strategyService;
        this.subscriptions = [];
        this.errors = [];
        this.rules = [];
    }) || _class);
});
define('resources/elements/article/article-block',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ArticleBlock = undefined;

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

    var ArticleBlock = exports.ArticleBlock = (_class = function ArticleBlock() {
        _classCallCheck(this, ArticleBlock);

        _initDefineProp(this, 'block', _descriptor, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'block', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class);
});
define('resources/elements/article/article',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../../services/article-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _articleService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Article = undefined;

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

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var Article = exports.Article = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _articleService.ArticleService, "User"), _dec(_class = (_class2 = function () {
        function Article(eventAggregator, articleService, userContext) {
            _classCallCheck(this, Article);

            _initDefineProp(this, 'article', _descriptor, this);

            this.powerUser = userContext.user.isAuthenticated;
            this.eventAggregator = eventAggregator;
            this.articleService = articleService;
            this.subscriptions = [];
            this.editMode = false;
            this.article = {};
        }

        Article.prototype.articleChanged = function articleChanged(article) {
            if (article && article.articleId) {
                this.article = article;
                this.subscribe();
                this.setEditMode(false);
            }
        };

        Article.prototype.sort = function sort(article) {
            if (article && article.blocks) {
                var sortedBlocks = article.blocks.filter(function (item) {
                    return item.deleted !== true;
                }).slice(0).sort(function (a, b) {
                    return a['orderId'] - b['orderId'];
                });
                article.blocks = sortedBlocks;
            }
        };

        Article.prototype.startEdit = function startEdit(flag) {
            this.originalArticle = Object.assign({}, this.article);
            this.setEditMode(true);
        };

        Article.prototype.cancelEdit = function cancelEdit(flag) {
            this.article = this.originalArticle;
            this.setEditMode(false);
        };

        Article.prototype.saveArticle = function saveArticle(flag) {
            var _this = this;

            var isEditing = false;
            var self = this;

            this.article.blocks.forEach(function (block) {
                if (block.isEditing === true) {
                    isEditing = true;
                }
            });

            if (isEditing !== true) {
                this.articleService.saveArticle(this.article).then(function (response) {
                    _this.eventAggregator.publish('article-saved-' + response.articleId, true);
                    _this.setEditMode(false);
                }).catch(function (error) {
                    _this.eventAggregator.publish('article-saved-' + response.articleId, false);
                });
            } else {
                alert("Some block are in edit mode. Apply changes to those blocks first.");
            }
        };

        Article.prototype.setEditMode = function setEditMode(editMode) {
            if (this.article && this.article.articleId) {
                this.editMode = editMode;

                this.article.blocks.forEach(function (block) {
                    block.editMode = editMode;
                    if (editMode !== true) {
                        block.isEditing = false;
                    }
                });
            }
        };

        Article.prototype.addBlock = function addBlock() {
            if (!this.article.blocks) {
                this.article.blocks = [];
            }

            var block = {
                isNew: true,
                BlockId: this.maxBlockId(this.article.blocks) + 1,
                OrderId: this.maxOrderId(this.article.blocks) + 1,

                Text: ''
            };

            this.article.blocks.push(block);
        };

        Article.prototype.moveBlockUp = function moveBlockUp(block) {
            var order = block.orderId - 1;
            var up = this.article.blocks.find(function (x) {
                return x.orderId === order;
            });
            if (up && up.orderId === order) {
                up.orderId = block.orderId;
                block.orderId = order;

                this.sort(this.article);
            }
        };

        Article.prototype.moveBlockDown = function moveBlockDown(block) {
            var order = block.orderId + 1;
            var down = this.article.blocks.find(function (x) {
                return x.orderId === order;
            });
            if (down && down.orderId === order) {
                down.orderId = block.orderId;
                block.orderId = order;

                this.sort(this.article);
            }
        };

        Article.prototype.maxOrderId = function maxOrderId(list) {
            var max = 0;
            list.forEach(function (item) {
                if (max < item.orderId) {
                    max = item.orderId;
                }
            });
            return max;
        };

        Article.prototype.maxBlockId = function maxBlockId(list) {
            var max = 0;
            list.forEach(function (item) {
                if (max < item.blockId) {
                    max = item.blockId;
                }
            });
            return max;
        };

        Article.prototype.subscribe = function subscribe() {
            var _this2 = this;

            this.unsubscribe();

            if (this.article && this.article.articleId) {

                this.subscriptions.push(this.eventAggregator.subscribe('start-edit-article-' + this.article.articleId, function (flag) {
                    return _this2.startEdit(flag);
                }));

                this.subscriptions.push(this.eventAggregator.subscribe('cancel-edit-article-' + this.article.articleId, function (flag) {
                    return _this2.cancelEdit(flag);
                }));

                this.subscriptions.push(this.eventAggregator.subscribe('save-article-' + this.article.articleId, function (flag) {
                    return _this2.saveArticle(flag);
                }));

                this.subscriptions.push(this.eventAggregator.subscribe('move-block-up', function (block) {
                    return _this2.moveBlockUp(block);
                }));

                this.subscriptions.push(this.eventAggregator.subscribe('move-block-down', function (block) {
                    return _this2.moveBlockDown(block);
                }));

                this.subscriptions.push(this.eventAggregator.subscribe('delete-block', function (block) {
                    return _this2.sort();
                }));
            }
        };

        Article.prototype.detached = function detached() {
            this.unsubscribe();
        };

        Article.prototype.unsubscribe = function unsubscribe() {
            if (this.subscriptions.length > 0) {
                this.subscriptions.forEach(function (subscription) {
                    subscription.dispose();
                });
            }
        };

        return Article;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'article', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/elements/article/block-actions',['exports', 'aurelia-event-aggregator', 'aurelia-framework'], function (exports, _aureliaEventAggregator, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BlockActions = undefined;

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

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var BlockActions = exports.BlockActions = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
        function BlockActions(eventAggregator) {
            _classCallCheck(this, BlockActions);

            _initDefineProp(this, 'block', _descriptor, this);

            this.eventAggregator = eventAggregator;
            this.subscriptions = [];
            this.moveBlockUpChannel = 'move-block-up';
            this.moveBlockDownChannel = 'move-block-down';
        }

        BlockActions.prototype.blockChanged = function blockChanged(newValue, oldValue) {
            if (this.requiresAction()) {}
        };

        BlockActions.prototype.startEditing = function startEditing() {
            this.block.isEditing = true;
        };

        BlockActions.prototype.startDeleting = function startDeleting() {
            this.block.isDeleting = true;
        };

        BlockActions.prototype.cancelEditing = function cancelEditing() {
            this.block.isEditing = false;
            this.block.isDeleting = false;
        };

        BlockActions.prototype.addBlock = function addBlock() {
            if (this.block.BlockType !== 'Select') {
                this.block.isNew = false;
                this.block.isEditing = true;
            }
        };

        BlockActions.prototype.deleteBlock = function deleteBlock() {
            this.block.deleted = true;
            this.block.isDeleting = false;

            var blockDeletedChannel = 'delete-block';
            this.eventAggregator.publish(blockDeletedChannel, this.block);
        };

        BlockActions.prototype.applyChanges = function applyChanges() {
            if (this.requiresAction()) {
                var channel = 'article-block-' + this.block.BlockId;
                this.eventAggregator.publish(channel, true);
            } else {
                this.block.isEditing = false;
            }
        };

        BlockActions.prototype.requiresAction = function requiresAction() {
            return this.block.Items || this.block.BlockType === 'Image' || this.block.BlockType === 'OrderedList';
        };

        BlockActions.prototype.moveUp = function moveUp() {
            this.eventAggregator.publish(this.moveBlockUpChannel, this.block);
        };

        BlockActions.prototype.moveDown = function moveDown() {
            this.eventAggregator.publish(this.moveBlockDownChannel, this.block);
        };

        return BlockActions;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'block', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/elements/article/heading-block',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.HeadingBlock = undefined;

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

    var HeadingBlock = exports.HeadingBlock = (_class = function HeadingBlock() {
        _classCallCheck(this, HeadingBlock);

        _initDefineProp(this, 'block', _descriptor, this);

        this.headingTypes = ['H1', 'H2', 'H3', 'H4', 'H5'];
    }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'block', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class);
});
define('resources/elements/article/image-block',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../../services/blob-services', 'jquery'], function (exports, _aureliaFramework, _aureliaEventAggregator, _blobServices, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FileListToArrayValueConverter = exports.BlobToUrlValueConverter = exports.ImageBlock = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var ImageBlock = exports.ImageBlock = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _blobServices.BlobServices), _dec(_class = (_class2 = function () {
        function ImageBlock(eventAggregator, blobServices) {
            _classCallCheck(this, ImageBlock);

            _initDefineProp(this, 'block', _descriptor, this);

            this.eventAggregator = eventAggregator;
            this.blobServices = blobServices;
            this.selectedFiles = [];
            this.subscriptions = [];
            this.image = [];
            this.subscribed = false;
        }

        ImageBlock.prototype.blockChanged = function blockChanged(newValue, oldValue) {
            if (this.isValidBlock()) {
                this.subscribe();
            }
        };

        ImageBlock.prototype.subscribe = function subscribe() {
            var _this = this;

            if (this.subscribed !== true) {
                this.channel = 'article-block-' + this.block.BlockId;
                this.subscriptions.push(this.eventAggregator.subscribe(this.channel, function (update) {
                    return _this.updateBlock(update);
                }));
                this.subscribed = true;
            }
        };

        ImageBlock.prototype.updateBlock = function updateBlock(update) {
            var _this2 = this;

            if (this.isValidBlock()) {

                if (this.selectedFiles.length > 0) {
                    (function () {
                        var reader = new FileReader();
                        var file = _this2.selectedFiles.item(0);
                        var self = _this2;
                        reader.addEventListener("loadend", function () {
                            var _this3 = this;

                            if (reader.readyState === 2) {
                                self.blobServices.post(file.name, reader.result).then(function (imageUrl) {
                                    self.block.ImageUrl = imageUrl;
                                    self.block.isEditing = false;
                                }).catch(function (error) {
                                    return _this3.handleError(error, "updateBlock");
                                });
                            }
                        });
                        reader.readAsDataURL(file);
                    })();
                }
            }
        };

        ImageBlock.prototype.isValidBlock = function isValidBlock() {
            return this.block.BlockType === 'Image';
        };

        ImageBlock.prototype.blobToUrl = function blobToUrl(blob) {
            this.subscribe();
            return URL.createObjectURL(blob);
        };

        ImageBlock.prototype.handleError = function handleError(error, source) {
            var exception = {
                source: "ImageBlock->" + source,
                exception: error
            };
            this.eventAggregator.publish('GeneralExceptions', exception);
            return error;
        };

        return ImageBlock;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'block', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);

    var BlobToUrlValueConverter = exports.BlobToUrlValueConverter = function () {
        function BlobToUrlValueConverter() {
            _classCallCheck(this, BlobToUrlValueConverter);
        }

        BlobToUrlValueConverter.prototype.toView = function toView(blob) {
            this.imageUrl = URL.createObjectURL(blob);
            return this.imageUrl;
        };

        return BlobToUrlValueConverter;
    }();

    var FileListToArrayValueConverter = exports.FileListToArrayValueConverter = function () {
        function FileListToArrayValueConverter() {
            _classCallCheck(this, FileListToArrayValueConverter);
        }

        FileListToArrayValueConverter.prototype.toView = function toView(fileList) {
            var files = [];
            if (!fileList) {
                return files;
            }
            for (var i = 0; i < fileList.length; i++) {
                files.push(fileList.item(i));
            }
            return files;
        };

        return FileListToArrayValueConverter;
    }();
});
define('resources/elements/article/index',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;
    function configure(config) {
        config.globalResources('./article', './article-block', './heading-block', './paragraph-block', './image-block', './ordered-list-block', './block-actions', './new-block');
    }
});
define('resources/elements/article/new-block',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NewBlock = undefined;

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

    var NewBlock = exports.NewBlock = (_class = function NewBlock() {
        _classCallCheck(this, NewBlock);

        _initDefineProp(this, 'block', _descriptor, this);

        this.blockTypes = ['Heading', 'Image', 'OrderedList', 'Paragraph'];
    }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'block', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class);
});
define('resources/elements/article/ordered-list-block',['exports', 'aurelia-event-aggregator', 'aurelia-framework', 'jquery'], function (exports, _aureliaEventAggregator, _aureliaFramework, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.OrderedListBlock = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var OrderedListBlock = exports.OrderedListBlock = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
        function OrderedListBlock(eventAggregator) {
            _classCallCheck(this, OrderedListBlock);

            _initDefineProp(this, 'block', _descriptor, this);

            this.eventAggregator = eventAggregator;
            this.subscriptions = [];
            this.subscribed = false;
        }

        OrderedListBlock.prototype.blockChanged = function blockChanged(newValue, oldValue) {
            if (this.isValidBlock()) {
                this.subscribe();
            }
        };

        OrderedListBlock.prototype.subscribe = function subscribe() {
            var _this = this;

            this.channel = 'article-block-' + this.block.BlockId;
            this.subscriptions.push(this.eventAggregator.subscribe(this.channel, function (update) {
                return _this.updateBlock(update);
            }));
            this.subscribed = true;
        };

        OrderedListBlock.prototype.updateBlock = function updateBlock(update) {
            var _this2 = this;

            if (this.isValidBlock()) {
                (function () {
                    var block = _this2.block;
                    var items = [];

                    var blockId = _this2.block.BlockId;
                    var index = 0;

                    _this2.block.Items.forEach(function (item) {
                        var id = blockId + '-' + index;
                        items.push((0, _jquery2.default)('#' + id).val());
                        index++;
                    });

                    block.Items = items;

                    block.isEditing = false;
                })();
            }
        };

        OrderedListBlock.prototype.appendItem = function appendItem() {
            if (this.isValidBlock()) {
                if (!this.block.Items) {
                    this.block.Items = [];
                    if (this.subscribed !== true) {
                        this.subscribe();
                    }
                }
                this.block.Items.push('');
            }
        };

        OrderedListBlock.prototype.deleteItem = function deleteItem(pos) {
            if (this.isValidBlock()) {
                this.block.Items.splice(pos, 1);
            }
        };

        OrderedListBlock.prototype.detached = function detached() {
            this.subscriptions.forEach(function (subscription) {
                subscription.dispose();
            });
        };

        OrderedListBlock.prototype.isValidBlock = function isValidBlock() {
            return this.block.BlockType === 'OrderedList';
        };

        return OrderedListBlock;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'block', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/elements/article/paragraph-block',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ParagraphBlock = undefined;

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

    var ParagraphBlock = exports.ParagraphBlock = (_class = function ParagraphBlock() {
        _classCallCheck(this, ParagraphBlock);

        _initDefineProp(this, 'block', _descriptor, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'block', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class);
});
define('resources/elements/chart/any-chart',['exports', 'aurelia-framework', 'npm-anystock'], function (exports, _aureliaFramework) {
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
define('resources/elements/navigation/main-nav',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MainNav = undefined;

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

    var MainNav = exports.MainNav = (_class = function MainNav() {
        _classCallCheck(this, MainNav);

        _initDefineProp(this, "router", _descriptor, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "router", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class);
});
define('resources/elements/navigation/nav-header',["exports", "aurelia-framework", "aurelia-event-aggregator"], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NavHeader = undefined;

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

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var NavHeader = exports.NavHeader = (_dec = (0, _aureliaFramework.inject)("User", "Settings", _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
        function NavHeader(userContext, settings, eventAggregator) {
            _classCallCheck(this, NavHeader);

            _initDefineProp(this, "router", _descriptor, this);

            this.userContext = userContext;
            this.eventAggregator = eventAggregator;
            this.settings = settings;
        }

        NavHeader.prototype.routerChanged = function routerChanged(newValue, oldVlalue) {
            this.router = newValue;
        };

        NavHeader.prototype.attached = function attached() {
            this.isAuthenticated = this.userContext.user.isAuthenticated;
            this.loginUrl = this.router.generate("account") + '/view';
        };

        NavHeader.prototype.logout = function logout() {
            var _this = this;

            this.userContext.logout().then(function (result) {
                window.location.href = '/';
            }).catch(function (error) {
                return _this.handleError(error, "logout");
            });
        };

        NavHeader.prototype.handleError = function handleError(error, source) {
            var exception = {
                source: "NavHeader->" + source,
                exception: error
            };
            this.eventAggregator.publish('GeneralExceptions', exception);
            return error;
        };

        return NavHeader;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "router", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class);
});
define('resources/elements/navigation/sub-nav',["exports", "aurelia-framework", "aurelia-event-aggregator"], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.SubNav = undefined;

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

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var SubNav = exports.SubNav = (_dec = (0, _aureliaFramework.inject)("User", _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
        function SubNav(userContext, eventAggregator) {
            _classCallCheck(this, SubNav);

            _initDefineProp(this, "router", _descriptor, this);

            this.powerUser = userContext.user.isAuthenticated;
            this.eventAggregator = eventAggregator;
            this.subscriptions = [];
        }

        SubNav.prototype.actionsChanged = function actionsChanged(newValue) {};

        SubNav.prototype.publishEvent = function publishEvent(channel, params) {
            this.eventAggregator.publish(channel, params);
        };

        SubNav.prototype.attached = function attached() {};

        SubNav.prototype.detached = function detached() {
            if (this.subscriptions.length > 0) {
                this.subscriptions.forEach(function (subscription) {
                    subscription.dispose();
                });
            }
        };

        return SubNav;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "router", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/elements/rule/rule',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../../services/rule-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _ruleService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Rule = undefined;

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

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var Rule = exports.Rule = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _ruleService.RuleService, "User"), _dec(_class = (_class2 = function () {
        function Rule(eventAggregator, ruleService, userContext) {
            _classCallCheck(this, Rule);

            _initDefineProp(this, 'rule', _descriptor, this);

            this.powerUser = userContext.user.isAuthenticated;
            this.eventAggregator = eventAggregator;
            this.ruleService = ruleService;
            this.subscriptions = [];
            this.rule = { editMode: false, deleteMode: false };

            this.periods = [{ id: 0, name: 'Daily' }, { id: 1, name: 'Weekly' }];

            this.compareTypes = [{ id: 0, name: 'Greater' }, { id: 1, name: 'Greater or Equal' }, { id: 2, name: 'Equal' }, { id: 3, name: 'Less' }, { id: 4, name: 'Less or Equal' }, { id: 4, name: 'Not Equal' }];

            this.dataSources = [{ id: 0, name: 'Indicator' }, { id: 1, name: 'Historical Data' }, { id: 2, name: 'Constant' }];

            this.priceDataSeries = [{ id: 0, name: 'Close' }, { id: 1, name: 'Open' }, { id: 2, name: 'High' }, { id: 3, name: 'Low' }];

            this.indicatorDataSeries = [{ id: 0, name: 'EMA (13) Daily' }, { id: 1, name: 'EMA (26) Daily' }];

            this.transformFunctions = [{ id: 0, name: 'First' }, { id: 1, name: 'Max' }, { id: 2, name: 'Average' }, { id: 3, name: 'Summarize' }];
        }

        Rule.prototype.ruleChanged = function ruleChanged(rule) {
            if (rule) {
                this.rule = rule;

                this.rule.editMode = false;
                this.rule.deleteMode = false;
                this.rule.viewMode = false;
            }
        };

        Rule.prototype.startEdit = function startEdit() {
            this.originalRule = Object.assign({}, this.rule);
            this.rule.editMode = true;
            this.rule.deleteMode = false;
            this.rule.viewMode = false;
        };

        Rule.prototype.cancelEdit = function cancelEdit() {
            this.rule = this.originalRule;
            this.rule.editMode = false;
            this.rule.deleteMode = false;
            this.rule.viewMode = false;
        };

        Rule.prototype.tryDelete = function tryDelete() {
            this.rule.editMode = false;
            this.rule.deleteMode = true;
            this.rule.viewMode = false;
        };

        Rule.prototype.cancelDelete = function cancelDelete() {
            this.rule.editMode = false;
            this.rule.deleteMode = false;
            this.rule.viewMode = false;
        };

        Rule.prototype.showDetails = function showDetails() {
            this.rule.viewMode = !this.rule.viewMode;
            this.rule.editMode = false;
            this.rule.deleteMode = false;
        };

        return Rule;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'rule', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('aurelia-validation/validate-binding-behavior',["require", "exports", 'aurelia-task-queue', './validate-trigger', './validate-binding-behavior-base'], function (require, exports, aurelia_task_queue_1, validate_trigger_1, validate_binding_behavior_base_1) {
    "use strict";
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the validate trigger specified by the associated controller's
     * validateTrigger property occurs.
     */
    var ValidateBindingBehavior = (function (_super) {
        __extends(ValidateBindingBehavior, _super);
        function ValidateBindingBehavior() {
            _super.apply(this, arguments);
        }
        ValidateBindingBehavior.prototype.getValidateTrigger = function (controller) {
            return controller.validateTrigger;
        };
        ValidateBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
        return ValidateBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    exports.ValidateBindingBehavior = ValidateBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property will be validated
     * manually, by calling controller.validate(). No automatic validation
     * triggered by data-entry or blur will occur.
     */
    var ValidateManuallyBindingBehavior = (function (_super) {
        __extends(ValidateManuallyBindingBehavior, _super);
        function ValidateManuallyBindingBehavior() {
            _super.apply(this, arguments);
        }
        ValidateManuallyBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.manual;
        };
        ValidateManuallyBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
        return ValidateManuallyBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    exports.ValidateManuallyBindingBehavior = ValidateManuallyBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the associated element blurs.
     */
    var ValidateOnBlurBindingBehavior = (function (_super) {
        __extends(ValidateOnBlurBindingBehavior, _super);
        function ValidateOnBlurBindingBehavior() {
            _super.apply(this, arguments);
        }
        ValidateOnBlurBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.blur;
        };
        ValidateOnBlurBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
        return ValidateOnBlurBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    exports.ValidateOnBlurBindingBehavior = ValidateOnBlurBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the associated element is changed by the user, causing a change
     * to the model.
     */
    var ValidateOnChangeBindingBehavior = (function (_super) {
        __extends(ValidateOnChangeBindingBehavior, _super);
        function ValidateOnChangeBindingBehavior() {
            _super.apply(this, arguments);
        }
        ValidateOnChangeBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.change;
        };
        ValidateOnChangeBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
        return ValidateOnChangeBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    exports.ValidateOnChangeBindingBehavior = ValidateOnChangeBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the associated element blurs or is changed by the user, causing
     * a change to the model.
     */
    var ValidateOnChangeOrBlurBindingBehavior = (function (_super) {
        __extends(ValidateOnChangeOrBlurBindingBehavior, _super);
        function ValidateOnChangeOrBlurBindingBehavior() {
            _super.apply(this, arguments);
        }
        ValidateOnChangeOrBlurBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.changeOrBlur;
        };
        ValidateOnChangeOrBlurBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
        return ValidateOnChangeOrBlurBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    exports.ValidateOnChangeOrBlurBindingBehavior = ValidateOnChangeOrBlurBindingBehavior;
});

define('aurelia-validation/validate-trigger',["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Validation triggers.
     */
    exports.validateTrigger = {
        /**
         * Manual validation.  Use the controller's `validate()` and  `reset()` methods
         * to validate all bindings.
         */
        manual: 0,
        /**
         * Validate the binding when the binding's target element fires a DOM "blur" event.
         */
        blur: 1,
        /**
         * Validate the binding when it updates the model due to a change in the view.
         */
        change: 2,
        /**
         * Validate the binding when the binding's target element fires a DOM "blur" event and
         * when it updates the model due to a change in the view.
         */
        changeOrBlur: 3
    };
});

define('aurelia-validation/validate-binding-behavior-base',["require", "exports", 'aurelia-dependency-injection', 'aurelia-pal', './validation-controller', './validate-trigger'], function (require, exports, aurelia_dependency_injection_1, aurelia_pal_1, validation_controller_1, validate_trigger_1) {
    "use strict";
    /**
     * Binding behavior. Indicates the bound property should be validated.
     */
    var ValidateBindingBehaviorBase = (function () {
        function ValidateBindingBehaviorBase(taskQueue) {
            this.taskQueue = taskQueue;
        }
        /**
         * Gets the DOM element associated with the data-binding. Most of the time it's
         * the binding.target but sometimes binding.target is an aurelia custom element,
         * or custom attribute which is a javascript "class" instance, so we need to use
         * the controller's container to retrieve the actual DOM element.
         */
        ValidateBindingBehaviorBase.prototype.getTarget = function (binding, view) {
            var target = binding.target;
            // DOM element
            if (target instanceof Element) {
                return target;
            }
            // custom element or custom attribute
            for (var i = 0, ii = view.controllers.length; i < ii; i++) {
                var controller = view.controllers[i];
                if (controller.viewModel === target) {
                    var element = controller.container.get(aurelia_pal_1.DOM.Element);
                    if (element) {
                        return element;
                    }
                    throw new Error("Unable to locate target element for \"" + binding.sourceExpression + "\".");
                }
            }
            throw new Error("Unable to locate target element for \"" + binding.sourceExpression + "\".");
        };
        ValidateBindingBehaviorBase.prototype.bind = function (binding, source, rulesOrController, rules) {
            var _this = this;
            // identify the target element.
            var target = this.getTarget(binding, source);
            // locate the controller.
            var controller;
            if (rulesOrController instanceof validation_controller_1.ValidationController) {
                controller = rulesOrController;
            }
            else {
                controller = source.container.get(aurelia_dependency_injection_1.Optional.of(validation_controller_1.ValidationController));
                rules = rulesOrController;
            }
            if (controller === null) {
                throw new Error("A ValidationController has not been registered.");
            }
            controller.registerBinding(binding, target, rules);
            binding.validationController = controller;
            var trigger = this.getValidateTrigger(controller);
            /* tslint:disable:no-bitwise */
            if (trigger & validate_trigger_1.validateTrigger.change) {
                /* tslint:enable:no-bitwise */
                binding.standardUpdateSource = binding.updateSource;
                /* tslint:disable:only-arrow-functions */
                binding.updateSource = function (value) {
                    /* tslint:enable:only-arrow-functions */
                    this.standardUpdateSource(value);
                    this.validationController.validateBinding(this);
                };
            }
            /* tslint:disable:no-bitwise */
            if (trigger & validate_trigger_1.validateTrigger.blur) {
                /* tslint:enable:no-bitwise */
                binding.validateBlurHandler = function () {
                    _this.taskQueue.queueMicroTask(function () { return controller.validateBinding(binding); });
                };
                binding.validateTarget = target;
                target.addEventListener('blur', binding.validateBlurHandler);
            }
            if (trigger !== validate_trigger_1.validateTrigger.manual) {
                binding.standardUpdateTarget = binding.updateTarget;
                /* tslint:disable:only-arrow-functions */
                binding.updateTarget = function (value) {
                    /* tslint:enable:only-arrow-functions */
                    this.standardUpdateTarget(value);
                    this.validationController.resetBinding(this);
                };
            }
        };
        ValidateBindingBehaviorBase.prototype.unbind = function (binding) {
            // reset the binding to it's original state.
            if (binding.standardUpdateSource) {
                binding.updateSource = binding.standardUpdateSource;
                binding.standardUpdateSource = null;
            }
            if (binding.standardUpdateTarget) {
                binding.updateTarget = binding.standardUpdateTarget;
                binding.standardUpdateTarget = null;
            }
            if (binding.validateBlurHandler) {
                binding.validateTarget.removeEventListener('blur', binding.validateBlurHandler);
                binding.validateBlurHandler = null;
                binding.validateTarget = null;
            }
            binding.validationController.unregisterBinding(binding);
            binding.validationController = null;
        };
        return ValidateBindingBehaviorBase;
    }());
    exports.ValidateBindingBehaviorBase = ValidateBindingBehaviorBase;
});

define('aurelia-validation/validation-controller',["require", "exports", './validator', './validate-trigger', './property-info', './validation-error'], function (require, exports, validator_1, validate_trigger_1, property_info_1, validation_error_1) {
    "use strict";
    /**
     * Orchestrates validation.
     * Manages a set of bindings, renderers and objects.
     * Exposes the current list of validation errors for binding purposes.
     */
    var ValidationController = (function () {
        function ValidationController(validator) {
            this.validator = validator;
            // Registered bindings (via the validate binding behavior)
            this.bindings = new Map();
            // Renderers that have been added to the controller instance.
            this.renderers = [];
            /**
             * Errors that have been rendered by the controller.
             */
            this.errors = [];
            /**
             *  Whether the controller is currently validating.
             */
            this.validating = false;
            // Elements related to errors that have been rendered.
            this.elements = new Map();
            // Objects that have been added to the controller instance (entity-style validation).
            this.objects = new Map();
            /**
             * The trigger that will invoke automatic validation of a property used in a binding.
             */
            this.validateTrigger = validate_trigger_1.validateTrigger.blur;
            // Promise that resolves when validation has completed.
            this.finishValidating = Promise.resolve();
        }
        /**
         * Adds an object to the set of objects that should be validated when validate is called.
         * @param object The object.
         * @param rules Optional. The rules. If rules aren't supplied the Validator implementation will lookup the rules.
         */
        ValidationController.prototype.addObject = function (object, rules) {
            this.objects.set(object, rules);
        };
        /**
         * Removes an object from the set of objects that should be validated when validate is called.
         * @param object The object.
         */
        ValidationController.prototype.removeObject = function (object) {
            this.objects.delete(object);
            this.processErrorDelta('reset', this.errors.filter(function (error) { return error.object === object; }), []);
        };
        /**
         * Adds and renders a ValidationError.
         */
        ValidationController.prototype.addError = function (message, object, propertyName) {
            var error = new validation_error_1.ValidationError({}, message, object, propertyName);
            this.processErrorDelta('validate', [], [error]);
            return error;
        };
        /**
         * Removes and unrenders a ValidationError.
         */
        ValidationController.prototype.removeError = function (error) {
            if (this.errors.indexOf(error) !== -1) {
                this.processErrorDelta('reset', [error], []);
            }
        };
        /**
         * Adds a renderer.
         * @param renderer The renderer.
         */
        ValidationController.prototype.addRenderer = function (renderer) {
            var _this = this;
            this.renderers.push(renderer);
            renderer.render({
                kind: 'validate',
                render: this.errors.map(function (error) { return ({ error: error, elements: _this.elements.get(error) }); }),
                unrender: []
            });
        };
        /**
         * Removes a renderer.
         * @param renderer The renderer.
         */
        ValidationController.prototype.removeRenderer = function (renderer) {
            var _this = this;
            this.renderers.splice(this.renderers.indexOf(renderer), 1);
            renderer.render({
                kind: 'reset',
                render: [],
                unrender: this.errors.map(function (error) { return ({ error: error, elements: _this.elements.get(error) }); })
            });
        };
        /**
         * Registers a binding with the controller.
         * @param binding The binding instance.
         * @param target The DOM element.
         * @param rules (optional) rules associated with the binding. Validator implementation specific.
         */
        ValidationController.prototype.registerBinding = function (binding, target, rules) {
            this.bindings.set(binding, { target: target, rules: rules, propertyInfo: null });
        };
        /**
         * Unregisters a binding with the controller.
         * @param binding The binding instance.
         */
        ValidationController.prototype.unregisterBinding = function (binding) {
            this.resetBinding(binding);
            this.bindings.delete(binding);
        };
        /**
         * Interprets the instruction and returns a predicate that will identify
         * relevant errors in the list of rendered errors.
         */
        ValidationController.prototype.getInstructionPredicate = function (instruction) {
            var _this = this;
            if (instruction) {
                var object_1 = instruction.object, propertyName_1 = instruction.propertyName, rules_1 = instruction.rules;
                var predicate_1;
                if (instruction.propertyName) {
                    predicate_1 = function (x) { return x.object === object_1 && x.propertyName === propertyName_1; };
                }
                else {
                    predicate_1 = function (x) { return x.object === object_1; };
                }
                if (rules_1) {
                    return function (x) { return predicate_1(x) && _this.validator.ruleExists(rules_1, x.rule); };
                }
                return predicate_1;
            }
            else {
                return function () { return true; };
            }
        };
        /**
         * Validates and renders errors.
         * @param instruction Optional. Instructions on what to validate. If undefined, all
         * objects and bindings will be validated.
         */
        ValidationController.prototype.validate = function (instruction) {
            var _this = this;
            // Get a function that will process the validation instruction.
            var execute;
            if (instruction) {
                var object_2 = instruction.object, propertyName_2 = instruction.propertyName, rules_2 = instruction.rules;
                // if rules were not specified, check the object map.
                rules_2 = rules_2 || this.objects.get(object_2);
                // property specified?
                if (instruction.propertyName === undefined) {
                    // validate the specified object.
                    execute = function () { return _this.validator.validateObject(object_2, rules_2); };
                }
                else {
                    // validate the specified property.
                    execute = function () { return _this.validator.validateProperty(object_2, propertyName_2, rules_2); };
                }
            }
            else {
                // validate all objects and bindings.
                execute = function () {
                    var promises = [];
                    for (var _i = 0, _a = Array.from(_this.objects); _i < _a.length; _i++) {
                        var _b = _a[_i], object = _b[0], rules = _b[1];
                        promises.push(_this.validator.validateObject(object, rules));
                    }
                    for (var _c = 0, _d = Array.from(_this.bindings); _c < _d.length; _c++) {
                        var _e = _d[_c], binding = _e[0], rules = _e[1].rules;
                        var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
                        if (!propertyInfo || _this.objects.has(propertyInfo.object)) {
                            continue;
                        }
                        promises.push(_this.validator.validateProperty(propertyInfo.object, propertyInfo.propertyName, rules));
                    }
                    return Promise.all(promises).then(function (errorSets) { return errorSets.reduce(function (a, b) { return a.concat(b); }, []); });
                };
            }
            // Wait for any existing validation to finish, execute the instruction, render the errors.
            this.validating = true;
            var result = this.finishValidating
                .then(execute)
                .then(function (newErrors) {
                var predicate = _this.getInstructionPredicate(instruction);
                var oldErrors = _this.errors.filter(predicate);
                _this.processErrorDelta('validate', oldErrors, newErrors);
                if (result === _this.finishValidating) {
                    _this.validating = false;
                }
                return newErrors;
            })
                .catch(function (error) {
                // recover, to enable subsequent calls to validate()
                _this.validating = false;
                _this.finishValidating = Promise.resolve();
                return Promise.reject(error);
            });
            this.finishValidating = result;
            return result;
        };
        /**
         * Resets any rendered errors (unrenders).
         * @param instruction Optional. Instructions on what to reset. If unspecified all rendered errors will be unrendered.
         */
        ValidationController.prototype.reset = function (instruction) {
            var predicate = this.getInstructionPredicate(instruction);
            var oldErrors = this.errors.filter(predicate);
            this.processErrorDelta('reset', oldErrors, []);
        };
        /**
         * Gets the elements associated with an object and propertyName (if any).
         */
        ValidationController.prototype.getAssociatedElements = function (_a) {
            var object = _a.object, propertyName = _a.propertyName;
            var elements = [];
            for (var _i = 0, _b = Array.from(this.bindings); _i < _b.length; _i++) {
                var _c = _b[_i], binding = _c[0], target = _c[1].target;
                var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
                if (propertyInfo && propertyInfo.object === object && propertyInfo.propertyName === propertyName) {
                    elements.push(target);
                }
            }
            return elements;
        };
        ValidationController.prototype.processErrorDelta = function (kind, oldErrors, newErrors) {
            // prepare the instruction.
            var instruction = {
                kind: kind,
                render: [],
                unrender: []
            };
            // create a shallow copy of newErrors so we can mutate it without causing side-effects.
            newErrors = newErrors.slice(0);
            // create unrender instructions from the old errors.
            var _loop_1 = function(oldError) {
                // get the elements associated with the old error.
                var elements = this_1.elements.get(oldError);
                // remove the old error from the element map.
                this_1.elements.delete(oldError);
                // create the unrender instruction.
                instruction.unrender.push({ error: oldError, elements: elements });
                // determine if there's a corresponding new error for the old error we are unrendering.
                var newErrorIndex = newErrors.findIndex(function (x) { return x.rule === oldError.rule && x.object === oldError.object && x.propertyName === oldError.propertyName; });
                if (newErrorIndex === -1) {
                    // no corresponding new error... simple remove.
                    this_1.errors.splice(this_1.errors.indexOf(oldError), 1);
                }
                else {
                    // there is a corresponding new error...        
                    var newError = newErrors.splice(newErrorIndex, 1)[0];
                    // get the elements that are associated with the new error.
                    var elements_1 = this_1.getAssociatedElements(newError);
                    this_1.elements.set(newError, elements_1);
                    // create a render instruction for the new error.
                    instruction.render.push({ error: newError, elements: elements_1 });
                    // do an in-place replacement of the old error with the new error.
                    // this ensures any repeats bound to this.errors will not thrash.
                    this_1.errors.splice(this_1.errors.indexOf(oldError), 1, newError);
                }
            };
            var this_1 = this;
            for (var _i = 0, oldErrors_1 = oldErrors; _i < oldErrors_1.length; _i++) {
                var oldError = oldErrors_1[_i];
                _loop_1(oldError);
            }
            // create render instructions from the remaining new errors.
            for (var _a = 0, newErrors_1 = newErrors; _a < newErrors_1.length; _a++) {
                var error = newErrors_1[_a];
                var elements = this.getAssociatedElements(error);
                instruction.render.push({ error: error, elements: elements });
                this.elements.set(error, elements);
                this.errors.push(error);
            }
            // render.
            for (var _b = 0, _c = this.renderers; _b < _c.length; _b++) {
                var renderer = _c[_b];
                renderer.render(instruction);
            }
        };
        /**
         * Validates the property associated with a binding.
         */
        ValidationController.prototype.validateBinding = function (binding) {
            if (!binding.isBound) {
                return;
            }
            var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
            var rules = undefined;
            var registeredBinding = this.bindings.get(binding);
            if (registeredBinding) {
                rules = registeredBinding.rules;
                registeredBinding.propertyInfo = propertyInfo;
            }
            if (!propertyInfo) {
                return;
            }
            var object = propertyInfo.object, propertyName = propertyInfo.propertyName;
            this.validate({ object: object, propertyName: propertyName, rules: rules });
        };
        /**
         * Resets the errors for a property associated with a binding.
         */
        ValidationController.prototype.resetBinding = function (binding) {
            var registeredBinding = this.bindings.get(binding);
            var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
            if (!propertyInfo && registeredBinding) {
                propertyInfo = registeredBinding.propertyInfo;
            }
            if (registeredBinding) {
                registeredBinding.propertyInfo = null;
            }
            if (!propertyInfo) {
                return;
            }
            var object = propertyInfo.object, propertyName = propertyInfo.propertyName;
            this.reset({ object: object, propertyName: propertyName });
        };
        ValidationController.inject = [validator_1.Validator];
        return ValidationController;
    }());
    exports.ValidationController = ValidationController;
});

define('aurelia-validation/validator',["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Validates.
     * Responsible for validating objects and properties.
     */
    var Validator = (function () {
        function Validator() {
        }
        return Validator;
    }());
    exports.Validator = Validator;
});

define('aurelia-validation/property-info',["require", "exports", 'aurelia-binding'], function (require, exports, aurelia_binding_1) {
    "use strict";
    function getObject(expression, objectExpression, source) {
        var value = objectExpression.evaluate(source, null);
        if (value === null || value === undefined || value instanceof Object) {
            return value;
        }
        /* tslint:disable */
        throw new Error("The '" + objectExpression + "' part of '" + expression + "' evaluates to " + value + " instead of an object, null or undefined.");
        /* tslint:enable */
    }
    /**
     * Retrieves the object and property name for the specified expression.
     * @param expression The expression
     * @param source The scope
     */
    function getPropertyInfo(expression, source) {
        var originalExpression = expression;
        while (expression instanceof aurelia_binding_1.BindingBehavior || expression instanceof aurelia_binding_1.ValueConverter) {
            expression = expression.expression;
        }
        var object;
        var propertyName;
        if (expression instanceof aurelia_binding_1.AccessScope) {
            object = source.bindingContext;
            propertyName = expression.name;
        }
        else if (expression instanceof aurelia_binding_1.AccessMember) {
            object = getObject(originalExpression, expression.object, source);
            propertyName = expression.name;
        }
        else if (expression instanceof aurelia_binding_1.AccessKeyed) {
            object = getObject(originalExpression, expression.object, source);
            propertyName = expression.key.evaluate(source);
        }
        else {
            throw new Error("Expression '" + originalExpression + "' is not compatible with the validate binding-behavior.");
        }
        if (object === null || object === undefined) {
            return null;
        }
        return { object: object, propertyName: propertyName };
    }
    exports.getPropertyInfo = getPropertyInfo;
});

define('aurelia-validation/validation-error',["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * A validation error.
     */
    var ValidationError = (function () {
        /**
         * @param rule The rule associated with the error. Validator implementation specific.
         * @param message The error message.
         * @param object The invalid object
         * @param propertyName The name of the invalid property. Optional.
         */
        function ValidationError(rule, message, object, propertyName) {
            if (propertyName === void 0) { propertyName = null; }
            this.rule = rule;
            this.message = message;
            this.object = object;
            this.propertyName = propertyName;
            this.id = ValidationError.nextId++;
        }
        ValidationError.prototype.toString = function () {
            return this.message;
        };
        ValidationError.nextId = 0;
        return ValidationError;
    }());
    exports.ValidationError = ValidationError;
});

define('aurelia-validation/validation-controller-factory',["require", "exports", './validation-controller', './validator'], function (require, exports, validation_controller_1, validator_1) {
    "use strict";
    /**
     * Creates ValidationController instances.
     */
    var ValidationControllerFactory = (function () {
        function ValidationControllerFactory(container) {
            this.container = container;
        }
        ValidationControllerFactory.get = function (container) {
            return new ValidationControllerFactory(container);
        };
        /**
         * Creates a new controller instance.
         */
        ValidationControllerFactory.prototype.create = function (validator) {
            if (!validator) {
                validator = this.container.get(validator_1.Validator);
            }
            return new validation_controller_1.ValidationController(validator);
        };
        /**
         * Creates a new controller and registers it in the current element's container so that it's
         * available to the validate binding behavior and renderers.
         */
        ValidationControllerFactory.prototype.createForCurrentScope = function (validator) {
            var controller = this.create(validator);
            this.container.registerInstance(validation_controller_1.ValidationController, controller);
            return controller;
        };
        return ValidationControllerFactory;
    }());
    exports.ValidationControllerFactory = ValidationControllerFactory;
    ValidationControllerFactory['protocol:aurelia:resolver'] = true;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-validation/validation-errors-custom-attribute',["require", "exports", 'aurelia-binding', 'aurelia-dependency-injection', 'aurelia-templating', './validation-controller'], function (require, exports, aurelia_binding_1, aurelia_dependency_injection_1, aurelia_templating_1, validation_controller_1) {
    "use strict";
    var ValidationErrorsCustomAttribute = (function () {
        function ValidationErrorsCustomAttribute(boundaryElement, controllerAccessor) {
            this.boundaryElement = boundaryElement;
            this.controllerAccessor = controllerAccessor;
            this.errors = [];
        }
        ValidationErrorsCustomAttribute.prototype.sort = function () {
            this.errors.sort(function (a, b) {
                if (a.targets[0] === b.targets[0]) {
                    return 0;
                }
                /* tslint:disable:no-bitwise */
                return a.targets[0].compareDocumentPosition(b.targets[0]) & 2 ? 1 : -1;
                /* tslint:enable:no-bitwise */
            });
        };
        ValidationErrorsCustomAttribute.prototype.interestingElements = function (elements) {
            var _this = this;
            return elements.filter(function (e) { return _this.boundaryElement.contains(e); });
        };
        ValidationErrorsCustomAttribute.prototype.render = function (instruction) {
            var _loop_1 = function(error) {
                var index = this_1.errors.findIndex(function (x) { return x.error === error; });
                if (index !== -1) {
                    this_1.errors.splice(index, 1);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = instruction.unrender; _i < _a.length; _i++) {
                var error = _a[_i].error;
                _loop_1(error);
            }
            for (var _b = 0, _c = instruction.render; _b < _c.length; _b++) {
                var _d = _c[_b], error = _d.error, elements = _d.elements;
                var targets = this.interestingElements(elements);
                if (targets.length) {
                    this.errors.push({ error: error, targets: targets });
                }
            }
            this.sort();
            this.value = this.errors;
        };
        ValidationErrorsCustomAttribute.prototype.bind = function () {
            this.controllerAccessor().addRenderer(this);
            this.value = this.errors;
        };
        ValidationErrorsCustomAttribute.prototype.unbind = function () {
            this.controllerAccessor().removeRenderer(this);
        };
        ValidationErrorsCustomAttribute.inject = [Element, aurelia_dependency_injection_1.Lazy.of(validation_controller_1.ValidationController)];
        ValidationErrorsCustomAttribute = __decorate([
            aurelia_templating_1.customAttribute('validation-errors', aurelia_binding_1.bindingMode.twoWay)
        ], ValidationErrorsCustomAttribute);
        return ValidationErrorsCustomAttribute;
    }());
    exports.ValidationErrorsCustomAttribute = ValidationErrorsCustomAttribute;
});

define('aurelia-validation/validation-renderer-custom-attribute',["require", "exports", './validation-controller'], function (require, exports, validation_controller_1) {
    "use strict";
    var ValidationRendererCustomAttribute = (function () {
        function ValidationRendererCustomAttribute() {
        }
        ValidationRendererCustomAttribute.prototype.created = function (view) {
            this.container = view.container;
        };
        ValidationRendererCustomAttribute.prototype.bind = function () {
            this.controller = this.container.get(validation_controller_1.ValidationController);
            this.renderer = this.container.get(this.value);
            this.controller.addRenderer(this.renderer);
        };
        ValidationRendererCustomAttribute.prototype.unbind = function () {
            this.controller.removeRenderer(this.renderer);
            this.controller = null;
            this.renderer = null;
        };
        return ValidationRendererCustomAttribute;
    }());
    exports.ValidationRendererCustomAttribute = ValidationRendererCustomAttribute;
});

define('aurelia-validation/implementation/rules',["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Sets, unsets and retrieves rules on an object or constructor function.
     */
    var Rules = (function () {
        function Rules() {
        }
        /**
         * Applies the rules to a target.
         */
        Rules.set = function (target, rules) {
            if (target instanceof Function) {
                target = target.prototype;
            }
            Object.defineProperty(target, Rules.key, { enumerable: false, configurable: false, writable: true, value: rules });
        };
        /**
         * Removes rules from a target.
         */
        Rules.unset = function (target) {
            if (target instanceof Function) {
                target = target.prototype;
            }
            target[Rules.key] = null;
        };
        /**
         * Retrieves the target's rules.
         */
        Rules.get = function (target) {
            return target[Rules.key] || null;
        };
        /**
         * The name of the property that stores the rules.
         */
        Rules.key = '__rules__';
        return Rules;
    }());
    exports.Rules = Rules;
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('aurelia-validation/implementation/standard-validator',["require", "exports", 'aurelia-templating', '../validator', '../validation-error', './rules', './validation-messages'], function (require, exports, aurelia_templating_1, validator_1, validation_error_1, rules_1, validation_messages_1) {
    "use strict";
    /**
     * Validates.
     * Responsible for validating objects and properties.
     */
    var StandardValidator = (function (_super) {
        __extends(StandardValidator, _super);
        function StandardValidator(messageProvider, resources) {
            _super.call(this);
            this.messageProvider = messageProvider;
            this.lookupFunctions = resources.lookupFunctions;
            this.getDisplayName = messageProvider.getDisplayName.bind(messageProvider);
        }
        /**
         * Validates the specified property.
         * @param object The object to validate.
         * @param propertyName The name of the property to validate.
         * @param rules Optional. If unspecified, the rules will be looked up using the metadata
         * for the object created by ValidationRules....on(class/object)
         */
        StandardValidator.prototype.validateProperty = function (object, propertyName, rules) {
            return this.validate(object, propertyName, rules || null);
        };
        /**
         * Validates all rules for specified object and it's properties.
         * @param object The object to validate.
         * @param rules Optional. If unspecified, the rules will be looked up using the metadata
         * for the object created by ValidationRules....on(class/object)
         */
        StandardValidator.prototype.validateObject = function (object, rules) {
            return this.validate(object, null, rules || null);
        };
        /**
         * Determines whether a rule exists in a set of rules.
         * @param rules The rules to search.
         * @parem rule The rule to find.
         */
        StandardValidator.prototype.ruleExists = function (rules, rule) {
            var i = rules.length;
            while (i--) {
                if (rules[i].indexOf(rule) !== -1) {
                    return true;
                }
            }
            return false;
        };
        StandardValidator.prototype.getMessage = function (rule, object, value) {
            var expression = rule.message || this.messageProvider.getMessage(rule.messageKey);
            var _a = rule.property, propertyName = _a.name, displayName = _a.displayName;
            if (displayName === null && propertyName !== null) {
                displayName = this.messageProvider.getDisplayName(propertyName);
            }
            var overrideContext = {
                $displayName: displayName,
                $propertyName: propertyName,
                $value: value,
                $object: object,
                $config: rule.config,
                $getDisplayName: this.getDisplayName
            };
            return expression.evaluate({ bindingContext: object, overrideContext: overrideContext }, this.lookupFunctions);
        };
        StandardValidator.prototype.validateRuleSequence = function (object, propertyName, ruleSequence, sequence) {
            var _this = this;
            // are we validating all properties or a single property?
            var validateAllProperties = propertyName === null || propertyName === undefined;
            var rules = ruleSequence[sequence];
            var errors = [];
            // validate each rule.
            var promises = [];
            var _loop_1 = function(i) {
                var rule = rules[i];
                // is the rule related to the property we're validating.
                if (!validateAllProperties && rule.property.name !== propertyName) {
                    return "continue";
                }
                // is this a conditional rule? is the condition met?
                if (rule.when && !rule.when(object)) {
                    return "continue";
                }
                // validate.
                var value = rule.property.name === null ? object : object[rule.property.name];
                var promiseOrBoolean = rule.condition(value, object);
                if (!(promiseOrBoolean instanceof Promise)) {
                    promiseOrBoolean = Promise.resolve(promiseOrBoolean);
                }
                promises.push(promiseOrBoolean.then(function (isValid) {
                    if (!isValid) {
                        var message = _this.getMessage(rule, object, value);
                        errors.push(new validation_error_1.ValidationError(rule, message, object, rule.property.name));
                    }
                }));
            };
            for (var i = 0; i < rules.length; i++) {
                _loop_1(i);
            }
            return Promise.all(promises)
                .then(function () {
                sequence++;
                if (errors.length === 0 && sequence < ruleSequence.length) {
                    return _this.validateRuleSequence(object, propertyName, ruleSequence, sequence);
                }
                return errors;
            });
        };
        StandardValidator.prototype.validate = function (object, propertyName, rules) {
            // rules specified?
            if (!rules) {
                // no. attempt to locate the rules.
                rules = rules_1.Rules.get(object);
            }
            // any rules?
            if (!rules) {
                return Promise.resolve([]);
            }
            return this.validateRuleSequence(object, propertyName, rules, 0);
        };
        StandardValidator.inject = [validation_messages_1.ValidationMessageProvider, aurelia_templating_1.ViewResources];
        return StandardValidator;
    }(validator_1.Validator));
    exports.StandardValidator = StandardValidator;
});

define('aurelia-validation/implementation/validation-messages',["require", "exports", './validation-parser'], function (require, exports, validation_parser_1) {
    "use strict";
    /**
     * Dictionary of validation messages. [messageKey]: messageExpression
     */
    exports.validationMessages = {
        /**
         * The default validation message. Used with rules that have no standard message.
         */
        default: "${$displayName} is invalid.",
        required: "${$displayName} is required.",
        matches: "${$displayName} is not correctly formatted.",
        email: "${$displayName} is not a valid email.",
        minLength: "${$displayName} must be at least ${$config.length} character${$config.length === 1 ? '' : 's'}.",
        maxLength: "${$displayName} cannot be longer than ${$config.length} character${$config.length === 1 ? '' : 's'}.",
        minItems: "${$displayName} must contain at least ${$config.count} item${$config.count === 1 ? '' : 's'}.",
        maxItems: "${$displayName} cannot contain more than ${$config.count} item${$config.count === 1 ? '' : 's'}.",
        equals: "${$displayName} must be ${$config.expectedValue}.",
    };
    /**
     * Retrieves validation messages and property display names.
     */
    var ValidationMessageProvider = (function () {
        function ValidationMessageProvider(parser) {
            this.parser = parser;
        }
        /**
         * Returns a message binding expression that corresponds to the key.
         * @param key The message key.
         */
        ValidationMessageProvider.prototype.getMessage = function (key) {
            var message;
            if (key in exports.validationMessages) {
                message = exports.validationMessages[key];
            }
            else {
                message = exports.validationMessages['default'];
            }
            return this.parser.parseMessage(message);
        };
        /**
         * When a display name is not provided, this method is used to formulate
         * a display name using the property name.
         * Override this with your own custom logic.
         * @param propertyName The property name.
         */
        ValidationMessageProvider.prototype.getDisplayName = function (propertyName) {
            // split on upper-case letters.
            var words = propertyName.split(/(?=[A-Z])/).join(' ');
            // capitalize first letter.
            return words.charAt(0).toUpperCase() + words.slice(1);
        };
        ValidationMessageProvider.inject = [validation_parser_1.ValidationParser];
        return ValidationMessageProvider;
    }());
    exports.ValidationMessageProvider = ValidationMessageProvider;
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('aurelia-validation/implementation/validation-parser',["require", "exports", 'aurelia-binding', 'aurelia-templating', './util', 'aurelia-logging'], function (require, exports, aurelia_binding_1, aurelia_templating_1, util_1, LogManager) {
    "use strict";
    var ValidationParser = (function () {
        function ValidationParser(parser, bindinqLanguage) {
            this.parser = parser;
            this.bindinqLanguage = bindinqLanguage;
            this.emptyStringExpression = new aurelia_binding_1.LiteralString('');
            this.nullExpression = new aurelia_binding_1.LiteralPrimitive(null);
            this.undefinedExpression = new aurelia_binding_1.LiteralPrimitive(undefined);
            this.cache = {};
        }
        ValidationParser.prototype.parseMessage = function (message) {
            if (this.cache[message] !== undefined) {
                return this.cache[message];
            }
            var parts = this.bindinqLanguage.parseInterpolation(null, message);
            if (parts === null) {
                return new aurelia_binding_1.LiteralString(message);
            }
            var expression = new aurelia_binding_1.LiteralString(parts[0]);
            for (var i = 1; i < parts.length; i += 2) {
                expression = new aurelia_binding_1.Binary('+', expression, new aurelia_binding_1.Binary('+', this.coalesce(parts[i]), new aurelia_binding_1.LiteralString(parts[i + 1])));
            }
            MessageExpressionValidator.validate(expression, message);
            this.cache[message] = expression;
            return expression;
        };
        ValidationParser.prototype.parseProperty = function (property) {
            if (util_1.isString(property)) {
                return { name: property, displayName: null };
            }
            var accessor = this.getAccessorExpression(property.toString());
            if (accessor instanceof aurelia_binding_1.AccessScope
                || accessor instanceof aurelia_binding_1.AccessMember && accessor.object instanceof aurelia_binding_1.AccessScope) {
                return {
                    name: accessor.name,
                    displayName: null
                };
            }
            throw new Error("Invalid subject: \"" + accessor + "\"");
        };
        ValidationParser.prototype.coalesce = function (part) {
            // part === null || part === undefined ? '' : part
            return new aurelia_binding_1.Conditional(new aurelia_binding_1.Binary('||', new aurelia_binding_1.Binary('===', part, this.nullExpression), new aurelia_binding_1.Binary('===', part, this.undefinedExpression)), this.emptyStringExpression, new aurelia_binding_1.CallMember(part, 'toString', []));
        };
        ValidationParser.prototype.getAccessorExpression = function (fn) {
            var classic = /^function\s*\([$_\w\d]+\)\s*\{\s*(?:"use strict";)?\s*return\s+[$_\w\d]+\.([$_\w\d]+)\s*;?\s*\}$/;
            var arrow = /^\(?[$_\w\d]+\)?\s*=>\s*[$_\w\d]+\.([$_\w\d]+)$/;
            var match = classic.exec(fn) || arrow.exec(fn);
            if (match === null) {
                throw new Error("Unable to parse accessor function:\n" + fn);
            }
            return this.parser.parse(match[1]);
        };
        ValidationParser.inject = [aurelia_binding_1.Parser, aurelia_templating_1.BindingLanguage];
        return ValidationParser;
    }());
    exports.ValidationParser = ValidationParser;
    var MessageExpressionValidator = (function (_super) {
        __extends(MessageExpressionValidator, _super);
        function MessageExpressionValidator(originalMessage) {
            _super.call(this, []);
            this.originalMessage = originalMessage;
        }
        MessageExpressionValidator.validate = function (expression, originalMessage) {
            var visitor = new MessageExpressionValidator(originalMessage);
            expression.accept(visitor);
        };
        MessageExpressionValidator.prototype.visitAccessScope = function (access) {
            if (access.ancestor !== 0) {
                throw new Error('$parent is not permitted in validation message expressions.');
            }
            if (['displayName', 'propertyName', 'value', 'object', 'config', 'getDisplayName'].indexOf(access.name) !== -1) {
                LogManager.getLogger('aurelia-validation')
                    .warn("Did you mean to use \"$" + access.name + "\" instead of \"" + access.name + "\" in this validation message template: \"" + this.originalMessage + "\"?");
            }
        };
        return MessageExpressionValidator;
    }(aurelia_binding_1.Unparser));
    exports.MessageExpressionValidator = MessageExpressionValidator;
});

define('aurelia-validation/implementation/util',["require", "exports"], function (require, exports) {
    "use strict";
    function isString(value) {
        return Object.prototype.toString.call(value) === '[object String]';
    }
    exports.isString = isString;
});

define('aurelia-validation/implementation/validation-rules',["require", "exports", './util', './rules', './validation-messages'], function (require, exports, util_1, rules_1, validation_messages_1) {
    "use strict";
    /**
     * Part of the fluent rule API. Enables customizing property rules.
     */
    var FluentRuleCustomizer = (function () {
        function FluentRuleCustomizer(property, condition, config, fluentEnsure, fluentRules, parser) {
            if (config === void 0) { config = {}; }
            this.fluentEnsure = fluentEnsure;
            this.fluentRules = fluentRules;
            this.parser = parser;
            this.rule = {
                property: property,
                condition: condition,
                config: config,
                when: null,
                messageKey: 'default',
                message: null,
                sequence: fluentEnsure._sequence
            };
            this.fluentEnsure._addRule(this.rule);
        }
        /**
         * Validate subsequent rules after previously declared rules have
         * been validated successfully. Use to postpone validation of costly
         * rules until less expensive rules pass validation.
         */
        FluentRuleCustomizer.prototype.then = function () {
            this.fluentEnsure._sequence++;
            return this;
        };
        /**
         * Specifies the key to use when looking up the rule's validation message.
         */
        FluentRuleCustomizer.prototype.withMessageKey = function (key) {
            this.rule.messageKey = key;
            this.rule.message = null;
            return this;
        };
        /**
         * Specifies rule's validation message.
         */
        FluentRuleCustomizer.prototype.withMessage = function (message) {
            this.rule.messageKey = 'custom';
            this.rule.message = this.parser.parseMessage(message);
            return this;
        };
        /**
         * Specifies a condition that must be met before attempting to validate the rule.
         * @param condition A function that accepts the object as a parameter and returns true
         * or false whether the rule should be evaluated.
         */
        FluentRuleCustomizer.prototype.when = function (condition) {
            this.rule.when = condition;
            return this;
        };
        /**
         * Tags the rule instance, enabling the rule to be found easily
         * using ValidationRules.taggedRules(rules, tag)
         */
        FluentRuleCustomizer.prototype.tag = function (tag) {
            this.rule.tag = tag;
            return this;
        };
        ///// FluentEnsure APIs /////
        /**
         * Target a property with validation rules.
         * @param property The property to target. Can be the property name or a property accessor function.
         */
        FluentRuleCustomizer.prototype.ensure = function (subject) {
            return this.fluentEnsure.ensure(subject);
        };
        /**
         * Targets an object with validation rules.
         */
        FluentRuleCustomizer.prototype.ensureObject = function () {
            return this.fluentEnsure.ensureObject();
        };
        Object.defineProperty(FluentRuleCustomizer.prototype, "rules", {
            /**
             * Rules that have been defined using the fluent API.
             */
            get: function () {
                return this.fluentEnsure.rules;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Applies the rules to a class or object, making them discoverable by the StandardValidator.
         * @param target A class or object.
         */
        FluentRuleCustomizer.prototype.on = function (target) {
            return this.fluentEnsure.on(target);
        };
        ///////// FluentRules APIs /////////
        /**
         * Applies an ad-hoc rule function to the ensured property or object.
         * @param condition The function to validate the rule.
         * Will be called with two arguments, the property value and the object.
         * Should return a boolean or a Promise that resolves to a boolean.
         */
        FluentRuleCustomizer.prototype.satisfies = function (condition, config) {
            return this.fluentRules.satisfies(condition, config);
        };
        /**
         * Applies a rule by name.
         * @param name The name of the custom or standard rule.
         * @param args The rule's arguments.
         */
        FluentRuleCustomizer.prototype.satisfiesRule = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return (_a = this.fluentRules).satisfiesRule.apply(_a, [name].concat(args));
            var _a;
        };
        /**
         * Applies the "required" rule to the property.
         * The value cannot be null, undefined or whitespace.
         */
        FluentRuleCustomizer.prototype.required = function () {
            return this.fluentRules.required();
        };
        /**
         * Applies the "matches" rule to the property.
         * Value must match the specified regular expression.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.matches = function (regex) {
            return this.fluentRules.matches(regex);
        };
        /**
         * Applies the "email" rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.email = function () {
            return this.fluentRules.email();
        };
        /**
         * Applies the "minLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.minLength = function (length) {
            return this.fluentRules.minLength(length);
        };
        /**
         * Applies the "maxLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.maxLength = function (length) {
            return this.fluentRules.maxLength(length);
        };
        /**
         * Applies the "minItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRuleCustomizer.prototype.minItems = function (count) {
            return this.fluentRules.minItems(count);
        };
        /**
         * Applies the "maxItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRuleCustomizer.prototype.maxItems = function (count) {
            return this.fluentRules.maxItems(count);
        };
        /**
         * Applies the "equals" validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.equals = function (expectedValue) {
            return this.fluentRules.equals(expectedValue);
        };
        return FluentRuleCustomizer;
    }());
    exports.FluentRuleCustomizer = FluentRuleCustomizer;
    /**
     * Part of the fluent rule API. Enables applying rules to properties and objects.
     */
    var FluentRules = (function () {
        function FluentRules(fluentEnsure, parser, property) {
            this.fluentEnsure = fluentEnsure;
            this.parser = parser;
            this.property = property;
        }
        /**
         * Sets the display name of the ensured property.
         */
        FluentRules.prototype.displayName = function (name) {
            this.property.displayName = name;
            return this;
        };
        /**
         * Applies an ad-hoc rule function to the ensured property or object.
         * @param condition The function to validate the rule.
         * Will be called with two arguments, the property value and the object.
         * Should return a boolean or a Promise that resolves to a boolean.
         */
        FluentRules.prototype.satisfies = function (condition, config) {
            return new FluentRuleCustomizer(this.property, condition, config, this.fluentEnsure, this, this.parser);
        };
        /**
         * Applies a rule by name.
         * @param name The name of the custom or standard rule.
         * @param args The rule's arguments.
         */
        FluentRules.prototype.satisfiesRule = function (name) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var rule = FluentRules.customRules[name];
            if (!rule) {
                // standard rule?
                rule = this[name];
                if (rule instanceof Function) {
                    return rule.call.apply(rule, [this].concat(args));
                }
                throw new Error("Rule with name \"" + name + "\" does not exist.");
            }
            var config = rule.argsToConfig ? rule.argsToConfig.apply(rule, args) : undefined;
            return this.satisfies(function (value, obj) { return (_a = rule.condition).call.apply(_a, [_this, value, obj].concat(args)); var _a; }, config)
                .withMessageKey(name);
        };
        /**
         * Applies the "required" rule to the property.
         * The value cannot be null, undefined or whitespace.
         */
        FluentRules.prototype.required = function () {
            return this.satisfies(function (value) {
                return value !== null
                    && value !== undefined
                    && !(util_1.isString(value) && !/\S/.test(value));
            }).withMessageKey('required');
        };
        /**
         * Applies the "matches" rule to the property.
         * Value must match the specified regular expression.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.matches = function (regex) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length === 0 || regex.test(value); })
                .withMessageKey('matches');
        };
        /**
         * Applies the "email" rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.email = function () {
            // regex from https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
            /* tslint:disable:max-line-length */
            return this.matches(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
                .withMessageKey('email');
        };
        /**
         * Applies the "minLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.minLength = function (length) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length === 0 || value.length >= length; }, { length: length })
                .withMessageKey('minLength');
        };
        /**
         * Applies the "maxLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.maxLength = function (length) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length === 0 || value.length <= length; }, { length: length })
                .withMessageKey('maxLength');
        };
        /**
         * Applies the "minItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRules.prototype.minItems = function (count) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length >= count; }, { count: count })
                .withMessageKey('minItems');
        };
        /**
         * Applies the "maxItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRules.prototype.maxItems = function (count) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length <= count; }, { count: count })
                .withMessageKey('maxItems');
        };
        /**
         * Applies the "equals" validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRules.prototype.equals = function (expectedValue) {
            return this.satisfies(function (value) { return value === null || value === undefined || value === '' || value === expectedValue; }, { expectedValue: expectedValue })
                .withMessageKey('equals');
        };
        FluentRules.customRules = {};
        return FluentRules;
    }());
    exports.FluentRules = FluentRules;
    /**
     * Part of the fluent rule API. Enables targeting properties and objects with rules.
     */
    var FluentEnsure = (function () {
        /* tslint:enable */
        function FluentEnsure(parser) {
            this.parser = parser;
            /**
             * Rules that have been defined using the fluent API.
             */
            this.rules = [];
            /* tslint:disable */
            this._sequence = 0;
        }
        /**
         * Target a property with validation rules.
         * @param property The property to target. Can be the property name or a property accessor
         * function.
         */
        FluentEnsure.prototype.ensure = function (property) {
            this.assertInitialized();
            return new FluentRules(this, this.parser, this.parser.parseProperty(property));
        };
        /**
         * Targets an object with validation rules.
         */
        FluentEnsure.prototype.ensureObject = function () {
            this.assertInitialized();
            return new FluentRules(this, this.parser, { name: null, displayName: null });
        };
        /**
         * Applies the rules to a class or object, making them discoverable by the StandardValidator.
         * @param target A class or object.
         */
        FluentEnsure.prototype.on = function (target) {
            rules_1.Rules.set(target, this.rules);
            return this;
        };
        /**
         * Adds a rule definition to the sequenced ruleset.
         */
        FluentEnsure.prototype._addRule = function (rule) {
            while (this.rules.length < rule.sequence + 1) {
                this.rules.push([]);
            }
            this.rules[rule.sequence].push(rule);
        };
        FluentEnsure.prototype.assertInitialized = function () {
            if (this.parser) {
                return;
            }
            throw new Error("Did you forget to add \".plugin('aurelia-validation)\" to your main.js?");
        };
        return FluentEnsure;
    }());
    exports.FluentEnsure = FluentEnsure;
    /**
     * Fluent rule definition API.
     */
    var ValidationRules = (function () {
        function ValidationRules() {
        }
        ValidationRules.initialize = function (parser) {
            ValidationRules.parser = parser;
        };
        /**
         * Target a property with validation rules.
         * @param property The property to target. Can be the property name or a property accessor function.
         */
        ValidationRules.ensure = function (property) {
            return new FluentEnsure(ValidationRules.parser).ensure(property);
        };
        /**
         * Targets an object with validation rules.
         */
        ValidationRules.ensureObject = function () {
            return new FluentEnsure(ValidationRules.parser).ensureObject();
        };
        /**
         * Defines a custom rule.
         * @param name The name of the custom rule. Also serves as the message key.
         * @param condition The rule function.
         * @param message The message expression
         * @param argsToConfig A function that maps the rule's arguments to a "config"
         * object that can be used when evaluating the message expression.
         */
        ValidationRules.customRule = function (name, condition, message, argsToConfig) {
            validation_messages_1.validationMessages[name] = message;
            FluentRules.customRules[name] = { condition: condition, argsToConfig: argsToConfig };
        };
        /**
         * Returns rules with the matching tag.
         * @param rules The rules to search.
         * @param tag The tag to search for.
         */
        ValidationRules.taggedRules = function (rules, tag) {
            return rules.map(function (x) { return x.filter(function (r) { return r.tag === tag; }); });
        };
        /**
         * Removes the rules from a class or object.
         * @param target A class or object.
         */
        ValidationRules.off = function (target) {
            rules_1.Rules.unset(target);
        };
        return ValidationRules;
    }());
    exports.ValidationRules = ValidationRules;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n    <nav-header router.bind=\"router\"></nav-header>\r\n    <main-nav router.bind=\"router\"></main-nav>\r\n\r\n    <router-view></router-view>\r\n\r\n</template>\n"; });
define('text!account/edit.html', ['module'], function(module) { module.exports = "<template>\r\n    <header>\r\n        <h3>User Profile</h3>\r\n    </header>\r\n    \r\n    <form submit.delegate='update()'>\r\n        <div class=\"form-group\">\r\n            <label for=\"firstName\">First name</label>\r\n            <input type=\"text\" class=\"form-control\" \r\n                   value.bind=\"user.firstName & validate\" \r\n                   id=\"firstName\" placeholder=\"First name\" />\r\n        </div>\r\n\r\n        <button type=\"submit\" class=\"btn btn-primary\">Update</button>\r\n        \r\n        <!--<ul if.bind=\"validation.errors\">\r\n            <li repeat.for=\"error of validation.errors\">\r\n                ${error}\r\n            </li>\r\n        </ul>-->\r\n    </form>\r\n\r\n</template>"; });
define('text!account/login.html', ['module'], function(module) { module.exports = "<template>\r\n    \r\n    <header>\r\n        <h3>Login</h3>\r\n    </header>\r\n    \r\n    <div class=\"row\">\r\n        <div class=\"col-xs-2\">Username</div>\r\n        <div class=\"col-xs-10\">\r\n            <input type=\"text\" class=\"form-control\" value.bind=\"username\" />\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-2\">Password</div>\r\n        <div class=\"col-xs-10\">\r\n            <input type=\"text\" class=\"form-control\" value.bind=\"password\" />\r\n        </div>\r\n    </div>    \r\n    \r\n    <div class=\"row\">\r\n        <div class=\"col-xs-2\"></div>\r\n        <div class=\"col-xs-10\">\r\n            <button type=\"button\" click.delegate=\"login()\" class=\"btn btn-primary\">Login</button>\r\n        </div>\r\n    </div>\r\n\r\n</template>"; });
define('text!account/navigation.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <div class=\"container page-content\">\r\n        <router-view></router-view>\r\n    </div>\r\n\r\n</template>"; });
define('text!account/view.html', ['module'], function(module) { module.exports = "<template>\r\n    <header>\r\n        <h3>User Profile</h3>\r\n    </header>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-2\">First name</div>\r\n        <div class=\"col-xs-10\">\r\n            <span>${user.firstName}</span>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-2\">Email</div>\r\n        <div class=\"col-xs-10\">\r\n            <span>${user.username}</span>\r\n        </div>\r\n    </div>\r\n    \r\n    <div class=\"row\">\r\n        <div class=\"col-xs-2\"></div>\r\n        <div class=\"col-xs-10\">\r\n            <button type=\"button\" click.delegate=\"edit()\" class=\"btn btn-primary\">Edit</button>\r\n        </div>\r\n    </div>\r\n\r\n</template>"; });
define('text!navigation/sub-menu.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <div class=\"sub-menu\">\r\n        <nav class=\"navbar navbar-fixed-top\">\r\n            <div class=\"container\">\r\n                <nav class=\"navbar\">\r\n                    <ul class=\"nav navbar-nav\">\r\n                        <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\r\n                            <a href.bind=\"row.href\">${row.title}</a>\r\n                        </li>\r\n                    </ul>\r\n\r\n                    <div class=\"actions\">\r\n                        <div class=\"btn-group\" role=\"group\" aria-label=\"Actions\">\r\n                            <button type=\"button\" if.bind=\"editMode !== true\" click.delegate=\"startEdit()\" class=\"btn btn-success\">Switch to Edit Mode</button>\r\n                            <button type=\"button\" if.bind=\"editMode === true\" click.delegate=\"applyChanges()\" class=\"btn btn-success\">Apply Changes</button>\r\n                            <button type=\"button\" if.bind=\"editMode === true\" click.delegate=\"cancelEdit()\" class=\"btn btn-default\">Cancel</button>\r\n                        </div>\r\n                    </div>\r\n\r\n                </nav>\r\n            </div>\r\n        </nav>\r\n    </div>\r\n</template>"; });
define('text!navigation/sub-nav.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"sub-nav\">\r\n        <nav class=\"navbar navbar\">\r\n            <div class=\"container\">\r\n                <nav class=\"navbar\">\r\n                    <ul class=\"nav navbar-nav\">\r\n                        <li repeat.for=\"item of menu.items\" class=\"${item.isActive ? 'active' : ''}\">\r\n                            <a href.bind=\"$parent.getUrl(item)\">${item.title}</a>\r\n                        </li>\r\n                    </ul>\r\n                </nav>\r\n            </div>\r\n        </nav>\r\n    </div>\r\n</template>"; });
define('text!strategies/create.html', ['module'], function(module) { module.exports = "<template>\r\n    \r\n    <header>\r\n        <h3 first-letter-span>Create new strategy</h3>\r\n    </header>\r\n    \r\n</template>"; });
define('text!strategies/edit.html', ['module'], function(module) { module.exports = "<template>\r\n    \r\n    <header>\r\n        <h3>Modify strategy</h3>\r\n    </header>\r\n\r\n    <form class=\"form-horizontal\" submit.delegate='update()'>\r\n        <div class=\"form-group\">\r\n            <label for=\"txtName\" class=\"col-sm-3 control-label\">Strategy Name</label>\r\n            <div class=\"col-sm-7\">\r\n                <input type=\"text\" class=\"form-control\" id=\"txtName\" value.bind=\"strategy.name & validate\" >\r\n            </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"txtUrl\" class=\"col-sm-3 control-label\">Url (alpha-numeric only)</label>\r\n            <div class=\"col-sm-7\">\r\n                <input type=\"text\" class=\"form-control\" id=\"txtUrl\" value.bind=\"strategy.url & validate\" >\r\n            </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"txtDescription\" class=\"col-sm-3 control-label\">Description</label>\r\n            <div class=\"col-sm-9\">\r\n                <textarea rows=\"5\" class=\"form-control\" id=\"txtDescription\" value.bind=\"strategy.description\">\r\n                    \r\n                </textarea>\r\n            </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <div class=\"col-sm-offset-3 col-sm-9\">\r\n                <button type=\"submit\" class=\"btn btn-primary\">Update</button>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</template>"; });
define('text!strategies/list.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"c_strategy\">\r\n\r\n        <header>\r\n            <h3 first-letter-span>Defined Strategies</h3>\r\n        </header>\r\n\r\n        <table class=\"table table-hover\">\r\n            <thead>\r\n                <tr>\r\n                    <th>Name</th>\r\n                    <th>Active</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr repeat.for=\"strategy of strategies\"\r\n                    class=\"${strategy.deleted === true ? 'danger': ''}\">\r\n                    <td>\r\n                        <a href.bind=\"$parent.generateUrl(strategy)\">${strategy.name}</a>\r\n                    </td>\r\n                    <td>${strategy.deleted !== true}</td>\r\n                    <td>\r\n                        <div class=\"btn-group\">\r\n                            <button type=\"button\" class=\"btn btn-warning dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                                Action <span class=\"caret\"></span>\r\n                            </button>\r\n                            <ul class=\"dropdown-menu\">\r\n                                <li if.bind=\"strategy.deleted === true\"><a click.trigger=\"$parent.enable(strategy)\">Activate</a></li>\r\n                                <li if.bind=\"strategy.deleted !== true\"><a click.trigger=\"$parent.disable(strategy)\">Deactivate</a></li>\r\n                                <li role=\"separator\" class=\"divider\"></li>\r\n                                <li><a href=\"#\">Manage Rules</a></li>\r\n                            </ul>\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n</template>"; });
define('text!strategies/navigation.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <sub-nav router.bind=\"router\" ></sub-nav>\r\n\r\n    <div class=\"container page-content\">\r\n        <router-view></router-view>\r\n    </div>\r\n\r\n</template>"; });
define('text!studies/category.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"actions\" if.bind=\"powerUser\">\r\n\r\n        <div if.bind=\"editMode !== true\" class=\"btn-group\" role=\"group\">\r\n            <button type=\"button\" class=\"btn btn-warning dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                Configure\r\n                <span class=\"caret\"></span>\r\n            </button>\r\n            <ul class=\"dropdown-menu\">\r\n                <li><a click.delegate=\"startEdit()\">Edit Page</a></li>\r\n                <li role=\"separator\" class=\"divider\"></li>\r\n                <li><a href=\"/categories\">Manage Categories</a></li>\r\n            </ul>\r\n        </div>\r\n\r\n        <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\r\n            <button type=\"button\" if.bind=\"editMode === true\" click.delegate=\"saveArticle()\" class=\"btn btn-success\">Apply Changes</button>\r\n            <button type=\"button\" if.bind=\"editMode === true\" click.delegate=\"cancelEdit()\" class=\"btn btn-default\">Cancel</button>\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n\r\n        <div class=\"col-md-8 article\">\r\n            <article article.bind=\"article\"></article> \r\n        </div>\r\n\r\n        <div class=\"col-md-4 side-navigation\">\r\n            <h3>${category.title}</h3>\r\n            <ul>\r\n                <li repeat.for=\"item of sortedArticles\" class=\"${$parent.editMode === true ? 'edit-mode': ''}\" if.bind=\"item.isDeleted !== true\">\r\n                    <div if.bind=\"editMode\" class=\"block-actions\">\r\n                        <div if.bind=\"item.isDeleting !== true\" class=\"btn-group\" role=\"group\" aria-label=\"Actions\">\r\n                            <button type=\"button\" click.delegate=\"$parent.deleteArticle(item)\" class=\"btn btn-danger btn-xs\">Delete</button>\r\n                            <button type=\"button\" click.delegate=\"$parent.moveUpArticle(item)\" class=\"btn btn-default btn-xs\">\r\n                                <span class=\"glyphicon glyphicon-arrow-up\" aria-hidden=\"true\"></span>\r\n                            </button>\r\n                            <button type=\"button\" click.delegate=\"$parent.moveDownArticle(item)\" class=\"btn btn-default btn-xs\">\r\n                                <span class=\"glyphicon glyphicon-arrow-down\" aria-hidden=\"true\"></span>\r\n                            </button>\r\n                        </div>\r\n\r\n                        <div if.bind=\"item.isDeleting === true\" class=\"btn-group\" role=\"group\" aria-label=\"Actions\">\r\n                            <button type=\"button\" click.delegate=\"$parent.confirmDeleteArticle(item)\" class=\"btn btn-danger btn-xs\">Confirm Delete</button>\r\n                            <button type=\"button\" click.delegate=\"$parent.cancelDeleteArticle(item)\" class=\"btn btn-default btn-xs\">Cancel</button>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <span class=\"glyphicon glyphicon-arrow-right\" aria-hidden=\"true\"></span>\r\n                    <a href.bind=\"$parent.getArticleUrl(item)\" class=\"${item.articleId === article.articleId ? 'active' : ''}\">${item.title}</a>\r\n                </li>\r\n            </ul>\r\n            <div if.bind=\"editMode === true\" class=\"block-actions\">\r\n                <div class=\"btn-group\" role=\"group\" aria-label=\"Actions\">\r\n                    <button type=\"button\" click.delegate=\"addArticle()\" class=\"btn btn-primary btn-xs\">Add New Article</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>"; });
define('text!studies/navigation.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <compose repeat.for=\"menu of menus\" model.bind=\"menu\" view-model=\"../navigation/sub-nav\"></compose>\r\n\r\n    <div class=\"container page-content\">\r\n        <router-view></router-view>\r\n    </div>\r\n\r\n</template>"; });
define('text!strategies/rules/rule-sets.html', ['module'], function(module) { module.exports = "<template>\r\n    <header>\r\n        <h3 first-letter-span>Manage Rule Sets</h3>\r\n    </header>\r\n</template>"; });
define('text!strategies/rules/rules.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"c_rules-content\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-8 col-xs-12 c_rule-list\">\r\n                <header>\r\n                    <h3 first-letter-span>Manage Rules</h3>\r\n                </header>\r\n\r\n                <rule repeat.for=\"rule of rules\" rule.bind=\"rule\"></rule>\r\n            </div>\r\n            <div class=\"col-md-4 col-xs-12\">\r\n                <h3>Side Navigation</h3>\r\n            </div>\r\n        </div>\r\n\r\n        <ul if.bind=\"errors.length > 0\">\r\n            <li repeat.for=\"error of errors\">\r\n                ${error.client.source}::${error.server.source} => <br />\r\n                ${error.client.message}(${error.server.message})\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</template>"; });
define('text!strategies/rules/strategy-rules.html', ['module'], function(module) { module.exports = "<template>\r\n    <header>\r\n        <h3>Manage Strategy Rules</h3>\r\n    </header>\r\n</template>"; });
define('text!resources/elements/chart/any-chart.html', ['module'], function(module) { module.exports = "<template>\r\n    <div id=\"${container}\" style=\"width: 500px; height: 400px;\"></div>\r\n</template>"; });
define('text!resources/elements/article/article-block.html', ['module'], function(module) { module.exports = "<template>\r\n    <heading-block block.bind=\"block\"></heading-block>\r\n    <paragraph-block block.bind=\"block\"></paragraph-block>\r\n    <image-block block.bind=\"block\"></image-block>\r\n    <ordered-list-block block.bind=\"block\"></ordered-list-block>\r\n    <new-block block.bind=\"block\"></new-block>\r\n</template>"; });
define('text!resources/elements/article/article.html', ['module'], function(module) { module.exports = "<template>\r\n    <edit-mode if.bind=\"editMode === true\" class=\"form-horizontal\">\r\n\r\n        <div class=\"form-group\">\r\n            <label class=\"col-sm-2 control-label\">Title</label>\r\n            <div class=\"col-sm-10\">\r\n                <input type=\"text\" class=\"form-control\" value.bind=\"article.title\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n            <label class=\"col-sm-2 control-label\">Url</label>\r\n            <div class=\"col-sm-10\">\r\n                <input type=\"text\" class=\"form-control\" value.bind=\"article.url\" placeholder=\"Atricle Url (no spaces)\">\r\n            </div>\r\n        </div>\r\n\r\n    </edit-mode>\r\n    <read-mode if.bind=\"editMode !== true\">\r\n        <h2>${article.title}</h2>\r\n    </read-mode>\r\n\r\n    <article-part class=\"${$parent.editMode === true ? 'edit-mode': ''}\"\r\n                  repeat.for=\"block of article.blocks\">\r\n        <block-actions block.bind=\"block\"></block-actions>\r\n        <article-block block.bind=\"block\"></article-block>\r\n    </article-part>\r\n\r\n    <div if.bind=\"editMode === true\" class=\"block-actions\">\r\n        <div class=\"btn-group\" role=\"group\" aria-label=\"Actions\">\r\n            <button type=\"button\" click.delegate=\"addBlock()\" class=\"btn btn-primary btn-xs\">Add New Block</button>\r\n        </div>\r\n    </div>\r\n</template>"; });
define('text!resources/elements/article/block-actions.html', ['module'], function(module) { module.exports = "<template>\r\n    <div if.bind=\"block.editMode\" class=\"block-actions\">\r\n        <div if.bind=\"block.isEditing !== true && block.isDeleting !== true && block.isNew !== true\" class=\"btn-group\" role=\"group\" aria-label=\"Actions\">\r\n            <button type=\"button\" click.delegate=\"startEditing()\" class=\"btn btn-default btn-xs\">Edit</button>\r\n            <button type=\"button\" click.delegate=\"startDeleting()\" class=\"btn btn-danger btn-xs\">Delete</button>\r\n            <button type=\"button\" click.delegate=\"moveUp()\" class=\"btn btn-default btn-xs\">\r\n                <span class=\"glyphicon glyphicon-arrow-up\" aria-hidden=\"true\"></span>\r\n            </button>\r\n            <button type=\"button\" click.delegate=\"moveDown()\" class=\"btn btn-default btn-xs\">\r\n                <span class=\"glyphicon glyphicon-arrow-down\" aria-hidden=\"true\"></span>\r\n            </button>\r\n        </div>\r\n\r\n        <div if.bind=\"block.isEditing === true && block.isNew !== true\" class=\"btn-group\" role=\"group\" aria-label=\"Actions\">\r\n            <button type=\"button\" click.delegate=\"applyChanges()\" class=\"btn btn-success btn-xs\">Apply Changes</button>\r\n            <button type=\"button\" click.delegate=\"cancelEditing()\" class=\"btn btn-default btn-xs\">Cancel</button>\r\n        </div>\r\n\r\n        <div if.bind=\"block.isDeleting === true && block.isNew !== true\" class=\"btn-group\" role=\"group\" aria-label=\"Actions\">\r\n            <button type=\"button\" click.delegate=\"deleteBlock()\" class=\"btn btn-danger btn-xs\">Delete Block</button>\r\n            <button type=\"button\" click.delegate=\"cancelEditing()\" class=\"btn btn-default btn-xs\">Cancel</button>\r\n        </div>\r\n\r\n        <div if.bind=\"block.isNew === true\" class=\"btn-group\" role=\"group\" aria-label=\"Actions\">\r\n            <button type=\"button\" click.delegate=\"addBlock()\" class=\"btn btn-success btn-xs\">Add Block</button>\r\n            <button type=\"button\" click.delegate=\"deleteBlock()\" class=\"btn btn-default btn-xs\">Cancel</button>\r\n        </div>\r\n    </div>\r\n</template>"; });
define('text!resources/elements/article/heading-block.html', ['module'], function(module) { module.exports = "<template>\r\n    <block-content if.bind=\"block.BlockType === 'Heading'\">\r\n        <edit-mode if.bind=\"block.isEditing === true\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-2\">\r\n                    <select class=\"form-control\" value.bind=\"block.headingType\">\r\n                        <option>Select</option>\r\n                        <option repeat.for=\"heading of headingTypes\" value.bind=\"heading\">${heading}</option>\r\n                    </select>\r\n                </div>\r\n                <div class=\"col-xs-10\">\r\n                    <input type=\"text\" class=\"form-control\" value.bind=\"block.Text\" />\r\n                </div>\r\n            </div>\r\n        </edit-mode>\r\n        <read-mode if.bind=\"block.isEditing !== true\">\r\n            <span class=\"${block.headingType}\">${block.Text}</span>\r\n        </read-mode>\r\n    </block-content>\r\n</template>"; });
define('text!resources/elements/article/image-block.html', ['module'], function(module) { module.exports = "<template>\r\n    <block-content if.bind=\"block.BlockType === 'Image'\">\r\n        <edit-mode if.bind=\"block.isEditing === true\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-3\">Image Title</div>\r\n                <div class=\"col-xs-9\">\r\n                    <input type=\"text\" class=\"form-control\" value.bind=\"block.Text\" />\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-3\">Select Image</div>\r\n                <div class=\"col-xs-9\">\r\n                    <input type=\"file\"\r\n                            accept=\"image/*\" class=\"form-control\"\r\n                            files.bind=\"selectedFiles\">\r\n\r\n                    <ul>\r\n                        <li repeat.for=\"file of selectedFiles | fileListToArray\">\r\n                            <p>${file.name}: ${file.type} ${file.size / 1000} kb</p>\r\n                            <img src.bind=\"blobToUrl(file)\"><img>\r\n                        </li>\r\n                    </ul>\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\" if.bind=\"selectedFiles.length === 0\">\r\n                <div class=\"col-xs-9 col-xs-offset-3\">\r\n                    <img src.bind=\"block.ImageUrl\" />\r\n                </div>\r\n            </div>\r\n        </edit-mode>\r\n\r\n        <read-mode if.bind=\"block.isEditing !== true\">\r\n            <article-image>\r\n                <img src.bind=\"block.ImageUrl\" />\r\n                <p>${block.Text}</p>\r\n            </article-image>\r\n        </read-mode>\r\n    </block-content>\r\n</template>"; });
define('text!resources/elements/article/new-block.html', ['module'], function(module) { module.exports = "<template>\r\n    <block-content if.bind=\"block.isNew === true\">\r\n        <edit-mode>\r\n\r\n            <div class=\"form-horizontal\">\r\n                <div class=\"form-group\">\r\n                    <label class=\"col-sm-2 control-label\">Block Type</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <select class=\"form-control\" value.bind=\"block.BlockType\">\r\n                            <option>Select</option>\r\n                            <option repeat.for=\"blockType of blockTypes\" value.bind=\"blockType\">${blockType}</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n        </edit-mode>\r\n    </block-content>\r\n</template>"; });
define('text!resources/elements/article/ordered-list-block.html', ['module'], function(module) { module.exports = "<template>\r\n    <block-content if.bind=\"block.BlockType === 'OrderedList'\">\r\n        <edit-mode if.bind=\"block.isEditing === true\">\r\n            <ol class=\"f\">\r\n                <li repeat.for=\"item of block.items\" class=\"row\">\r\n                        <div class=\"col-xs-10\">\r\n                            <textarea rows=\"3\" id=\"${$parent.block.BlockId}-${$index}\"\r\n                                      value.bind=\"item\"></textarea>\r\n                        </div>\r\n                        <div class=\"col-xs-2\" style=\"text-align: left;\">\r\n                            <button type=\"button\"\r\n                                    click.delegate=\"$parent.deleteItem($index)\"\r\n                                    class=\"btn btn-danger btn-xs\">\r\n                                Delete\r\n                            </button>\r\n                        </div>\r\n                </li>\r\n            </ol>\r\n            <button type=\"button\" \r\n                    click.delegate=\"appendItem()\" \r\n                    class=\"btn btn-primary btn-xs\">\r\n                Add List Item\r\n            </button>\r\n\r\n        </edit-mode>\r\n        <read-mode if.bind=\"block.isEditing !== true\">\r\n            <ol class=\"f\">\r\n                <li repeat.for=\"item of block.Items\">${item}</li>\r\n            </ol>\r\n        </read-mode>\r\n    </block-content>\r\n</template>"; });
define('text!resources/elements/article/paragraph-block.html', ['module'], function(module) { module.exports = "<template>\r\n    <block-content if.bind=\"block.BlockType === 'Paragraph'\">\r\n        <edit-mode if.bind=\"block.isEditing === true\">\r\n            <textarea rows=\"4\" value.bind=\"block.Text\">\r\n            </textarea>\r\n        </edit-mode>\r\n        <read-mode if.bind=\"block.isEditing !== true\">\r\n            <p>${block.Text}</p>\r\n        </read-mode>\r\n    </block-content>\r\n</template>"; });
define('text!resources/elements/navigation/main-nav.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"main-nav\">\r\n        <div class=\"container\">\r\n            <div class=\"main-nav-items\">\r\n                <ul class=\"nav navbar-nav\">\r\n                    <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\r\n                        <a href.bind=\"row.href\">${row.title}</a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n     </div>\r\n</template>"; });
define('text!resources/elements/navigation/nav-header.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"container\">\r\n        <div class=\"navbar-brand\">\r\n\r\n            <img class=\"logo\" src=\"/content/images/logo.png\"/>\r\n            <a first-letter-span href=\"/\">Dream Space</a>\r\n        </div>\r\n        <ul class=\"nav navbar-nav navbar-right\">\r\n            <li role=\"presentation\" class=\"dropdown\" if.bind=\"isAuthenticated === true\">\r\n                <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                    <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>\r\n                    ${userContext.user.firstName} <span class=\"caret\"></span>\r\n                </a>\r\n                <ul class=\"dropdown-menu\">\r\n                    <li><a href.bind=\"loginUrl\">Account</a></li>\r\n                    <li><a click.delegate=\"logout()\">Logout</a></li>\r\n                </ul>\r\n            </li>\r\n            <li if.bind=\"isAuthenticated !== true\">\r\n                <a href.bind=\"loginUrl\">Login</a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</template>"; });
define('text!resources/elements/navigation/sub-nav.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <div class=\"sub-nav\">\r\n        <nav class=\"navbar navbar\">\r\n            <div class=\"container\">\r\n                <nav class=\"navbar\">\r\n                    <ul class=\"nav navbar-nav\">\r\n                        <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\r\n                            <a href.bind=\"row.href\">${row.title}</a>\r\n                        </li>\r\n                    </ul>\r\n                </nav>\r\n            </div>\r\n        </nav>\r\n    </div>\r\n</template>"; });
define('text!resources/elements/rule/rule.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"c_rule\" if.bind=\"rule.name\">\r\n\r\n        <div class=\"c_rule-header\">\r\n            <span>${rule.name}</span>\r\n            <div class=\"btn-group\">\r\n                <button type=\"button\" click.delegate=\"showDetails()\" class=\"btn btn-default\">${rule.viewMode === true ? 'Hide' : 'Show'}</button>\r\n                <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                    <span class=\"caret\"></span>\r\n                    <span class=\"sr-only\">Toggle Dropdown</span>\r\n                </button>\r\n                <ul class=\"dropdown-menu\">\r\n                    <li if.bind=\"rule.viewMode !== true\"><a click.delegate=\"showDetails()\">Show Details</a></li>\r\n                    <li if.bind=\"rule.editMode !== true\"><a click.delegate=\"startEdit()\">Edit Rule</a></li>\r\n                    <li if.bind=\"rule.deleteMode !== true\"><a click.delegate=\"tryDelete()\">Delete Rule</a></li>\r\n                </ul>\r\n            </div>\r\n\r\n            <form class=\"c_rule-details\" submit.delegate=\"applyChanges()\" if.bind=\"rule.viewMode === true || rule.editMode === true\">\r\n                <fieldset disabled.bind=\"rule.editMode !== true\">\r\n\r\n                    <div class=\"form-group\">\r\n                        <label for=\"txtName\">Rule Name</label>\r\n                        <input type=\"text\" class=\"form-control\" id=\"txtName\" value.bind=\"rule.name\">\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <label for=\"txtDescription\">Description</label>\r\n                        <textarea rows=\"4\" class=\"form-control\" id=\"txtDescription\" value.bind=\"rule.description\"></textarea>\r\n                    </div>\r\n\r\n                    <div class=\"form-inline\">\r\n                        <div class=\"form-group\">\r\n                            <label for=\"ddlPeriod\">Period:</label>\r\n                            <select id=\"ddlPeriod\" class=\"form-control\" value.bind=\"rule.period\">\r\n                                <option repeat.for=\"period of periods\" model.bind=\"period.id\">${period.name}</option>\r\n                            </select>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"ddlCondition\">Compare operator:</label>\r\n                            <select id=\"ddlCondition\" class=\"form-control\" value.bind=\"rule.condition\">\r\n                                <option repeat.for=\"compareType of compareTypes\" model.bind=\"compareType.id\">${compareType.name}</option>\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <!--Compare What-->\r\n                    <div class=\"col-md-6\">\r\n                        <h3>Compare What</h3>\r\n                    </div>\r\n\r\n                    <!--Compare With-->\r\n                    <div class=\"col-md-6\">\r\n                        <h3>Compare With</h3>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\" if.bind=\"rule.editMode === true\">\r\n                        <button type=\"submit\" class=\"btn btn-primary btn-xs\">Apply Changes</button>\r\n                        <button type=\"button\" click.delegate=\"cancelEdit()\" class=\"btn btn-default btn-xs\">Cancel</button>\r\n                    </div>\r\n                </fieldset>\r\n            </form>\r\n        </div>\r\n\r\n    </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map