export function configure(config) {
    
    config.globalResources(['./elements/navigation/nav-header']);
    config.globalResources(['./elements/navigation/main-nav']);
    config.globalResources(['./elements/navigation/sub-nav']);
    config.globalResources(['./elements/chart/any-chart']);
    //config.feature('./elements/article');
    config.globalResources(
        './elements/article/article',
        './elements/article/article-block',
        './elements/article//heading-block',
        './elements/article//paragraph-block',
        './elements/article/image-block',
        './elements/article/ordered-list-block',
        './elements/article/block-actions',
        './elements/article/new-block'
    );
}
