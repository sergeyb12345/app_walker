namespace dream.walker.data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("vRuleSet")]
    public partial class vRuleSet
    {
        public int RuleSetId { get; set; }

        public string RuleSetName { get; set; }

        public string Description { get; set; }

        public string RuleDescription { get; set; }

        public int Period { get; set; }

        public bool Deleted { get; set; }

        public int RuleId { get; set; }

        public string RuleName { get; set; }

        public int OrderId { get; set; }

    }
}
