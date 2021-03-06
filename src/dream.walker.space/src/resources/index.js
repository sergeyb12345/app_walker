export function configure(config) {
    
    config.globalResources(['./elements/navigation/nav-header']);
    config.globalResources(['./elements/navigation/main-nav']);
    config.globalResources(['./elements/navigation/sub-nav']);
    config.globalResources(['./elements/chart/any-chart']);
    config.globalResources(['./elements/chart/stock-chart']);
    config.globalResources(['./elements/rule/rule']);
    config.globalResources(['./elements/rule-set/rule-set']);
    config.globalResources(['./elements/rule-set/rule-set-item']);
    config.globalResources(['./elements/indicator/indicator']);
    config.globalResources(['./elements/strategy/strategy-admin']);
    config.globalResources(['./elements/strategy/strategy-navigation']);
    config.globalResources(['./elements/strategy/side-navigation']);
    config.globalResources(['./elements/strategy/strategy-rule-set']);
    config.globalResources(['./elements/company/company-details']);
    config.globalResources(['./attributes/first-letter-span']);
    config.globalResources(['./value-converters/blob-to-url']);
    config.globalResources(['./value-converters/filelist-to-array']);
    config.globalResources(
        './elements/article-parts/article-parts',
        './elements/article-parts/article-part-paragraph',
        './elements/article-parts/article-part-heading',
        './elements/article-parts/article-part-actions',
        './elements/article-parts/article-part-image',
        './elements/article-parts/article-part-list',
        './elements/article-parts/article-part-new'
    );
}
