using dream.walker.data.Entities.Strategies;
using System.Collections.Generic;

namespace dream.walker.data.Models
{
    public class RuleSetModel
    {
        public RuleSetModel()
        {
            Header = new RuleSet();
            Details = new List<RuleSetDetails>();
        }

        public RuleSet Header { get; set; }
        public List<RuleSetDetails> Details { get; set; }
    }
}
