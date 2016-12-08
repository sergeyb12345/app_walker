namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterStrategyRuleSet : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.StrategyRuleSet", "OrderId", c => c.Int(nullable: false));
            AddColumn("dbo.StrategyRuleSet", "Optional", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.StrategyRuleSet", "Optional");
            DropColumn("dbo.StrategyRuleSet", "OrderId");
        }
    }
}
