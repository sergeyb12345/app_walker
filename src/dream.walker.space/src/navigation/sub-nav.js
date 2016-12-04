export class SubNav {

    constructor () {
        this.categoriesUrl = '';
    }

    activate(menu) {
        this.menu = menu;
        this.categoriesUrl = this.menu.section.url + '/categories/' +  this.menu.section.sectionId;
    }

    getUrl(menuItem) {
        return '' + this.menu.section.url + '/' + menuItem.url;
    }

}