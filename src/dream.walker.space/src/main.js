import environment from './environment';
import {UserContext} from './common/user-context';

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {

    let userContext = aurelia.container.get(UserContext);
    userContext.initialize();

    aurelia.use
        .standardConfiguration()
        .feature('resources')
        .feature('navigation');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => {
        aurelia.setRoot();
  });
}
