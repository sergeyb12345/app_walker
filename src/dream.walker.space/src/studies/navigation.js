import {inject} from "aurelia-framework";
import {ArticleService} from '../services/article-service';

@inject(ArticleService, "Settings")
export class Navigation {

    constructor (articleService, settings) {
        
        this.articleService = articleService;
        this.settings = settings;
        this.section = this.settings.getStudiesSection();
        this.menus = [];
        
        this.menu = {
            editMode:false,
            section: this.section,
            editModeUrl: ''
        };

        this.loadCategories(this.section.sectionId);
    }

    loadCategories(sectionId) {
        this.articleService.getCategories(sectionId)
            .then(categories => {
                this.menu.items = categories;
                this.menus.push(this.menu);
            });
    }

    configureRouter(config, router) {
        config.title = this.section.Title;
        

        config.map([
            { route: ['', ':category', ':category/:article'], moduleId: "./category", name:"category"}
        ]);

        this.router = router;
    }
 
    selectMenuItem(categoryUrl) {
        if (this.menu && this.menu.items) {
            this.menu.items.forEach(function(item) {
                item.isActive = item.url === categoryUrl;
            });
        }
    }
}