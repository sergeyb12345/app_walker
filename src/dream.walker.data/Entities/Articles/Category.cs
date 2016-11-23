using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dream.walker.data.Entities.Articles
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Title { get; set; }
        public int OrderId { get; set; }
        public string Url { get; set; }
        public int SectionId { get; set; }

        public List<Article> Articles { get; set; }
        public Section Section { get; set; }
        public bool Deleted { get; set; }
    }
}
