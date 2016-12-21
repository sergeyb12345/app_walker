using dream.walker.data.Entities.Strategies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dream.walker.data.Models
{
    public class RuleModel
    {
        public string Name { get; set; }
        public int RuleId { get; set; }
        public int OrderId { get; set; }
        public string Description { get; set; }
    }
}
