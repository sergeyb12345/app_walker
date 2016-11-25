import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class SubNav {

    constructor (eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.categoriesUrl = '';
    }

    activate(menu) {
        this.menu = menu;
        this.categoriesUrl = this.menu.section.url + '/categories/' +  this.menu.section.sectionId;
    }

    getUrl(menuItem) {
        return '' + this.menu.section.url + '/' + menuItem.url;
    }

    startEdit() {
        this.eventAggregator.publish(this.menu.section.url + '-start-edit', true);
    }

    applyChanges() {
        this.eventAggregator.publish(this.menu.section.url + '-save-article', true);
    }

    cancelEdit() {
        this.eventAggregator.publish(this.menu.section.url + '-cancel-edit', true);
    }
}