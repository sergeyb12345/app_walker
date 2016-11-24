import environment from './environment';
import settings from './settings';
import {UserContext} from './account/user-context';

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {

    let userContext = aurelia.container.get(UserContext);
    userContext.initialize()
        .then(response => {

            aurelia.use
                .instance('Settings',settings)
                .instance('User',userContext)
                .standardConfiguration()
                .feature('resources')
                .feature('navigation')
                .plugin('aurelia-validation');

            if (environment.debug) {
                aurelia.use.developmentLogging();
            }

            if (environment.testing) {
                aurelia.use.plugin('aurelia-testing');
            }

            aurelia.start().then(() => {
                aurelia.setRoot();
            });
            
        });

}
