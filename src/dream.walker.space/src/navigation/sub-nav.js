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
        this.categoriesUrl = this.menu.section.Url + '/categories/' +  this.menu.section.SectionId;
    }

    getUrl(menuItem) {
        return '' + this.menu.section.Url + '/' + menuItem.Url;
    }

    startEdit() {
        this.eventAggregator.publish(this.menu.section.Url + '-start-edit', true);
    }

    applyChanges() {
        this.eventAggregator.publish(this.menu.section.Url + '-save-article', true);
    }

    cancelEdit() {
        this.eventAggregator.publish(this.menu.section.Url + '-cancel-edit', true);
    }
}