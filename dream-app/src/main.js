
import {LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.warn);

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration();

        aurelia.use.developmentLogging();

        aurelia.start().then(() => {
            aurelia.setRoot();
       });

}
