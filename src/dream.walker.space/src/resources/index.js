export function configure(config) {
    
    config.globalResources(['./elements/navigation/nav-header']);
    config.globalResources(['./elements/navigation/main-nav']);
    config.globalResources(['./elements/navigation/sub-nav']);
    config.globalResources(['./elements/chart/any-chart']);
    config.globalResources(['./elements/rule/rule']);
    config.globalResources(['./elements/rule-set/rule-set']);
    config.globalResources(['./elements/indicator/indicator']);
    config.globalResources(['./attributes/first-letter-span']);
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
