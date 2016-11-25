export function configure(config) {
  config.globalResources(['./elements/chart/any-chart']);
  config.globalResources(
    './elements/article/article-block',
    './elements/article//heading-block',
    './elements/article//paragraph-block',
    './elements/article/image-block',
    './elements/article/ordered-list-block',
    './elements/article/block-actions',
    './elements/article/new-block'
);
}
