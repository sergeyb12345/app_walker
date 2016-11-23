using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dream.walker.data.Entities.Articles
{
    public class Article
    {
        public int ArticleId { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public int CategoryId { get; set; }
        public int OrderId { get; set; }
        public string JsonArticleBlocks { get; set; }

        public Category Category { get; set; }
        public bool IsFeatured { get; set; }
    }
}
