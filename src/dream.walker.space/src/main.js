import $ from 'jquery';
import environment from './environment';
import {Settings} from './settings';
import {ErrorParser} from './common/error-parser';
import {UserContext} from './account/user-context';


//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
    let errorparser = aurelia.container.get(ErrorParser);
    let userContext = aurelia.container.get(UserContext);
    let settings = aurelia.container.get(Settings);

    userContext.initialize()
        .then(response => {

            settings.initialize()
                .then(response => {
                    aurelia.use
                        .instance('ErrorParser',errorparser)
                        .instance('Settings',settings)
                        .instance('User',userContext)
                        .standardConfiguration()
                        .feature('resources')
                        .feature('navigation')
                        .plugin('aurelia-validation');

                    if (environment.debug) {
                        //aurelia.use.developmentLogging();
                    }

                    if (environment.testing) {
                        //aurelia.use.plugin('aurelia-testing');
                    }

                    aurelia.start().then(() => {
                        aurelia.setRoot();
                    });

                });

            
        });

}
