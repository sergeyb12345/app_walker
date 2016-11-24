using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using dream.walker.data.Entities.Articles;
using Newtonsoft.Json;

namespace dream.walker.space.Models.Articles
{
    public class ArticleModel
    {
        public int ArticleId { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public int CategoryId { get; set; }
        public int OrderId { get; set; }
        public List<dynamic> Blocks { get; set; }
        public bool IsFeatured { get; set; }

        public ArticleModel()
        {

        }

        public ArticleModel(Article article)
        {
            if (article != null)
            {
                ArticleId = article.ArticleId;
                Title = article.Title;
                Url = article.Url;
                CategoryId = article.CategoryId;
                OrderId = article.OrderId;
                Blocks = JsonConvert.DeserializeObject<List<dynamic>>(article.JsonArticleBlocks);
            }
        }
    }
}